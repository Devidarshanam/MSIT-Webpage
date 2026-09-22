/**
 * MSIT Application Form Configuration
 * Single-page application format with the exact requested fields.
 */

export const APPLICATION_CONFIG = {
  isApplicationOpen: true, // Application portal is now live across the website
  cohort: 'January 2027 Intake',
  standbyRoute: '/apply',
  portalTitle: 'MSIT Application Form',
  supportEmail: 'admissions@msit.ac.in',
  supportPhone: '+91 40 6653 1000'
};

export const INITIAL_APPLICATION_STATE = {
  fullName: '',
  email: '',
  phone: '',
  dob: '',
  address: '',
  parentRelationship: 'Father',
  parentName: '',
  altPhone: '',
  ugDegree: '',
  department: '',
  cgpa: '',
  passingYear: '2026',
  hasExperience: 'No',
  experienceDetails: '',
  purposeToJoin: '',
  isSubmitted: false,
  applicationId: null,
  submittedAt: null
};

export const PARENT_RELATIONSHIP_OPTIONS = [
  'Father',
  'Mother',
  'Legal Guardian'
];

export const UG_DEGREE_OPTIONS = [
  'B.Tech / B.E.',
  'MCA',
  'M.Sc (CS / IT / Maths)',
  'BCA / B.Sc',
  'Other Equivalent Degree'
];

export const DEPARTMENT_OPTIONS = [
  'Computer Science & Engineering (CSE)',
  'Information Technology (IT)',
  'Electronics & Communication (ECE)',
  'Electrical & Electronics (EEE)',
  'Mechanical Engineering',
  'Civil Engineering',
  'Data Science / AI / ML',
  'Other Department'
];

export const PASSING_YEAR_OPTIONS = [
  '2027 (Appearing Final Year)',
  '2026',
  '2025',
  '2024',
  '2023',
  '2022 or earlier'
];
