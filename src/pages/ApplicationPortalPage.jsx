import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  ArrowRightIcon, 
  HelpCircleIcon 
} from '../components/Icons';
import { 
  APPLICATION_CONFIG, 
  INITIAL_APPLICATION_STATE, 
  PARENT_RELATIONSHIP_OPTIONS,
  UG_DEGREE_OPTIONS, 
  DEPARTMENT_OPTIONS, 
  PASSING_YEAR_OPTIONS 
} from '../data/applicationConfig';

export default function ApplicationPortalPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const storageKey = `msit_single_app_draft_${user?.email || 'guest'}`;

  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load draft:', e);
    }
    return {
      ...INITIAL_APPLICATION_STATE,
      fullName: user?.displayName || '',
      email: user?.email || ''
    };
  });

  const [lastSavedTime, setLastSavedTime] = useState(null);
  const [errors, setErrors] = useState({});

  // Auto-fill user email/name if logged in and field is empty
  useEffect(() => {
    if (user?.email && !formData.email) {
      setFormData(prev => ({
        ...prev,
        email: user.email,
        fullName: prev.fullName || user.displayName || ''
      }));
    }
  }, [user]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const saveDraft = (dataToSave = formData) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(dataToSave));
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (e) {
      console.error('Failed to save draft:', e);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      saveDraft(updated);
      return updated;
    });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Mail id is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth (DOB) is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.parentName.trim()) newErrors.parentName = `${formData.parentRelationship || 'Parent'} name is required`;
    if (!formData.altPhone.trim()) newErrors.altPhone = `${formData.parentRelationship || 'Parent'} mobile number is required`;
    if (!formData.ugDegree) newErrors.ugDegree = 'UG Qualification degree is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.cgpa.trim()) newErrors.cgpa = 'CGPA or Percentage is required';
    if (!formData.passingYear) newErrors.passingYear = 'Year of passing is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to the first error
      window.scrollTo({ top: 180, behavior: 'smooth' });
      return;
    }

    const randomId = `MSIT-2027-${Math.floor(10000 + Math.random() * 90000)}`;
    const submissionData = {
      ...formData,
      isSubmitted: true,
      applicationId: randomId,
      submittedAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setFormData(submissionData);
    saveDraft(submissionData);
  };

  const handleResetForm = () => {
    if (window.confirm('Are you sure you want to clear this application form?')) {
      localStorage.removeItem(storageKey);
      setFormData({
        ...INITIAL_APPLICATION_STATE,
        fullName: user?.displayName || '',
        email: user?.email || ''
      });
      setErrors({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToDashboard = () => {
    navigate('/programme');
  };

  // SUCCESS / SUBMITTED SCREEN
  if (formData.isSubmitted) {
    return (
      <div className="single-app-wrapper">
        <header className="single-app-header">
          <div className="container single-app-header-inner">
            <div className="single-app-brand">
              <img 
                src="/assets/msit-logo.png" 
                alt="MSIT Logo" 
                className="single-app-logo"
              />
              <span className="brand-sep">|</span>
              <span className="brand-sub">MSIT Application</span>
            </div>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleBackToDashboard}
            >
              Return to Programme
            </button>
          </div>
        </header>

        <main className="container single-app-container">
          <div className="single-app-success-card">
            <div className="success-icon-badge">
              <CheckCircleIcon size={44} />
            </div>
            
            <span className="success-status-pill">Application Submitted</span>
            <h2>Thank You, {formData.fullName}!</h2>
            <p className="success-subtitle">
              Your application details for the <strong>{APPLICATION_CONFIG.cohort}</strong> have been recorded successfully.
            </p>

            <div className="application-ref-banner">
              <span>Application Reference Number:</span>
              <strong>{formData.applicationId}</strong>
            </div>

            {/* Application Data Summary Table */}
            <div className="submitted-data-table">
              <div className="table-row">
                <span className="col-label">Full Name:</span>
                <span className="col-val">{formData.fullName}</span>
              </div>
              <div className="table-row">
                <span className="col-label">Mail ID:</span>
                <span className="col-val">{formData.email}</span>
              </div>
              <div className="table-row">
                <span className="col-label">Phone Number:</span>
                <span className="col-val">{formData.phone}</span>
              </div>
              <div className="table-row">
                <span className="col-label">Date of Birth (DOB):</span>
                <span className="col-val">{formData.dob}</span>
              </div>
              <div className="table-row">
                <span className="col-label">Residential Address:</span>
                <span className="col-val">{formData.address}</span>
              </div>
              <div className="table-row">
                <span className="col-label">{formData.parentRelationship || 'Parent'} Name:</span>
                <span className="col-val">{formData.parentName}</span>
              </div>
              <div className="table-row">
                <span className="col-label">{formData.parentRelationship || 'Parent'} Mobile Number:</span>
                <span className="col-val">{formData.altPhone}</span>
              </div>
              <div className="table-row">
                <span className="col-label">UG Qualification Degree:</span>
                <span className="col-val">{formData.ugDegree}</span>
              </div>
              <div className="table-row">
                <span className="col-label">Department / Branch:</span>
                <span className="col-val">{formData.department}</span>
              </div>
              <div className="table-row">
                <span className="col-label">CGPA / Percentage:</span>
                <span className="col-val">{formData.cgpa}</span>
              </div>
              <div className="table-row">
                <span className="col-label">Year of Passing:</span>
                <span className="col-val">{formData.passingYear}</span>
              </div>
              <div className="table-row">
                <span className="col-label">Prior Work Experience:</span>
                <span className="col-val">
                  {formData.hasExperience === 'Yes' 
                    ? `Yes ${formData.experienceDetails ? `(${formData.experienceDetails})` : ''}` 
                    : 'No (Fresher)'}
                </span>
              </div>
              {formData.purposeToJoin && (
                <div className="table-row">
                  <span className="col-label">Purpose to Join MSIT:</span>
                  <span className="col-val">{formData.purposeToJoin}</span>
                </div>
              )}
              <div className="table-row">
                <span className="col-label">Submitted On:</span>
                <span className="col-val">{formData.submittedAt}</span>
              </div>
            </div>

            <div className="success-actions-row">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => window.print()}
              >
                Print Application Summary
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleResetForm}
              >
                Edit / Start New Form
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleBackToDashboard}
              >
                Return to Programme
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // SINGLE-PAGE APPLICATION FORM
  return (
    <div className="single-app-wrapper">
      {/* Top Header */}
      <header className="single-app-header">
        <div className="container single-app-header-inner">
          <div className="single-app-brand">
            <img 
              src="/assets/msit-logo.png" 
              alt="MSIT Logo" 
              className="single-app-logo"
            />
            <span className="brand-sep">|</span>
            <div>
              <span className="brand-sub">MSIT Application</span>
              <span className="brand-cohort">{APPLICATION_CONFIG.cohort}</span>
            </div>
          </div>

          <div className="single-app-controls">
            {lastSavedTime && (
              <span className="draft-saved-pill">
                <ClockIcon size={14} />
                <span>Draft saved at {lastSavedTime}</span>
              </span>
            )}
            <button 
              type="button" 
              className="btn btn-secondary btn-sm"
              onClick={handleResetForm}
            >
              Clear Form
            </button>
            <button 
              type="button" 
              className="btn btn-secondary btn-sm"
              onClick={handleBackToDashboard}
            >
              ← Back to Programme
            </button>
          </div>
        </div>
      </header>

      {/* 3. Main Form Container */}
      <main className="container single-app-container">
        <div className="single-app-card">
          <div className="form-hero-block">
            <h2>Application Form</h2>
            <p>Please enter your accurate details below to submit your MSIT application.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            
            {/* SECTION 1: PERSONAL DETAILS */}
            <div className="form-section-block">
              <h3 className="section-block-title">
                <span className="section-number">1</span>
                <span>Personal & Contact Information</span>
              </h3>

              <div className="single-fields-grid">
                {/* Name */}
                <div className="form-field-group">
                  <label htmlFor="fullName">Full Name <span className="req">*</span></label>
                  <input
                    id="fullName"
                    type="text"
                    className={`form-input-control ${errors.fullName ? 'has-error' : ''}`}
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                  />
                  {errors.fullName && <span className="field-err-msg">{errors.fullName}</span>}
                </div>

                {/* Mail ID */}
                <div className="form-field-group">
                  <label htmlFor="email">Mail ID <span className="req">*</span></label>
                  <input
                    id="email"
                    type="email"
                    className={`form-input-control ${errors.email ? 'has-error' : ''}`}
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                  {errors.email && <span className="field-err-msg">{errors.email}</span>}
                </div>

                {/* Phone Number */}
                <div className="form-field-group">
                  <label htmlFor="phone">Phone Number <span className="req">*</span></label>
                  <input
                    id="phone"
                    type="tel"
                    className={`form-input-control ${errors.phone ? 'has-error' : ''}`}
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                  {errors.phone && <span className="field-err-msg">{errors.phone}</span>}
                </div>

                {/* Date of Birth (DOB) */}
                <div className="form-field-group">
                  <label htmlFor="dob">Date of Birth (DOB) <span className="req">*</span></label>
                  <input
                    id="dob"
                    type="date"
                    className={`form-input-control ${errors.dob ? 'has-error' : ''}`}
                    value={formData.dob}
                    onChange={(e) => handleInputChange('dob', e.target.value)}
                  />
                  {errors.dob && <span className="field-err-msg">{errors.dob}</span>}
                </div>

                {/* Address */}
                <div className="form-field-group full-row">
                  <label htmlFor="address">Address <span className="req">*</span></label>
                  <textarea
                    id="address"
                    rows={3}
                    className={`form-textarea-control ${errors.address ? 'has-error' : ''}`}
                    placeholder="Enter your complete residential / communication address with PIN code"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                  {errors.address && <span className="field-err-msg">{errors.address}</span>}
                </div>
              </div>
            </div>

            {/* SECTION 2: PARENT / GUARDIAN INFORMATION */}
            <div className="form-section-block">
              <h3 className="section-block-title">
                <span className="section-number">2</span>
                <span>Parent / Guardian Information</span>
              </h3>

              <div className="single-fields-grid">
                {/* Relationship */}
                <div className="form-field-group">
                  <label htmlFor="parentRelationship">Relationship <span className="req">*</span></label>
                  <select
                    id="parentRelationship"
                    className="form-select-control"
                    value={formData.parentRelationship || 'Father'}
                    onChange={(e) => handleInputChange('parentRelationship', e.target.value)}
                  >
                    {PARENT_RELATIONSHIP_OPTIONS.map((rel, idx) => (
                      <option key={idx} value={rel}>{rel}</option>
                    ))}
                  </select>
                </div>

                {/* Parent / Guardian Name */}
                <div className="form-field-group">
                  <label htmlFor="parentName">
                    {formData.parentRelationship || 'Parent'} Name <span className="req">*</span>
                  </label>
                  <input
                    id="parentName"
                    type="text"
                    className={`form-input-control ${errors.parentName ? 'has-error' : ''}`}
                    placeholder={`Enter ${(formData.parentRelationship || 'parent').toLowerCase()}'s full name`}
                    value={formData.parentName}
                    onChange={(e) => handleInputChange('parentName', e.target.value)}
                  />
                  {errors.parentName && <span className="field-err-msg">{errors.parentName}</span>}
                </div>

                {/* Parent / Guardian Mobile Number */}
                <div className="form-field-group full-row">
                  <label htmlFor="altPhone">
                    {formData.parentRelationship || 'Parent'} Mobile Number <span className="req">*</span>
                  </label>
                  <input
                    id="altPhone"
                    type="tel"
                    className={`form-input-control ${errors.altPhone ? 'has-error' : ''}`}
                    placeholder="e.g. +91 98765 43210"
                    value={formData.altPhone}
                    onChange={(e) => handleInputChange('altPhone', e.target.value)}
                  />
                  {errors.altPhone && <span className="field-err-msg">{errors.altPhone}</span>}
                </div>
              </div>
            </div>

            {/* SECTION 3: ACADEMIC DETAILS */}
            <div className="form-section-block">
              <h3 className="section-block-title">
                <span className="section-number">3</span>
                <span>Undergraduate Academic Qualifications</span>
              </h3>

              <div className="single-fields-grid">
                {/* UG Qualification which degree */}
                <div className="form-field-group">
                  <label htmlFor="ugDegree">UG Qualification (Which Degree) <span className="req">*</span></label>
                  <select
                    id="ugDegree"
                    className={`form-select-control ${errors.ugDegree ? 'has-error' : ''}`}
                    value={formData.ugDegree}
                    onChange={(e) => handleInputChange('ugDegree', e.target.value)}
                  >
                    <option value="">Select Qualifying Degree</option>
                    {UG_DEGREE_OPTIONS.map((deg, idx) => (
                      <option key={idx} value={deg}>{deg}</option>
                    ))}
                  </select>
                  {errors.ugDegree && <span className="field-err-msg">{errors.ugDegree}</span>}
                </div>

                {/* Department */}
                <div className="form-field-group">
                  <label htmlFor="department">Department / Branch <span className="req">*</span></label>
                  <select
                    id="department"
                    className={`form-select-control ${errors.department ? 'has-error' : ''}`}
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                  >
                    <option value="">Select Department / Stream</option>
                    {DEPARTMENT_OPTIONS.map((dept, idx) => (
                      <option key={idx} value={dept}>{dept}</option>
                    ))}
                  </select>
                  {errors.department && <span className="field-err-msg">{errors.department}</span>}
                </div>

                {/* CGPA / Percentage */}
                <div className="form-field-group">
                  <label htmlFor="cgpa">CGPA / Percentage <span className="req">*</span></label>
                  <input
                    id="cgpa"
                    type="text"
                    className={`form-input-control ${errors.cgpa ? 'has-error' : ''}`}
                    placeholder="e.g. 8.4 CGPA or 82%"
                    value={formData.cgpa}
                    onChange={(e) => handleInputChange('cgpa', e.target.value)}
                  />
                  {errors.cgpa && <span className="field-err-msg">{errors.cgpa}</span>}
                </div>

                {/* Year of passing */}
                <div className="form-field-group">
                  <label htmlFor="passingYear">Year of Passing <span className="req">*</span></label>
                  <select
                    id="passingYear"
                    className={`form-select-control ${errors.passingYear ? 'has-error' : ''}`}
                    value={formData.passingYear}
                    onChange={(e) => handleInputChange('passingYear', e.target.value)}
                  >
                    <option value="">Select Year of Passing</option>
                    {PASSING_YEAR_OPTIONS.map((yr, idx) => (
                      <option key={idx} value={yr}>{yr}</option>
                    ))}
                  </select>
                  {errors.passingYear && <span className="field-err-msg">{errors.passingYear}</span>}
                </div>
              </div>
            </div>

            {/* SECTION 4: WORK EXPERIENCE */}
            <div className="form-section-block">
              <h3 className="section-block-title">
                <span className="section-number">4</span>
                <span>Work Experience</span>
              </h3>

              <div className="single-fields-grid">
                <div className="form-field-group full-row">
                  <label>Do you have prior work experience? <span className="req">*</span></label>
                  <div className="experience-radio-group">
                    <label className={`radio-option-card ${formData.hasExperience === 'No' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="hasExperience"
                        value="No"
                        checked={formData.hasExperience === 'No'}
                        onChange={() => handleInputChange('hasExperience', 'No')}
                      />
                      <span>No (Fresher)</span>
                    </label>
                    <label className={`radio-option-card ${formData.hasExperience === 'Yes' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="hasExperience"
                        value="Yes"
                        checked={formData.hasExperience === 'Yes'}
                        onChange={() => handleInputChange('hasExperience', 'Yes')}
                      />
                      <span>Yes (Experienced)</span>
                    </label>
                  </div>
                </div>

                {formData.hasExperience === 'Yes' && (
                  <div className="form-field-group full-row">
                    <label htmlFor="experienceDetails">Experience Details (Role / Duration / Company)</label>
                    <input
                      id="experienceDetails"
                      type="text"
                      className="form-input-control"
                      placeholder="e.g. 1 year as Software Engineer at TCS"
                      value={formData.experienceDetails}
                      onChange={(e) => handleInputChange('experienceDetails', e.target.value)}
                    />
                    <span className="field-helper-hint">Optional: Briefly specify your company, role, or duration.</span>
                  </div>
                )}
              </div>
            </div>

            {/* SECTION 5: PURPOSE TO JOIN MSIT */}
            <div className="form-section-block">
              <h3 className="section-block-title">
                <span className="section-number">5</span>
                <span>Purpose to Join MSIT (Optional)</span>
              </h3>

              <div className="single-fields-grid">
                <div className="form-field-group full-row">
                  <label htmlFor="purposeToJoin">
                    Why do you want to join MSIT? <span style={{ fontWeight: 'normal', color: '#64748b' }}>(Optional)</span>
                  </label>
                  <textarea
                    id="purposeToJoin"
                    rows={4}
                    className="form-textarea-control"
                    placeholder="Briefly describe your motivations, career objectives, or what you aim to achieve through the MSIT program (optional)..."
                    value={formData.purposeToJoin}
                    onChange={(e) => handleInputChange('purposeToJoin', e.target.value)}
                  />
                  <span className="field-helper-hint">This helps the admissions committee understand your background and career goals.</span>
                </div>
              </div>
            </div>

            {/* FORM SUBMISSION BAR */}
            <div className="form-submit-footer">
              <button
                type="submit"
                className="btn btn-primary btn-submit-app"
              >
                <span>Submit Application</span>
                <ArrowRightIcon size={18} />
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}
