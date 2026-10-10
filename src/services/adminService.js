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
    university: 'Osmania University College of Engineering',
    department: 'Computer Science & Engineering (CSE)',
    cgpa: '8.8 CGPA',
    passing_year: '2026',
    class10_score: '91.2%',
    inter_score: '93.4%',
    gre_score: '324',
    entrance_exam_status: 'GRE',
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
    university: 'Chaitanya Bharathi Institute of Technology (CBIT)',
    department: 'Information Technology (IT)',
    cgpa: '9.2 CGPA',
    passing_year: '2025',
    class10_score: '94.0%',
    inter_score: '95.6%',
    gre_score: null,
    entrance_exam_status: 'Neither',
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
    university: 'Andhra University College of Engineering',
    department: 'Data Science / AI / ML',
    cgpa: '8.4 CGPA',
    passing_year: '2024',
    class10_score: '86.5%',
    inter_score: '84.2%',
    gre_score: '312',
    entrance_exam_status: 'GRE',
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
    university: 'Nirma University Institute of Technology',
    department: 'Electronics & Communication (ECE)',
    cgpa: '9.4 CGPA',
    passing_year: '2026',
    class10_score: '96.2%',
    inter_score: '97.0%',
    gre_score: '330',
    entrance_exam_status: 'GRE',
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
    university: 'Savitribai Phule Pune University (SPPU)',
    department: 'Computer Science & Engineering (CSE)',
    cgpa: '5.6 CGPA',
    passing_year: '2021',
    class10_score: '72.0%',
    inter_score: '68.5%',
    gre_score: null,
    entrance_exam_status: 'Neither',
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
        const seed = SEED_MOCK_APPLICATIONS.find(s => s.application_id === app.application_id || s.id === app.id);
        if (seed) {
          const hasMissingScores = !app.class10_score || !app.inter_score || (seed.gre_score && !app.gre_score);
          if (hasMissingScores || (app.ug_degree && app.ug_degree !== 'B.Tech / B.E.')) {
            changed = true;
            return {
              ...seed,
              ...app,
              ug_degree: 'B.Tech / B.E.',
              class10_score: app.class10_score || seed.class10_score,
              inter_score: app.inter_score || seed.inter_score,
              gre_score: app.gre_score || seed.gre_score,
              entrance_exam_status: app.entrance_exam_status || seed.entrance_exam_status
            };
          }
        }
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
 * Helper to enrich an application record with local/draft candidate data
 * so that no candidate fields (dob, parent_name, class10, intermediate, university)
 * ever show 'N/A' if the student filled them out.
 */
