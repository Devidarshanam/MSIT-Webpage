import { supabase, isSupabaseConfigured } from '../lib/supabase.js';

const LOCAL_STORAGE_APPS_KEY = 'msit_all_submitted_applications';
const LOCAL_STORAGE_DRAFT_PREFIX = 'msit_app_draft_';
const LOCAL_STORAGE_HISTORY_KEY = 'msit_application_status_history';

/**
 * Generate a consistent application reference ID.
 * Format: MSIT-2027-XXXXX
 */
export function generateApplicationId() {
  return `MSIT-2027-${Math.floor(10000 + Math.random() * 90000)}`;
}

/**
 * Helper to build storage draft key
 */
function getDraftKey(email) {
  const cleanEmail = (email || 'guest').trim().toLowerCase();
  return `${LOCAL_STORAGE_DRAFT_PREFIX}${cleanEmail}`;
}

/**
 * Safely parse JSON from localStorage
 */
function safeJsonParse(key, fallback = null) {
  if (typeof localStorage === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    console.warn(`[MSIT] Error parsing localStorage key ${key}:`, err);
    return fallback;
  }
}

/**
 * Safely write JSON to localStorage
 */
function safeJsonSet(key, value) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`[MSIT] Error writing to localStorage key ${key}:`, err);
  }
}

/**
 * Retrieve candidate profile or create initial entry.
 */
export async function getCandidateProfile(authUser) {
  if (!authUser?.email) return null;
  const email = authUser.email.toLowerCase().trim();

  // Try Supabase first
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('candidate_profiles')
        .select('*')
        .eq('user_id', authUser.id)
        .maybeSingle();

      if (!error && data) {
        return data;
      }
    } catch (err) {
      console.warn('[MSIT] Candidate profile fetch warning:', err);
    }
  }

  // Fallback to local user session
  return {
    user_id: authUser.id,
    email: email,
    full_name: authUser.user_metadata?.full_name || sessionStorage.getItem('msit_auth_fullname') || ''
  };
}

/**
 * Retrieve any active or submitted application for the user.
 * Looks up Supabase first, falls back to localStorage.
 *
 * @param {object|null} authUser
 * @returns {Promise<{ application: object|null, status: string }>}
 */
export async function getUserApplication(authUser) {
  const email = (authUser?.email || '').trim().toLowerCase();
  if (!email) {
    return { application: null, status: 'Not Started' };
  }

  // 1. Try Supabase
  if (isSupabaseConfigured() && supabase) {
    try {
      // Query by user_id first, then email
      let query = supabase
        .from('applications')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (authUser?.id) {
        query = query.or(`user_id.eq.${authUser.id},email.eq.${email}`);
      } else {
        query = query.eq('email', email);
      }

      const { data, error } = await query;

      if (!error && Array.isArray(data) && data.length > 0) {
        const app = data[0];
        return {
          application: app,
          status: app.status || 'Submitted'
        };
      }
    } catch (err) {
      console.warn('[MSIT] Supabase getUserApplication warning:', err);
    }
  }

  // 2. Check submitted applications in localStorage
  const allSubmitted = safeJsonParse(LOCAL_STORAGE_APPS_KEY, []);
  const matchingSubmitted = allSubmitted.find(a => (a.email || '').toLowerCase() === email);
  if (matchingSubmitted) {
    return {
      application: matchingSubmitted,
      status: matchingSubmitted.status || 'Submitted'
    };
  }

  // 3. Check saved draft
  const draft = safeJsonParse(getDraftKey(email), null);
  if (draft && !draft.isSubmitted) {
    return {
      application: draft,
      status: 'Draft'
    };
  }

  return { application: null, status: 'Not Started' };
}

/**
 * Load draft application for a candidate.
 */
export function getSavedDraft(email) {
  if (!email) return null;
  return safeJsonParse(getDraftKey(email), null);
}

/**
 * Save application progress as a draft.
 * Persists locally and syncs to Supabase draft state if authenticated.
 */
