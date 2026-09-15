import React, { useState, useEffect } from 'react';
import { 
  BuildingIcon, CalendarIcon, SparklesIcon, AwardIcon, 
  ShieldCheckIcon, DownloadIcon, CheckCircleIcon, ArrowRightIcon,
  GraduationCapIcon, CpuIcon, BookOpenIcon, BriefcaseIcon
} from './Icons';

export default function StudentGatewayPage() {
  // Page view: 'signin' (default entering page) or 'about' (About MSIT page)
  const [currentView, setCurrentView] = useState(() => {
    return window.location.hash === '#about' ? 'about' : 'signin';
  });

  // Form state
  const [academicStatus, setAcademicStatus] = useState('final-year');
  const [otherAcademicStatus, setOtherAcademicStatus] = useState('');
  const [degreeStream, setDegreeStream] = useState('btech-cs');
  const [otherDegreeStream, setOtherDegreeStream] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [submittedStudent, setSubmittedStudent] = useState(null);
  const [formError, setFormError] = useState('');
  
  // 1-Page Summary Printable Modal
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  // Sync with browser hash and load saved student
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentView(window.location.hash === '#about' ? 'about' : 'signin');
    };
    window.addEventListener('hashchange', handleHashChange);

    try {
      const saved = localStorage.getItem('msit_prospective_student');
      if (saved) {
        setSubmittedStudent(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading saved student', e);
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view) => {
    setCurrentView(view);
    window.location.hash = view === 'about' ? '#about' : '#signin';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScreenerSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setFormError('Please enter your Full Name, Mobile/WhatsApp Number, and Email Address.');
      return;
    }
    setFormError('');

    const isEligible = (academicStatus === 'final-year' || academicStatus === 'graduated') &&
                       (degreeStream === 'btech-cs' || degreeStream === 'btech-other' || degreeStream === 'mca-msc');
    
    const studentData = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      college: college.trim(),
      academicStatus,
      otherAcademicStatus: academicStatus === 'other' ? otherAcademicStatus.trim() : '',
      degreeStream,
      otherDegreeStream: degreeStream === 'other' ? otherDegreeStream.trim() : '',
      isEligible,
      submittedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem('msit_prospective_student', JSON.stringify(studentData));
      
      const existingLeads = JSON.parse(localStorage.getItem('msit_intake_leads') || '[]');
      existingLeads.unshift(studentData);
      localStorage.setItem('msit_intake_leads', JSON.stringify(existingLeads.slice(0, 50)));
    } catch (err) {
      console.error('Local storage write error', err);
    }

    setSubmittedStudent(studentData);
  };

  const handleResetStudent = () => {
    localStorage.removeItem('msit_prospective_student');
    setSubmittedStudent(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setCollege('');
    setOtherAcademicStatus('');
    setOtherDegreeStream('');
  };

  const getStatusLabel = (status, custom) => {
    if (status === 'other') {
      return custom ? `Other: ${custom}` : 'Other Educational Background';
    }
    switch (status) {
      case 'final-year': return 'Final Year College Student (Passing out in 2026)';
      case 'graduated': return 'Completed Graduation (Degree in Hand)';
      case 'working': return 'Working Professional (1–3 Years Experience)';
      default: return 'Other';
    }
  };

  const getStreamLabel = (stream, custom) => {
    if (stream === 'other') {
      return custom ? `Other Degree: ${custom}` : 'Other Degree / Stream';
    }
    switch (stream) {
      case 'btech-cs': return 'B.Tech / B.E. (CSE, IT, AI, Data Science)';
      case 'btech-other': return 'B.Tech / B.E. (ECE, EEE, Mech, Civil, other branches)';
      case 'mca-msc': return 'MCA / M.Sc (Computer Science, IT, Math)';
      default: return 'Other Degree';
    }
  };

  return (
    <div className="gateway-root">
      {/* Top Header */}
      <header className="gateway-header">
        <div className="gateway-header-container">
          <div className="gateway-brand" onClick={() => navigateTo('signin')} style={{ cursor: 'pointer' }} title="Go to home">
            <img
              src="https://www.msit.ac.in/assets/msit-logo.png"
              alt="MSIT Logo"
              className="gateway-logo"
              width="44"
              height="44"
            />
            <div className="gateway-brand-text">
              <span className="gateway-brand-title">IIIT Hyderabad</span>
              <span className="gateway-brand-subtitle">MSIT · Master of Science in Information Technology</span>
            </div>
          </div>
          
          <div className="gateway-header-badges">
            <span className="gateway-cohort-pill">
              <span className="gateway-pulse-dot" aria-hidden="true"></span>
              Batch Starting January 2027
            </span>

            {currentView === 'signin' ? (
              <button 
                type="button" 
                className="btn btn-secondary gateway-about-trigger"
                onClick={() => navigateTo('about')}
              >
                <BookOpenIcon size={16} />
                <span>What is MSIT? ➔</span>
              </button>
            ) : (
              <button 
                type="button" 
                className="btn btn-primary gateway-about-trigger"
                onClick={() => navigateTo('signin')}
              >
                <span>⬅ Back to Eligibility Check</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Clear Audience Strip */}
      <div className="gateway-notice-strip">
        <div className="gateway-container">
          <div className="gateway-notice-box">
            <span className="notice-badge">🎯 WHO CAN APPLY?</span>
            <span className="notice-text">
              Admissions are open for <strong>students in their Final Year of college (2026 passing out)</strong> and <strong>graduates with a degree</strong> (B.Tech, B.E., MCA, M.Sc).
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          PAGE 1: ENTERING ELIGIBILITY & REGISTRATION PAGE (Default)
          ========================================================================= */}
      {currentView === 'signin' && (
        <main className="gateway-main">
          <div className="gateway-container gateway-centered-container">
            
            {/* Action Bar: Direct Button to read about MSIT */}
            <div className="enter-about-prompt">
              <div className="prompt-text">
                <span className="prompt-icon">💡</span>
                <span>Want to see the subjects, company internships, and fee details first?</span>
              </div>
              <button
                type="button"
                className="btn btn-secondary prompt-btn"
                onClick={() => navigateTo('about')}
              >
                <span>Read About MSIT ➔</span>
              </button>
            </div>

            {/* The Dedicated Intake Card */}
            <div className="signin-box-card centered-signin-card">
              {!submittedStudent ? (
                /* Form View */
                <form onSubmit={handleScreenerSubmit} className="gateway-signin-form">
                  <div className="signin-header">
                    <div className="signin-icon-wrap">
                      <GraduationCapIcon size={26} />
                    </div>
                    <div>
                      <h3>Check Your Eligibility & Register Interest</h3>
                      <p>Answer 2 quick questions to find out if you qualify for the January 2027 batch</p>
                    </div>
                  </div>

                  {formError && (
                    <div className="signin-error-alert" role="alert">
                      {formError}
                    </div>
                  )}

                  {/* Step 1: Academic Status */}
                  <div className="signin-field-group">
                    <label className="signin-label">
                      1. What is your current educational status? <span className="req">*</span>
                    </label>
                    <div className="signin-pills-row">
                      <button
                        type="button"
                        className={`signin-pill ${academicStatus === 'final-year' ? 'active' : ''}`}
                        onClick={() => setAcademicStatus('final-year')}
                      >
                        <span className="pill-circle"></span>
                        <span>Final Year Student (Passing 2026)</span>
                      </button>
                      <button
                        type="button"
                        className={`signin-pill ${academicStatus === 'graduated' ? 'active' : ''}`}
                        onClick={() => setAcademicStatus('graduated')}
                      >
                        <span className="pill-circle"></span>
                        <span>Completed College (Degree in Hand)</span>
                      </button>
                      <button
                        type="button"
                        className={`signin-pill ${academicStatus === 'working' ? 'active' : ''}`}
                        onClick={() => setAcademicStatus('working')}
                      >
                        <span className="pill-circle"></span>
                        <span>Working Professional (1–3 yrs)</span>
                      </button>
                      <button
                        type="button"
                        className={`signin-pill ${academicStatus === 'other' ? 'active' : ''}`}
                        onClick={() => setAcademicStatus('other')}
                      >
                        <span className="pill-circle"></span>
                        <span>Other (Please specify)</span>
                      </button>
                    </div>

                    {academicStatus === 'other' && (
                      <div className="signin-other-input-wrap">
                        <input
                          type="text"
                          className="signin-input signin-other-input"
                          placeholder="Please specify your status (e.g. 2nd/3rd Year, Gap Year, Diploma, etc.)"
                          value={otherAcademicStatus}
                          onChange={(e) => setOtherAcademicStatus(e.target.value)}
                          autoFocus
                        />
                      </div>
                    )}
                  </div>

                  {/* Step 2: Undergrad Stream */}
                  <div className="signin-field-group">
                    <label className="signin-label">
                      2. Which degree are you studying or have completed? <span className="req">*</span>
                    </label>
                    <div className="signin-pills-row">
                      <button
                        type="button"
                        className={`signin-pill ${degreeStream === 'btech-cs' ? 'active' : ''}`}
                        onClick={() => setDegreeStream('btech-cs')}
                      >
                        <span className="pill-circle"></span>
                        <span>B.Tech / B.E. (CSE, IT, AI, DS)</span>
                      </button>
                      <button
                        type="button"
                        className={`signin-pill ${degreeStream === 'btech-other' ? 'active' : ''}`}
                        onClick={() => setDegreeStream('btech-other')}
                      >
                        <span className="pill-circle"></span>
                        <span>B.Tech / B.E. (ECE, EEE, Mech, Civil)</span>
                      </button>
                      <button
                        type="button"
                        className={`signin-pill ${degreeStream === 'mca-msc' ? 'active' : ''}`}
                        onClick={() => setDegreeStream('mca-msc')}
                      >
                        <span className="pill-circle"></span>
                        <span>MCA / M.Sc (CS, IT, Math)</span>
                      </button>
                      <button
                        type="button"
                        className={`signin-pill ${degreeStream === 'other' ? 'active' : ''}`}
                        onClick={() => setDegreeStream('other')}
                      >
                        <span className="pill-circle"></span>
                        <span>Other Degree (Please specify)</span>
                      </button>
                    </div>

                    {degreeStream === 'other' && (
                      <div className="signin-other-input-wrap">
                        <input
                          type="text"
                          className="signin-input signin-other-input"
                          placeholder="Please specify your degree & branch (e.g. BCA, B.Sc, B.Pharm, M.Tech, etc.)"
                          value={otherDegreeStream}
                          onChange={(e) => setOtherDegreeStream(e.target.value)}
                          autoFocus
                        />
                      </div>
                    )}
                  </div>

                  {/* Step 3: Contact Inputs */}
                  <div className="signin-inputs-grid">
                    <div className="signin-input-item">
                      <label htmlFor="studentName">Your Full Name <span className="req">*</span></label>
                      <input
                        id="studentName"
                        type="text"
                        className="signin-input"
                        placeholder="e.g. Rahul Sharma"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="signin-input-item">
                      <label htmlFor="studentPhone">WhatsApp / Mobile Number <span className="req">*</span></label>
                      <input
                        id="studentPhone"
                        type="tel"
                        className="signin-input"
                        placeholder="e.g. 9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="signin-inputs-grid">
                    <div className="signin-input-item">
                      <label htmlFor="studentEmail">Email Address <span className="req">*</span></label>
                      <input
                        id="studentEmail"
                        type="email"
                        className="signin-input"
                        placeholder="e.g. rahul@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="signin-input-item">
                      <label htmlFor="studentCollege">College or University Name</label>
                      <input
                        id="studentCollege"
                        type="text"
                        className="signin-input"
                        placeholder="e.g. JNTUH / CBIT Hyderabad"
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary signin-submit-btn">
                    <span>Check My Eligibility & Register ➔</span>
                  </button>

                  <div className="signin-privacy-note">
                    <ShieldCheckIcon size={14} />
                    <span>100% confidential. No spam—only official updates on eligibility, test dates, and counseling.</span>
                  </div>
                </form>
              ) : (
                /* Verified Dashboard Pass (Once submitted) */
                <div className="signed-in-card">
                  <div className="signed-header">
                    <div className="signed-avatar">
                      {submittedStudent.isEligible ? '🎉' : 'ℹ️'}
                    </div>
                    <div>
                      <span className="signed-kicker">ELIGIBILITY CHECK COMPLETE</span>
                      <h3>Welcome, {submittedStudent.fullName}!</h3>
                    </div>
                  </div>

                  {/* Eligibility Verdict */}
                  <div className={`signed-verdict ${submittedStudent.isEligible ? 'eligible' : 'conditional'}`}>
                    <div className="signed-verdict-icon">
                      {submittedStudent.isEligible ? (
                        <CheckCircleIcon size={24} />
                      ) : (
                        <ShieldCheckIcon size={24} />
                      )}
                    </div>
                    <div>
                      <strong>
                        {submittedStudent.isEligible 
                          ? '✅ You Are Eligible for the January 2027 Batch!' 
                          : 'ℹ️ Conditional / Special Review Required'}
                      </strong>
                      <p>
                        {submittedStudent.isEligible
                          ? 'Your background matches MSIT requirements (Final-year college student or graduate in Engineering/Computing). We have recorded your interest, and our admissions team will contact you on WhatsApp/Email.'
                          : 'MSIT prioritizes final-year students and graduates with engineering or computing degrees. Our admissions team will review your application individually.'}
                      </p>
                    </div>
                  </div>

                  {/* Profile Summary */}
                  <div className="signed-profile-box">
                    <div className="profile-row">
                      <span>Status:</span>
                      <strong>{getStatusLabel(submittedStudent.academicStatus, submittedStudent.otherAcademicStatus)}</strong>
                    </div>
                    <div className="profile-row">
                      <span>Degree:</span>
                      <strong>{getStreamLabel(submittedStudent.degreeStream, submittedStudent.otherDegreeStream)}</strong>
                    </div>
                    <div className="profile-row">
                      <span>Mobile:</span>
                      <strong>{submittedStudent.phone}</strong>
                    </div>
                    <div className="profile-row">
                      <span>Email:</span>
                      <strong>{submittedStudent.email}</strong>
                    </div>
                    {submittedStudent.college && (
                      <div className="profile-row">
                        <span>College:</span>
                        <strong>{submittedStudent.college}</strong>
                      </div>
                    )}
                  </div>

                  <div className="signed-actions">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setShowSummaryModal(true)}
                    >
                      <DownloadIcon size={16} />
                      Download 1-Page Programme Summary (PDF)
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => navigateTo('about')}
                    >
                      <BookOpenIcon size={16} />
                      Read About MSIT (Course & Campus) ➔
                    </button>
                  </div>

                  <button
                    type="button"
                    className="btn-switch-student"
                    onClick={handleResetStudent}
                  >
                    ✏️ Change details or check for another student
                  </button>
                </div>
              )}
            </div>

          </div>
        </main>
      )}

      {/* =========================================================================
          PAGE 2: ABOUT MSIT PAGE (Entered via button)
          ========================================================================= */}
      {currentView === 'about' && (
        <main className="gateway-main">
          <div className="gateway-container">
            
            {/* Top Navigation Bar back to Form */}
            <div className="about-page-topbar">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigateTo('signin')}
              >
                <span>⬅ Back to Eligibility Form</span>
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowSummaryModal(true)}
              >
                <DownloadIcon size={16} />
                Download 1-Page Summary (PDF)
              </button>
            </div>

            {/* About MSIT Comprehensive View */}
            <div className="about-fullpage-card">
              <div className="about-kicker-row">
                <span className="about-kicker">PROGRAMME GUIDE</span>
                <span className="about-consortium-tag">Offered jointly by IIIT Hyderabad, JNTUH, JNTUK, JNTUA & SVU</span>
              </div>

              <h1 className="about-main-title">What is MSIT?</h1>
              <h2 className="about-main-sub">
                Master of Science in Information Technology · IIIT Hyderabad Campus
              </h2>

              <p className="about-lead">
                Started in 2001 under the guidance of world-renowned computer scientist <strong>Prof. Raj Reddy</strong> (Turing Award winner), MSIT is a specialized master’s programme designed to turn college graduates into highly skilled, industry-ready software engineers.
              </p>

              {/* 4 Core Pillars in Plain English */}
              <div className="about-pillars-grid">
                <div className="about-pillar">
                  <div className="about-pillar-icon">💻</div>
                  <div className="about-pillar-body">
                    <strong>100% Practical Learning by Doing</strong>
                    <p>No boring classroom lectures. You spend your day in modern coding studios writing code, building software projects, and getting feedback from senior mentors.</p>
                  </div>
                </div>

                <div className="about-pillar">
                  <div className="about-pillar-icon">💼</div>
                  <div className="about-pillar-body">
                    <strong>~50% Paid Company Internship (Co-op)</strong>
                    <p>Spend half of the programme working inside real tech companies as a software engineering intern, earning a corporate stipend before you graduate.</p>
                  </div>
                </div>

                <div className="about-pillar">
                  <div className="about-pillar-icon">🧠</div>
                  <div className="about-pillar-body">
                    <strong>Modern AI, Cloud & Full-Stack</strong>
                    <p>Learn what the tech industry actually demands today: Generative AI, Large Language Models (LLMs), scalable cloud backends, and clean production coding.</p>
                  </div>
                </div>

                <div className="about-pillar">
                  <div className="about-pillar-icon">🏛️</div>
                  <div className="about-pillar-body">
                    <strong>Premier IIIT Hyderabad Campus</strong>
                    <p>Study on the renowned IIIT Hyderabad campus at Gachibowli with access to state-of-the-art labs, incubation centers, and university consortium prestige.</p>
                  </div>
                </div>
              </div>

              {/* Key Programme Details at a Glance */}
              <div className="about-snapshot-section">
                <h3>Key Details at a Glance</h3>
                <div className="about-facts-grid">
                  <div className="fact-item">
                    <span>Degree Awarded</span>
                    <strong>Master of Science (IT) by Consortium</strong>
                  </div>
                  <div className="fact-item">
                    <span>Next Batch Starts</span>
                    <strong>January 2027</strong>
                  </div>
                  <div className="fact-item">
                    <span>Campus Location</span>
                    <strong>IIIT Hyderabad (Gachibowli)</strong>
                  </div>
                  <div className="fact-item">
                    <span>How You Study</span>
                    <strong>On-Campus Labs + Corporate Internship</strong>
                  </div>
                  <div className="fact-item">
                    <span>Who is Eligible?</span>
                    <strong>B.Tech/BE (Any branch), MCA, M.Sc</strong>
                  </div>
                  <div className="fact-item">
                    <span>Final-Year Students</span>
                    <strong>2026 Graduating Students Can Apply</strong>
                  </div>
                </div>
              </div>

              {/* Bottom Callout to Check Eligibility */}
              <div className="about-cta-banner">
                <div>
                  <h4>Want to Check if You Are Eligible?</h4>
                  <p>Takes only 30 seconds. Enter your details to get your personalized eligibility check and register interest.</p>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => navigateTo('signin')}
                >
                  <span>Check My Eligibility Now ➔</span>
                </button>
              </div>
            </div>

          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="gateway-footer">
        <div className="gateway-container gateway-footer-inner">
          <div>
            <strong>MSIT Admissions Office</strong> · International Institute of Information Technology, Hyderabad (IIIT-H)
            <p>Gachibowli, Hyderabad, Telangana - 500 032, India</p>
          </div>
          <div className="gateway-footer-links">
            <a href="mailto:query@msit.ac.in">query@msit.ac.in</a>
            <span>·</span>
            <a href="https://www.msit.ac.in" target="_blank" rel="noopener noreferrer">www.msit.ac.in</a>
          </div>
        </div>
      </footer>

      {/* 1-Page Summary Printable Modal */}
      {showSummaryModal && (
        <div className="modal-backdrop" onClick={() => setShowSummaryModal(false)}>
          <div className="modal-dialog modal-dialog-lg" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="summaryModalTitle">
            <div className="modal-header">
              <div className="modal-header-branding">
                <span className="kicker">IIIT Hyderabad · Official Academic Summary</span>
                <h3 id="summaryModalTitle">Master of Science in Information Technology (MSIT)</h3>
                <span className="modal-subtitle">January 2027 Batch Overview & Guide</span>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setShowSummaryModal(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="modal-body printable-summary-body">
              <div className="summary-quadrant-grid">
                <div className="summary-card">
                  <div className="summary-card-head">
                    <AwardIcon size={18} />
                    <h4>1. University Credentials</h4>
                  </div>
                  <ul className="summary-list compact">
                    <li><strong>Awarding Institution:</strong> International Institute of Information Technology, Hyderabad (IIIT-H).</li>
                    <li><strong>Founding Vision:</strong> Conceived in 2001 by Turing Award laureate Prof. Raj Reddy.</li>
                    <li><strong>University Consortium:</strong> IIIT Hyderabad, JNTUH, JNTUK, JNTUA, and SVU.</li>
                  </ul>
                </div>

                <div className="summary-card">
                  <div className="summary-card-head">
                    <BuildingIcon size={18} />
                    <h4>2. How the Program Works</h4>
                  </div>
                  <ul className="summary-list compact">
                    <li><strong>Next Batch:</strong> January 2027 (Full-Time On-Campus at IIIT Hyderabad).</li>
                    <li><strong>How You Learn:</strong> 100% Practical Studios (Build real software; zero passive lectures).</li>
                    <li><strong>Company Internship:</strong> ~50% spent working full-time at partner tech firms.</li>
                  </ul>
                </div>

                <div className="summary-card">
                  <div className="summary-card-head">
                    <CpuIcon size={18} />
                    <h4>3. What You Learn</h4>
                  </div>
                  <ul className="summary-list compact">
                    <li><strong>Modern AI & Data:</strong> Machine learning, deep learning, LLMs, and data systems.</li>
                    <li><strong>Cloud Systems:</strong> Microservices, distributed architecture, and cloud deployment.</li>
                    <li><strong>Software Engineering:</strong> Automated testing, clean code, and CI/CD pipelines.</li>
                  </ul>
                </div>

                <div className="summary-card">
                  <div className="summary-card-head">
                    <ShieldCheckIcon size={18} />
                    <h4>4. Who Can Apply & Bank Loans</h4>
                  </div>
                  <ul className="summary-list compact">
                    <li><strong>Eligible Degrees:</strong> B.Tech/B.E. (all branches), MCA, M.Sc (CS/IT/Math).</li>
                    <li><strong>Final-Year Students:</strong> 2026 graduating students are fully eligible.</li>
                    <li><strong>Education Loans:</strong> Pre-approved loan assistance available through nationalized banks.</li>
                  </ul>
                </div>
              </div>

              <div className="summary-official-footer">
                <div>
                  <strong>Admissions Office:</strong> MSIT Division, IIIT Hyderabad, Gachibowli, Hyderabad - 500 032
                </div>
                <div className="text-right">
                  <strong>Email:</strong> query@msit.ac.in | <strong>Web:</strong> www.msit.ac.in
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => window.print()}>
                <DownloadIcon size={16} />
                Print / Save PDF
              </button>
              <button className="btn btn-primary" onClick={() => setShowSummaryModal(false)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