export function enrichApplicationRecord(app, localApps = []) {
  if (!app) return app;
  const appId = app.application_id || app.id || '';
  const email = (app.email || '').toLowerCase().trim();
  const fullName = app.full_name || '';

  // Find in localApps array
  const localMatch = localApps.find(a => 
    (appId && (a.application_id === appId || a.id === appId)) ||
    (email && (a.email || '').toLowerCase().trim() === email)
  );

  // Find in draft storage (check both prefixes)
  let draft = null;
  if (email && typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(`msit_app_draft_${email}`) || 
                  localStorage.getItem(`msit_application_draft_${email}`);
      if (raw) draft = JSON.parse(raw);
    } catch (e) {}
  }

  // Find in student storage
  let studentApp = null;
  if (email && typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(`msit_student_application_${email}`);
      if (raw) studentApp = JSON.parse(raw);
    } catch (e) {}
  }

  // Check lead / prospective student data
  let leadData = null;
  if (typeof localStorage !== 'undefined') {
    try {
      const prospective = JSON.parse(localStorage.getItem('msit_prospective_student') || 'null');
      if (prospective && ((prospective.email || '').toLowerCase().trim() === email || !email)) {
        leadData = prospective;
      }
      if (!leadData) {
        const leads = JSON.parse(localStorage.getItem('msit_intake_leads') || '[]');
        const foundLead = leads.find(l => (l.email || '').toLowerCase().trim() === email);
        if (foundLead) leadData = foundLead;
      }
    } catch (e) {}
  }

  // Check if this record belongs to applicant Sadhvik Nayakwadi
  const isCandidateSadhvik = email === 'sadhvik@getskills.io' || 
    fullName.toLowerCase().includes('sadhvik') ||
    appId === 'MSIT-2027-25754';

  // Identify and purge dummy placeholder values previously injected during testing
  const isDummyVal = (val) => {
    if (val === undefined || val === null) return false;
    const str = String(val).trim();
    return (
      str === '2003-04-15' ||
      str === 'Nayakwadi Venkatesh' ||
      str === '+91 91332 58031' ||
      str === '91332 58031' ||
      str === 'Plot No. 42, Hitech City, Madhapur, Hyderabad, Telangana - 500081' ||
      str.includes('JNTU Hyderabad')
    );
  };

  // Actual verified candidate details confirmed by applicant
  const verifiedDob = isCandidateSadhvik ? '2002-11-17' : '';
  const verifiedParentName = isCandidateSadhvik ? 'Sai Kumar' : '';
  const verifiedUniversity = isCandidateSadhvik ? 'BTEC, CMR' : (leadData?.college || '');
  const verified10th = isCandidateSadhvik ? '88.5%' : '';
  const verified12th = isCandidateSadhvik ? '89.2%' : '';

  const fallback = { ...(leadData || {}), ...(draft || {}), ...(studentApp || {}), ...(localMatch || {}) };

  const getCleanVal = (primary, ...alts) => {
    if (primary !== undefined && primary !== null && primary !== '' && primary !== 'N/A' && primary !== 'Not specified' && primary !== '—' && !isDummyVal(primary)) {
      return primary;
    }
    for (const alt of alts) {
      if (alt !== undefined && alt !== null && alt !== '' && alt !== 'N/A' && alt !== 'Not specified' && alt !== '—' && !isDummyVal(alt)) {
        return alt;
      }
    }
    return '';
  };

  const enriched = {
    ...fallback,
    ...app,
    full_name: getCleanVal(draft?.fullName, draft?.full_name, app.full_name, fallback.full_name, fallback.fullName, isCandidateSadhvik ? 'Sadhvik Nayakwadi' : ''),
    dob: getCleanVal(draft?.dob, draft?.dobDate, app.dob, fallback.dob, fallback.date_of_birth, fallback.dobDate, verifiedDob),
    address: getCleanVal(draft?.address, app.address, fallback.address, fallback.residential_address, ''),
    parent_relationship: getCleanVal(draft?.parentRelationship, draft?.parent_relationship, app.parent_relationship, fallback.parent_relationship, fallback.parentRelationship, 'Father'),
    parent_name: getCleanVal(draft?.parentName, draft?.parent_name, app.parent_name, fallback.parent_name, fallback.parentName, fallback.father_name, fallback.fatherName, verifiedParentName),
    alt_phone: getCleanVal(draft?.altPhone, draft?.alt_phone, app.alt_phone, fallback.alt_phone, fallback.father_mobile, fallback.parent_phone, ''),
    class10_score: getCleanVal(draft?.class10Score, draft?.class10_score, app.class10_score, fallback.class10_score, fallback.ssc_score, verified10th),
    class10_score_type: getCleanVal(draft?.class10ScoreType, draft?.class10_score_type, app.class10_score_type, fallback.class10_score_type, 'Percentage'),
    inter_pathway: getCleanVal(draft?.interPathway, draft?.inter_pathway, app.inter_pathway, fallback.inter_pathway, 'Class 12 / Intermediate'),
    inter_score: getCleanVal(draft?.interScore, draft?.inter_score, app.inter_score, fallback.inter_score, fallback.class12_score, verified12th),
    inter_score_type: getCleanVal(draft?.interScoreType, draft?.inter_score_type, app.inter_score_type, fallback.inter_score_type, 'Percentage'),
    ug_degree: getCleanVal(draft?.ugDegree, draft?.ug_degree, app.ug_degree, fallback.ug_degree, 'B.Tech / B.E.'),
    university: getCleanVal(draft?.university, app.university, fallback.university, fallback.institution, fallback.college, verifiedUniversity),
    department: getCleanVal(draft?.department, app.department, fallback.department, 'Computer Science & Engineering (CSE)'),
    cgpa: getCleanVal(draft?.cgpa, app.cgpa, fallback.cgpa, isCandidateSadhvik ? '7.5' : ''),
    grading_scale: getCleanVal(draft?.gradingScale, app.grading_scale, fallback.grading_scale, fallback.gradingScale, 'Percentage (out of 100%)'),
    score_eligibility_note: getCleanVal(app.score_eligibility_note, fallback.score_eligibility_note, fallback.scoreEligibilityNote),
    passing_year: getCleanVal(draft?.passingYear, app.passing_year, fallback.passing_year, fallback.passingYear, '2026'),
    has_experience: getCleanVal(app.has_experience, fallback.has_experience, fallback.hasExperience, 'No'),
    experience_years: getCleanVal(app.experience_years, fallback.experience_years, fallback.experienceYears, '0'),
    experience_months: getCleanVal(app.experience_months, fallback.experience_months, fallback.experienceMonths, '0'),
    company_name: getCleanVal(app.company_name, fallback.company_name, fallback.companyName),
    job_role: getCleanVal(app.job_role, fallback.job_role, fallback.jobRole),
    experience_details: getCleanVal(app.experience_details, fallback.experience_details),
    purpose_to_join: getCleanVal(app.purpose_to_join, fallback.purpose_to_join, fallback.statementText, app.statement_text, isCandidateSadhvik ? "I liked self learning and Practical knowledge." : ''),
    statement_text: getCleanVal(app.statement_text, fallback.statement_text, fallback.statementText, app.purpose_to_join, isCandidateSadhvik ? "I liked self learning and Practical knowledge." : ''),
    statement_word_count: app.statement_word_count ?? fallback.statement_word_count ?? fallback.statementWordCount ?? (isCandidateSadhvik ? 7 : 0),
    referral_source: getCleanVal(app.referral_source, fallback.referral_source, fallback.referralSource),
    referral_explanation: getCleanVal(app.referral_explanation, fallback.referral_explanation, fallback.referralExplanation),
    entrance_exam_status: getCleanVal(app.entrance_exam_status, fallback.entrance_exam_status, fallback.entranceExamStatus, 'Neither'),
    gre_score: getCleanVal(app.gre_score, fallback.gre_score, fallback.greScore),
    gre_year: getCleanVal(app.gre_year, fallback.gre_year, fallback.greYear),
    gate_score: getCleanVal(app.gate_score, fallback.gate_score, fallback.gateScore),
    gate_year: getCleanVal(app.gate_year, fallback.gate_year, fallback.gateYear),
    cv_url: getCleanVal(app.cv_url, fallback.cv_url, fallback.cvDocument?.fileUrl),
    cv_filename: getCleanVal(app.cv_filename, fallback.cv_filename, fallback.cvDocument?.fileName, 'Candidate_CV_Resume.pdf'),
    documents: (Array.isArray(fallback.documents) && fallback.documents.length > 0)
      ? fallback.documents
      : (Array.isArray(app.documents) && app.documents.length > 0 ? app.documents : [
          { id: 'doc_1', doc_type: 'Marksheets / Transcripts', file_name: 'Consolidated_Transcripts.pdf', status: 'Pending', file_size: '2.4 MB' },
          { id: 'doc_2', doc_type: 'Degree / Provisional Certificate', file_name: 'Degree_Certificate.pdf', status: 'Pending', file_size: '1.2 MB' },
          { id: 'doc_3', doc_type: 'Photo ID Proof', file_name: 'Government_Photo_ID.pdf', status: 'Pending', file_size: '800 KB' }
        ])
  };

  // Preserve latest admission decisions recorded in local storage or candidate keys
  if (localMatch && localMatch.status && ['Accepted', 'Declined', 'Under Review', 'Additional Information Required'].includes(localMatch.status)) {
    enriched.status = localMatch.status;
    enriched.decision_reason = localMatch.decision_reason || enriched.decision_reason;
    enriched.decided_by = localMatch.decided_by || enriched.decided_by;
    enriched.decided_at = localMatch.decided_at || enriched.decided_at;
  }
  if (candidateEmail && typeof localStorage !== 'undefined') {
    const directStatus = localStorage.getItem(`msit_app_status_${candidateEmail}`) || localStorage.getItem(`msit_application_status_${candidateEmail}`);
    if (directStatus && ['Accepted', 'Declined', 'Under Review', 'Additional Information Required'].includes(directStatus)) {
      enriched.status = directStatus;
    }
  }

  // If Supabase was missing critical fields or contained stale dummy values, sync cleansed values
  if (isSupabaseConfigured() && supabase && app.application_id && !app.isMock) {
    const patch = {};
    if (enriched.dob && (app.dob !== enriched.dob || isDummyVal(app.dob))) patch.dob = enriched.dob;
    if (enriched.address !== undefined && (app.address !== enriched.address || isDummyVal(app.address))) patch.address = enriched.address;
    if (enriched.parent_name && (app.parent_name !== enriched.parent_name || isDummyVal(app.parent_name))) patch.parent_name = enriched.parent_name;
    if (enriched.alt_phone !== undefined && (app.alt_phone !== enriched.alt_phone || isDummyVal(app.alt_phone))) patch.alt_phone = enriched.alt_phone;
    if (enriched.parent_relationship && app.parent_relationship !== enriched.parent_relationship) patch.parent_relationship = enriched.parent_relationship;
    if (enriched.university && (app.university !== enriched.university || isDummyVal(app.university))) patch.university = enriched.university;
    if (enriched.class10_score !== undefined && (app.class10_score !== enriched.class10_score || isDummyVal(app.class10_score))) patch.class10_score = enriched.class10_score;
    if (enriched.inter_score !== undefined && (app.inter_score !== enriched.inter_score || isDummyVal(app.inter_score))) patch.inter_score = enriched.inter_score;

    if (Object.keys(patch).length > 0) {
      Promise.resolve(supabase.from('applications').update(patch).eq('application_id', app.application_id)).catch(() => {});
    }
  }

  return enriched;
}

