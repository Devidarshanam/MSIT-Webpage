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
  MailIcon
} from '../components/Icons';
import { 
  APPLICATION_CONFIG, 
  INITIAL_APPLICATION_STATE, 
  UG_DEGREE_OPTIONS, 
  DEPARTMENT_OPTIONS, 
  PASSING_YEAR_OPTIONS,
  GRADING_SCALE_OPTIONS,
  REFERRAL_SOURCE_OPTIONS,
  ACADEMIC_DOC_DEFINITIONS
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

  // Load existing application or saved draft on mount
  useEffect(() => {
    let isMounted = true;
    async function loadInitialData() {
      if (!user?.email) return;

      const resolvedName = getStudentDisplayName(user);
      const email = user.email.toLowerCase();

      try {
        const { application: app, status } = await getUserApplication(user);

        if (!isMounted) return;

        if (app && app.status && app.status !== 'Draft') {
          // Application has already been submitted
          setServerApp(app);
          setFormData({
            ...INITIAL_APPLICATION_STATE,
            ...app,
            fullName: app.full_name || resolvedName,
            email: app.email || email,
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
            email: email
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

  // Handle generic field change
  const handleFieldChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      return updated;
    });
    setIsDraftDirty(true);
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // Explicit Save Draft action
  const handleSaveDraft = async () => {
    if (!user?.email) return;
    try {
      const res = await saveApplicationDraft(formData, user);
      if (res.success) {
        setIsDraftDirty(false);
        setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    } catch (err) {
      console.warn('[MSIT] Save draft warning:', err);
    }
  };

  // Word counter calculation for Section F (200 words max)
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

      if (docTypeKey === 'cvDocument') {
        setFormData(prev => ({ ...prev, cvDocument: res.data }));
      } else if (docTypeKey === 'entranceScorecardDoc') {
        setFormData(prev => ({ ...prev, entranceScorecardDoc: res.data }));
      } else {
        setFormData(prev => ({
          ...prev,
          documents: {
            ...prev.documents,
            [docTypeKey]: res.data
          }
        }));
      }

      setIsDraftDirty(true);
    } catch (err) {
      setUploadProgress(prev => ({ ...prev, [docTypeKey]: false }));
      setErrors(prev => ({ ...prev, [docTypeKey]: 'Upload failed. Please check file format and try again.' }));
    }
  };

  // Validate step fields
  const validateStep = (stepNumber) => {
    const errs = {};

    if (stepNumber === 1) {
      if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
      if (!formData.email.trim()) errs.email = 'Email Address is required';
      if (!formData.phone.trim()) errs.phone = 'Mobile Phone Number is required';
      if (!formData.university.trim()) errs.university = 'University / Institution name is required';
      if (!formData.cgpa.trim()) {
        errs.cgpa = 'Aggregate score or CGPA is required';
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
    }

    if (stepNumber === 2) {
      // Academic documents
      ACADEMIC_DOC_DEFINITIONS.forEach(docDef => {
        if (docDef.required && (!formData.documents || !formData.documents[docDef.key])) {
          errs[docDef.key] = `${docDef.title} is required`;
        }
      });
    }

    if (stepNumber === 3) {
      // CV is mandatory
      if (!formData.cvDocument) {
        errs.cvDocument = 'CV / Resume upload is required before submitting your application';
      }
    }

    if (stepNumber === 4) {
      // Statement of Purpose
      if (!formData.statementText.trim()) {
        errs.statementText = 'Please provide your statement about MSIT';
      } else if (currentStatementWords > APPLICATION_CONFIG.statementMaxWords) {
        errs.statementText = `Your statement exceeds the 200-word limit (${currentStatementWords} words). Please edit to 200 words or less.`;
      }

      // Referral source
      if (!formData.referralSource) {
        errs.referralSource = 'Please tell us how you heard about MSIT';
      } else if (formData.referralSource === 'Other' && !formData.referralExplanation.trim()) {
        errs.referralExplanation = 'Please specify how you heard about MSIT';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      handleSaveDraft();
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Final Application Submission
  const handleSubmitApplication = async (e) => {
    e.preventDefault();

    // Re-verify all steps
    for (let s = 1; s <= 4; s++) {
      if (!validateStep(s)) {
        setCurrentStep(s);
        return;
      }
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

  return (
    <div className="single-app-wrapper">
      {/* Top Application Bar */}
      <header className="single-app-header">
        <div className="container single-app-header-inner">
          <div className="single-app-brand">
            <img
              src="/assets/msit-logo.png"
              alt="MSIT Logo"
              className="single-app-logo"
            />
            <div>
              <span className="brand-title">MSIT Application Portal</span>
              <span className="brand-cohort">{APPLICATION_CONFIG.cohort} • IIIT Hyderabad</span>
            </div>
          </div>

          <div className="single-app-controls">
            {portalMode !== 'view' && portalMode !== 'success' && (
              <>
                {lastSavedTime && (
                  <span className="draft-saved-pill">
                    <CheckCircleIcon size={13} />
                    <span>Draft Saved: {lastSavedTime}</span>
                  </span>
                )}
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleSaveDraft}
                  title="Save current progress"
                >
                  Save Draft
                </button>
              </>
            )}

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => navigate('/programme')}
            >
              Exit to Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="multi-section-app-container">
        {/* ============================================================
            VIEW MODE BANNER (When application is already submitted)
            ============================================================ */}
        {portalMode === 'view' && (
          <div className="app-view-banner">
            <CheckCircleIcon size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '1.05rem', display: 'block', marginBottom: '0.25rem' }}>
                Application Recorded — {formData.applicationId || 'Submitted'}
              </strong>
              <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>
                Your prospective student application is currently recorded with MSIT Admissions. You can review your submitted details and uploaded credentials below. If you require document adjustments or updates, please reach out to the admissions office at <strong>{APPLICATION_CONFIG.supportEmail}</strong>.
              </p>
            </div>
          </div>
        )}

        {/* ============================================================
            EDIT MODE BANNER (Admissions requested updates)
            ============================================================ */}
        {portalMode === 'edit' && (
          <div className="app-edit-banner">
            <ClockIcon size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '1.05rem', display: 'block', marginBottom: '0.25rem' }}>
                Admissions Update Requested
              </strong>
              <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>
                {serverApp?.decision_reason 
                  ? `Admissions Note: "${serverApp.decision_reason}". Please update the requested fields or documents below and submit your changes.`
                  : 'The admissions committee has requested updates to your submitted application details or documents. Please make the required changes below and resubmit.'}
              </p>
            </div>
          </div>
        )}

        {/* ============================================================
            STEPPER NAVIGATION TABS (Sections A - H)
            ============================================================ */}
        {portalMode !== 'success' && (
          <nav className="app-stepper-wrap" aria-label="Application Stepper">
            <button
              type="button"
              className={`stepper-tab-btn ${currentStep === 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}
              onClick={() => setCurrentStep(1)}
            >
              <span className="stepper-tab-num">1</span>
              <span>A &amp; B. Candidate &amp; Academics</span>
            </button>

            <button
              type="button"
              className={`stepper-tab-btn ${currentStep === 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}
              onClick={() => { if (validateStep(1)) setCurrentStep(2); }}
            >
              <span className="stepper-tab-num">2</span>
              <span>C. Academic Documents</span>
            </button>

            <button
              type="button"
              className={`stepper-tab-btn ${currentStep === 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`}
              onClick={() => { if (validateStep(1) && validateStep(2)) setCurrentStep(3); }}
            >
              <span className="stepper-tab-num">3</span>
              <span>D &amp; E. Exams &amp; CV</span>
            </button>

            <button
              type="button"
              className={`stepper-tab-btn ${currentStep === 4 ? 'active' : ''} ${currentStep > 4 ? 'completed' : ''}`}
              onClick={() => { if (validateStep(1) && validateStep(2) && validateStep(3)) setCurrentStep(4); }}
            >
              <span className="stepper-tab-num">4</span>
              <span>F &amp; G. Statement &amp; Source</span>
            </button>

            <button
              type="button"
              className={`stepper-tab-btn ${currentStep === 5 ? 'active' : ''}`}
              onClick={() => {
                if (validateStep(1) && validateStep(2) && validateStep(3) && validateStep(4)) {
                  setCurrentStep(5);
                }
              }}
            >
              <span className="stepper-tab-num">5</span>
              <span>H. Review &amp; Submit</span>
            </button>
          </nav>
        )}

        {/* ============================================================
            STEP 1: SECTION A (Candidate Details) & SECTION B (Academic Details)
            ============================================================ */}
        {currentStep === 1 && portalMode !== 'success' && (
          <div className="form-section-card">
            <div className="form-section-header">
              <span className="form-section-kicker">Section A &amp; B</span>
              <h2 className="form-section-title">Candidate &amp; Undergraduate Academic Details</h2>
              <p className="form-section-desc">
                Your registered candidate details are prefilled below. Enter your undergraduate degree information and aggregate score.
              </p>
            </div>

            <div className="form-fields-grid">
              {/* Section A: Candidate Details */}
              <div>
                <div className="field-label-row">
                  <label htmlFor="fullName" className="field-label">Full Name</label>
                  <span className="field-badge-required">Required</span>
                </div>
                <input
                  id="fullName"
                  type="text"
                  className={`app-form-input ${errors.fullName ? 'has-error' : ''}`}
                  value={formData.fullName}
                  onChange={(e) => handleFieldChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  disabled={portalMode === 'view'}
                />
                {errors.fullName && <span className="field-error-text">{errors.fullName}</span>}
              </div>

              <div>
                <div className="field-label-row">
                  <label htmlFor="email" className="field-label">Verified Email Address</label>
                  <span className="field-badge-required">Read-Only</span>
                </div>
                <input
                  id="email"
                  type="email"
                  className="app-form-input is-readonly"
                  value={formData.email}
                  readOnly
                  title="Prefilled from your verified Magic Link session"
                />
              </div>

              <div className="form-field-full">
                <div className="field-label-row">
                  <label htmlFor="phone" className="field-label">Mobile Contact Number</label>
                  <span className="field-badge-required">Required</span>
                </div>
                <input
                  id="phone"
                  type="tel"
                  className={`app-form-input ${errors.phone ? 'has-error' : ''}`}
                  value={formData.phone}
                  onChange={(e) => handleFieldChange('phone', e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  disabled={portalMode === 'view'}
                />
                {errors.phone && <span className="field-error-text">{errors.phone}</span>}
              </div>

              {/* Section B: Academic Details */}
              <div>
                <div className="field-label-row">
                  <label htmlFor="ugDegree" className="field-label">Qualifying Undergraduate Degree</label>
                  <span className="field-badge-required">Required</span>
                </div>
                <select
                  id="ugDegree"
                  className="app-form-select"
                  value={formData.ugDegree}
                  onChange={(e) => handleFieldChange('ugDegree', e.target.value)}
                  disabled={portalMode === 'view'}
                >
                  {UG_DEGREE_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="field-label-row">
                  <label htmlFor="university" className="field-label">University / Institution Name</label>
                  <span className="field-badge-required">Required</span>
                </div>
                <input
                  id="university"
                  type="text"
                  className={`app-form-input ${errors.university ? 'has-error' : ''}`}
                  value={formData.university}
                  onChange={(e) => handleFieldChange('university', e.target.value)}
                  placeholder="e.g. Osmania University / JNTU / Delhi University"
                  disabled={portalMode === 'view'}
                />
                {errors.university && <span className="field-error-text">{errors.university}</span>}
              </div>

              <div>
                <div className="field-label-row">
                  <label htmlFor="department" className="field-label">Department / Branch</label>
                  <span className="field-badge-required">Required</span>
                </div>
                <select
                  id="department"
                  className="app-form-select"
                  value={formData.department}
                  onChange={(e) => handleFieldChange('department', e.target.value)}
                  disabled={portalMode === 'view'}
                >
                  {DEPARTMENT_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="field-label-row">
                  <label htmlFor="passingYear" className="field-label">Year of Graduation / Passing</label>
                  <span className="field-badge-required">Required</span>
                </div>
                <select
                  id="passingYear"
                  className="app-form-select"
                  value={formData.passingYear}
                  onChange={(e) => handleFieldChange('passingYear', e.target.value)}
                  disabled={portalMode === 'view'}
                >
                  {PASSING_YEAR_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="field-label-row">
                  <label htmlFor="gradingScale" className="field-label">Grading Scale</label>
                  <span className="field-badge-required">Required</span>
                </div>
                <select
                  id="gradingScale"
                  className="app-form-select"
                  value={formData.gradingScale}
                  onChange={(e) => handleFieldChange('gradingScale', e.target.value)}
                  disabled={portalMode === 'view'}
                >
                  {GRADING_SCALE_OPTIONS.map(scale => (
                    <option key={scale.value} value={scale.value}>{scale.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="field-label-row">
                  <label htmlFor="cgpa" className="field-label">Aggregate Score / CGPA</label>
                  <span className="field-badge-required">Required</span>
                </div>
                <input
                  id="cgpa"
                  type="text"
                  className={`app-form-input ${errors.cgpa ? 'has-error' : ''}`}
                  value={formData.cgpa}
                  onChange={(e) => handleFieldChange('cgpa', e.target.value)}
                  placeholder={formData.gradingScale.includes('Percentage') ? 'e.g. 74.5%' : 'e.g. 8.2'}
                  disabled={portalMode === 'view'}
                />
                {errors.cgpa && <span className="field-error-text">{errors.cgpa}</span>}
              </div>

              {/* Informative 68% Eligibility Advisory Box */}
              {eligibilityAdvisory && (
                <div className="form-field-full">
                  <div className="eligibility-advisory-box">
                    <HelpCircleIcon size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong>Holistic Admission Consideration</strong>
                      <p>{eligibilityAdvisory.message}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="app-step-actions">
              <div className="app-action-left">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate('/programme')}
                >
                  Dashboard
                </button>
              </div>
              <div className="app-action-right">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNextStep}
                >
                  <span>Continue to Document Uploads</span>
                  <ArrowRightIcon size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            STEP 2: SECTION C (Academic Document Uploads)
            ============================================================ */}
        {currentStep === 2 && portalMode !== 'success' && (
          <div className="form-section-card">
            <div className="form-section-header">
              <span className="form-section-kicker">Section C</span>
              <h2 className="form-section-title">Academic Document Uploads</h2>
              <p className="form-section-desc">
                Upload scanned copies of your degree certificate, marksheets, and school memo proofs. Supported formats: PDF, JPG, PNG (Max 10 MB each).
              </p>
            </div>

            <div className="doc-upload-stack">
              {ACADEMIC_DOC_DEFINITIONS.map((docDef) => {
                const uploadedDoc = formData.documents?.[docDef.key];
                const isUploading = !!uploadProgress[docDef.key];
                const docError = errors[docDef.key];

                return (
                  <div 
                    key={docDef.key} 
                    className={`doc-upload-item-card ${uploadedDoc ? 'is-uploaded' : ''} ${isUploading ? 'is-uploading' : ''}`}
                  >
                    <div className="doc-upload-header">
                      <div>
                        <h3 className="doc-upload-title">{docDef.title}</h3>
                        <p className="doc-upload-sub">{docDef.subtitle}</p>
                        {docDef.isFlaggedOverlap && (
                          <div className="doc-overlap-note">
                            ℹ️ Note: If your state board issued a single combined certificate for 10th/SSC, you may upload it here.
                          </div>
                        )}
                      </div>
                      <span className={docDef.required ? 'field-badge-required' : 'field-badge-optional'}>
                        {docDef.required ? 'Required' : 'Optional'}
                      </span>
                    </div>

                    {uploadedDoc ? (
                      <div className="doc-file-uploaded-view">
                        <div className="doc-file-info">
                          <CheckCircleIcon size={18} color="#059669" />
                          <div>
                            <span className="doc-file-name">{uploadedDoc.fileName}</span>
                            <span className="doc-file-size" style={{ marginLeft: '0.5rem' }}>({uploadedDoc.fileSize})</span>
                          </div>
                        </div>
                        {portalMode !== 'view' && (
                          <label className="doc-replace-btn" htmlFor={`upload_${docDef.key}`}>
                            Replace File
                            <input
                              id={`upload_${docDef.key}`}
                              type="file"
                              accept={docDef.accept}
                              className="doc-file-input"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  handleFileUpload(e.target.files[0], docDef.key, docDef.title);
                                }
                              }}
                            />
                          </label>
                        )}
                      </div>
                    ) : (
                      <div>
                        {portalMode !== 'view' && (
                          <div className="doc-dropzone-row">
                            <label className="doc-select-file-btn" htmlFor={`upload_${docDef.key}`}>
                              <UploadIcon size={16} />
                              <span>Select {docDef.title}</span>
                              <input
                                id={`upload_${docDef.key}`}
                                type="file"
                                accept={docDef.accept}
                                className="doc-file-input"
                                disabled={isUploading}
                                onChange={(e) => {
                                  if (e.target.files?.[0]) {
                                    handleFileUpload(e.target.files[0], docDef.key, docDef.title);
                                  }
                                }}
                              />
                            </label>
                            <span className="doc-format-hint">Formats: PDF, JPG, PNG • Max size {docDef.maxSize}</span>
                          </div>
                        )}
                        {isUploading && (
                          <div className="doc-upload-progress">
                            <div className="doc-progress-bar-fill"></div>
                          </div>
                        )}
                        {docError && <span className="field-error-text">{docError}</span>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="app-step-actions">
              <div className="app-action-left">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handlePrevStep}
                >
                  Back
                </button>
              </div>
              <div className="app-action-right">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNextStep}
                >
                  <span>Continue to Entrance Exams &amp; CV</span>
                  <ArrowRightIcon size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            STEP 3: SECTION D (Entrance Exams) & SECTION E (CV / Resume)
            ============================================================ */}
        {currentStep === 3 && portalMode !== 'success' && (
          <div className="form-section-card">
            <div className="form-section-header">
              <span className="form-section-kicker">Section D &amp; E</span>
              <h2 className="form-section-title">Entrance Examination Details &amp; Curriculum Vitae (CV)</h2>
              <p className="form-section-desc">
                Provide optional national exam scores if taken. CV / Resume upload is mandatory for admissions review.
              </p>
            </div>

            {/* Section D: Entrance Examination Details */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0b2a6b', marginBottom: '0.85rem' }}>
                Section D — Entrance Examination Scores (Optional)
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1.25rem' }}>
                If you have taken GRE or GATE, enter your scores and upload your scorecard. Candidates without these scores may leave these fields blank.
              </p>

              <div className="form-fields-grid">
                <div>
                  <div className="field-label-row">
                    <label htmlFor="greScore" className="field-label">GRE Score (Optional)</label>
                    <span className="field-badge-optional">Optional</span>
                  </div>
                  <input
                    id="greScore"
                    type="text"
                    className="app-form-input"
                    value={formData.greScore || ''}
                    onChange={(e) => handleFieldChange('greScore', e.target.value)}
                    placeholder="e.g. 318 / 340"
                    disabled={portalMode === 'view'}
                  />
                </div>

                <div>
                  <div className="field-label-row">
                    <label htmlFor="gateScore" className="field-label">GATE Score / Rank (Optional)</label>
                    <span className="field-badge-optional">Optional</span>
                  </div>
                  <input
                    id="gateScore"
                    type="text"
                    className="app-form-input"
                    value={formData.gateScore || ''}
                    onChange={(e) => handleFieldChange('gateScore', e.target.value)}
                    placeholder="e.g. 540 Score / All India Rank 1850"
                    disabled={portalMode === 'view'}
                  />
                </div>

                <div className="form-field-full">
                  <div className="field-label-row">
                    <label className="field-label">Exam Scorecard Upload (Optional)</label>
                    <span className="field-badge-optional">Optional</span>
                  </div>

                  {formData.entranceScorecardDoc ? (
                    <div className="doc-file-uploaded-view">
                      <div className="doc-file-info">
                        <CheckCircleIcon size={18} color="#059669" />
                        <div>
                          <span className="doc-file-name">{formData.entranceScorecardDoc.fileName}</span>
                          <span className="doc-file-size" style={{ marginLeft: '0.5rem' }}>({formData.entranceScorecardDoc.fileSize})</span>
                        </div>
                      </div>
                      {portalMode !== 'view' && (
                        <label className="doc-replace-btn" htmlFor="upload_scorecard">
                          Replace Scorecard
                          <input
                            id="upload_scorecard"
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="doc-file-input"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleFileUpload(e.target.files[0], 'entranceScorecardDoc', 'Entrance Scorecard');
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>
                  ) : (
                    portalMode !== 'view' && (
                      <div className="doc-dropzone-row">
                        <label className="doc-select-file-btn" htmlFor="upload_scorecard">
                          <UploadIcon size={16} />
                          <span>Upload Scorecard (GRE / GATE)</span>
                          <input
                            id="upload_scorecard"
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="doc-file-input"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleFileUpload(e.target.files[0], 'entranceScorecardDoc', 'Entrance Scorecard');
                              }
                            }}
                          />
                        </label>
                        <span className="doc-format-hint">Formats: PDF, JPG, PNG • Max size 10 MB</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Section E: CV / Resume (Mandatory) */}
            <div style={{ paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
              <div className="field-label-row" style={{ marginBottom: '0.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0b2a6b', margin: 0 }}>
                  Section E — Curriculum Vitae (CV) / Resume
                </h3>
                <span className="field-badge-required">Mandatory</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1.25rem' }}>
                Upload your updated CV detailing your academic background, programming projects, internships, or technical work experience. Supported formats: PDF, DOC, DOCX (Max 5 MB).
              </p>

              {formData.cvDocument ? (
                <div className="doc-file-uploaded-view" style={{ borderColor: '#a7f3d0', background: '#f0fdf4' }}>
                  <div className="doc-file-info">
                    <CheckCircleIcon size={20} color="#059669" />
                    <div>
                      <span className="doc-file-name" style={{ fontSize: '0.95rem' }}>{formData.cvDocument.fileName}</span>
                      <span className="doc-file-size" style={{ marginLeft: '0.5rem' }}>({formData.cvDocument.fileSize})</span>
                    </div>
                  </div>
                  {portalMode !== 'view' && (
                    <label className="doc-replace-btn" htmlFor="upload_cv">
                      Replace CV
                      <input
                        id="upload_cv"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="doc-file-input"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleFileUpload(e.target.files[0], 'cvDocument', 'CV / Resume');
                          }
                        }}
                      />
                    </label>
                  )}
                </div>
              ) : (
                <div>
                  {portalMode !== 'view' && (
                    <div className="doc-dropzone-row">
                      <label className="doc-select-file-btn" htmlFor="upload_cv" style={{ background: '#2563eb' }}>
                        <UploadIcon size={16} />
                        <span>Upload CV / Resume (Required)</span>
                        <input
                          id="upload_cv"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="doc-file-input"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleFileUpload(e.target.files[0], 'cvDocument', 'CV / Resume');
                            }
                          }}
                        />
                      </label>
                      <span className="doc-format-hint">Formats: PDF, DOC, DOCX • Max size 5 MB</span>
                    </div>
                  )}
                  {uploadProgress.cvDocument && (
                    <div className="doc-upload-progress">
                      <div className="doc-progress-bar-fill"></div>
                    </div>
                  )}
                  {errors.cvDocument && <span className="field-error-text">{errors.cvDocument}</span>}
                </div>
              )}
            </div>

            <div className="app-step-actions">
              <div className="app-action-left">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handlePrevStep}
                >
                  Back
                </button>
              </div>
              <div className="app-action-right">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNextStep}
                >
                  <span>Continue to Statement &amp; Source</span>
                  <ArrowRightIcon size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            STEP 4: SECTION F (Statement about MSIT) & SECTION G (How did you hear)
            ============================================================ */}
        {currentStep === 4 && portalMode !== 'success' && (
          <div className="form-section-card">
            <div className="form-section-header">
              <span className="form-section-kicker">Section F &amp; G</span>
              <h2 className="form-section-title">Statement of Purpose &amp; Information Source</h2>
              <p className="form-section-desc">
                Express your motivation for joining MSIT and let us know how you learned about the programme.
              </p>
            </div>

            {/* Section F: Statement about MSIT */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div className="field-label-row">
                <label htmlFor="statementText" className="field-label" style={{ fontSize: '0.98rem' }}>
                  “In approximately 200 words, explain why you are interested in MSIT and what you hope to learn from the programme.”
                </label>
                <span className="field-badge-required">Required</span>
              </div>

              <textarea
                id="statementText"
                rows="6"
                className={`app-form-textarea ${errors.statementText ? 'has-error' : ''}`}
                value={formData.statementText}
                onChange={(e) => handleFieldChange('statementText', e.target.value)}
                placeholder="Write your explanation in your own words (approx. 200 words)..."
                disabled={portalMode === 'view'}
              />

              <div className="statement-counter-bar">
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Maximum 200 words permitted.
                </span>
                <span className={`word-count-badge ${currentStatementWords > 200 ? 'is-over' : currentStatementWords > 0 ? 'is-valid' : ''}`}>
                  {currentStatementWords} / 200 words
                </span>
              </div>
              {errors.statementText && <span className="field-error-text">{errors.statementText}</span>}
            </div>

            {/* Section G: How did you hear about MSIT? */}
            <div style={{ paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
              <div className="field-label-row">
                <label className="field-label" style={{ fontSize: '0.98rem' }}>
                  “How did you hear about the MSIT programme?”
                </label>
                <span className="field-badge-required">Required</span>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '0.75rem 0 1.25rem 0' }}>
                {REFERRAL_SOURCE_OPTIONS.map((opt) => (
                  <label key={opt} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500' }}>
                    <input
                      type="radio"
                      name="referralSource"
                      value={opt}
                      checked={formData.referralSource === opt}
                      onChange={(e) => handleFieldChange('referralSource', e.target.value)}
                      disabled={portalMode === 'view'}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
              {errors.referralSource && <span className="field-error-text">{errors.referralSource}</span>}

              {/* Reveal text field if "Other" is selected */}
              {formData.referralSource === 'Other' && (
                <div style={{ marginTop: '1rem' }}>
                  <div className="field-label-row">
                    <label htmlFor="referralExplanation" className="field-label">
                      Please specify how you heard about MSIT
                    </label>
                    <span className="field-badge-required">Required</span>
                  </div>
                  <input
                    id="referralExplanation"
                    type="text"
                    className={`app-form-input ${errors.referralExplanation ? 'has-error' : ''}`}
                    value={formData.referralExplanation}
                    onChange={(e) => handleFieldChange('referralExplanation', e.target.value)}
                    placeholder="e.g. University professor recommendation, tech webinar, career fair"
                    disabled={portalMode === 'view'}
                  />
                  {errors.referralExplanation && <span className="field-error-text">{errors.referralExplanation}</span>}
                </div>
              )}
            </div>

            <div className="app-step-actions">
              <div className="app-action-left">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handlePrevStep}
                >
                  Back
                </button>
              </div>
              <div className="app-action-right">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNextStep}
                >
                  <span>Review Application Summary</span>
                  <ArrowRightIcon size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            STEP 5: SECTION H (Review and Final Submission)
            ============================================================ */}
        {currentStep === 5 && portalMode !== 'success' && (
          <div className="form-section-card">
            <div className="form-section-header">
              <span className="form-section-kicker">Section H</span>
              <h2 className="form-section-title">Application Summary &amp; Final Submission</h2>
              <p className="form-section-desc">
                Review all details and documents prior to final submission. You may return to any section to make edits.
              </p>
            </div>

            {/* Block 1: Candidate Details */}
            <div className="review-block-card">
              <div className="review-block-header">
                <h3 className="review-block-title">Candidate &amp; Academic Credentials</h3>
                {portalMode !== 'view' && (
                  <button type="button" className="review-edit-link" onClick={() => setCurrentStep(1)}>
                    Edit Section
                  </button>
                )}
              </div>
              <div className="review-details-grid">
                <div className="review-item">
                  <span className="review-item-label">Full Name</span>
                  <span className="review-item-val">{formData.fullName}</span>
                </div>
                <div className="review-item">
                  <span className="review-item-label">Verified Email</span>
                  <span className="review-item-val">{formData.email}</span>
                </div>
                <div className="review-item">
                  <span className="review-item-label">Contact Phone</span>
                  <span className="review-item-val">{formData.phone || 'N/A'}</span>
                </div>
                <div className="review-item">
                  <span className="review-item-label">Degree</span>
                  <span className="review-item-val">{formData.ugDegree} ({formData.department})</span>
                </div>
                <div className="review-item">
                  <span className="review-item-label">University</span>
                  <span className="review-item-val">{formData.university || 'N/A'}</span>
                </div>
                <div className="review-item">
                  <span className="review-item-label">Graduation Year</span>
                  <span className="review-item-val">{formData.passingYear}</span>
                </div>
                <div className="review-item">
                  <span className="review-item-label">Score &amp; Scale</span>
                  <span className="review-item-val">{formData.cgpa} ({formData.gradingScale})</span>
                </div>
                {eligibilityAdvisory && (
                  <div className="review-item" style={{ gridColumn: '1 / -1' }}>
                    <span className="review-item-label">Advisory Status</span>
                    <span className="review-item-val" style={{ color: '#d97706' }}>
                      Undergraduate score noted below recommended {eligibilityAdvisory.thresholdLabel} threshold; eligible for holistic evaluation.
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Block 2: Documents */}
            <div className="review-block-card">
              <div className="review-block-header">
                <h3 className="review-block-title">Uploaded Academic Documents</h3>
                {portalMode !== 'view' && (
                  <button type="button" className="review-edit-link" onClick={() => setCurrentStep(2)}>
                    Edit Documents
                  </button>
                )}
              </div>
              <div className="review-details-grid">
                {ACADEMIC_DOC_DEFINITIONS.map(doc => {
                  const uploaded = formData.documents?.[doc.key];
                  return (
                    <div key={doc.key} className="review-item">
                      <span className="review-item-label">{doc.title}</span>
                      <span className="review-item-val" style={{ color: uploaded ? '#059669' : '#dc2626' }}>
                        {uploaded ? `✓ ${uploaded.fileName}` : '✗ Missing'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Block 3: Exams & CV */}
            <div className="review-block-card">
              <div className="review-block-header">
                <h3 className="review-block-title">Exams &amp; Curriculum Vitae</h3>
                {portalMode !== 'view' && (
                  <button type="button" className="review-edit-link" onClick={() => setCurrentStep(3)}>
                    Edit Section
                  </button>
                )}
              </div>
              <div className="review-details-grid">
                <div className="review-item">
                  <span className="review-item-label">GRE Score</span>
                  <span className="review-item-val">{formData.greScore || 'Not provided (Optional)'}</span>
                </div>
                <div className="review-item">
                  <span className="review-item-label">GATE Score</span>
                  <span className="review-item-val">{formData.gateScore || 'Not provided (Optional)'}</span>
                </div>
                <div className="review-item">
                  <span className="review-item-label">Curriculum Vitae (CV)</span>
                  <span className="review-item-val" style={{ color: formData.cvDocument ? '#059669' : '#dc2626' }}>
                    {formData.cvDocument ? `✓ ${formData.cvDocument.fileName}` : '✗ Missing (Mandatory)'}
                  </span>
                </div>
                <div className="review-item">
                  <span className="review-item-label">Scorecard Proof</span>
                  <span className="review-item-val">
                    {formData.entranceScorecardDoc ? `✓ ${formData.entranceScorecardDoc.fileName}` : 'None uploaded'}
                  </span>
                </div>
              </div>
            </div>

            {/* Block 4: Statement & Referral */}
            <div className="review-block-card">
              <div className="review-block-header">
                <h3 className="review-block-title">Statement of Purpose &amp; Referral Source</h3>
                {portalMode !== 'view' && (
                  <button type="button" className="review-edit-link" onClick={() => setCurrentStep(4)}>
                    Edit Section
                  </button>
                )}
              </div>
              <div>
                <div style={{ marginBottom: '1rem' }}>
                  <span className="review-item-label">Statement about MSIT ({currentStatementWords} / 200 words)</span>
                  <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.9rem', color: '#334155', fontStyle: 'italic', background: '#ffffff', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                    "{formData.statementText}"
                  </p>
                </div>
                <div className="review-details-grid">
                  <div className="review-item">
                    <span className="review-item-label">Referral Source</span>
                    <span className="review-item-val">{formData.referralSource}</span>
                  </div>
                  {formData.referralSource === 'Other' && (
                    <div className="review-item">
                      <span className="review-item-label">Referral Details</span>
                      <span className="review-item-val">{formData.referralExplanation}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="app-step-actions">
              <div className="app-action-left">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handlePrevStep}
                >
                  Back
                </button>
              </div>

              {portalMode !== 'view' && (
                <div className="app-action-right">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleSaveDraft}
                  >
                    Save Draft
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={isSubmitting || currentStatementWords > 200 || !formData.cvDocument}
                    onClick={handleSubmitApplication}
                    style={{ background: '#0b2a6b', borderColor: '#0b2a6b' }}
                  >
                    {isSubmitting ? (
                      <span>Submitting Application...</span>
                    ) : (
                      <>
                        <span>{portalMode === 'edit' ? 'Resubmit Application' : 'Submit Final Application'}</span>
                        <ArrowRightIcon size={16} />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================
            CONFIRMATION / SUCCESS VIEW (After successful submission)
            ============================================================ */}
        {portalMode === 'success' && (
          <div className="form-section-card" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2rem' }}>
              ✓
            </div>

            <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: '#0b2a6b', marginBottom: '0.5rem' }}>
              Application Successfully Submitted!
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#64748b', maxWidth: '580px', margin: '0 auto 1.75rem' }}>
              Thank you for applying to the Master of Science in Information Technology (MSIT) program. Your application has been logged and queued for admissions committee review.
            </p>

            <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem 2rem', display: 'inline-block', marginBottom: '2rem' }}>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                Official Application Reference Number
              </span>
              <strong style={{ fontSize: '1.45rem', letterSpacing: '0.05em', color: '#0b2a6b' }}>
                {formData.applicationId}
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate('/programme')}
              >
                <span>Return to Student Dashboard</span>
                <ArrowRightIcon size={16} />
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => window.print()}
              >
                <DownloadIcon size={16} />
                <span>Print Application Summary</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
