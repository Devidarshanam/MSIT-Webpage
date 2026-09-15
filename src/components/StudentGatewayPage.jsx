import React, { useState, useEffect } from 'react';
import { 
  BuildingIcon, CalendarIcon, SparklesIcon, AwardIcon, 
  ShieldCheckIcon, DownloadIcon, CheckCircleIcon, ArrowRightIcon,
  GraduationCapIcon, CpuIcon, BookOpenIcon, BriefcaseIcon
} from './Icons';

export default function StudentGatewayPage() {
  // Page view: 'check' (eligibility check / entering screen) or 'about' (general About MSIT page)
  const [currentView, setCurrentView] = useState(() => {
    return window.location.hash === '#about' ? 'about' : 'check';
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
      setCurrentView(window.location.hash === '#about' ? 'about' : 'check');
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
    window.location.hash = view === 'about' ? '#about' : '#check';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScreenerSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setFormError('Please enter your Full Name, Mobile/WhatsApp Number, and Email Address.');
      return;
    }
    setFormError('');

    // Strict eligibility check:
    // Must be final-year (passing 2026), graduated, or working pro
    // AND must have B.Tech, MCA, or M.Sc
    const isAcademicEligible = academicStatus === 'final-year' || 
                               academicStatus === 'graduated' || 
                               academicStatus === 'working';

    const isDegreeEligible = degreeStream === 'btech-cs' || 
                             degreeStream === 'btech-other' || 
                             degreeStream === 'mca-msc';

    const isEligible = isAcademicEligible && isDegreeEligible;
    
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
          <div className="gateway-brand" onClick={() => navigateTo('check')} style={{ cursor: 'pointer' }} title="Go to home">
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

            {currentView === 'check' ? (
              <button 
                type="button" 
                className="btn btn-secondary gateway-about-trigger"
                onClick={() => navigateTo('about')}
              >
                <BookOpenIcon size={16} />
                <span>About MSIT ➔</span>
              </button>
            ) : (
              <button 
                type="button" 
                className="btn btn-primary gateway-about-trigger"
                onClick={() => navigateTo('check')}
              >
                <span>⬅ Back to Eligibility Check</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Target Audience Strip */}
      <div className="gateway-notice-strip">
        <div className="gateway-container">
          <div className="gateway-notice-box">
            <span className="notice-badge">🎯 WHO CAN APPLY?</span>
            <span className="notice-text">
              Admissions are open exclusively for <strong>Final Year college students (graduating in 2026)</strong> and <strong>graduates with an engineering or computing degree</strong> (B.Tech/B.E., MCA, M.Sc).
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          PAGE 1: ELIGIBILITY CHECK & GATED INFORMATION PORTAL
          ========================================================================= */}
      {currentView === 'check' && (
        <main className="gateway-main">
          <div className="gateway-container gateway-centered-container">
            
            {/* Quick link for visitors who just want general About MSIT */}
            {!submittedStudent && (
              <div className="enter-about-prompt">
                <div className="prompt-text">
                  <span className="prompt-icon">💡</span>
                  <span>Not ready to check eligibility? You can read the general About MSIT overview.</span>
                </div>
                <button
                  type="button"
                  className="btn btn-secondary prompt-btn"
                  onClick={() => navigateTo('about')}
                >
                  <span>General About MSIT ➔</span>
                </button>
              </div>
            )}

            {/* CASE 1: Form (When eligibility not yet checked) */}
            {!submittedStudent && (
              <div className="signin-box-card centered-signin-card">
                <form onSubmit={handleScreenerSubmit} className="gateway-signin-form">
                  <div className="signin-header">
                    <div className="signin-icon-wrap">
                      <GraduationCapIcon size={26} />
                    </div>
                    <div>
                      <h3>Verify Your Eligibility to Access Programme Details</h3>
                      <p>Detailed curriculum, corporate co-op, and syllabus guides are available to eligible students. Answer 2 quick questions to verify your eligibility.</p>
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
                    <span>Verify My Eligibility & Unlock Information ➔</span>
                  </button>

                  <div className="signin-privacy-note">
                    <ShieldCheckIcon size={14} />
                    <span>Official MSIT eligibility check. Information is kept private & used only for admissions counseling.</span>
                  </div>
                </form>
              </div>
            )}

            {/* CASE 2: ELIGIBLE ➔ SHOW FULL PROGRAMME INFORMATION */}
            {submittedStudent && submittedStudent.isEligible && (
              <div className="eligible-unlocked-container">
                {/* Success Banner */}
                <div className="eligible-success-card">
                  <div className="success-header">
                    <div className="success-badge-icon">🎉</div>
                    <div>
                      <span className="success-kicker">ELIGIBILITY VERIFIED · ACCESS UNLOCKED</span>
                      <h2>Welcome, {submittedStudent.fullName}!</h2>
                      <p className="success-subtitle">
                        ✅ You meet all academic eligibility criteria for the <strong>MSIT January 2027 Batch</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Verified Student Details Strip */}
                  <div className="verified-credentials-strip">
                    <div className="cred-item">
                      <span>Status:</span>
                      <strong>{getStatusLabel(submittedStudent.academicStatus, submittedStudent.otherAcademicStatus)}</strong>
                    </div>
                    <div className="cred-item">
                      <span>Degree:</span>
                      <strong>{getStreamLabel(submittedStudent.degreeStream, submittedStudent.otherDegreeStream)}</strong>
                    </div>
                    <div className="cred-item">
                      <span>Mobile:</span>
                      <strong>{submittedStudent.phone}</strong>
                    </div>
                    <div className="cred-item">
                      <span>Email:</span>
                      <strong>{submittedStudent.email}</strong>
                    </div>
                  </div>
                </div>

                {/* UNLOCKED PROGRAMME INFORMATION */}
                <div className="unlocked-content-card">
                  <div className="unlocked-header-row">
                    <div>
                      <span className="unlocked-badge">UNLOCKED FOR ELIGIBLE APPLICANTS</span>
                      <h3>Master of Science in Information Technology (MSIT)</h3>
                      <p>Full Programme Architecture, Curriculum & Corporate Co-op Guide</p>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setShowSummaryModal(true)}
                    >
                      <DownloadIcon size={16} />
                      Download 1-Page Summary (PDF)
                    </button>
                  </div>

                  {/* Section 1: How the Programme Works (2 Phases) */}
                  <div className="unlocked-section">
                    <h4>1. Academic Architecture & Learning Cadence</h4>
                    <div className="cadence-two-phase-grid">
                      <div className="phase-card">
                        <div className="phase-badge">Phase 1 · Campus Immersion</div>
                        <h5>Deep Technical Foundations & Advanced Labs</h5>
                        <p>
                          Conducted on the IIIT Hyderabad campus. You learn through daily intensive coding studios, solving algorithmic challenges, full-stack systems engineering, and AI pipelines. <strong>Zero rote lecture halls.</strong>
                        </p>
                      </div>
                      <div className="phase-card highlight">
                        <div className="phase-badge">Phase 2 · Corporate Practice</div>
                        <h5>~50% Full-Time Corporate Co-op</h5>
                        <p>
                          You join partner tech enterprises as a full-time software engineering intern. You write production-grade code, receive senior engineer reviews, and <strong>earn a corporate stipend before graduation</strong>.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Core Competencies Mastered */}
                  <div className="unlocked-section">
                    <h4>2. Core Technical Competencies</h4>
                    <div className="competencies-three-grid">
                      <div className="comp-box">
                        <div className="comp-icon">🧠</div>
                        <h5>Modern AI & Data Systems</h5>
                        <p>Neural architectures, Large Language Models (LLMs), Generative AI toolchains, vector databases, and scalable data pipelines.</p>
                      </div>
                      <div className="comp-box">
                        <div className="comp-icon">☁️</div>
                        <h5>Cloud & Distributed Systems</h5>
                        <p>Microservices, REST/gRPC APIs, cloud-native deployments (AWS/Docker/K8s), and distributed database architectures.</p>
                      </div>
                      <div className="comp-box">
                        <div className="comp-icon">⚙️</div>
                        <h5>Production Software Quality</h5>
                        <p>Defensive programming, automated test suites, CI/CD pipelines, system reliability, and agile code reviews.</p>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Next Steps & Counselor Support */}
                  <div className="unlocked-section next-steps-box">
                    <div className="next-steps-content">
                      <h4>What Happens Next?</h4>
                      <p>
                        Your profile has been logged with the <strong>MSIT Admissions Office at IIIT Hyderabad</strong>. An admissions counselor will reach out via WhatsApp and Email with entrance evaluation dates, sample papers, and counseling support.
                      </p>
                    </div>
                    <div className="next-steps-actions">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowSummaryModal(true)}
                      >
                        <DownloadIcon size={16} />
                        Print / Save 1-Page Summary
                      </button>
                    </div>
                  </div>

                  {/* Switch Student */}
                  <div className="switch-student-footer">
                    <button
                      type="button"
                      className="btn-switch-student"
                      onClick={handleResetStudent}
                    >
                      ✏️ Re-check eligibility with different details
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* CASE 3: NOT ELIGIBLE ➔ FRIENDLY NOTICE + REDIRECT TO GENERAL ABOUT MSIT */}
            {submittedStudent && !submittedStudent.isEligible && (
              <div className="signin-box-card centered-signin-card not-eligible-card">
                <div className="not-eligible-header">
                  <div className="not-eligible-icon">ℹ️</div>
                  <div>
                    <span className="not-eligible-kicker">ELIGIBILITY STATUS</span>
                    <h3>Not Currently Eligible for January 2027 Admissions</h3>
                  </div>
                </div>

                <div className="not-eligible-body">
                  <p>
                    Thank you for your interest in MSIT, <strong>{submittedStudent.fullName}</strong>.
                  </p>
                  <p>
                    MSIT admissions are strictly restricted to candidates who are:
                  </p>
                  <ul className="not-eligible-criteria-list">
                    <li>Currently in their <strong>Final Year of college (2026 passing out batch)</strong> or have already completed graduation.</li>
                    <li>Holding or pursuing a degree in <strong>B.Tech / B.E. (all branches)</strong>, <strong>MCA</strong>, or <strong>M.Sc (Computer Science / IT / Math)</strong>.</li>
                  </ul>
                  <p className="not-eligible-note">
                    Based on your selection (<em>{getStatusLabel(submittedStudent.academicStatus, submittedStudent.otherAcademicStatus)}</em> · <em>{getStreamLabel(submittedStudent.degreeStream, submittedStudent.otherDegreeStream)}</em>), you do not meet the criteria for the upcoming January 2027 batch.
                  </p>
                </div>

                <div className="not-eligible-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => navigateTo('about')}
                  >
                    <span>Read General About MSIT Overview ➔</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleResetStudent}
                  >
                    <span>✏️ Re-Check With Different Details</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </main>
      )}

      {/* =========================================================================
          PAGE 2: GENERAL ABOUT MSIT PAGE (Accessible to all)
          ========================================================================= */}
      {currentView === 'about' && (
        <main className="gateway-main">
          <div className="gateway-container">
            
            {/* Top Navigation Bar back to Check */}
            <div className="about-page-topbar">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigateTo('check')}
              >
                <span>⬅ Check Your Eligibility</span>
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
                <span className="about-kicker">GENERAL PROGRAMME OVERVIEW</span>
                <span className="about-consortium-tag">Offered jointly by IIIT Hyderabad, JNTUH, JNTUK, JNTUA & SVU</span>
              </div>

              <h1 className="about-main-title">About MSIT</h1>
              <h2 className="about-main-sub">
                Master of Science in Information Technology · IIIT Hyderabad Campus
              </h2>

              <p className="about-lead">
                Started in 2001 under the guidance of world-renowned computer scientist <strong>Prof. Raj Reddy</strong> (Turing Award winner), MSIT is a specialized master’s programme designed to turn college graduates into highly skilled, industry-ready software engineers.
              </p>

              {/* 4 Core Pillars */}
              <div className="about-pillars-grid">
                <div className="about-pillar">
                  <div className="about-pillar-icon">💻</div>
                  <div className="about-pillar-body">
                    <strong>100% Practical Learning by Doing</strong>
                    <p>No boring classroom lectures. Students spend their day in modern coding studios writing code, building real software projects, and receiving continuous mentor feedback.</p>
                  </div>
                </div>

                <div className="about-pillar">
                  <div className="about-pillar-icon">💼</div>
                  <div className="about-pillar-body">
                    <strong>~50% Paid Company Internship (Co-op)</strong>
                    <p>Spend half of the programme working inside real tech companies as a software engineering intern, earning a corporate stipend before graduating.</p>
                  </div>
                </div>

                <div className="about-pillar">
                  <div className="about-pillar-icon">🧠</div>
                  <div className="about-pillar-body">
                    <strong>Modern AI, Cloud & Full-Stack</strong>
                    <p>Curriculum structured around Generative AI, Large Language Models (LLMs), scalable cloud microservices, and production-grade engineering.</p>
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

              {/* Key Programme Details */}
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
                    <span>Format</span>
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
                  <h4>Are you a Final-Year Student or Degree Holder?</h4>
                  <p>Check your eligibility to unlock the complete syllabus, co-op details, and admissions kit.</p>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => navigateTo('check')}
                >
                  <span>Check Eligibility to Unlock Details ➔</span>
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