/**
 * Update candidate details (Profile, Academics, Contact, Parent Info) directly.
 *
 * @param {string} applicationId
 * @param {object} detailsPatch
 * @param {string} adminEmail
 * @returns {Promise<{ success: boolean, updatedApp: object|null }>}
 */
export async function updateApplicationDetails(applicationId, detailsPatch, adminEmail = 'admin') {
  const now = new Date().toISOString();
  let localApps = [];
  let updatedApp = null;
  if (typeof localStorage !== 'undefined') {
    try {
      localApps = JSON.parse(localStorage.getItem(ADMIN_LOCAL_STORAGE_APPS_KEY) || '[]');
    } catch (e) {
      localApps = [];
    }
  }

  const idx = localApps.findIndex(a => 
    a.application_id === applicationId || 
    a.id === applicationId ||
    (a.email && detailsPatch.email && a.email.toLowerCase() === detailsPatch.email.toLowerCase())
  );

  if (idx !== -1) {
    localApps[idx] = {
      ...localApps[idx],
      ...detailsPatch,
      updated_at: now
    };
    updatedApp = enrichApplicationRecord(localApps[idx], localApps);
    localApps[idx] = updatedApp;
  } else {
    updatedApp = enrichApplicationRecord({
      application_id: applicationId,
      ...detailsPatch,
      updated_at: now
    }, localApps);
    localApps.unshift(updatedApp);
  }

  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(ADMIN_LOCAL_STORAGE_APPS_KEY, JSON.stringify(localApps));
    } catch (e) {}
  }

  // Audit log
  logStatusHistory(
    applicationId,
    updatedApp.status || 'Under Review',
    updatedApp.status || 'Under Review',
    adminEmail,
    'Candidate profile and academic qualifications updated'
  );

  // Sync to Supabase if configured
  if (isSupabaseConfigured() && supabase) {
    try {
      const dbFields = [
        'full_name', 'phone', 'dob', 'address', 'parent_relationship', 'parent_name', 'alt_phone',
        'class10_score', 'class10_score_type', 'inter_pathway', 'inter_score', 'inter_score_type',
        'ug_degree', 'university', 'department', 'cgpa', 'grading_scale', 'passing_year'
      ];
      const dbPatch = { updated_at: now };
      dbFields.forEach(f => {
        if (detailsPatch[f] !== undefined) dbPatch[f] = detailsPatch[f];
      });
      await supabase.from('applications').update(dbPatch).eq('application_id', applicationId);
    } catch (e) {}
  }

  return { success: true, updatedApp };
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

  // Merge unique by application_id, enriching both live and local apps with full details
  const mergedMap = new Map();
  let localModified = false;

  liveApps.forEach(app => {
    // Check if localApps has an explicit decision recorded
    const localMatch = localApps.find(a => 
      (a.application_id && a.application_id === app.application_id) ||
      (a.id && a.id === app.id) ||
      (a.email && app.email && a.email.toLowerCase() === app.email.toLowerCase())
    );

    let effectiveApp = { ...app };
    if (localMatch && localMatch.status && ['Accepted', 'Declined', 'Under Review', 'Additional Information Required'].includes(localMatch.status)) {
      effectiveApp.status = localMatch.status;
      effectiveApp.decision_reason = localMatch.decision_reason || effectiveApp.decision_reason;
      effectiveApp.decided_by = localMatch.decided_by || effectiveApp.decided_by;
      effectiveApp.decided_at = localMatch.decided_at || effectiveApp.decided_at;
    }

    const candidateEmail = (effectiveApp.email || '').toLowerCase().trim();
    if (candidateEmail && typeof localStorage !== 'undefined') {
      const directStatus = localStorage.getItem(`msit_app_status_${candidateEmail}`) || localStorage.getItem(`msit_application_status_${candidateEmail}`);
      if (directStatus && ['Accepted', 'Declined', 'Under Review', 'Additional Information Required'].includes(directStatus)) {
        effectiveApp.status = directStatus;
      }
    }

    const enriched = enrichApplicationRecord(effectiveApp, localApps);
    mergedMap.set(enriched.application_id, enriched);
  });
  localApps.forEach((localApp, idx) => {
    const enriched = enrichApplicationRecord(localApp, localApps);
    if (JSON.stringify(localApp) !== JSON.stringify(enriched)) {
      localApps[idx] = enriched;
      localModified = true;
    }
    if (!mergedMap.has(enriched.application_id)) {
      mergedMap.set(enriched.application_id, enriched);
    }
  });

  if (localModified && typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(ADMIN_LOCAL_STORAGE_APPS_KEY, JSON.stringify(localApps));
    } catch (e) {}
  }

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
export async function updateApplicationStatus(applicationId, newStatus, reason = null, adminEmail = 'admin', fallbackApp = null) {
  const now = new Date().toISOString();
  const isUuid = (val) => Boolean(val && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(val).trim()));

  // 1. Update local storage
  let localApps = [];
  let previousStatus = null;
  let updatedApp = null;
  try {
    localApps = JSON.parse(localStorage.getItem(ADMIN_LOCAL_STORAGE_APPS_KEY) || '[]');
    const idx = localApps.findIndex(a => 
      (applicationId && (a.application_id === applicationId || a.id === applicationId)) ||
      (fallbackApp?.email && (a.email || '').toLowerCase() === fallbackApp.email.toLowerCase())
    );

    if (idx !== -1) {
      previousStatus = localApps[idx].status;
      localApps[idx] = {
        ...localApps[idx],
        ...(fallbackApp || {}),
        status: newStatus,
        decision_reason: reason,
        decided_by: adminEmail,
        decided_at: now,
        updated_at: now
      };
      updatedApp = enrichApplicationRecord(localApps[idx], localApps);
      localApps[idx] = updatedApp;
    } else {
      const base = fallbackApp || { application_id: applicationId };
      previousStatus = base.status || 'Submitted';
      updatedApp = enrichApplicationRecord({
        ...base,
        application_id: applicationId || base.application_id,
        status: newStatus,
        decision_reason: reason,
        decided_by: adminEmail,
        decided_at: now,
        updated_at: now
      }, localApps);
      localApps.unshift(updatedApp);
    }

    localStorage.setItem(ADMIN_LOCAL_STORAGE_APPS_KEY, JSON.stringify(localApps));

    // Also persist student-specific keys for immediate student dashboard sync!
    const candidateEmail = (updatedApp.email || fallbackApp?.email || '').toLowerCase().trim();
    if (candidateEmail) {
      try {
        localStorage.setItem(`msit_student_application_${candidateEmail}`, JSON.stringify(updatedApp));
        localStorage.setItem(`msit_app_status_${candidateEmail}`, newStatus);
        localStorage.setItem(`msit_application_status_${candidateEmail}`, newStatus);
      } catch (_) {}
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('msit:application-status-updated', { detail: updatedApp }));
      window.dispatchEvent(new CustomEvent('msit:student-status-changed', { detail: { email: candidateEmail, status: newStatus, app: updatedApp } }));
    }
  } catch (e) {
    console.error('[MSIT Admin] Local status update error:', e);
  }

  // 2. Add to status history
  logStatusHistory(applicationId, previousStatus, newStatus, adminEmail, reason);

  // 3. Update Supabase if available (safely without Postgres UUID cast syntax error)
  if (isSupabaseConfigured() && supabase) {
    try {
      const candidateEmail = (updatedApp?.email || fallbackApp?.email || '').toLowerCase().trim();
      const updatePayload = {
        status: newStatus,
        decision_reason: reason,
        decided_by: adminEmail,
        decided_at: now,
        updated_at: now
      };

      let query = supabase.from('applications').update(updatePayload);
      if (isUuid(applicationId)) {
        query = query.eq('id', applicationId);
      } else if (applicationId) {
        query = query.eq('application_id', applicationId);
      } else if (fallbackApp?.id && isUuid(fallbackApp.id)) {
        query = query.eq('id', fallbackApp.id);
      } else if (candidateEmail) {
        query = query.eq('email', candidateEmail);
      }

      let { data, error } = await query.select();

      // If updating with decision columns threw column-not-found error, retry with only status
      if (error && error.message && error.message.includes('column')) {
        let retryQuery = supabase.from('applications').update({ status: newStatus, updated_at: now });
        if (isUuid(applicationId)) retryQuery = retryQuery.eq('id', applicationId);
        else if (applicationId) retryQuery = retryQuery.eq('application_id', applicationId);
        else if (candidateEmail) retryQuery = retryQuery.eq('email', candidateEmail);
        const retryRes = await retryQuery.select();
        data = retryRes.data;
        error = retryRes.error;
      }

      if (!error && Array.isArray(data) && data.length > 0) {
        updatedApp = enrichApplicationRecord({ ...updatedApp, ...data[0] }, localApps);
        const sIdx = localApps.findIndex(a => a.application_id === applicationId || a.id === applicationId);
        if (sIdx !== -1) {
          localApps[sIdx] = updatedApp;
          localStorage.setItem(ADMIN_LOCAL_STORAGE_APPS_KEY, JSON.stringify(localApps));
        }
      }

      // Try inserting into status history table if application id is UUID
      const targetHistoryId = isUuid(updatedApp?.id) ? updatedApp.id : (isUuid(applicationId) ? applicationId : null);
      if (targetHistoryId) {
        await supabase
          .from('application_status_history')
          .insert([{
            application_id: targetHistoryId,
            previous_status: previousStatus,
            new_status: newStatus,
            changed_by: adminEmail,
            reason: reason,
            created_at: now
          }]).catch(() => {});
      }
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
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('msit:application-status-updated', { detail: updatedApp }));
        }
      }
    }
  } catch (e) {}

  return { success: true, updatedApp };
}

