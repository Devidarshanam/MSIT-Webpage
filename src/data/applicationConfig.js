/**
 * MSIT Prospective Student Application Form Configuration
 * Definitive field definitions, validation parameters, and options.
 */

export const APPLICATION_CONFIG = {
  isApplicationOpen: true,
  cohort: 'January 2027 Intake',
  standbyRoute: '/apply',
  portalTitle: 'MSIT Application Portal',
  supportEmail: 'admissions@msit.ac.in',
  supportPhone: '+91 40 6653 1000',
  statementMaxWords: 200,
  recommendedEligibilityThresholdPercentage: 68,
  recommendedEligibilityThresholdCgpa: 6.8
};

export const INITIAL_APPLICATION_STATE = {
  // Section A: Candidate details
  fullName: '',
  email: '',
  phone: '',

  // Section B: Academic details
  ugDegree: 'B.Tech / B.E.',
  university: '',
  department: 'Computer Science & Engineering (CSE)',
  passingYear: '2026',
  gradingScale: 'Percentage (out of 100%)',
  cgpa: '', // score value
  scoreEligibilityNote: '',

  // Section C: Academic documents (metadata for uploaded files)
  documents: {
    ugDegreeDoc: null,
    class10Doc: null,
    sscMemoDoc: null,
    class12Doc: null
  },

  // Section D: Entrance exam scores (optional)
  hasEntranceExam: 'No',
  greScore: '',
  gateScore: '',
  examName: '',
  examYear: '',
  entranceScorecardDoc: null,

  // Section E: CV / Resume (mandatory)
  cvDocument: null,

  // Section F: Statement about MSIT (mandatory, <= 200 words)
  statementText: '',
  statementWordCount: 0,

  // Section G: How did you hear about MSIT?
  referralSource: '',
  referralExplanation: '',

  // Workflow meta
  isSubmitted: false,
  applicationId: null,
  submittedAt: null,
  status: 'Not Started'
};

export const UG_DEGREE_OPTIONS = [
  'B.Tech / B.E.',
  'B.Sc (Computer Science / IT / Allied)',
  'BCA (Bachelor of Computer Applications)',
  'B.S. in Computing / Engineering',
  'Other Bachelor’s Degree (16 Years Formal Education)'
];

export const DEPARTMENT_OPTIONS = [
  'Computer Science & Engineering (CSE)',
  'Information Technology (IT)',
  'Electronics & Communication (ECE)',
  'Electrical & Electronics (EEE)',
  'Data Science / AI / ML',
  'Mechanical Engineering',
  'Civil Engineering',
  'Other Engineering Branch'
];

export const GRADING_SCALE_OPTIONS = [
  { value: 'Percentage (out of 100%)', label: 'Percentage (out of 100%)', max: 100, threshold: 68 },
  { value: '10-Point CGPA', label: '10-Point CGPA (out of 10.0)', max: 10.0, threshold: 6.8 },
  { value: '4-Point GPA', label: '4-Point GPA (out of 4.0)', max: 4.0, threshold: 2.72 }
];

export const PASSING_YEAR_OPTIONS = [
  '2027 (Appearing Final Year)',
  '2026',
  '2025',
  '2024',
  '2023',
  '2022 or earlier'
];

export const REFERRAL_SOURCE_OPTIONS = [
  'Relatives',
  'Friends',
  'Instagram',
  'LinkedIn',
  'Other'
];

export const ACADEMIC_DOC_DEFINITIONS = [
  {
    key: 'ugDegreeDoc',
    title: 'Undergraduate Degree Certificate / Marksheet',
    subtitle: 'Upload your degree certificate, provisional certificate, or consolidated score memo.',
    required: true,
    accept: '.pdf,.jpg,.jpeg,.png',
    maxSize: '10 MB'
  },
  {
    key: 'class10Doc',
    title: 'Class 10 Marksheet',
    subtitle: 'Official secondary school examination marksheet / grade card.',
    required: true,
    accept: '.pdf,.jpg,.jpeg,.png',
    maxSize: '10 MB'
  },
  {
    key: 'sscMemoDoc',
    title: 'SSC Memo',
    subtitle: 'Secondary School Certificate memo. Note: For state boards, Class 10 and SSC memo may be the same certificate; you may upload the document here.',
    required: true,
    accept: '.pdf,.jpg,.jpeg,.png',
    maxSize: '10 MB',
    isFlaggedOverlap: true
  },
  {
    key: 'class12Doc',
    title: 'Class 12 Marksheet / Score-Proof Memo',
    subtitle: 'Higher secondary / Intermediate (10+2) marksheet or diploma memo.',
    required: true,
    accept: '.pdf,.jpg,.jpeg,.png',
    maxSize: '10 MB'
  }
];
