import { supabase, isSupabaseConfigured } from '../lib/supabase.js';

const ADMIN_LOCAL_STORAGE_APPS_KEY = 'msit_all_submitted_applications';
const ADMIN_LOCAL_STORAGE_NOTES_KEY = 'msit_admin_application_notes';
const ADMIN_LOCAL_STORAGE_LOGS_KEY = 'msit_admin_status_history';

/**
 * Realistic Mock Applications for UI/Demo evaluation.
 * Explicitly tagged with `isMock: true` and `[Test Data]` label.
 */
const SEED_MOCK_APPLICATIONS = [
  {
    id: 'mock_app_001',
    application_id: 'MSIT-2027-10492',
    full_name: 'Aditya Sharma',
    email: 'aditya.sharma@example.com',
    phone: '+91 98450 12345',
    dob: '2003-05-14',
    address: 'Flat 402, Green Meadows, Madhapur, Hyderabad, Telangana - 500081',
    parent_relationship: 'Father',
    parent_name: 'Rajesh Sharma',
    alt_phone: '+91 98450 12340',
    ug_degree: 'B.Tech / B.E.',
    department: 'Computer Science & Engineering (CSE)',
    cgpa: '8.8 CGPA',
    passing_year: '2026',
    has_experience: 'No',
    experience_details: '',
    purpose_to_join: 'I want to master AI systems and full-stack development through MSIT hands-on studio learning approach instead of traditional classroom rote learning.',
    status: 'New',
    document_status: 'Pending Review',
    cohort: 'January 2027 Intake',
    decision_reason: null,
    decided_by: null,
    decided_at: null,
    submitted_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    isMock: true,
    documents: [
      { id: 'doc_001_1', doc_type: 'Marksheets / Transcripts', file_name: 'Aditya_BTech_Transcripts_Sem1-6.pdf', file_size: '2.4 MB', status: 'Pending', rejection_reason: null },
      { id: 'doc_001_2', doc_type: 'Degree / Provisional Certificate', file_name: 'Bonafide_FinalYear_Letter.pdf', file_size: '1.1 MB', status: 'Pending', rejection_reason: null },
      { id: 'doc_001_3', doc_type: 'Photo ID Proof', file_name: 'Aadhaar_Aditya_Sharma.pdf', file_size: '850 KB', status: 'Pending', rejection_reason: null }
    ]
  },
  {
    id: 'mock_app_002',
    application_id: 'MSIT-2027-21045',
    full_name: 'Pooja Reddy',
    email: 'pooja.reddy@example.com',
    phone: '+91 91234 56789',
    dob: '2002-11-20',
    address: 'Plot 18, Road No. 12, Banjara Hills, Hyderabad, Telangana - 500034',
    parent_relationship: 'Mother',
    parent_name: 'Sunitha Reddy',
    alt_phone: '+91 91234 56780',
    ug_degree: 'B.Tech / B.E.',
    department: 'Information Technology (IT)',
    cgpa: '9.2 CGPA',
    passing_year: '2025',
    has_experience: 'Yes',
    experience_details: '1 year as Associate QA Engineer at Cognizant',
    purpose_to_join: 'Transition into Machine Learning and Cloud Architecture through intensive mentorship and collaborative problem solving at MSIT.',
    status: 'Under Review',
    document_status: 'Partially Verified',
    cohort: 'January 2027 Intake',
    decision_reason: null,
    decided_by: null,
    decided_at: null,
    submitted_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    isMock: true,
    documents: [
      { id: 'doc_002_1', doc_type: 'Marksheets / Transcripts', file_name: 'Pooja_Consolidated_Marksheet.pdf', file_size: '3.1 MB', status: 'Verified', rejection_reason: null },
      { id: 'doc_002_2', doc_type: 'Degree / Provisional Certificate', file_name: 'Pooja_Provisional_Degree.pdf', file_size: '1.8 MB', status: 'Pending', rejection_reason: null },
      { id: 'doc_002_3', doc_type: 'Photo ID Proof', file_name: 'Passport_Scan_Pooja.pdf', file_size: '1.2 MB', status: 'Verified', rejection_reason: null }
    ]
  },
  {
    id: 'mock_app_003',
    application_id: 'MSIT-2027-33981',
    full_name: 'Karthik Varma',
    email: 'karthik.varma@example.com',
    phone: '+91 97000 44211',
    dob: '2001-08-09',
    address: 'Door 5-2-19, MVP Colony, Visakhapatnam, Andhra Pradesh - 530017',
    parent_relationship: 'Father',
    parent_name: 'Venkata Varma',
    alt_phone: '+91 97000 44210',
    ug_degree: 'B.Tech / B.E.',
    department: 'Data Science / AI / ML',
    cgpa: '8.4 CGPA',
    passing_year: '2024',
    has_experience: 'Yes',
    experience_details: '1.5 years as Junior Backend Developer at a Fintech startup',
    purpose_to_join: 'To build production-grade agentic AI systems and expand core algorithmic skills at MSIT IIIT Hyderabad campus.',
    status: 'Documents Pending',
    document_status: 'Rejected',
    cohort: 'January 2027 Intake',
    decision_reason: null,
    decided_by: null,
    decided_at: null,
    submitted_at: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
    isMock: true,
    documents: [
      { id: 'doc_003_1', doc_type: 'Marksheets / Transcripts', file_name: 'Karthik_BTech_Marksheets.pdf', file_size: '4.2 MB', status: 'Verified', rejection_reason: null },
      { id: 'doc_003_2', doc_type: 'Degree / Provisional Certificate', file_name: 'Degree_Certificate_Blurred.jpg', file_size: '450 KB', status: 'Rejected', rejection_reason: 'Document scan is blurry and university stamp is unreadable. Please upload a clear high-resolution color PDF.' },
      { id: 'doc_003_3', doc_type: 'Photo ID Proof', file_name: 'Aadhaar_Karthik.pdf', file_size: '720 KB', status: 'Verified', rejection_reason: null }
    ]
  },
  {
    id: 'mock_app_004',
    application_id: 'MSIT-2027-48209',
    full_name: 'Sneha Patel',
    email: 'sneha.patel@example.com',
    phone: '+91 99887 66554',
    dob: '2003-02-28',
    address: '14/B, Navrangpura, Ahmedabad, Gujarat - 380009',
    parent_relationship: 'Father',
    parent_name: 'Dinesh Patel',
    alt_phone: '+91 99887 66550',
    ug_degree: 'B.Tech / B.E.',
    department: 'Electronics & Communication (ECE)',
    cgpa: '9.4 CGPA',
    passing_year: '2026',
    has_experience: 'No',
    experience_details: '',
    purpose_to_join: 'Transitioning from hardware/embedded basics into cutting-edge machine learning and distributed computing.',
    status: 'Accepted',
    document_status: 'Verified',
    cohort: 'January 2027 Intake',
    decision_reason: 'Exceptional academic record, outstanding SOP, and 100% verified undergraduate credentials.',
    decided_by: 'sadhvik@getskills.io',
    decided_at: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    submitted_at: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    isMock: true,
    documents: [
      { id: 'doc_004_1', doc_type: 'Marksheets / Transcripts', file_name: 'Patel_Transcript_Official.pdf', file_size: '2.8 MB', status: 'Verified', rejection_reason: null },
      { id: 'doc_004_2', doc_type: 'Degree / Provisional Certificate', file_name: 'Provisional_Cert_Sneha.pdf', file_size: '1.5 MB', status: 'Verified', rejection_reason: null },
      { id: 'doc_004_3', doc_type: 'Photo ID Proof', file_name: 'Passport_Sneha.pdf', file_size: '980 KB', status: 'Verified', rejection_reason: null }
    ]
  },
  {
    id: 'mock_app_005',
    application_id: 'MSIT-2027-59124',
    full_name: 'Vikram Joshi',
    email: 'vikram.joshi@example.com',
    phone: '+91 98220 33112',
    dob: '2000-09-17',
    address: 'Flat 101, Shivam Heights, Kothrud, Pune, Maharashtra - 411038',
    parent_relationship: 'Father',
    parent_name: 'Anand Joshi',
    alt_phone: '+91 98220 33110',
    ug_degree: 'B.Tech / B.E.',
    department: 'Computer Science & Engineering (CSE)',
    cgpa: '5.6 CGPA',
    passing_year: '2021',
    has_experience: 'No',
    experience_details: '',
    purpose_to_join: 'Looking to switch into software careers.',
    status: 'Declined',
    document_status: 'Rejected',
    cohort: 'January 2027 Intake',
    decision_reason: 'Undergraduate CGPA is below the minimum eligibility cutoff, and graduation year exceeds 3 years without relevant technical work experience.',
    decided_by: 'sadhvik@getskills.io',
    decided_at: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    submitted_at: new Date(Date.now() - 96 * 3600 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    isMock: true,
    documents: [
      { id: 'doc_005_1', doc_type: 'Marksheets / Transcripts', file_name: 'Vikram_BTech_Marksheets.pdf', file_size: '1.9 MB', status: 'Rejected', rejection_reason: 'Backlog sheets incomplete.' }
    ]
  }
];

/**
 * Initialize local storage with mock seed data if empty.
 */
function ensureInitializedLocalStore() {
  try {
    const existing = localStorage.getItem(ADMIN_LOCAL_STORAGE_APPS_KEY);
    if (!existing) {
      localStorage.setItem(ADMIN_LOCAL_STORAGE_APPS_KEY, JSON.stringify(SEED_MOCK_APPLICATIONS));
    } else {
      const parsed = JSON.parse(existing);
      let changed = false;
      const updated = parsed.map(app => {
        if (app.ug_degree && app.ug_degree !== 'B.Tech / B.E.') {
          changed = true;
          return { ...app, ug_degree: 'B.Tech / B.E.' };
        }
        return app;
      });
      if (changed) {
        localStorage.setItem(ADMIN_LOCAL_STORAGE_APPS_KEY, JSON.stringify(updated));
      }
    }
  } catch (e) {}
}

/**
 * Fetch all applications (merging Supabase live data with local/mock data).
 *
 * @returns {Promise<{ applications: Array, isSupabaseLive: boolean }>}
 */
export async function fetchAllApplications() {
  ensureInitializedLocalStore();
  let liveApps = [];
  let isSupabaseLive = false;

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (!error && Array.isArray(data)) {
        liveApps = data.map(app => ({
          ...app,
          isMock: false,
          documents: app.documents || [
            { id: `doc_${app.id}_1`, doc_type: 'Marksheets / Transcripts', file_name: 'Undergraduate_Transcripts.pdf', file_size: '2.1 MB', status: 'Pending', rejection_reason: null },
            { id: `doc_${app.id}_2`, doc_type: 'Degree / Provisional Certificate', file_name: 'Degree_Certificate.pdf', file_size: '1.4 MB', status: 'Pending', rejection_reason: null },
            { id: `doc_${app.id}_3`, doc_type: 'Photo ID Proof', file_name: 'Government_Photo_ID.pdf', file_size: '780 KB', status: 'Pending', rejection_reason: null }
          ]
        }));
        isSupabaseLive = true;
      }
    } catch (err) {
      console.warn('[MSIT Admin] Supabase query failed:', err);
    }
  }

  // Retrieve locally stored records
  let localApps = [];
  try {
    localApps = JSON.parse(localStorage.getItem(ADMIN_LOCAL_STORAGE_APPS_KEY) || '[]');
  } catch (e) {
    localApps = SEED_MOCK_APPLICATIONS;
  }

  // Merge unique by application_id (Supabase takes precedence)
  const mergedMap = new Map();
  liveApps.forEach(app => mergedMap.set(app.application_id, app));
  localApps.forEach(app => {
    if (!mergedMap.has(app.application_id)) {
      mergedMap.set(app.application_id, app);
    }
  });

  return {
    applications: Array.from(mergedMap.values()),
    isSupabaseLive
  };
}