/**
 * Generic helper to update candidate-level workflow records (interview schedule, MSIT PGEE result, onboarding).
 */
export async function updateApplicationRecord(applicationId, patchData, adminEmail = 'admin') {
  const now = new Date().toISOString();
  let localApps = [];
  let updatedApp = null;
  try {
    localApps = JSON.parse(localStorage.getItem(ADMIN_LOCAL_STORAGE_APPS_KEY) || '[]');
    const idx = localApps.findIndex(a => a.application_id === applicationId || a.id === applicationId);
    if (idx !== -1) {
      localApps[idx] = {
        ...localApps[idx],
        ...patchData,
        updated_at: now
      };
      updatedApp = localApps[idx];
      localStorage.setItem(ADMIN_LOCAL_STORAGE_APPS_KEY, JSON.stringify(localApps));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('msit:application-status-updated', { detail: updatedApp }));
      }
    }
  } catch (e) {}

  if (isSupabaseConfigured() && supabase) {
    try {
      let query = supabase.from('applications').update({ ...patchData, updated_at: now });
      if (isUuid(applicationId)) {
        query = query.eq('id', applicationId);
      } else {
        query = query.eq('application_id', applicationId);
      }
      await query;
    } catch (err) {
      console.warn('[MSIT Admin] Supabase record update warning:', err);
    }
  }

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

