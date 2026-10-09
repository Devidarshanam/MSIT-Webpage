import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  ArrowRightIcon, 
  HelpCircleIcon,
  DownloadIcon, 
  UploadIcon, 
  XIcon, 
  UserIcon, 
  GraduationCapIcon, 
  ShieldCheckIcon, 
  BookOpenIcon, 
  SparklesIcon, 
  MailIcon,
  BriefcaseIcon,
  PhoneIcon,
  MapPinIcon,
  AwardIcon,
  UsersIcon,
  InfoIcon
} from '../components/Icons';
import { 
  APPLICATION_CONFIG, 
  INITIAL_APPLICATION_STATE, 
  PARENT_RELATIONSHIP_OPTIONS,
  INTER_PATHWAY_OPTIONS,
  UG_DEGREE_OPTIONS, 
  DEPARTMENT_OPTIONS, 
  PASSING_YEAR_OPTIONS,
  GRADING_SCALE_OPTIONS,
  REFERRAL_SOURCE_OPTIONS,
  ENTRANCE_EXAM_OPTIONS,
  EXAM_YEAR_OPTIONS,
  WORK_EXP_YEAR_OPTIONS,
  WORK_EXP_MONTH_OPTIONS,
  DOCUMENT_DEFINITIONS,
  requires16YearProof
} from '../data/applicationConfig';
import { 
  getUserApplication, 
  getSavedDraft, 
  saveApplicationDraft, 
  uploadDocumentFile, 
  submitStudentApplication,
  updateStudentApplication,
  generateApplicationId
} from '../services/applicationService';
import { getStudentDisplayName } from '../utils/userUtils';

// Stepper Step Metadata (8 Sections)
const FORM_SECTIONS = [
  { id: 1, title: 'Personal Info', fullTitle: 'Personal & Contact Information', shortLabel: 'Personal' },
  { id: 2, title: 'Parent / Guardian', fullTitle: 'Parent / Guardian Information', shortLabel: 'Guardian' },
  { id: 3, title: 'Academics', fullTitle: 'Academic Qualifications', shortLabel: 'Academics' },
  { id: 4, title: 'Work Experience', fullTitle: 'Work Experience & Resume', shortLabel: 'Experience' },
  { id: 5, title: 'Purpose of Joining', fullTitle: 'Purpose of Joining MSIT', shortLabel: 'Purpose' },
  { id: 6, title: 'Referral Source', fullTitle: 'How Did You Hear About MSIT?', shortLabel: 'Referral' },
  { id: 7, title: 'Entrance Exams', fullTitle: 'Entrance Examination Details', shortLabel: 'Exams' },
  { id: 8, title: 'Review & Submit', fullTitle: 'Review & Submit Application', shortLabel: 'Review' }
];