/**
 * Calculate dynamic statistics from application list.
 *
 * @param {Array} applications
 * @returns {object}
 */
export function calculateDashboardMetrics(applications = []) {
  const total = applications.length;
  const newCount = applications.filter(a => a.status === 'New').length;
  const underReview = applications.filter(a => a.status === 'Under Review').length;
  const documentsPending = applications.filter(a => 
    a.status === 'Documents Pending' || 
    a.document_status === 'Pending Review' || 
    a.document_status === 'Rejected'
  ).length;
  const accepted = applications.filter(a => a.status === 'Accepted').length;
  const declined = applications.filter(a => a.status === 'Declined').length;

  return {
    total,
    newCount,
    underReview,
    documentsPending,
    accepted,
    declined
  };
}

/**
 * Update an application status (Accept, Decline, Move to Review).
 *
 * @param {string} applicationId - Application ID or UUID
 * @param {string} newStatus - 'New' | 'Under Review' | 'Documents Pending' | 'Documents Verified' | 'Accepted' | 'Declined'
 * @param {string|null} reason - Required for Decline, optional for others
 * @param {string} adminEmail
 * @returns {Promise<{ success: boolean, updatedApp: object|null }>}
 */
export async function updateApplicationStatus(applicationId, newStatus, reason = null, adminEmail = 'admin') {
  const now = new Date().toISOString();

  // 1. Update local storage
  let localApps = [];
  let previousStatus = null;
  let updatedApp = null;
  try {
    localApps = JSON.parse(localStorage.getItem(ADMIN_LOCAL_STORAGE_APPS_KEY) || '[]');
    const idx = localApps.findIndex(a => a.application_id === applicationId || a.id === applicationId);
    if (idx !== -1) {
      previousStatus = localApps[idx].status;
      localApps[idx] = {
        ...localApps[idx],
        status: newStatus,
        decision_reason: reason,
        decided_by: adminEmail,
        decided_at: now,
        updated_at: now
      };
      updatedApp = localApps[idx];
      localStorage.setItem(ADMIN_LOCAL_STORAGE_APPS_KEY, JSON.stringify(localApps));
    }
  } catch (e) {}

  // 2. Add to status history
  logStatusHistory(applicationId, previousStatus, newStatus, adminEmail, reason);

  // 3. Update Supabase if available
  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase
        .from('applications')
        .update({
          status: newStatus,
          decision_reason: reason,
          decided_by: adminEmail,
          decided_at: now,
          updated_at: now
        })
        .or(`application_id.eq.${applicationId},id.eq.${applicationId}`);

      // Try inserting into status history table
      await supabase
        .from('application_status_history')
        .insert([{
          application_id: updatedApp?.id || applicationId,
          previous_status: previousStatus,
          new_status: newStatus,
          changed_by: adminEmail,
          reason: reason,
          created_at: now
        }]);
    } catch (err) {
      console.warn('[MSIT Admin] Supabase status update warning:', err);
    }
  }

  return { success: true, updatedApp };
}

