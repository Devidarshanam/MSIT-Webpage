import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
export { getAdmissionSettings } from './adminService.js';

export const LOCAL_STORAGE_APPS_KEY = 'msit_all_submitted_applications';
export const LOCAL_STORAGE_DRAFT_PREFIX = 'msit_app_draft_';
export const LOCAL_STORAGE_HISTORY_KEY = 'msit_application_status_history';

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
export function getDraftKey(email) {
  const cleanEmail = (email || 'guest').trim().toLowerCase();
  return `${LOCAL_STORAGE_DRAFT_PREFIX}${cleanEmail}`;
}

/**
 * Safely parse JSON from localStorage
 */
export function safeJsonParse(key, fallback = null) {
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
export function safeJsonSet(key, value) {
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
        const app = { ...data[0] };

        // Fetch uploaded documents from application_documents table if present
        try {
          let docQuery = supabase.from('application_documents').select('*');
          if (app.id && app.application_id) {
            docQuery = docQuery.or(`application_id.eq.${app.id},application_ref.eq.${app.application_id}`);
          } else if (app.id) {
            docQuery = docQuery.eq('application_id', app.id);
          } else if (app.application_id) {
            docQuery = docQuery.eq('application_ref', app.application_id);
          }
          const { data: docRows, error: docErr } = await docQuery;
          if (!docErr && Array.isArray(docRows) && docRows.length > 0) {
            app.documents = docRows;
          }
        } catch (docEx) {
          console.warn('[MSIT] Supabase documents query warning:', docEx);
        }

        // Merge from localStorage for any fields or documents not present in Supabase row
        const allSubmitted = safeJsonParse(LOCAL_STORAGE_APPS_KEY, []);
        const matchingSubmitted = allSubmitted.find(a => 
          (a.application_id && (a.application_id === app.application_id || a.id === app.id)) ||
          ((a.email || '').toLowerCase() === email)
        );

        if (matchingSubmitted) {
          const hasAppDocs = app.documents && (
            (Array.isArray(app.documents) && app.documents.length > 0) ||
            (typeof app.documents === 'object' && Object.keys(app.documents).length > 0)
          );
          if (!hasAppDocs && matchingSubmitted.documents) {
            app.documents = matchingSubmitted.documents;
          }
          if (!app.cv_url && matchingSubmitted.cv_url) {
            app.cv_url = matchingSubmitted.cv_url;
          }
          if (!app.cv_filename && matchingSubmitted.cv_filename) {
            app.cv_filename = matchingSubmitted.cv_filename;
          }
          if (!app.cvDocument && matchingSubmitted.cvDocument) {
            app.cvDocument = matchingSubmitted.cvDocument;
          }

          const fieldsToMerge = [
            'dob', 'address', 'parent_relationship', 'parent_name', 'alt_phone',
            'class10_score', 'class10_score_type', 'inter_pathway', 'inter_score', 'inter_score_type',
            'ug_degree', 'university', 'department', 'cgpa', 'grading_scale', 'passing_year',
            'has_experience', 'experience_years', 'experience_months', 'company_name', 'job_role', 'experience_details',
            'statement_text', 'purpose_to_join', 'referral_source', 'referral_explanation',
            'entrance_exam_status', 'gre_score', 'gre_year', 'gate_score', 'gate_year'
          ];
          fieldsToMerge.forEach(f => {
            if ((app[f] === undefined || app[f] === null || app[f] === '') && matchingSubmitted[f]) {
              app[f] = matchingSubmitted[f];
            }
          });
        }

        // Also check saved draft if documents or CV are still missing
        const draft = safeJsonParse(getDraftKey(email), null);
        if (draft) {
          const hasAppDocs = app.documents && (
            (Array.isArray(app.documents) && app.documents.length > 0) ||
            (typeof app.documents === 'object' && Object.keys(app.documents).length > 0)
          );
          if (!hasAppDocs && draft.documents) {
            app.documents = draft.documents;
          }
          if (!app.cv_url && (draft.cv_url || draft.cvDocument?.fileUrl)) {
            app.cv_url = draft.cv_url || draft.cvDocument?.fileUrl;
          }
          if (!app.cv_filename && (draft.cv_filename || draft.cvDocument?.fileName)) {
            app.cv_filename = draft.cv_filename || draft.cvDocument?.fileName;
          }
          if (!app.cvDocument && draft.cvDocument) {
            app.cvDocument = draft.cvDocument;
          }
          if ((!app.university || app.university === '') && draft.university) {
            app.university = draft.university;
          }
          if ((!app.class10_score || app.class10_score === '') && draft.class10Score) {
            app.class10_score = draft.class10Score;
          }
          if ((!app.inter_score || app.inter_score === '') && draft.interScore) {
            app.inter_score = draft.interScore;
          }
        }

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

    // Section 3: Academic Qualifications breakdown
    class10_score: applicationData.class10Score || null,
    class10_score_type: applicationData.class10ScoreType || 'Percentage',
    inter_pathway: applicationData.interPathway || 'Class 12 / Intermediate',
    inter_score: applicationData.interScore || null,
    inter_score_type: applicationData.interScoreType || 'Percentage',
    ug_degree: applicationData.ugDegree || '',
    university: applicationData.university || '',
    department: applicationData.department || '',
    cgpa: applicationData.cgpa || '',
    grading_scale: applicationData.gradingScale || 'Percentage (out of 100%)',
    score_eligibility_note: applicationData.scoreEligibilityNote || '',
    passing_year: applicationData.passingYear || '',

    // Section 4: Work Experience
    has_experience: applicationData.hasExperience || 'No',
    experience_years: applicationData.experienceYears || '0',
    experience_months: applicationData.experienceMonths || '0',
    company_name: applicationData.companyName || '',
    job_role: applicationData.jobRole || '',
    experience_details: applicationData.hasExperience === 'Yes'
      ? `${applicationData.companyName || ''} - ${applicationData.jobRole || ''} (${applicationData.experienceYears || 0} yrs ${applicationData.experienceMonths || 0} mos)`
      : 'Fresher',

    // Section 5: Purpose of Joining MSIT
    statement_text: applicationData.statementText || '',
    statement_word_count: applicationData.statementWordCount || 0,
    purpose_to_join: applicationData.statementText || '',

    // Section 6: Referral Source
    referral_source: applicationData.referralSource || '',
    referral_explanation: applicationData.referralExplanation || '',

    // Section 7: Entrance Examination Details
    entrance_exam_status: applicationData.entranceExamStatus || 'Neither',
    gre_score: applicationData.greScore || null,
    gre_year: applicationData.greYear || null,
    gate_score: applicationData.gateScore || null,
    gate_year: applicationData.gateYear || null,
    exam_name: applicationData.entranceExamStatus || null,
    exam_year: applicationData.greYear || applicationData.gateYear || null,

    // Documents & Metadata
    cv_url: applicationData.cvDocument?.fileUrl || applicationData.cv_url || '',
    cv_filename: applicationData.cvDocument?.fileName || applicationData.cv_filename || '',
    status: 'Submitted',
    document_status: 'Pending Review',
    cohort: applicationData.cohort || 'January 2027 Intake',
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

        return { data: { ...record, ...data, documents: formattedDocs, cvDocument: applicationData.cvDocument, isMock: false }, error: null };
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

  // Format documents array
  const formattedDocs = [];
  if (updateData.documents && typeof updateData.documents === 'object') {
    Object.entries(updateData.documents).forEach(([key, doc]) => {
      if (doc && (doc.fileName || doc.file_name)) {
        formattedDocs.push({
          id: doc.id || `doc_${key}`,
          doc_type: doc.docType || doc.doc_type || key,
          file_name: doc.fileName || doc.file_name,
          file_size: doc.fileSize || doc.file_size || '1.0 MB',
          file_url: doc.fileUrl || doc.file_url || '',
          storage_path: doc.storagePath || doc.storage_path || '',
          status: doc.status || 'Pending',
          uploaded_at: doc.uploadedAt || doc.uploaded_at || now
        });
      }
    });
  }

  if (updateData.cvDocument && !formattedDocs.some(d => (d.doc_type || '').toLowerCase().includes('cv') || (d.doc_type || '').toLowerCase().includes('resume'))) {
    formattedDocs.push({
      id: updateData.cvDocument.id || 'doc_cv',
      doc_type: 'CV / Resume',
      file_name: updateData.cvDocument.fileName || updateData.cvDocument.file_name,
      file_size: updateData.cvDocument.fileSize || updateData.cvDocument.file_size || '1.0 MB',
      file_url: updateData.cvDocument.fileUrl || updateData.cvDocument.file_url || '',
      storage_path: updateData.cvDocument.storagePath || updateData.cvDocument.storage_path || '',
      status: 'Pending',
      uploaded_at: updateData.cvDocument.uploadedAt || updateData.cvDocument.uploaded_at || now
    });
  }

  const mergedUpdates = {
    ...updateData,
    full_name: updateData.fullName || updateData.full_name,
    phone: updateData.phone,
    dob: updateData.dob,
    address: updateData.address,
    parent_relationship: updateData.parentRelationship || updateData.parent_relationship,
    parent_name: updateData.parentName || updateData.parent_name,
    alt_phone: updateData.altPhone || updateData.alt_phone,
    class10_score: updateData.class10Score || updateData.class10_score,
    class10_score_type: updateData.class10ScoreType || updateData.class10_score_type,
    inter_pathway: updateData.interPathway || updateData.inter_pathway,
    inter_score: updateData.interScore || updateData.inter_score,
    inter_score_type: updateData.interScoreType || updateData.inter_score_type,
    ug_degree: updateData.ugDegree || updateData.ug_degree,
    university: updateData.university,
    department: updateData.department,
    cgpa: updateData.cgpa,
    grading_scale: updateData.gradingScale || updateData.grading_scale,
    score_eligibility_note: updateData.scoreEligibilityNote || updateData.score_eligibility_note,
    passing_year: updateData.passingYear || updateData.passing_year,
    has_experience: updateData.hasExperience || updateData.has_experience,
    experience_years: updateData.experienceYears || updateData.experience_years,
    experience_months: updateData.experienceMonths || updateData.experience_months,
    company_name: updateData.companyName || updateData.company_name,
    job_role: updateData.jobRole || updateData.job_role,
    experience_details: (updateData.hasExperience === 'Yes' || updateData.has_experience === 'Yes')
      ? `${updateData.companyName || updateData.company_name || ''} - ${updateData.jobRole || updateData.job_role || ''} (${updateData.experienceYears || updateData.experience_years || 0} yrs ${updateData.experienceMonths || updateData.experience_months || 0} mos)`
      : 'Fresher',
    statement_text: updateData.statementText || updateData.statement_text,
    statement_word_count: updateData.statementWordCount || updateData.statement_word_count,
    purpose_to_join: updateData.statementText || updateData.statement_text,
    referral_source: updateData.referralSource || updateData.referral_source,
    referral_explanation: updateData.referralExplanation || updateData.referral_explanation,
    entrance_exam_status: updateData.entranceExamStatus || updateData.entrance_exam_status,
    gre_score: updateData.greScore || updateData.gre_score,
    gre_year: updateData.greYear || updateData.gre_year,
    gate_score: updateData.gateScore || updateData.gate_score,
    gate_year: updateData.gateYear || updateData.gate_year,
    cv_url: updateData.cvDocument?.fileUrl || updateData.cv_url,
    cv_filename: updateData.cvDocument?.fileName || updateData.cv_filename,
    documents: formattedDocs.length > 0 ? formattedDocs : (updateData.documents || []),
    status: 'Submitted',
    document_status: 'Pending Review',
    updated_at: now
  };

  let updatedRecord = null;
  if (idx !== -1) {
    const prevStatus = allApps[idx].status;
    allApps[idx] = {
      ...allApps[idx],
      ...mergedUpdates
    };
    updatedRecord = allApps[idx];
    safeJsonSet(LOCAL_STORAGE_APPS_KEY, allApps);

    logApplicationHistory(
      applicationId,
      prevStatus,
      'Submitted',
      authUser?.email || 'Candidate',
      'Candidate updated application details and documents'
    );
  } else {
    // If not in local array, prepend it
    allApps.unshift(mergedUpdates);
    updatedRecord = mergedUpdates;
    safeJsonSet(LOCAL_STORAGE_APPS_KEY, allApps);
  }

  if (typeof window !== 'undefined' && updatedRecord) {
    window.dispatchEvent(new CustomEvent('msit:application-status-updated', { detail: updatedRecord }));
  }

  // Update Supabase if available
  if (isSupabaseConfigured() && supabase) {
    try {
      const { isMock: _mock, draft_data: _draft, ...dbRecord } = mergedUpdates;
      await supabase
        .from('applications')
        .update(dbRecord)
        .eq('application_id', applicationId);

      // Also upsert documents in application_documents table
      if (formattedDocs.length > 0) {
        const docRecords = formattedDocs.map(d => ({
          application_ref: applicationId,
          user_id: authUser?.id || null,
          doc_type: d.doc_type,
          file_name: d.file_name,
          file_size: d.file_size,
          file_url: d.file_url,
          storage_path: d.storage_path,
          status: 'Pending',
          uploaded_at: now
        }));
        await supabase.from('application_documents').upsert(docRecords, { onConflict: 'application_ref,doc_type' }).catch(() => {});
      }
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