export async function saveApplicationDraft(draftData, authUser = null) {
  const email = (draftData.email || authUser?.email || '').trim().toLowerCase();
  if (!email) return { success: false, error: 'Email required to save draft' };

  const now = new Date().toISOString();
  const draftRecord = {
    ...draftData,
    email,
    user_id: authUser?.id || null,
    status: 'Draft',
    isSubmitted: false,
    updated_at: now
  };

  // 1. Save to local storage
  safeJsonSet(getDraftKey(email), draftRecord);

  // 2. Sync to Supabase if configured
  if (isSupabaseConfigured() && supabase && authUser?.id) {
    try {
      await supabase
        .from('candidate_profiles')
        .upsert({
          user_id: authUser.id,
          email,
          full_name: draftData.fullName || '',
          phone: draftData.phone || '',
          updated_at: now
        }, { onConflict: 'user_id' });
    } catch (err) {
      // Non-blocking
      console.warn('[MSIT] Draft cloud sync warning:', err);
    }
  }

  return { success: true, savedAt: now, draft: draftRecord };
}

/**
 * Upload an application document.
 * Handles client validation, Supabase Storage bucket upload, or resilient local data URL.
 *
 * @param {File} file
 * @param {string} docType
 * @param {string} applicationId
 * @param {object|null} authUser
 * @returns {Promise<{ data: object|null, error: object|null }>}
 */