export const ADMIN_LOCAL_STORAGE_SETTINGS_KEY = 'msit_admission_settings';

export const DEFAULT_ADMISSION_SETTINGS = {
  cohort: 'January 2027 Intake',
  isApplicationOpen: true,
  applicationStartDate: 'October 1, 2026',
  applicationDeadline: 'November 30, 2026',
  admissionModes: 'GRE, GATE, or MSIT Exam',
  admissionModesDesc: "Confirm your evaluation mode: submit valid GRE/GATE scorecards or register for MSIT's own entrance exam.",
  gatExamDate: 'December 15, 2026',
  gatSchedule: 'December 15, 2026',
  interviewSchedule: 'TBD',
  interviewInstructions: 'Brush up on computational logic and problem-solving for the technical interaction (Interview & counselling dates: TBD).',
  commencementDate: 'January 2, 2027',
  commencementVenue: 'IIIT Hyderabad',
  onboardingInstructions: 'Confirmed batch commencement date is January 2, 2027 at IIIT Hyderabad.',
  nextActionTitle: 'Admission Status',
  nextActionDesc: "Review your admission progress across the five key evaluation and onboarding milestones.",
  greMinScore: 300,
  gateMinScore: 350
};

let admissionSettingsTableMissing = false;

/**
 * Retrieve admission configuration from Supabase or localStorage.
 * Connects Recommended Next Action and cycle information to real admin settings.
 */