export default function ApplicationPortalPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const urlMode = searchParams.get('mode'); // 'view' | 'edit' | null
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState(null);
  const [isDraftDirty, setIsDraftDirty] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});
  const [saveDraftMessage, setSaveDraftMessage] = useState(null);

  // Active / Submitted Application Record
  const [serverApp, setServerApp] = useState(null);
  const [portalMode, setPortalMode] = useState(urlMode || 'form'); // 'form' | 'view' | 'edit' | 'success'

  // Application Form Data
  const [formData, setFormData] = useState(() => {
    return {
      ...INITIAL_APPLICATION_STATE,
      fullName: user ? getStudentDisplayName(user) : '',
      email: user?.email || ''
    };
  });

  // Helper to map document array to document map
  const mapDocsArrayToMap = (docsArray) => {
    const docsMap = { ...INITIAL_APPLICATION_STATE.documents };
    if (!Array.isArray(docsArray)) return docsMap;

    docsArray.forEach(doc => {
      const type = (doc.doc_type || doc.docType || '').toLowerCase();
      if (type.includes('class 10') || type.includes('ssc')) {
        docsMap.class10Doc = doc;
      } else if (type.includes('class 12') || type.includes('intermediate') || type.includes('diploma')) {
        docsMap.class12Doc = doc;
      } else if (type.includes('16-year') || type.includes('additional qualifying')) {
        docsMap.additionalDegree16YearDoc = doc;
      } else if (type.includes('degree cert') || type.includes('provisional')) {
        docsMap.degreeCertDoc = doc;
      } else if (type.includes('degree') || type.includes('transcripts') || type.includes('marks memo')) {
        docsMap.ugDegreeDoc = doc;
      } else if (type.includes('gre')) {
        docsMap.greScorecardDoc = doc;
      } else if (type.includes('gate')) {
        docsMap.gateScorecardDoc = doc;
      } else if (type.includes('cv') || type.includes('resume')) {
        docsMap.cvDoc = doc;
      }
    });
    return docsMap;
  };

  // Load existing application or saved draft on mount
  useEffect(() => {
    let isMounted = true;
    async function loadInitialData() {
      if (!user?.email) return;

      const resolvedName = getStudentDisplayName(user);
      const email = user.email.toLowerCase();

      try {
        const { application: app } = await getUserApplication(user);

        if (!isMounted) return;

        if (app && app.status && app.status !== 'Draft') {
          // Application has already been submitted
          setServerApp(app);
          const restoredDocs = mapDocsArrayToMap(app.documents);

          setFormData({
            ...INITIAL_APPLICATION_STATE,
            ...app,
            fullName: app.full_name || resolvedName,
            email: app.email || email,
            phone: app.phone || '',
            dob: app.dob || '',
            address: app.address || '',
            parentRelationship: app.parent_relationship || 'Father',
            parentName: app.parent_name || '',
            altPhone: app.alt_phone || '',
            class10Score: app.class10_score || '',
            class10ScoreType: app.class10_score_type || 'Percentage',
            interPathway: app.inter_pathway || 'Class 12 / Intermediate',
            interScore: app.inter_score || '',
            interScoreType: app.inter_score_type || 'Percentage',
            ugDegree: app.ug_degree || 'B.Tech / B.E.',
            university: app.university || '',
            department: app.department || 'Computer Science & Engineering (CSE)',
            passingYear: app.passing_year || '2026',
            gradingScale: app.grading_scale || 'Percentage (out of 100%)',
            cgpa: app.cgpa || '',
            hasExperience: app.has_experience || 'No',
            experienceYears: app.experience_years || '0',
            experienceMonths: app.experience_months || '0',
            companyName: app.company_name || '',
            jobRole: app.job_role || '',
            statementText: app.statement_text || app.purpose_to_join || '',
            referralSource: app.referral_source || '',
            referralExplanation: app.referral_explanation || '',
            entranceExamStatus: app.entrance_exam_status || 'Neither',
            greScore: app.gre_score || '',
            greYear: app.gre_year || '',
            gateScore: app.gate_score || '',
            gateYear: app.gate_year || '',
            documents: restoredDocs,
            cvDocument: app.cv_url ? { fileName: app.cv_filename || 'Candidate_CV.pdf', fileUrl: app.cv_url, status: 'Uploaded' } : null,
            isSubmitted: true
          });

          if (app.status === 'Additional Information Required' || urlMode === 'edit') {
            setPortalMode('edit');
          } else {
            setPortalMode('view');
          }
          return;
        }

        // Check for saved in-progress draft
        const draft = getSavedDraft(email);
        if (draft) {
          setFormData({
            ...INITIAL_APPLICATION_STATE,
            ...draft,
            fullName: draft.fullName || resolvedName,
            email: email,
            documents: {
              ...INITIAL_APPLICATION_STATE.documents,
              ...(draft.documents || {})
            }
          });
          setLastSavedTime(draft.updated_at ? new Date(draft.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Saved');
        } else {
          // Initialize fresh state with prefilled candidate info
          setFormData(prev => ({
            ...prev,
            fullName: resolvedName,
            email: email
          }));
        }
      } catch (err) {
        console.warn('[MSIT] Application data load warning:', err);
      }
    }

    loadInitialData();
    return () => { isMounted = false; };
  }, [user, urlMode]);

  // Warn before leaving if user has unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDraftDirty && portalMode !== 'view' && !formData.isSubmitted) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes in your application. Are you sure you want to leave?';
        return e.returnValue;
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDraftDirty, portalMode, formData.isSubmitted]);

  // Scroll to top when changing steps
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep, portalMode]);

  // Word counter calculation for Section 5 (200 words max)
  const getWordCount = (text) => {
    if (!text || typeof text !== 'string') return 0;
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  };

  const currentStatementWords = getWordCount(formData.statementText);

  // 68% eligibility threshold calculation
  const getEligibilityAdvisory = () => {
    if (!formData.cgpa) return null;
    const scoreNum = parseFloat(formData.cgpa);
    if (isNaN(scoreNum)) return null;

    const scale = formData.gradingScale;
    let isBelow = false;
    let thresholdLabel = '68%';

    if (scale.includes('Percentage')) {
      thresholdLabel = '68%';
      isBelow = scoreNum < 68;
    } else if (scale.includes('10-Point')) {
      thresholdLabel = '6.8 CGPA';
      isBelow = scoreNum < 6.8;
    } else if (scale.includes('4-Point')) {
      thresholdLabel = '2.72 GPA';
      isBelow = scoreNum < 2.72;
    }

    if (isBelow) {
      return {
        isBelow: true,
        thresholdLabel,
        message: `Advisory Note: The officially recommended undergraduate degree eligibility threshold for MSIT is ${thresholdLabel}. While your entered score (${formData.cgpa}) is below this benchmark, the admissions committee conducts a comprehensive evaluation of every candidate, considering technical projects, entrance exam scores, and your statement of purpose. You may proceed with your application.`
      };
    }
    return null;
  };

  const eligibilityAdvisory = getEligibilityAdvisory();

  // Dynamic Parent / Guardian Label Helpers
  const getParentNameLabel = () => {
    switch (formData.parentRelationship) {
      case 'Mother': return "Mother's Name";
      case 'Legal Guardian': return "Legal Guardian's Name";
      default: return "Father's Name";
    }
  };

  const getParentPhoneLabel = () => {
    switch (formData.parentRelationship) {
      case 'Mother': return "Mother's Mobile Number";
      case 'Legal Guardian': return "Legal Guardian's Mobile Number";
      default: return "Father's Mobile Number";
    }
  };

  // Handle generic field change
  const handleFieldChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };

      // Handle conditional resets
      if (field === 'hasExperience' && value === 'No') {
        updated.experienceYears = '0';
        updated.experienceMonths = '0';
        updated.companyName = '';
        updated.jobRole = '';
      }

      if (field === 'referralSource' && value !== 'Other') {
        updated.referralExplanation = '';
      }

      if (field === 'entranceExamStatus') {
        if (value === 'Neither') {
          updated.greScore = '';
          updated.greYear = '';
          updated.gateScore = '';
          updated.gateYear = '';
          updated.documents = {
            ...updated.documents,
            greScorecardDoc: null,
            gateScorecardDoc: null
          };
        } else if (value === 'GRE') {
          updated.gateScore = '';
          updated.gateYear = '';
          updated.documents = {
            ...updated.documents,
            gateScorecardDoc: null
          };
        } else if (value === 'GATE') {
          updated.greScore = '';
          updated.greYear = '';
          updated.documents = {
            ...updated.documents,
            greScorecardDoc: null
          };
        }
      }

      return updated;
    });

    setIsDraftDirty(true);
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // Explicit Save Draft action (DOES NOT BLOCK on incomplete required fields!)
  const handleSaveDraft = async () => {
    if (!user?.email) return;
    try {
      const res = await saveApplicationDraft(formData, user);
      if (res.success) {
        setIsDraftDirty(false);
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setLastSavedTime(timeStr);
        setSaveDraftMessage('Draft saved successfully!');
        setTimeout(() => setSaveDraftMessage(null), 3000);
      }
    } catch (err) {
      console.warn('[MSIT] Save draft warning:', err);
    }
  };

  // Handle document file upload
  const handleFileUpload = async (file, docTypeKey, docTypeLabel) => {
    if (!file) return;

    setUploadProgress(prev => ({ ...prev, [docTypeKey]: true }));
    if (errors[docTypeKey]) {
      setErrors(prev => ({ ...prev, [docTypeKey]: null }));
    }

    try {
      const res = await uploadDocumentFile(file, docTypeLabel, formData.applicationId || 'new', user);
      setUploadProgress(prev => ({ ...prev, [docTypeKey]: false }));

      if (res.error) {
        setErrors(prev => ({ ...prev, [docTypeKey]: res.error.message }));
        return;
      }

      setFormData(prev => {
        const updatedDocs = {
          ...prev.documents,
          [docTypeKey]: res.data
        };
        const updated = {
          ...prev,
          documents: updatedDocs
        };
        if (docTypeKey === 'cvDocument') {
          updated.cvDocument = res.data;
        }
        return updated;
      });

      setIsDraftDirty(true);
    } catch (err) {
      setUploadProgress(prev => ({ ...prev, [docTypeKey]: false }));
      setErrors(prev => ({ ...prev, [docTypeKey]: 'Upload failed. Please check file format and try again.' }));
    }
  };

  // Section-level validation
  const validateSection = (stepNum) => {
    const errs = {};
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{8,14}$/;

    // SECTION 1: Personal & Contact Information
    if (stepNum === 1) {
      if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
      if (!formData.email.trim()) errs.email = 'Email Address is required';
      
      if (!formData.phone.trim()) {
        errs.phone = 'Mobile Phone Number is required';
      } else if (!phoneRegex.test(formData.phone.replace(/\s+/g, ''))) {
        errs.phone = 'Please enter a valid 10-digit mobile number';
      }

      if (!formData.dob) {
        errs.dob = 'Date of birth is required';
      } else {
        const dobDate = new Date(formData.dob);
        const now = new Date();
        const age = (now - dobDate) / (365.25 * 24 * 60 * 60 * 1000);
        if (isNaN(dobDate.getTime())) {
          errs.dob = 'Please select a valid date';
        } else if (dobDate >= now) {
          errs.dob = 'Date of birth cannot be in the future';
        } else if (age < 15) {
          errs.dob = 'Candidate must be at least 15 years of age';
        }
      }

      if (!formData.address.trim()) {
        errs.address = 'Residential Address is required';
      }
    }

    // SECTION 2: Parent / Guardian Information
    if (stepNum === 2) {
      if (!formData.parentRelationship) {
        errs.parentRelationship = 'Please select the relationship';
      }

      const nameLabel = getParentNameLabel();
      if (!formData.parentName.trim()) {
        errs.parentName = `${nameLabel} is required`;
      }

      const phoneLabel = getParentPhoneLabel();
      if (!formData.altPhone.trim()) {
        errs.altPhone = `${phoneLabel} is required`;
      } else if (!phoneRegex.test(formData.altPhone.replace(/\s+/g, ''))) {
        errs.altPhone = `Please enter a valid 10-digit mobile number for ${nameLabel}`;
      }
    }

    // SECTION 3: Academic Qualifications
    if (stepNum === 3) {
      // 3A. Class 10
      if (!formData.class10Score || !formData.class10Score.trim()) {
        errs.class10Score = 'Class 10 / SSC score is required';
      } else {
        const val = parseFloat(formData.class10Score);
        if (isNaN(val) || val <= 0) {
          errs.class10Score = 'Please enter a valid score';
        } else if (formData.class10ScoreType === 'Percentage' && val > 100) {
          errs.class10Score = 'Percentage cannot exceed 100%';
        } else if (formData.class10ScoreType === 'CGPA' && val > 10) {
          errs.class10Score = 'CGPA cannot exceed 10.0';
        }
      }

      if (!formData.documents?.class10Doc) {
        errs.class10Doc = 'Class 10 / SSC Marksheet or Memo upload is required';
      }

      // 3B. Class 12 / Intermediate
      if (!formData.interScore || !formData.interScore.trim()) {
        errs.interScore = 'Intermediate / Class 12 score is required';
      } else {
        const val = parseFloat(formData.interScore);
        if (isNaN(val) || val <= 0) {
          errs.interScore = 'Please enter a valid score';
        } else if (formData.interScoreType === 'Percentage' && val > 100) {
          errs.interScore = 'Percentage cannot exceed 100%';
        } else if (formData.interScoreType === 'CGPA' && val > 10) {
          errs.interScore = 'CGPA cannot exceed 10.0';
        }
      }

      if (!formData.documents?.class12Doc) {
        errs.class12Doc = 'Intermediate / Class 12 Marksheet or Memo upload is required';
      }

      // 3C. Qualifying Degree
      if (!formData.ugDegree) errs.ugDegree = 'Qualifying Degree is required';
      if (!formData.university.trim()) errs.university = 'University / Institution name is required';
      if (!formData.department.trim()) errs.department = 'Department / Branch is required';
      if (!formData.passingYear) errs.passingYear = 'Graduation year is required';

      if (!formData.cgpa || !formData.cgpa.trim()) {
        errs.cgpa = 'Aggregate CGPA / Percentage is required';
      } else {
        const val = parseFloat(formData.cgpa);
        if (isNaN(val) || val <= 0) {
          errs.cgpa = 'Please enter a valid numeric score';
        } else if (formData.gradingScale.includes('Percentage') && val > 100) {
          errs.cgpa = 'Percentage cannot exceed 100%';
        } else if (formData.gradingScale.includes('10-Point') && val > 10) {
          errs.cgpa = '10-Point CGPA cannot exceed 10.0';
        } else if (formData.gradingScale.includes('4-Point') && val > 4) {
          errs.cgpa = '4-Point GPA cannot exceed 4.0';
        }
      }

      if (!formData.documents?.ugDegreeDoc) {
        errs.ugDegreeDoc = 'Degree Marksheet / Consolidated Marks Memo upload is required';
      }

      // Conditional 16-Year Education Proof for MCA / non-4-year degrees
      if (requires16YearProof(formData.ugDegree)) {
        if (!formData.documents?.additionalDegree16YearDoc) {
          errs.additionalDegree16YearDoc = '16-Year Education Proof is required for your qualifying degree';
        }
      }
    }

    // SECTION 4: Work Experience
    if (stepNum === 4) {
      if (formData.hasExperience === 'Yes') {
        if (!formData.companyName.trim()) {
          errs.companyName = 'Company name is required';
        }
        if (!formData.jobRole.trim()) {
          errs.jobRole = 'Job title / role is required';
        }
      }

      // CV / Resume is required
      if (!formData.cvDocument && !formData.documents?.cvDoc && !formData.documents?.cvDocument && !formData.cv_url) {
        errs.cvDocument = 'Curriculum Vitae (CV) / Resume upload is required';
      }
    }

    // SECTION 5: Purpose of Joining MSIT
    if (stepNum === 5) {
      if (!formData.statementText.trim()) {
        errs.statementText = 'Please provide your statement explaining why you want to join MSIT';
      } else if (currentStatementWords > APPLICATION_CONFIG.statementMaxWords) {
        errs.statementText = `Your statement exceeds the 200-word limit (${currentStatementWords} words). Please reduce to 200 words or less.`;
      }
    }

    // SECTION 6: How Did You Hear About MSIT?
    if (stepNum === 6) {
      if (!formData.referralSource) {
        errs.referralSource = 'Please select how you heard about the MSIT programme';
      } else if (formData.referralSource === 'Other' && !formData.referralExplanation.trim()) {
        errs.referralExplanation = 'Please specify how you heard about MSIT';
      }
    }

    // SECTION 7: Entrance Examination Details
    if (stepNum === 7) {
      if (formData.entranceExamStatus === 'GRE' || formData.entranceExamStatus === 'Both') {
        if (!formData.greScore || !formData.greScore.trim()) {
          errs.greScore = 'GRE score is required';
        } else {
          const val = parseFloat(formData.greScore);
          if (isNaN(val) || val <= 0) {
            errs.greScore = 'Please enter a valid GRE score';
          }
        }
        if (!formData.documents?.greScorecardDoc) {
          errs.greScorecardDoc = 'GRE Scorecard upload is required';
        }
      }

      if (formData.entranceExamStatus === 'GATE' || formData.entranceExamStatus === 'Both') {
        if (!formData.gateScore || !formData.gateScore.trim()) {
          errs.gateScore = 'GATE score is required';
        } else {
          const val = parseFloat(formData.gateScore);
          if (isNaN(val) || val <= 0) {
            errs.gateScore = 'Please enter a valid GATE score';
          }
        }
        if (!formData.documents?.gateScorecardDoc) {
          errs.gateScorecardDoc = 'GATE Scorecard upload is required';
        }
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Continue to Next Section
  const handleNextSection = () => {
    if (validateSection(currentStep)) {
      handleSaveDraft();
      setCurrentStep(prev => Math.min(prev + 1, 8));
    }
  };

  // Back to Previous Section
  const handlePrevSection = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Direct step jump (from stepper tab or review edit link)
  const handleJumpToSection = (stepNum) => {
    // Save draft without blocking
    handleSaveDraft();
    setCurrentStep(stepNum);
  };

  // Verify all sections for final submission
  const validateAllSections = () => {
    const sectionErrors = {};
    for (let s = 1; s <= 7; s++) {
      if (!validateSection(s)) {
        sectionErrors[s] = true;
      }
    }
    return Object.keys(sectionErrors).length === 0;
  };

  // Final Application Submission
  const handleSubmitApplication = async (e) => {
    e.preventDefault();

    if (!validateAllSections()) {
      alert('Please complete all required fields and upload required documents across all sections before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      const generatedRef = formData.applicationId || generateApplicationId();
      const submissionPayload = {
        ...formData,
        applicationId: generatedRef,
        statementWordCount: currentStatementWords,
        scoreEligibilityNote: eligibilityAdvisory ? eligibilityAdvisory.message : ''
      };

      let result;
      if (portalMode === 'edit') {
        result = await updateStudentApplication(generatedRef, submissionPayload, user);
      } else {
        result = await submitStudentApplication(submissionPayload, user);
      }

      setIsSubmitting(false);

      if (result.error) {
        alert(result.error.message || 'Submission error. Please try again.');
        return;
      }

      setIsDraftDirty(false);
      setFormData(prev => ({
        ...prev,
        ...result.data,
        isSubmitted: true,
        applicationId: result.data?.application_id || generatedRef
      }));
      setPortalMode('success');
    } catch (err) {
      setIsSubmitting(false);
      alert('An unexpected error occurred while saving your application. Please try again.');
    }
  };

  // Reusable Document Upload Card Component
  const renderDocumentUploadCard = (docKey, docTitle, isRequired, helperText, accept = '.pdf,.jpg,.jpeg,.png') => {
    const uploadedDoc = formData.documents?.[docKey] || (docKey === 'cvDocument' ? formData.cvDocument : null);
    const isUploading = !!uploadProgress[docKey];
    const fieldError = errors[docKey];

    return (
      <div 
        key={docKey} 
        className={`doc-upload-item-card ${uploadedDoc ? 'is-uploaded' : ''} ${isUploading ? 'is-uploading' : ''}`}
        id={`upload-card-${docKey}`}
      >
        <div className="doc-upload-header">
          <div>
            <h5 className="doc-upload-title">{docTitle}</h5>
            <p className="doc-upload-sub">{helperText}</p>
          </div>
          <div>
            {isRequired ? (
              <span className="field-badge-required">Required</span>
            ) : (
              <span className="field-badge-optional">Optional</span>
            )}
          </div>
        </div>

        {uploadedDoc ? (
          <div className="doc-file-uploaded-view">
            <div className="doc-file-info">
              <CheckCircleIcon size={18} className="text-success" />
              <div>
                <span className="doc-file-name">{uploadedDoc.fileName || uploadedDoc.file_name || 'Document Uploaded'}</span>
                {uploadedDoc.fileSize && (
                  <span className="doc-file-size"> • {uploadedDoc.fileSize || uploadedDoc.file_size}</span>
                )}
              </div>
            </div>
            {portalMode !== 'view' && (
              <div>
                <label className="doc-replace-btn" htmlFor={`file-input-${docKey}`}>
                  Replace
                </label>
                <input
                  id={`file-input-${docKey}`}
                  type="file"
                  accept={accept}
                  className="doc-file-input"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(e.target.files[0], docKey, docTitle);
                    }
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="doc-dropzone-row">
            {portalMode !== 'view' ? (
              <>
                <label className="doc-select-file-btn" htmlFor={`file-input-${docKey}`}>
                  <UploadIcon size={16} />
                  <span>Choose File</span>
                </label>
                <input
                  id={`file-input-${docKey}`}
                  type="file"
                  accept={accept}
                  className="doc-file-input"
                  disabled={isUploading}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(e.target.files[0], docKey, docTitle);
                    }
                  }}
                />
                <span className="doc-format-hint">
                  {accept.includes('doc') ? 'PDF, DOC, DOCX up to 5 MB' : 'PDF, JPG, PNG up to 10 MB'}
                </span>
              </>
            ) : (
              <span className="field-error-text" style={{ color: '#64748b' }}>Not provided</span>
            )}
          </div>
        )}

        {isUploading && (
          <div className="doc-upload-progress">
            <div className="doc-progress-bar-fill"></div>
          </div>
        )}

        {fieldError && <span className="field-error-text">{fieldError}</span>}
      </div>
    );
  };

  // VIEW MODE: Render Read-Only View of Submitted Application
  if (portalMode === 'view' && formData.isSubmitted) {
    return (
      <div className="single-app-wrapper">
        <header className="single-app-header">
          <div className="container single-app-header-inner">
            <div className="single-app-brand">
              <img src="/assets/msit-logo.png" alt="MSIT Logo" className="single-app-logo" />
              <div>
                <span className="brand-title">MSIT Application Portal</span>
                <span className="brand-cohort">{APPLICATION_CONFIG.cohort} • IIIT Hyderabad</span>
              </div>
            </div>
            <div className="single-app-controls">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => navigate('/programme')}
              >
                ← Back to Dashboard
              </button>
            </div>
          </div>
        </header>

        <div className="multi-section-app-container">
          {/* Status Alert Banner */}
          <div className="app-view-banner">
            <InfoIcon size={24} />
            <div>
              <h4 style={{ margin: '0 0 0.25rem 0', fontWeight: '800' }}>
                Application Submitted ({formData.applicationId || serverApp?.application_id})
              </h4>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>
                Your application is currently <strong>{formData.status || 'Submitted'}</strong>. The admissions committee is reviewing your academic credentials and statement of purpose.
              </p>
            </div>
          </div>

          {/* Read-Only Summary */}
          <div className="form-section-card">
            <div className="form-section-header">
              <span className="form-section-kicker">APPLICATION SUMMARY</span>
              <h3 className="form-section-title">{formData.fullName}</h3>
              <p className="form-section-desc">Application Ref: {formData.applicationId || serverApp?.application_id} • Cohort: {APPLICATION_CONFIG.cohort}</p>
            </div>

            {/* Section 1 & 2 Summary */}
            <div className="review-block-card">
              <div className="review-block-header">
                <h4 className="review-block-title">1 & 2. Personal & Parent / Guardian Information</h4>
              </div>
              <div className="review-details-grid">
                <div className="review-item"><span className="review-item-label">Full Name</span><span className="review-item-val">{formData.fullName}</span></div>
                <div className="review-item"><span className="review-item-label">Email Address</span><span className="review-item-val">{formData.email}</span></div>
                <div className="review-item"><span className="review-item-label">Mobile Phone</span><span className="review-item-val">{formData.phone}</span></div>
                <div className="review-item"><span className="review-item-label">Date of Birth</span><span className="review-item-val">{formData.dob}</span></div>
                <div className="review-item" style={{ gridColumn: '1 / -1' }}><span className="review-item-label">Residential Address</span><span className="review-item-val">{formData.address}</span></div>
                <div className="review-item"><span className="review-item-label">{formData.parentRelationship} Name</span><span className="review-item-val">{formData.parentName}</span></div>
                <div className="review-item"><span className="review-item-label">{formData.parentRelationship} Mobile</span><span className="review-item-val">{formData.altPhone}</span></div>
              </div>
            </div>

            {/* Section 3 Summary */}
            <div className="review-block-card">
              <div className="review-block-header">
                <h4 className="review-block-title">3. Academic Qualifications</h4>
              </div>
              <div className="review-details-grid">
                <div className="review-item"><span className="review-item-label">Class 10 Score</span><span className="review-item-val">{formData.class10Score} ({formData.class10ScoreType})</span></div>
                <div className="review-item"><span className="review-item-label">Class 12 / Intermediate</span><span className="review-item-val">{formData.interPathway}: {formData.interScore} ({formData.interScoreType})</span></div>
                <div className="review-item"><span className="review-item-label">Qualifying Degree</span><span className="review-item-val">{formData.ugDegree}</span></div>
                <div className="review-item"><span className="review-item-label">University / Institution</span><span className="review-item-val">{formData.university}</span></div>
                <div className="review-item"><span className="review-item-label">Department / Branch</span><span className="review-item-val">{formData.department}</span></div>
                <div className="review-item"><span className="review-item-label">Graduation Year</span><span className="review-item-val">{formData.passingYear}</span></div>
                <div className="review-item"><span className="review-item-label">Aggregate Score</span><span className="review-item-val">{formData.cgpa} ({formData.gradingScale})</span></div>
              </div>
            </div>

            {/* Section 4 Summary */}
            <div className="review-block-card">
              <div className="review-block-header">
                <h4 className="review-block-title">4. Work Experience</h4>
              </div>
              <div className="review-details-grid">
                <div className="review-item"><span className="review-item-label">Prior Experience</span><span className="review-item-val">{formData.hasExperience === 'Yes' ? 'Experienced' : 'Fresher'}</span></div>
                {formData.hasExperience === 'Yes' && (
                  <>
                    <div className="review-item"><span className="review-item-label">Duration</span><span className="review-item-val">{formData.experienceYears} Years, {formData.experienceMonths} Months</span></div>
                    <div className="review-item"><span className="review-item-label">Company Name</span><span className="review-item-val">{formData.companyName}</span></div>
                    <div className="review-item"><span className="review-item-label">Job Title</span><span className="review-item-val">{formData.jobRole}</span></div>
                  </>
                )}
              </div>
            </div>

            {/* Section 5 Summary */}
            <div className="review-block-card">
              <div className="review-block-header">
                <h4 className="review-block-title">5. Purpose of Joining MSIT</h4>
              </div>
              <p style={{ fontStyle: 'italic', background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0', margin: 0 }}>
                "{formData.statementText}"
              </p>
            </div>

            {/* Section 6 & 7 Summary */}
            <div className="review-block-card">
              <div className="review-block-header">
                <h4 className="review-block-title">6 & 7. Referral & Entrance Examination</h4>
              </div>
              <div className="review-details-grid">
                <div className="review-item"><span className="review-item-label">Referral Source</span><span className="review-item-val">{formData.referralSource} {formData.referralExplanation ? `(${formData.referralExplanation})` : ''}</span></div>
                <div className="review-item"><span className="review-item-label">Entrance Exam</span><span className="review-item-val">{formData.entranceExamStatus}</span></div>
                {formData.greScore && <div className="review-item"><span className="review-item-label">GRE Score</span><span className="review-item-val">{formData.greScore} ({formData.greYear})</span></div>}
                {formData.gateScore && <div className="review-item"><span className="review-item-label">GATE Score</span><span className="review-item-val">{formData.gateScore} ({formData.gateYear})</span></div>}
              </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={() => navigate('/programme')}
              >
                Back to Student Dashboard
              </button>
              {formData.status === 'Additional Information Required' && (
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setPortalMode('edit')}
                >
                  Edit / Update Application
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SUCCESS CONFIRMATION SCREEN
  if (portalMode === 'success') {
    return (
      <div className="single-app-wrapper">
        <header className="single-app-header">
          <div className="container single-app-header-inner">
            <div className="single-app-brand">
              <img src="/assets/msit-logo.png" alt="MSIT Logo" className="single-app-logo" />
              <div>
                <span className="brand-title">MSIT Application Portal</span>
                <span className="brand-cohort">{APPLICATION_CONFIG.cohort} • IIIT Hyderabad</span>
              </div>
            </div>
          </div>
        </header>

        <div className="single-app-container">
          <div className="single-app-success-card">
            <div className="success-icon-badge">
              <CheckCircleIcon size={38} />
            </div>

            <span className="success-status-pill">Application Submitted Successfully</span>

            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0b2a6b', margin: '1rem 0 0.5rem 0' }}>
              Congratulations, {formData.fullName}!
            </h2>

            <p style={{ color: '#475569', fontSize: '1rem', maxWidth: '540px', margin: '0 auto 1.5rem auto', lineHeight: '1.6' }}>
              Your application for the <strong>{APPLICATION_CONFIG.cohort}</strong> has been received by the Consortium of Institutions of Higher Learning (CIHL) at IIIT Hyderabad.
            </p>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem 1.5rem', maxWidth: '440px', margin: '0 auto 2rem auto', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Application Reference ID:</span>
                <strong style={{ fontSize: '0.95rem', color: '#0b2a6b', fontFamily: 'monospace' }}>{formData.applicationId}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Registered Email:</span>
                <span style={{ fontSize: '0.88rem', fontWeight: '600', color: '#0f172a' }}>{formData.email}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Cohort:</span>
                <span style={{ fontSize: '0.88rem', fontWeight: '600', color: '#0f172a' }}>{APPLICATION_CONFIG.cohort}</span>
              </div>
            </div>

            {/* Next Steps Guidance */}
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1.25rem', textAlign: 'left', maxWidth: '540px', margin: '0 auto 2rem auto' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e40af', fontSize: '0.95rem', fontWeight: '700' }}>
                What Happens Next?
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.86rem', color: '#1e3a8a', lineHeight: '1.5' }}>
                <li><strong>Document Verification:</strong> The admissions team will verify your Class 10, Class 12, and Qualifying Degree memos.</li>
                <li><strong>Holistic Review:</strong> Your statement of purpose, technical background, and academic history will be evaluated.</li>
                <li><strong>Status Notifications:</strong> Updates will be sent to <code>{formData.email}</code> and visible on your student dashboard.</li>
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate('/programme')}
              >
                Go to Student Dashboard →
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => window.print()}
              >
                Print / Save Application Summary
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STANDARD FORM EDIT / FILL EXPERIENCE
  return (
    <div className="single-app-wrapper">
      {/* Top Application Bar */}
      <header className="single-app-header">
        <div className="container single-app-header-inner">
          <div className="single-app-brand">
            <img src="/assets/msit-logo.png" alt="MSIT Logo" className="single-app-logo" />
            <div>
              <span className="brand-title">MSIT Application Portal</span>
              <span className="brand-cohort">{APPLICATION_CONFIG.cohort} • IIIT Hyderabad</span>
            </div>
          </div>

          <div className="single-app-controls">
            {saveDraftMessage && (
              <span className="draft-saved-pill" style={{ background: '#dcfce7', color: '#15803d', borderColor: '#86efac' }}>
                <CheckCircleIcon size={13} />
                <span>{saveDraftMessage}</span>
              </span>
            )}

            {lastSavedTime && !saveDraftMessage && (
              <span className="draft-saved-pill">
                <CheckCircleIcon size={13} />
                <span>Draft Saved: {lastSavedTime}</span>
              </span>
            )}

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleSaveDraft}
              title="Save in-progress application draft"
            >
              Save Draft
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/programme')}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <div className="multi-section-app-container">
        {/* Banner if in edit mode after Additional Info Requested */}
        {portalMode === 'edit' && (
          <div className="app-edit-banner">
            <InfoIcon size={24} />
            <div>
              <h4 style={{ margin: '0 0 0.25rem 0', fontWeight: '800' }}>Update Requested by Admissions Team</h4>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>
                Please review the fields below, supply any missing documentation or details, and re-submit your application.
              </p>
            </div>
          </div>
        )}

        {/* 8-STEP HORIZONTAL PROGRESS BAR / TABS */}
        <nav className="app-stepper-wrap" aria-label="Application Form Steps">
          {FORM_SECTIONS.map((sec) => {
            const isActive = currentStep === sec.id;
            const isCompleted = currentStep > sec.id;

            return (
              <button
                key={sec.id}
                type="button"
                className={`stepper-tab-btn ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => handleJumpToSection(sec.id)}
                title={sec.fullTitle}
              >
                <span className="stepper-tab-num">
                  {isCompleted ? '✓' : sec.id}
                </span>
                <span>{sec.shortLabel}</span>
              </button>
            );
          })}
        </nav>

        {/* =========================================================================
            SECTION 1: PERSONAL & CONTACT INFORMATION
            ========================================================================= */}
        {currentStep === 1 && (
          <div className="form-section-card">
            <div className="form-section-header">
              <span className="form-section-kicker">SECTION 1 OF 8</span>
              <h3 className="form-section-title">Personal & Contact Information</h3>
              <p className="form-section-desc">
                Provide your legal candidate identity and residential contact details. Saved values are preserved when resuming drafts.
              </p>
            </div>

            <div className="form-fields-grid">
              {/* Full Name */}
              <div className="form-field-group">
                <div className="field-label-row">
                  <label className="field-label" htmlFor="field-fullName">Full Name</label>
                  <span className="field-badge-required">Required</span>
                </div>
                <input
                  id="field-fullName"
                  type="text"
                  className={`app-form-input ${errors.fullName ? 'has-error' : ''}`}
                  value={formData.fullName}
                  onChange={(e) => handleFieldChange('fullName', e.target.value)}
                  placeholder="Candidate Legal Full Name"
                />
                {errors.fullName && <span className="field-error-text">{errors.fullName}</span>}
              </div>

              {/* Email Address (Pre-filled & Read-only) */}
              <div className="form-field-group">
                <div className="field-label-row">
                  <label className="field-label" htmlFor="field-email">Email Address</label>
                  <span className="field-badge-required">Verified</span>
                </div>
                <input
                  id="field-email"
                  type="email"
                  className="app-form-input is-readonly"
                  value={formData.email}
                  readOnly
                  title="Email Address is linked to your verified registration account"
                />
                <span className="field-helper-hint">Linked to your verified registration account and read-only.</span>
              </div>

              {/* Phone Number */}
              <div className="form-field-group">
                <div className="field-label-row">
                  <label className="field-label" htmlFor="field-phone">Mobile Phone Number</label>
                  <span className="field-badge-required">Required</span>
                </div>
                <input
                  id="field-phone"
                  type="tel"
                  className={`app-form-input ${errors.phone ? 'has-error' : ''}`}
                  value={formData.phone}
                  onChange={(e) => handleFieldChange('phone', e.target.value)}
                  placeholder="+91 98765 43210"
                />
                {errors.phone && <span className="field-error-text">{errors.phone}</span>}
              </div>

              {/* Date of Birth */}
              <div className="form-field-group">
                <div className="field-label-row">
                  <label className="field-label" htmlFor="field-dob">Date of Birth</label>
                  <span className="field-badge-required">Required</span>
                </div>
                <input
                  id="field-dob"
                  type="date"
                  className={`app-form-input ${errors.dob ? 'has-error' : ''}`}
                  value={formData.dob}
                  onChange={(e) => handleFieldChange('dob', e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />
                {errors.dob && <span className="field-error-text">{errors.dob}</span>}
              </div>

              {/* Address */}
              <div className="form-field-group form-field-full">
                <div className="field-label-row">
                  <label className="field-label" htmlFor="field-address">Residential Address</label>
                  <span className="field-badge-required">Required</span>
                </div>
                <textarea
                  id="field-address"
                  rows={3}
                  className={`app-form-textarea ${errors.address ? 'has-error' : ''}`}
                  value={formData.address}
                  onChange={(e) => handleFieldChange('address', e.target.value)}
                  placeholder="Door/Flat No., Street, City, State, PIN Code"
                />
                {errors.address && <span className="field-error-text">{errors.address}</span>}
              </div>
            </div>

            {/* Step Navigation Bar */}
            <div className="app-step-actions">
              <div className="app-action-left">
                <button type="button" className="btn btn-secondary" onClick={handleSaveDraft}>
                  Save Draft
                </button>
              </div>
              <div className="app-action-right">
                <button type="button" className="btn btn-primary" onClick={handleNextSection}>
                  <span>Continue to Parent / Guardian</span>
                  <ArrowRightIcon size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 2: PARENT / GUARDIAN INFORMATION
            ========================================================================= */}
        {currentStep === 2 && (
          <div className="form-section-card">
            <div className="form-section-header">
              <span className="form-section-kicker">SECTION 2 OF 8</span>
              <h3 className="form-section-title">Parent / Guardian Information</h3>
              <p className="form-section-desc">
                Provide relationship and contact details for emergency and official communications. Contact labels adapt to your chosen relationship.
              </p>
            </div>

            <div className="form-fields-grid">
              {/* Relationship Dropdown */}
              <div className="form-field-group">
                <div className="field-label-row">
                  <label className="field-label" htmlFor="field-relationship">Relationship</label>
                  <span className="field-badge-required">Required</span>
                </div>
                <select
                  id="field-relationship"
                  className="app-form-select"
                  value={formData.parentRelationship}
                  onChange={(e) => handleFieldChange('parentRelationship', e.target.value)}
                >
                  {PARENT_RELATIONSHIP_OPTIONS.map(rel => (
                    <option key={rel} value={rel}>{rel}</option>
                  ))}
                </select>
              </div>

              {/* Dynamic Name Field */}
              <div className="form-field-group">
                <div className="field-label-row">
                  <label className="field-label" htmlFor="field-parentName">{getParentNameLabel()}</label>
                  <span className="field-badge-required">Required</span>
                </div>
                <input
                  id="field-parentName"
                  type="text"
                  className={`app-form-input ${errors.parentName ? 'has-error' : ''}`}
                  value={formData.parentName}
                  onChange={(e) => handleFieldChange('parentName', e.target.value)}
                  placeholder={`Enter ${getParentNameLabel()}`}
                />
                {errors.parentName && <span className="field-error-text">{errors.parentName}</span>}
              </div>

              {/* Dynamic Mobile Phone Field */}
              <div className="form-field-group">
                <div className="field-label-row">
                  <label className="field-label" htmlFor="field-altPhone">{getParentPhoneLabel()}</label>
                  <span className="field-badge-required">Required</span>
                </div>
                <input
                  id="field-altPhone"
                  type="tel"
                  className={`app-form-input ${errors.altPhone ? 'has-error' : ''}`}
                  value={formData.altPhone}
                  onChange={(e) => handleFieldChange('altPhone', e.target.value)}
                  placeholder="+91 98765 43210"
                />
                {errors.altPhone && <span className="field-error-text">{errors.altPhone}</span>}
              </div>
            </div>

            {/* Step Navigation Bar */}
            <div className="app-step-actions">
              <div className="app-action-left">
                <button type="button" className="btn btn-secondary" onClick={handlePrevSection}>
                  ← Back to Personal Info
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleSaveDraft}>
                  Save Draft
                </button>
              </div>
              <div className="app-action-right">
                <button type="button" className="btn btn-primary" onClick={handleNextSection}>
                  <span>Continue to Academic Qualifications</span>
                  <ArrowRightIcon size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 3: ACADEMIC QUALIFICATIONS
            ========================================================================= */}
        {currentStep === 3 && (
          <div className="form-section-card">
            <div className="form-section-header">
              <span className="form-section-kicker">SECTION 3 OF 8</span>
              <h3 className="form-section-title">Academic Qualifications</h3>
              <p className="form-section-desc">
                Organised into separate subsections for Class 10, Class 12 / Intermediate, and your Qualifying Degree.
              </p>
            </div>

            {/* Subsection 3A: Class 10 / SSC */}
            <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1.75rem', marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0b2a6b', margin: '0 0 1rem 0' }}>
                A. Class 10 / SSC
              </h4>

              <div className="form-fields-grid" style={{ marginBottom: '1.25rem' }}>
                <div className="form-field-group">
                  <div className="field-label-row">
                    <label className="field-label" htmlFor="field-class10Score">Class 10 / SSC Score</label>
                    <span className="field-badge-required">Required</span>
                  </div>
                  <input
                    id="field-class10Score"
                    type="number"
                    step="any"
                    className={`app-form-input ${errors.class10Score ? 'has-error' : ''}`}
                    value={formData.class10Score}
                    onChange={(e) => handleFieldChange('class10Score', e.target.value)}
                    placeholder="e.g. 85.5 or 9.2"
                  />
                  {errors.class10Score && <span className="field-error-text">{errors.class10Score}</span>}
                </div>

                <div className="form-field-group">
                  <div className="field-label-row">
                    <label className="field-label" htmlFor="field-class10ScoreType">Score Type</label>
                    <span className="field-badge-required">Required</span>
                  </div>
                  <select
                    id="field-class10ScoreType"
                    className="app-form-select"
                    value={formData.class10ScoreType}
                    onChange={(e) => handleFieldChange('class10ScoreType', e.target.value)}
                  >
                    <option value="Percentage">Percentage (out of 100%)</option>
                    <option value="CGPA">CGPA (out of 10.0)</option>
                  </select>
                </div>
              </div>

              {renderDocumentUploadCard(
                'class10Doc',
                DOCUMENT_DEFINITIONS.class10Doc.title,
                DOCUMENT_DEFINITIONS.class10Doc.required,
                DOCUMENT_DEFINITIONS.class10Doc.helper
              )}
            </div>

            {/* Subsection 3B: Class 12 / Intermediate */}
            <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1.75rem', marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0b2a6b', margin: '0 0 1rem 0' }}>
                B. Class 12 / Intermediate
              </h4>

              <div className="form-fields-grid" style={{ marginBottom: '1.25rem' }}>
                <div className="form-field-group">
                  <div className="field-label-row">
                    <label className="field-label" htmlFor="field-interPathway">Educational Pathway</label>
                    <span className="field-badge-required">Required</span>
                  </div>
                  <select
                    id="field-interPathway"
                    className="app-form-select"
                    value={formData.interPathway}
                    onChange={(e) => handleFieldChange('interPathway', e.target.value)}
                  >
                    {INTER_PATHWAY_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="form-field-group">
                  <div className="field-label-row">
                    <label className="field-label" htmlFor="field-interScore">Intermediate / Class 12 Score</label>
                    <span className="field-badge-required">Required</span>
                  </div>
                  <input
                    id="field-interScore"
                    type="number"
                    step="any"
                    className={`app-form-input ${errors.interScore ? 'has-error' : ''}`}
                    value={formData.interScore}
                    onChange={(e) => handleFieldChange('interScore', e.target.value)}
                    placeholder="e.g. 91.2 or 9.5"
                  />
                  {errors.interScore && <span className="field-error-text">{errors.interScore}</span>}
                </div>

                <div className="form-field-group">
                  <div className="field-label-row">
                    <label className="field-label" htmlFor="field-interScoreType">Score Type</label>
                    <span className="field-badge-required">Required</span>
                  </div>
                  <select
                    id="field-interScoreType"
                    className="app-form-select"
                    value={formData.interScoreType}
                    onChange={(e) => handleFieldChange('interScoreType', e.target.value)}
                  >
                    <option value="Percentage">Percentage (out of 100%)</option>
                    <option value="CGPA">CGPA (out of 10.0)</option>
                  </select>
                </div>
              </div>

              {renderDocumentUploadCard(
                'class12Doc',
                DOCUMENT_DEFINITIONS.class12Doc.title,
                DOCUMENT_DEFINITIONS.class12Doc.required,
                DOCUMENT_DEFINITIONS.class12Doc.helper
              )}
            </div>

            {/* Subsection 3C: Qualifying Degree */}
            <div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0b2a6b', margin: '0 0 1rem 0' }}>
                C. Qualifying Degree
              </h4>

              <div className="form-fields-grid" style={{ marginBottom: '1.5rem' }}>
                {/* Qualifying Degree Dropdown */}
                <div className="form-field-group">
                  <div className="field-label-row">
                    <label className="field-label" htmlFor="field-ugDegree">Qualifying Degree</label>
                    <span className="field-badge-required">Required</span>
                  </div>
                  <select
                    id="field-ugDegree"
                    className="app-form-select"
                    value={formData.ugDegree}
                    onChange={(e) => handleFieldChange('ugDegree', e.target.value)}
                  >
                    {UG_DEGREE_OPTIONS.map(deg => (
                      <option key={deg} value={deg}>{deg}</option>
                    ))}
                  </select>
                </div>

                {/* University / Institution */}
                <div className="form-field-group">
                  <div className="field-label-row">
                    <label className="field-label" htmlFor="field-university">University / Institution</label>
                    <span className="field-badge-required">Required</span>
                  </div>
                  <input
                    id="field-university"
                    type="text"
                    className={`app-form-input ${errors.university ? 'has-error' : ''}`}
                    value={formData.university}
                    onChange={(e) => handleFieldChange('university', e.target.value)}
                    placeholder="e.g. JNTU Hyderabad / Osmania University"
                  />
                  {errors.university && <span className="field-error-text">{errors.university}</span>}
                </div>

                {/* Department / Branch */}
                <div className="form-field-group">
                  <div className="field-label-row">
                    <label className="field-label" htmlFor="field-department">Department / Branch</label>
                    <span className="field-badge-required">Required</span>
                  </div>
                  <select
                    id="field-department"
                    className="app-form-select"
                    value={formData.department}
                    onChange={(e) => handleFieldChange('department', e.target.value)}
                  >
                    {DEPARTMENT_OPTIONS.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                {/* Graduation Year */}
                <div className="form-field-group">
                  <div className="field-label-row">
                    <label className="field-label" htmlFor="field-passingYear">Graduation Year</label>
                    <span className="field-badge-required">Required</span>
                  </div>
                  <select
                    id="field-passingYear"
                    className="app-form-select"
                    value={formData.passingYear}
                    onChange={(e) => handleFieldChange('passingYear', e.target.value)}
                  >
                    {PASSING_YEAR_OPTIONS.map(yr => (
                      <option key={yr} value={yr}>{yr}</option>
                    ))}
                  </select>
                </div>

                {/* Aggregate CGPA / Percentage */}
                <div className="form-field-group">
                  <div className="field-label-row">
                    <label className="field-label" htmlFor="field-cgpa">Aggregate CGPA / Percentage</label>
                    <span className="field-badge-required">Required</span>
                  </div>
                  <input
                    id="field-cgpa"
                    type="number"
                    step="any"
                    className={`app-form-input ${errors.cgpa ? 'has-error' : ''}`}
                    value={formData.cgpa}
                    onChange={(e) => handleFieldChange('cgpa', e.target.value)}
                    placeholder="e.g. 74.5 or 7.8"
                  />
                  {errors.cgpa && <span className="field-error-text">{errors.cgpa}</span>}
                </div>

                {/* Grading Scale */}
                <div className="form-field-group">
                  <div className="field-label-row">
                    <label className="field-label" htmlFor="field-gradingScale">Grading Scale</label>
                    <span className="field-badge-required">Required</span>
                  </div>
                  <select
                    id="field-gradingScale"
                    className="app-form-select"
                    value={formData.gradingScale}
                    onChange={(e) => handleFieldChange('gradingScale', e.target.value)}
                  >
                    {GRADING_SCALE_OPTIONS.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Eligibility Advisory Alert */}
              {eligibilityAdvisory && (
                <div className="eligibility-advisory-box">
                  <HelpCircleIcon size={20} />
                  <div>
                    <strong>Undergraduate Eligibility Benchmark Advisory ({eligibilityAdvisory.thresholdLabel})</strong>
                    <p>{eligibilityAdvisory.message}</p>
                  </div>
                </div>
              )}

              {/* Degree Marksheet / Consolidated Marks Memo Upload */}
              {renderDocumentUploadCard(
                'ugDegreeDoc',
                DOCUMENT_DEFINITIONS.ugDegreeDoc.title,
                DOCUMENT_DEFINITIONS.ugDegreeDoc.required,
                DOCUMENT_DEFINITIONS.ugDegreeDoc.helper
              )}

              {/* Degree Certificate Upload (Optional if appearing in final year) */}
              {renderDocumentUploadCard(
                'degreeCertDoc',
                DOCUMENT_DEFINITIONS.degreeCertDoc.title,
                false,
                DOCUMENT_DEFINITIONS.degreeCertDoc.helper
              )}

              {/* Conditional 16-Year Education Proof for MCA candidates */}
              {requires16YearProof(formData.ugDegree) && (
                <div style={{ marginTop: '1.25rem' }}>
                  <div className="doc-overlap-note" style={{ marginBottom: '0.75rem' }}>
                    Note: For candidates applying with {formData.ugDegree}, proof of 16 years of formal education is required.
                  </div>
                  {renderDocumentUploadCard(
                    'additionalDegree16YearDoc',
                    DOCUMENT_DEFINITIONS.additionalDegree16YearDoc.title,
                    true,
                    DOCUMENT_DEFINITIONS.additionalDegree16YearDoc.helper
                  )}
                </div>
              )}
            </div>

            {/* Step Navigation Bar */}
            <div className="app-step-actions">
              <div className="app-action-left">
                <button type="button" className="btn btn-secondary" onClick={handlePrevSection}>
                  ← Back to Parent Info
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleSaveDraft}>
                  Save Draft
                </button>
              </div>
              <div className="app-action-right">
                <button type="button" className="btn btn-primary" onClick={handleNextSection}>
                  <span>Continue to Work Experience</span>
                  <ArrowRightIcon size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 4: WORK EXPERIENCE
            ========================================================================= */}
        {currentStep === 4 && (
          <div className="form-section-card">
            <div className="form-section-header">
              <span className="form-section-kicker">SECTION 4 OF 8</span>
              <h3 className="form-section-title">Work Experience & Resume</h3>
              <p className="form-section-desc">
                Indicate whether you have prior professional work experience or are applying as a fresher.
              </p>
            </div>

            <div className="form-field-group" style={{ marginBottom: '1.75rem' }}>
              <div className="field-label-row">
                <label className="field-label">Do you have prior work experience?</label>
                <span className="field-badge-required">Required</span>
              </div>
              <div className="experience-radio-group">
                <label className={`radio-option-card ${formData.hasExperience === 'No' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="hasExperience"
                    value="No"
                    checked={formData.hasExperience === 'No'}
                    onChange={() => handleFieldChange('hasExperience', 'No')}
                  />
                  <span>No — Fresher</span>
                </label>
                <label className={`radio-option-card ${formData.hasExperience === 'Yes' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="hasExperience"
                    value="Yes"
                    checked={formData.hasExperience === 'Yes'}
                    onChange={() => handleFieldChange('hasExperience', 'Yes')}
                  />
                  <span>Yes — Experienced</span>
                </label>
              </div>
            </div>

            {/* If Experienced: Display Required Experience Fields */}
            {formData.hasExperience === 'Yes' && (
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                <h4 style={{ margin: '0 0 1.25rem 0', fontSize: '1.05rem', fontWeight: '800', color: '#0b2a6b' }}>
                  Professional Experience Details
                </h4>

                <div className="form-fields-grid">
                  <div className="form-field-group">
                    <div className="field-label-row">
                      <label className="field-label" htmlFor="field-expYears">Years of Work Experience</label>
                      <span className="field-badge-required">Required</span>
                    </div>
                    <select
                      id="field-expYears"
                      className="app-form-select"
                      value={formData.experienceYears}
                      onChange={(e) => handleFieldChange('experienceYears', e.target.value)}
                    >
                      {WORK_EXP_YEAR_OPTIONS.map(yr => (
                        <option key={yr} value={yr}>{yr} {yr === '1' ? 'Year' : 'Years'}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field-group">
                    <div className="field-label-row">
                      <label className="field-label" htmlFor="field-expMonths">Additional Duration (Months)</label>
                      <span className="field-badge-required">Required</span>
                    </div>
                    <select
                      id="field-expMonths"
                      className="app-form-select"
                      value={formData.experienceMonths}
                      onChange={(e) => handleFieldChange('experienceMonths', e.target.value)}
                    >
                      {WORK_EXP_MONTH_OPTIONS.map(mo => (
                        <option key={mo} value={mo}>{mo} {mo === '1' ? 'Month' : 'Months'}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field-group">
                    <div className="field-label-row">
                      <label className="field-label" htmlFor="field-companyName">Company Name</label>
                      <span className="field-badge-required">Required</span>
                    </div>
                    <input
                      id="field-companyName"
                      type="text"
                      className={`app-form-input ${errors.companyName ? 'has-error' : ''}`}
                      value={formData.companyName}
                      onChange={(e) => handleFieldChange('companyName', e.target.value)}
                      placeholder="e.g. Infosys, TCS, Startup Inc."
                    />
                    {errors.companyName && <span className="field-error-text">{errors.companyName}</span>}
                  </div>

                  <div className="form-field-group">
                    <div className="field-label-row">
                      <label className="field-label" htmlFor="field-jobRole">Job Title / Role</label>
                      <span className="field-badge-required">Required</span>
                    </div>
                    <input
                      id="field-jobRole"
                      type="text"
                      className={`app-form-input ${errors.jobRole ? 'has-error' : ''}`}
                      value={formData.jobRole}
                      onChange={(e) => handleFieldChange('jobRole', e.target.value)}
                      placeholder="e.g. Software Engineer, QA Analyst"
                    />
                    {errors.jobRole && <span className="field-error-text">{errors.jobRole}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* Mandatory CV / Resume Upload */}
            <div style={{ marginTop: '1.5rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.05rem', fontWeight: '800', color: '#0b2a6b' }}>
                Curriculum Vitae (CV) / Resume
              </h4>
              <p style={{ margin: '0 0 1rem 0', color: '#64748b', fontSize: '0.88rem' }}>
                All candidates must upload an up-to-date resume highlighting their academic history, technical projects, and skills.
              </p>
              {renderDocumentUploadCard(
                'cvDocument',
                DOCUMENT_DEFINITIONS.cvDocument.title,
                DOCUMENT_DEFINITIONS.cvDocument.required,
                DOCUMENT_DEFINITIONS.cvDocument.helper,
                '.pdf,.doc,.docx'
              )}
            </div>

            {/* Step Navigation Bar */}
            <div className="app-step-actions">
              <div className="app-action-left">
                <button type="button" className="btn btn-secondary" onClick={handlePrevSection}>
                  ← Back to Academics
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleSaveDraft}>
                  Save Draft
                </button>
              </div>
              <div className="app-action-right">
                <button type="button" className="btn btn-primary" onClick={handleNextSection}>
                  <span>Continue to Purpose Statement</span>
                  <ArrowRightIcon size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 5: PURPOSE OF JOINING MSIT
            ========================================================================= */}
        {currentStep === 5 && (
          <div className="form-section-card">
            <div className="form-section-header">
              <span className="form-section-kicker">SECTION 5 OF 8</span>
              <h3 className="form-section-title">Purpose of Joining MSIT</h3>
              <p className="form-section-desc">
                Tell us about your interests, learning goals, and career aspirations. (Maximum 200 words).
              </p>
            </div>

            <div className="form-field-group">
              <div className="field-label-row">
                <label className="field-label" htmlFor="field-statementText">
                  Why do you want to join MSIT, and what do you hope to achieve through the programme?
                </label>
                <span className="field-badge-required">Required</span>
              </div>
              <p className="field-helper-hint" style={{ marginTop: 0, marginBottom: '0.5rem' }}>
                Helper guidance: “Tell us about your interests, learning goals, and career aspirations.”
              </p>
              <textarea
                id="field-statementText"
                rows={7}
                className={`app-form-textarea ${errors.statementText ? 'has-error' : ''}`}
                value={formData.statementText}
                onChange={(e) => handleFieldChange('statementText', e.target.value)}
                placeholder="Write your response here in your own words (maximum 200 words)..."
              />

              <div className="statement-counter-bar">
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Word Limit: Maximum 200 words strictly evaluated
                </span>
                <span className={`word-count-badge ${currentStatementWords > 200 ? 'is-over' : (currentStatementWords > 0 ? 'is-valid' : '')}`}>
                  {currentStatementWords} / 200 words
                </span>
              </div>

              {errors.statementText && <span className="field-error-text">{errors.statementText}</span>}
            </div>

            {/* Step Navigation Bar */}
            <div className="app-step-actions">
              <div className="app-action-left">
                <button type="button" className="btn btn-secondary" onClick={handlePrevSection}>
                  ← Back to Work Experience
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleSaveDraft}>
                  Save Draft
                </button>
              </div>
              <div className="app-action-right">
                <button type="button" className="btn btn-primary" onClick={handleNextSection}>
                  <span>Continue to Referral Source</span>
                  <ArrowRightIcon size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 6: HOW DID YOU HEAR ABOUT MSIT?
            ========================================================================= */}
        {currentStep === 6 && (
          <div className="form-section-card">
            <div className="form-section-header">
              <span className="form-section-kicker">SECTION 6 OF 8</span>
              <h3 className="form-section-title">How Did You Hear About MSIT?</h3>
              <p className="form-section-desc">
                Help us understand how prospective candidates discover the MSIT programme.
              </p>
            </div>

            <div className="form-field-group" style={{ marginBottom: '1.5rem' }}>
              <div className="field-label-row">
                <label className="field-label">How did you hear about the MSIT programme?</label>
                <span className="field-badge-required">Required</span>
              </div>
              <div className="experience-radio-group">
                {REFERRAL_SOURCE_OPTIONS.map(opt => (
                  <label 
                    key={opt} 
                    className={`radio-option-card ${formData.referralSource === opt ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="referralSource"
                      value={opt}
                      checked={formData.referralSource === opt}
                      onChange={() => handleFieldChange('referralSource', opt)}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
              {errors.referralSource && <span className="field-error-text">{errors.referralSource}</span>}
            </div>

            {/* Conditional "Other" text field */}
            {formData.referralSource === 'Other' && (
              <div className="form-field-group" style={{ maxWidth: '540px', marginTop: '1rem' }}>
                <div className="field-label-row">
                  <label className="field-label" htmlFor="field-referralExplanation">
                    Please specify how you heard about MSIT
                  </label>
                  <span className="field-badge-required">Required</span>
                </div>
                <input
                  id="field-referralExplanation"
                  type="text"
                  className={`app-form-input ${errors.referralExplanation ? 'has-error' : ''}`}
                  value={formData.referralExplanation}
                  onChange={(e) => handleFieldChange('referralExplanation', e.target.value)}
                  placeholder="e.g. University seminar, newspaper advertisement, faculty recommendation"
                />
                {errors.referralExplanation && <span className="field-error-text">{errors.referralExplanation}</span>}
              </div>
            )}

            {/* Step Navigation Bar */}
            <div className="app-step-actions">
              <div className="app-action-left">
                <button type="button" className="btn btn-secondary" onClick={handlePrevSection}>
                  ← Back to Purpose Statement
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleSaveDraft}>
                  Save Draft
                </button>
              </div>
              <div className="app-action-right">
                <button type="button" className="btn btn-primary" onClick={handleNextSection}>
                  <span>Continue to Entrance Examination Details</span>
                  <ArrowRightIcon size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 7: ENTRANCE EXAMINATION DETAILS
            ========================================================================= */}
        {currentStep === 7 && (
          <div className="form-section-card">
            <div className="form-section-header">
              <span className="form-section-kicker">SECTION 7 OF 8</span>
              <h3 className="form-section-title">Entrance Examination Details</h3>
              <p className="form-section-desc">
                Provide your GRE or GATE examination details if you have taken either examination.
              </p>
            </div>

            <div className="form-field-group" style={{ marginBottom: '1.75rem' }}>
              <div className="field-label-row">
                <label className="field-label">Have you taken GRE or GATE?</label>
                <span className="field-badge-required">Required</span>
              </div>
              <div className="experience-radio-group">
                {ENTRANCE_EXAM_OPTIONS.map(opt => (
                  <label 
                    key={opt} 
                    className={`radio-option-card ${formData.entranceExamStatus === opt ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="entranceExamStatus"
                      value={opt}
                      checked={formData.entranceExamStatus === opt}
                      onChange={() => handleFieldChange('entranceExamStatus', opt)}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* If Neither: Helpful note */}
            {formData.entranceExamStatus === 'Neither' && (
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem', color: '#475569' }}>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                  No entrance examination details are required for this admission route. You may proceed directly to the Review &amp; Submit section.
                </p>
              </div>
            )}

            {/* If GRE is selected (or Both) */}
            {(formData.entranceExamStatus === 'GRE' || formData.entranceExamStatus === 'Both') && (
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.75rem' }}>
                <h4 style={{ margin: '0 0 1.25rem 0', fontSize: '1.05rem', fontWeight: '800', color: '#0b2a6b' }}>
                  GRE Examination Details
                </h4>

                <div className="form-fields-grid" style={{ marginBottom: '1.25rem' }}>
                  <div className="form-field-group">
                    <div className="field-label-row">
                      <label className="field-label" htmlFor="field-greScore">GRE Score</label>
                      <span className="field-badge-required">Required</span>
                    </div>
                    <input
                      id="field-greScore"
                      type="number"
                      className={`app-form-input ${errors.greScore ? 'has-error' : ''}`}
                      value={formData.greScore}
                      onChange={(e) => handleFieldChange('greScore', e.target.value)}
                      placeholder="e.g. 315"
                    />
                    {errors.greScore && <span className="field-error-text">{errors.greScore}</span>}
                  </div>

                  <div className="form-field-group">
                    <div className="field-label-row">
                      <label className="field-label" htmlFor="field-greYear">GRE Examination Year</label>
                      <span className="field-badge-optional">Optional</span>
                    </div>
                    <select
                      id="field-greYear"
                      className="app-form-select"
                      value={formData.greYear}
                      onChange={(e) => handleFieldChange('greYear', e.target.value)}
                    >
                      <option value="">Select Year</option>
                      {EXAM_YEAR_OPTIONS.map(yr => (
                        <option key={yr} value={yr}>{yr}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {renderDocumentUploadCard(
                  'greScorecardDoc',
                  DOCUMENT_DEFINITIONS.greScorecardDoc.title,
                  true,
                  DOCUMENT_DEFINITIONS.greScorecardDoc.helper
                )}
              </div>
            )}

            {/* If GATE is selected (or Both) */}
            {(formData.entranceExamStatus === 'GATE' || formData.entranceExamStatus === 'Both') && (
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.75rem' }}>
                <h4 style={{ margin: '0 0 1.25rem 0', fontSize: '1.05rem', fontWeight: '800', color: '#0b2a6b' }}>
                  GATE Examination Details
                </h4>

                <div className="form-fields-grid" style={{ marginBottom: '1.25rem' }}>
                  <div className="form-field-group">
                    <div className="field-label-row">
                      <label className="field-label" htmlFor="field-gateScore">GATE Score / Marks</label>
                      <span className="field-badge-required">Required</span>
                    </div>
                    <input
                      id="field-gateScore"
                      type="number"
                      className={`app-form-input ${errors.gateScore ? 'has-error' : ''}`}
                      value={formData.gateScore}
                      onChange={(e) => handleFieldChange('gateScore', e.target.value)}
                      placeholder="e.g. 520"
                    />
                    {errors.gateScore && <span className="field-error-text">{errors.gateScore}</span>}
                  </div>

                  <div className="form-field-group">
                    <div className="field-label-row">
                      <label className="field-label" htmlFor="field-gateYear">GATE Examination Year</label>
                      <span className="field-badge-optional">Optional</span>
                    </div>
                    <select
                      id="field-gateYear"
                      className="app-form-select"
                      value={formData.gateYear}
                      onChange={(e) => handleFieldChange('gateYear', e.target.value)}
                    >
                      <option value="">Select Year</option>
                      {EXAM_YEAR_OPTIONS.map(yr => (
                        <option key={yr} value={yr}>{yr}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {renderDocumentUploadCard(
                  'gateScorecardDoc',
                  DOCUMENT_DEFINITIONS.gateScorecardDoc.title,
                  true,
                  DOCUMENT_DEFINITIONS.gateScorecardDoc.helper
                )}
              </div>
            )}

            {/* Step Navigation Bar */}
            <div className="app-step-actions">
              <div className="app-action-left">
                <button type="button" className="btn btn-secondary" onClick={handlePrevSection}>
                  ← Back to Referral Source
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleSaveDraft}>
                  Save Draft
                </button>
              </div>
              <div className="app-action-right">
                <button type="button" className="btn btn-primary" onClick={handleNextSection}>
                  <span>Review &amp; Submit Application</span>
                  <ArrowRightIcon size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 8: REVIEW & SUBMIT APPLICATION
            ========================================================================= */}
        {currentStep === 8 && (
          <div className="form-section-card">
            <div className="form-section-header">
              <span className="form-section-kicker">SECTION 8 OF 8</span>
              <h3 className="form-section-title">Review & Submit Application</h3>
              <p className="form-section-desc">
                Review your application across all 7 sections. Click "Edit Section" on any item if you need to make changes before final submission.
              </p>
            </div>

            {/* Section 1 Review */}
            <div className="review-block-card">
              <div className="review-block-header">
                <h4 className="review-block-title">1. Personal & Contact Information</h4>
                <button type="button" className="review-edit-link" onClick={() => setCurrentStep(1)}>
                  Edit Section 1
                </button>
              </div>
              <div className="review-details-grid">
                <div className="review-item"><span className="review-item-label">Full Name</span><span className="review-item-val">{formData.fullName || '—'}</span></div>
                <div className="review-item"><span className="review-item-label">Email</span><span className="review-item-val">{formData.email || '—'}</span></div>
                <div className="review-item"><span className="review-item-label">Phone</span><span className="review-item-val">{formData.phone || '—'}</span></div>
                <div className="review-item"><span className="review-item-label">Date of Birth</span><span className="review-item-val">{formData.dob || '—'}</span></div>
                <div className="review-item" style={{ gridColumn: '1 / -1' }}><span className="review-item-label">Residential Address</span><span className="review-item-val">{formData.address || '—'}</span></div>
              </div>
            </div>

            {/* Section 2 Review */}
            <div className="review-block-card">
              <div className="review-block-header">
                <h4 className="review-block-title">2. Parent / Guardian Information</h4>
                <button type="button" className="review-edit-link" onClick={() => setCurrentStep(2)}>
                  Edit Section 2
                </button>
              </div>
              <div className="review-details-grid">
                <div className="review-item"><span className="review-item-label">Relationship</span><span className="review-item-val">{formData.parentRelationship}</span></div>
                <div className="review-item"><span className="review-item-label">{getParentNameLabel()}</span><span className="review-item-val">{formData.parentName || '—'}</span></div>
                <div className="review-item"><span className="review-item-label">{getParentPhoneLabel()}</span><span className="review-item-val">{formData.altPhone || '—'}</span></div>
              </div>
            </div>

            {/* Section 3 Review */}
            <div className="review-block-card">
              <div className="review-block-header">
                <h4 className="review-block-title">3. Academic Qualifications</h4>
                <button type="button" className="review-edit-link" onClick={() => setCurrentStep(3)}>
                  Edit Section 3
                </button>
              </div>
              <div className="review-details-grid">
                <div className="review-item"><span className="review-item-label">Class 10 Score</span><span className="review-item-val">{formData.class10Score ? `${formData.class10Score} (${formData.class10ScoreType})` : '—'}</span></div>
                <div className="review-item"><span className="review-item-label">Class 12 Pathway</span><span className="review-item-val">{formData.interPathway}</span></div>
                <div className="review-item"><span className="review-item-label">Class 12 Score</span><span className="review-item-val">{formData.interScore ? `${formData.interScore} (${formData.interScoreType})` : '—'}</span></div>
                <div className="review-item"><span className="review-item-label">Qualifying Degree</span><span className="review-item-val">{formData.ugDegree}</span></div>
                <div className="review-item"><span className="review-item-label">University / Institution</span><span className="review-item-val">{formData.university || '—'}</span></div>
                <div className="review-item"><span className="review-item-label">Department / Branch</span><span className="review-item-val">{formData.department || '—'}</span></div>
                <div className="review-item"><span className="review-item-label">Graduation Year</span><span className="review-item-val">{formData.passingYear}</span></div>
                <div className="review-item"><span className="review-item-label">Aggregate Score</span><span className="review-item-val">{formData.cgpa ? `${formData.cgpa} (${formData.gradingScale})` : '—'}</span></div>
              </div>
            </div>

            {/* Section 4 Review */}
            <div className="review-block-card">
              <div className="review-block-header">
                <h4 className="review-block-title">4. Work Experience & Resume</h4>
                <button type="button" className="review-edit-link" onClick={() => setCurrentStep(4)}>
                  Edit Section 4
                </button>
              </div>
              <div className="review-details-grid">
                <div className="review-item"><span className="review-item-label">Experience Status</span><span className="review-item-val">{formData.hasExperience === 'Yes' ? 'Experienced' : 'Fresher'}</span></div>
                {formData.hasExperience === 'Yes' && (
                  <>
                    <div className="review-item"><span className="review-item-label">Total Duration</span><span className="review-item-val">{formData.experienceYears} Yrs, {formData.experienceMonths} Mos</span></div>
                    <div className="review-item"><span className="review-item-label">Company Name</span><span className="review-item-val">{formData.companyName || '—'}</span></div>
                    <div className="review-item"><span className="review-item-label">Role / Job Title</span><span className="review-item-val">{formData.jobRole || '—'}</span></div>
                  </>
                )}
                <div className="review-item"><span className="review-item-label">CV / Resume Status</span><span className="review-item-val">{formData.cvDocument ? `Uploaded (${formData.cvDocument.fileName})` : 'Missing'}</span></div>
              </div>
            </div>

            {/* Section 5 Review */}
            <div className="review-block-card">
              <div className="review-block-header">
                <h4 className="review-block-title">5. Purpose of Joining MSIT</h4>
                <button type="button" className="review-edit-link" onClick={() => setCurrentStep(5)}>
                  Edit Section 5
                </button>
              </div>
              <div>
                <span className="review-item-label">Statement ({currentStatementWords} / 200 words)</span>
                <p style={{ fontStyle: 'italic', background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0', margin: 0, fontSize: '0.9rem' }}>
                  "{formData.statementText || 'No statement provided yet'}"
                </p>
              </div>
            </div>

            {/* Section 6 Review */}
            <div className="review-block-card">
              <div className="review-block-header">
                <h4 className="review-block-title">6. How Did You Hear About MSIT?</h4>
                <button type="button" className="review-edit-link" onClick={() => setCurrentStep(6)}>
                  Edit Section 6
                </button>
              </div>
              <div className="review-details-grid">
                <div className="review-item"><span className="review-item-label">Referral Source</span><span className="review-item-val">{formData.referralSource || '—'}</span></div>
                {formData.referralExplanation && (
                  <div className="review-item"><span className="review-item-label">Specification</span><span className="review-item-val">{formData.referralExplanation}</span></div>
                )}
              </div>
            </div>

            {/* Section 7 Review */}
            <div className="review-block-card">
              <div className="review-block-header">
                <h4 className="review-block-title">7. Entrance Examination Details</h4>
                <button type="button" className="review-edit-link" onClick={() => setCurrentStep(7)}>
                  Edit Section 7
                </button>
              </div>
              <div className="review-details-grid">
                <div className="review-item"><span className="review-item-label">Exam Taken</span><span className="review-item-val">{formData.entranceExamStatus}</span></div>
                {(formData.entranceExamStatus === 'GRE' || formData.entranceExamStatus === 'Both') && (
                  <div className="review-item"><span className="review-item-label">GRE Score</span><span className="review-item-val">{formData.greScore ? `${formData.greScore} (${formData.greYear || 'N/A'})` : '—'}</span></div>
                )}
                {(formData.entranceExamStatus === 'GATE' || formData.entranceExamStatus === 'Both') && (
                  <div className="review-item"><span className="review-item-label">GATE Score</span><span className="review-item-val">{formData.gateScore ? `${formData.gateScore} (${formData.gateYear || 'N/A'})` : '—'}</span></div>
                )}
              </div>
            </div>

            {/* Comprehensive Document Verification Status Checklist */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.05rem', fontWeight: '800', color: '#0b2a6b' }}>
                Application Document Verification Checklist
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {/* Class 10 Doc */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>Class 10 Marksheet / Memo</span>
                  {formData.documents?.class10Doc ? (
                    <span style={{ color: '#059669', fontSize: '0.85rem', fontWeight: '700' }}>✓ Uploaded ({formData.documents.class10Doc.fileName || formData.documents.class10Doc.file_name})</span>
                  ) : (
                    <span style={{ color: '#dc2626', fontSize: '0.85rem', fontWeight: '700' }}>✗ Required — Missing</span>
                  )}
                </div>

                {/* Class 12 Doc */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>Class 12 / Intermediate Marksheet</span>
                  {formData.documents?.class12Doc ? (
                    <span style={{ color: '#059669', fontSize: '0.85rem', fontWeight: '700' }}>✓ Uploaded ({formData.documents.class12Doc.fileName || formData.documents.class12Doc.file_name})</span>
                  ) : (
                    <span style={{ color: '#dc2626', fontSize: '0.85rem', fontWeight: '700' }}>✗ Required — Missing</span>
                  )}
                </div>

                {/* Degree Marksheet */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>Qualifying Degree Consolidated Marksheet</span>
                  {formData.documents?.ugDegreeDoc ? (
                    <span style={{ color: '#059669', fontSize: '0.85rem', fontWeight: '700' }}>✓ Uploaded ({formData.documents.ugDegreeDoc.fileName || formData.documents.ugDegreeDoc.file_name})</span>
                  ) : (
                    <span style={{ color: '#dc2626', fontSize: '0.85rem', fontWeight: '700' }}>✗ Required — Missing</span>
                  )}
                </div>

                {/* Degree Certificate */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>Degree / Provisional Certificate</span>
                  {formData.documents?.degreeCertDoc ? (
                    <span style={{ color: '#059669', fontSize: '0.85rem', fontWeight: '700' }}>✓ Uploaded ({formData.documents.degreeCertDoc.fileName || formData.documents.degreeCertDoc.file_name})</span>
                  ) : (
                    <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Optional</span>
                  )}
                </div>

                {/* Conditional 16-Year Proof */}
                {requires16YearProof(formData.ugDegree) && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>16-Year Education Proof ({formData.ugDegree})</span>
                    {formData.documents?.additionalDegree16YearDoc ? (
                      <span style={{ color: '#059669', fontSize: '0.85rem', fontWeight: '700' }}>✓ Uploaded ({formData.documents.additionalDegree16YearDoc.fileName || formData.documents.additionalDegree16YearDoc.file_name})</span>
                    ) : (
                      <span style={{ color: '#dc2626', fontSize: '0.85rem', fontWeight: '700' }}>✗ Required — Missing</span>
                    )}
                  </div>
                )}

                {/* CV / Resume */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>Curriculum Vitae (CV) / Resume</span>
                  {formData.cvDocument ? (
                    <span style={{ color: '#059669', fontSize: '0.85rem', fontWeight: '700' }}>✓ Uploaded ({formData.cvDocument.fileName})</span>
                  ) : (
                    <span style={{ color: '#dc2626', fontSize: '0.85rem', fontWeight: '700' }}>✗ Required — Missing</span>
                  )}
                </div>

                {/* GRE Scorecard if applicable */}
                {(formData.entranceExamStatus === 'GRE' || formData.entranceExamStatus === 'Both') && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>GRE Scorecard</span>
                    {formData.documents?.greScorecardDoc ? (
                      <span style={{ color: '#059669', fontSize: '0.85rem', fontWeight: '700' }}>✓ Uploaded ({formData.documents.greScorecardDoc.fileName || formData.documents.greScorecardDoc.file_name})</span>
                    ) : (
                      <span style={{ color: '#dc2626', fontSize: '0.85rem', fontWeight: '700' }}>✗ Required — Missing</span>
                    )}
                  </div>
                )}

                {/* GATE Scorecard if applicable */}
                {(formData.entranceExamStatus === 'GATE' || formData.entranceExamStatus === 'Both') && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>GATE Scorecard</span>
                    {formData.documents?.gateScorecardDoc ? (
                      <span style={{ color: '#059669', fontSize: '0.85rem', fontWeight: '700' }}>✓ Uploaded ({formData.documents.gateScorecardDoc.fileName || formData.documents.gateScorecardDoc.file_name})</span>
                    ) : (
                      <span style={{ color: '#dc2626', fontSize: '0.85rem', fontWeight: '700' }}>✗ Required — Missing</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Declaration & Submission Action */}
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckCircleIcon size={20} className="text-success" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h5 style={{ margin: '0 0 0.35rem 0', color: '#166534', fontWeight: '700' }}>
                    Candidate Verification Declaration
                  </h5>
                  <p style={{ margin: 0, fontSize: '0.86rem', color: '#14532d', lineHeight: '1.45' }}>
                    I hereby declare that the particulars furnished above are true and complete to the best of my knowledge and that the uploaded transcripts are genuine representations of my academic records.
                  </p>
                </div>
              </div>
            </div>

            {/* Step Navigation Bar */}
            <div className="app-step-actions">
              <div className="app-action-left">
                <button type="button" className="btn btn-secondary" onClick={handlePrevSection}>
                  ← Back to Entrance Exams
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleSaveDraft}>
                  Save Draft
                </button>
              </div>
              <div className="app-action-right">
                <button
                  type="button"
                  className="btn btn-primary btn-submit-app"
                  disabled={isSubmitting}
                  onClick={handleSubmitApplication}
                >
                  <span>{isSubmitting ? 'Submitting Application...' : (portalMode === 'edit' ? 'Update & Re-submit Application' : 'Submit Application')}</span>
                  <ArrowRightIcon size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