/**
 * Update document verification status (Accept/Verify or Reject with reason).
 *
 * @param {string} applicationId
 * @param {string} docId
 * @param {'Verified'|'Rejected'} newDocStatus
 * @param {string|null} rejectionReason - Required if rejected
 * @param {string} adminEmail
 */
export async function updateDocumentStatus(applicationId, docId, newDocStatus, rejectionReason = null, adminEmail = 'admin') {
  const now = new Date().toISOString();
  let updatedApp = null;

  try {
    const localApps = JSON.parse(localStorage.getItem(ADMIN_LOCAL_STORAGE_APPS_KEY) || '[]');
    const appIdx = localApps.findIndex(a => a.application_id === applicationId || a.id === applicationId);
    if (appIdx !== -1) {
      const app = localApps[appIdx];
      const docs = app.documents || [];
      const docIdx = docs.findIndex(d => d.id === docId);
      if (docIdx !== -1) {
        docs[docIdx] = {
          ...docs[docIdx],
          status: newDocStatus,
          rejection_reason: newDocStatus === 'Rejected' ? rejectionReason : null,
          reviewed_by: adminEmail,
          reviewed_at: now
        };

        // Recalculate overall document_status
        const hasRejected = docs.some(d => d.status === 'Rejected');
        const allVerified = docs.length > 0 && docs.every(d => d.status === 'Verified');
        const hasVerified = docs.some(d => d.status === 'Verified');

        let overallDocStatus = 'Pending Review';
        if (hasRejected) overallDocStatus = 'Rejected';
        else if (allVerified) overallDocStatus = 'Verified';
        else if (hasVerified) overallDocStatus = 'Partially Verified';

        app.documents = docs;
        app.document_status = overallDocStatus;
        app.updated_at = now;
        localApps[appIdx] = app;
        updatedApp = app;
        localStorage.setItem(ADMIN_LOCAL_STORAGE_APPS_KEY, JSON.stringify(localApps));
      }
    }
  } catch (e) {}

  return { success: true, updatedApp };
}