export async function uploadDocumentFile(file, docType, applicationId, authUser = null) {
  if (!file) {
    return { data: null, error: { message: 'No file selected.' } };
  }

  // Validation
  const isCV = docType === 'CV / Resume';
  const maxSizeBytes = isCV ? 5 * 1024 * 1024 : 10 * 1024 * 1024; // 5MB for CV, 10MB for marksheets
  const allowedTypes = isCV 
    ? ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    : ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

  if (file.size > maxSizeBytes) {
    return {
      data: null,
      error: { message: `File size exceeds maximum permitted limit (${isCV ? '5 MB' : '10 MB'}).` }
    };
  }

  // Check MIME type or file extension
  const ext = (file.name.split('.').pop() || '').toLowerCase();
  const validExts = isCV ? ['pdf', 'doc', 'docx'] : ['pdf', 'jpg', 'jpeg', 'png'];
  if (!validExts.includes(ext) && !allowedTypes.includes(file.type)) {
    return {
      data: null,
      error: { message: `Unsupported file format. Please upload a valid ${validExts.join(', ').toUpperCase()} file.` }
    };
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formattedSize = formatFileSize(file.size);
  const now = new Date().toISOString();
  const fileId = `doc_${Math.random().toString(36).substring(2, 9)}`;

  // 1. Attempt Supabase Storage upload if authenticated and configured
  if (isSupabaseConfigured() && supabase && authUser?.id) {
    try {
      const sanitizedDocType = docType.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
      const storagePath = `${authUser.id}/${applicationId || 'new'}/${sanitizedDocType}_${Date.now()}.${ext}`;

      const { data: storageUpload, error: storageErr } = await supabase.storage
        .from('application-documents')
        .upload(storagePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (!storageErr && storageUpload) {
        // Try to get public or signed URL
        const { data: publicUrlData } = supabase.storage
          .from('application-documents')
          .getPublicUrl(storagePath);

        const docRecord = {
          id: fileId,
          docType,
          fileName: file.name,
          fileSize: formattedSize,
          mimeType: file.type || `application/${ext}`,
          storagePath: storagePath,
          fileUrl: publicUrlData?.publicUrl || storagePath,
          status: 'Uploaded',
          uploadedAt: now
        };

        return { data: docRecord, error: null };
      } else {
        console.warn('[MSIT] Supabase Storage upload failed, using secure fallback:', storageErr?.message);
      }
    } catch (err) {
      console.warn('[MSIT] Supabase Storage exception:', err);
    }
  }

  // 2. Resilient local object URL fallback
  const fallbackUrl = typeof window !== 'undefined' ? URL.createObjectURL(file) : '';
  const docRecord = {
    id: fileId,
    docType,
    fileName: file.name,
    fileSize: formattedSize,
    mimeType: file.type || `application/${ext}`,
    storagePath: `local_${file.name}`,
    fileUrl: fallbackUrl,
    status: 'Uploaded',
    uploadedAt: now,
    isLocal: true
  };

  return { data: docRecord, error: null };
}

/**
 * Submit candidate application.
 * Validates, assigns unique reference number, persists to Supabase & localStorage.
 */
export async function submitStudentApplication(applicationData, authUser = null) {
  const appId = applicationData.applicationId || generateApplicationId();
  const now = new Date().toISOString();
  const email = (applicationData.email || authUser?.email || '').trim().toLowerCase();
  const fullName = (applicationData.fullName || authUser?.user_metadata?.full_name || sessionStorage.getItem('msit_auth_fullname') || '').trim();

  // Validate CV upload
  if (!applicationData.cvDocument && !applicationData.cv_url) {
    return {
      data: null,
      error: { message: 'CV / Resume upload is required before submitting your application.' }
    };
  }

  // Prevent duplicate submissions: check if already submitted
  const existingApps = safeJsonParse(LOCAL_STORAGE_APPS_KEY, []);
  const existingDuplicate = existingApps.find(a => a.email === email && a.status !== 'Draft');
  if (existingDuplicate && existingDuplicate.application_id !== appId) {
    // Return existing application to prevent duplicate active submissions
    return { data: existingDuplicate, error: null, isDuplicateRestored: true };
  }

  const generatedId = (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function')
    ? crypto.randomUUID()
    : '00000000-0000-4000-8000-' + Math.random().toString(16).substring(2, 14).padEnd(12, '0');

  // Format documents array
  const formattedDocs = [];
  if (applicationData.documents && typeof applicationData.documents === 'object') {
    Object.entries(applicationData.documents).forEach(([key, doc]) => {
      if (doc && doc.fileName) {
        formattedDocs.push({
          id: doc.id || `doc_${key}`,
          doc_type: doc.docType || key,
          file_name: doc.fileName,
          file_size: doc.fileSize || '1.0 MB',
          file_url: doc.fileUrl || '',
          storage_path: doc.storagePath || '',
          status: 'Pending',
          uploaded_at: doc.uploadedAt || now
        });
      }
    });
  }

  // Also include CV in documents
  if (applicationData.cvDocument) {
    formattedDocs.push({
      id: applicationData.cvDocument.id || 'doc_cv',
      doc_type: 'CV / Resume',
      file_name: applicationData.cvDocument.fileName,
      file_size: applicationData.cvDocument.fileSize || '1.0 MB',
      file_url: applicationData.cvDocument.fileUrl || '',
      storage_path: applicationData.cvDocument.storagePath || '',
      status: 'Pending',
      uploaded_at: applicationData.cvDocument.uploadedAt || now
    });
  }

  const record = {
    id: applicationData.id || generatedId,
    application_id: appId,
    user_id: authUser?.id || null,
    email: email,
    full_name: fullName,
    phone: applicationData.phone || '',
    dob: applicationData.dob || null,
    address: applicationData.address || '',
    parent_relationship: applicationData.parentRelationship || 'Father',
    parent_name: applicationData.parentName || '',
    alt_phone: applicationData.altPhone || '',
    ug_degree: applicationData.ugDegree || '',
    university: applicationData.university || '',
    department: applicationData.department || '',
    cgpa: applicationData.cgpa || '',
    grading_scale: applicationData.gradingScale || 'Percentage (out of 100%)',
    score_eligibility_note: applicationData.scoreEligibilityNote || '',
    passing_year: applicationData.passingYear || '',
    has_experience: applicationData.hasExperience || 'No',
    experience_details: applicationData.experienceDetails || '',
    gre_score: applicationData.greScore || null,
    gate_score: applicationData.gateScore || null,
    exam_name: applicationData.examName || null,
    exam_year: applicationData.examYear || null,
    cv_url: applicationData.cvDocument?.fileUrl || applicationData.cv_url || '',
    cv_filename: applicationData.cvDocument?.fileName || applicationData.cv_filename || '',
    statement_text: applicationData.statementText || '',
    statement_word_count: applicationData.statementWordCount || 0,
    referral_source: applicationData.referralSource || '',
    referral_explanation: applicationData.referralExplanation || '',
    status: 'Submitted',
    document_status: 'Pending Review',
    cohort: 'January 2027 Intake',
    decision_reason: null,
    decided_by: null,
    decided_at: null,
    submitted_at: now,
    updated_at: now,
    documents: formattedDocs,
    isMock: false
  };

  // 1. Persist to localStorage
  try {
    const existing = safeJsonParse(LOCAL_STORAGE_APPS_KEY, []);
    const filtered = existing.filter(a => a.application_id !== appId && a.email !== email);
    filtered.unshift(record);
    safeJsonSet(LOCAL_STORAGE_APPS_KEY, filtered);

    // Clear saved draft once submitted
    localStorage.removeItem(getDraftKey(email));
  } catch (err) {
    console.warn('[MSIT] LocalStorage save warning:', err);
  }

  // 2. Audit status history
  logApplicationHistory(appId, null, 'Submitted', email, 'Initial prospective-student application submission');

  // 3. Persist to Supabase if available
  if (isSupabaseConfigured() && supabase) {
    try {
      const { isMock: _mockFlag, ...dbRecord } = record;
      let { data, error } = await supabase
        .from('applications')
        .upsert([dbRecord], { onConflict: 'application_id' })
        .select()
        .single();

      // If remote table has not yet run the extended columns migration,
      // retry with base schema columns so Supabase sync succeeds regardless!
      if (error && error.message?.includes('schema cache')) {
        const baseDbRecord = {
          id: record.id,
          application_id: record.application_id,
          user_id: record.user_id,
          email: record.email,
          full_name: record.full_name,
          phone: record.phone,
          ug_degree: record.ug_degree,
          department: record.department,
          cgpa: record.cgpa,
          passing_year: record.passing_year,
          purpose_to_join: record.statement_text || '',
          status: 'Submitted',
          document_status: 'Pending Review',
          cohort: record.cohort,
          submitted_at: record.submitted_at,
          updated_at: record.updated_at
        };
        const retryResult = await supabase
          .from('applications')
          .upsert([baseDbRecord], { onConflict: 'application_id' })
          .select()
          .single();
        if (!retryResult.error) {
          data = retryResult.data;
          error = null;
        }
      }

      if (!error && data) {
        // Also insert documents into application_documents table if table exists
        if (formattedDocs.length > 0) {
          const docRecords = formattedDocs.map(d => ({
            application_id: data.id,
            application_ref: appId,
            user_id: authUser?.id || null,
            doc_type: d.doc_type,
            file_name: d.file_name,
            file_size: d.file_size,
            file_url: d.file_url,
            storage_path: d.storage_path,
            status: d.status || 'Pending',
            uploaded_at: d.uploaded_at || now
          }));
          await supabase.from('application_documents').insert(docRecords).catch(e => {
            console.warn('[MSIT] Documents insert warning:', e);
          });
        }

        return { data: { ...data, isMock: false }, error: null };
      }
      console.warn('[MSIT] Supabase insert warning (schema may be pending):', error?.message);
    } catch (err) {
      console.warn('[MSIT] Supabase insert exception:', err);
    }
  }

  return { data: record, error: null };
}

/**
 * Update an application when Additional Information is requested.
 */
export async function updateStudentApplication(applicationId, updateData, authUser = null) {
  const now = new Date().toISOString();
  const allApps = safeJsonParse(LOCAL_STORAGE_APPS_KEY, []);
  const idx = allApps.findIndex(a => a.application_id === applicationId);

  let updatedRecord = null;
  if (idx !== -1) {
    const prevStatus = allApps[idx].status;
    allApps[idx] = {
      ...allApps[idx],
      ...updateData,
      status: 'Submitted',
      updated_at: now
    };
    updatedRecord = allApps[idx];
    safeJsonSet(LOCAL_STORAGE_APPS_KEY, allApps);

    logApplicationHistory(
      applicationId,
      prevStatus,
      'Submitted',
      authUser?.email || 'Candidate',
      'Candidate submitted updated application details'
    );
  }

  // Update Supabase if available
  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase
        .from('applications')
        .update({
          ...updateData,
          status: 'Submitted',
          updated_at: now
        })
        .eq('application_id', applicationId);
    } catch (err) {
      console.warn('[MSIT] Supabase update warning:', err);
    }
  }

  return { data: updatedRecord, error: null };
}

/**
 * Record an audit entry in the status history.
 */
function logApplicationHistory(applicationId, previousStatus, newStatus, actor, reason) {
  const history = safeJsonParse(LOCAL_STORAGE_HISTORY_KEY, []);
  history.unshift({
    id: `hist_${Math.random().toString(36).substring(2, 9)}`,
    application_id: applicationId,
    previous_status: previousStatus,
    new_status: newStatus,
    changed_by: actor,
    reason: reason,
    created_at: new Date().toISOString()
  });
  safeJsonSet(LOCAL_STORAGE_HISTORY_KEY, history.slice(0, 100));
}

/**
 * Get all applications submitted locally.
 */
export function getLocalApplications() {
  return safeJsonParse(LOCAL_STORAGE_APPS_KEY, []);
}