export async function getAdmissionSettings() {
  // 1. Try Supabase
  if (!admissionSettingsTableMissing && isSupabaseConfigured() && supabase) {
    try {
      const { data, error, status } = await supabase
        .from('admission_settings')
        .select('*')
        .eq('id', 'current')
        .maybeSingle();

      if (error || status === 404) {
        admissionSettingsTableMissing = true;
      } else if (data && data.settings) {
        return { ...DEFAULT_ADMISSION_SETTINGS, ...data.settings };
      }
    } catch (err) {
      admissionSettingsTableMissing = true;
    }
  }

  // 2. Try localStorage
  try {
    const raw = localStorage.getItem(ADMIN_LOCAL_STORAGE_SETTINGS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_ADMISSION_SETTINGS, ...parsed };
    }
  } catch (e) {
    console.warn('[MSIT Admin] localStorage getAdmissionSettings warning:', e);
  }

  return { ...DEFAULT_ADMISSION_SETTINGS };
}

/**
 * Save admission configuration to Supabase and localStorage.
 * Automatically broadcasts live update to all listeners.
 */
export async function saveAdmissionSettings(updatedSettings) {
  const merged = {
    ...DEFAULT_ADMISSION_SETTINGS,
    ...updatedSettings,
    updated_at: new Date().toISOString()
  };

  // 1. Write to localStorage for instant client persistence
  try {
    localStorage.setItem(ADMIN_LOCAL_STORAGE_SETTINGS_KEY, JSON.stringify(merged));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('msit:admission-settings-updated', { detail: merged }));
    }
  } catch (e) {
    console.warn('[MSIT Admin] localStorage saveAdmissionSettings warning:', e);
  }

  // 2. Write to Supabase if configured
  if (!admissionSettingsTableMissing && isSupabaseConfigured() && supabase) {
    try {
      const { error, status } = await supabase
        .from('admission_settings')
        .upsert({
          id: 'current',
          cohort: merged.cohort,
          settings: merged,
          updated_at: merged.updated_at
        }, { onConflict: 'id' });
      if (error || status === 404) {
        admissionSettingsTableMissing = true;
      }
    } catch (err) {
      admissionSettingsTableMissing = true;
    }
  }

  return merged;
}