/**
 * Log a status change to audit trail.
 */
function logStatusHistory(applicationId, previousStatus, newStatus, adminEmail, reason) {
  try {
    const logs = JSON.parse(localStorage.getItem(ADMIN_LOCAL_STORAGE_LOGS_KEY) || '[]');
    logs.unshift({
      id: 'log_' + Date.now(),
      application_id: applicationId,
      previous_status: previousStatus,
      new_status: newStatus,
      changed_by: adminEmail,
      reason: reason || (newStatus === 'Accepted' ? 'Application accepted by admissions committee' : 'Status updated'),
      created_at: new Date().toISOString()
    });
    localStorage.setItem(ADMIN_LOCAL_STORAGE_LOGS_KEY, JSON.stringify(logs.slice(0, 100)));
  } catch (e) {}
}

/**
 * Get status history for an application.
 */
export function getStatusHistory(applicationId) {
  try {
    const logs = JSON.parse(localStorage.getItem(ADMIN_LOCAL_STORAGE_LOGS_KEY) || '[]');
    return logs.filter(l => l.application_id === applicationId);
  } catch (e) {
    return [];
  }
}

/**
 * Add an internal note to an application.
 */
export async function addApplicationNote(applicationId, noteText, adminEmail = 'admin') {
  const newNote = {
    id: 'note_' + Date.now(),
    application_id: applicationId,
    note: noteText.trim(),
    admin_email: adminEmail,
    created_at: new Date().toISOString()
  };

  try {
    const notes = JSON.parse(localStorage.getItem(ADMIN_LOCAL_STORAGE_NOTES_KEY) || '[]');
    notes.unshift(newNote);
    localStorage.setItem(ADMIN_LOCAL_STORAGE_NOTES_KEY, JSON.stringify(notes));
  } catch (e) {}

  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase
        .from('application_notes')
        .insert([{
          application_id: applicationId,
          note: noteText.trim(),
          admin_email: adminEmail,
          created_at: newNote.created_at
        }]);
    } catch (err) {
      console.warn('[MSIT Admin] Supabase note insert error:', err);
    }
  }

  return newNote;
}

/**
 * Get internal notes for an application.
 */
export function getApplicationNotes(applicationId) {
  try {
    const notes = JSON.parse(localStorage.getItem(ADMIN_LOCAL_STORAGE_NOTES_KEY) || '[]');
    return notes.filter(n => n.application_id === applicationId);
  } catch (e) {
    return [];
  }
}

/**
 * Reset test/mock data to initial seed.
 */
export function resetMockData() {
  try {
    localStorage.setItem(ADMIN_LOCAL_STORAGE_APPS_KEY, JSON.stringify(SEED_MOCK_APPLICATIONS));
    localStorage.removeItem(ADMIN_LOCAL_STORAGE_NOTES_KEY);
    localStorage.removeItem(ADMIN_LOCAL_STORAGE_LOGS_KEY);
  } catch (e) {}
}
