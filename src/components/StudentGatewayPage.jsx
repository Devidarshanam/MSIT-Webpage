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

  // Screener form state
  const [academicStatus, setAcademicStatus] = useState('final-year');
  const [degreeStream, setDegreeStream] = useState('btech-cs');
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
      setFormError('Please enter your Full Name, WhatsApp/Mobile Number, and Email Address.');
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
      degreeStream,
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
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'final-year': return 'Final Year UG (Passing 2026)';
      case 'graduated': return 'Completed Undergrad (Graduated)';
      case 'working': return 'Working Professional (1–3 yrs exp)';
      default: return 'Pre-Final Year / Other';
    }
  };

  const getStreamLabel = (stream) => {
    switch (stream) {
      case 'btech-cs': return 'B.Tech / B.E. (CSE, IT, AI/DS)';
      case 'btech-other': return 'B.Tech / B.E. (ECE, EEE, Mech, Civil, etc.)';
      case 'mca-msc': return 'MCA / M.Sc (CS, IT, Math)';
      default: return 'BCA / B.Sc / Other';
    }
  };

  return (
    <div className="gateway-root">
      {/* Top Header */}
      <header className="gateway-header">
        <div className="gateway-header-container">
          <div className="gateway-brand" onClick={() => navigateTo('signin')} style={{ cursor: 'pointer' }}>
            <img
              src="https://www.msit.ac.in/assets/msit-logo.png"
              alt="MSIT Logo"
              className="gateway-logo"
              width="44"
              height="44"
            />
            <div className="gateway-brand-text">
              <span className="gateway-brand-title">IIIT Hyderabad</span>
              <span className="gateway-brand-subtitle">Master of Science in Information Technology (MSIT)</span>
            </div>
          </div>
          
          <div className="gateway-header-badges">
            <span className="gateway-cohort-pill">
              <span className="gateway-pulse-dot" aria-hidden="true"></span>
              January 2027 Cohort
            </span>

            {currentView === 'signin' ? (
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
                onClick={() => navigateTo('signin')}
              >
                <span>⬅ Back to Sign-In</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Target Audience Alert Strip */}
      <div className="gateway-notice-strip">
        <div className="gateway-container">
          <div className="gateway-notice-box">
            <span className="notice-badge">🎯 TARGET APPLICANTS</span>
            <span className="notice-text">
              <strong>Admissions are open for:</strong> Students in their <strong>Final Year of Undergraduation (2026 batch)</strong> or who have <strong>completed graduation</strong> (B.Tech/B.E., MCA, M.Sc).
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          PAGE 1: ENTERING SIGN-IN PAGE (Default)
          ========================================================================= */}
      {currentView === 'signin' && (
        <main className="gateway-main">
          <div className="gateway-container gateway-centered-container">
            
            {/* Action Bar: Direct Button to enter About MSIT Page */}
            <div className="enter-about-prompt">
              <div className="prompt-text">
                <span className="prompt-icon">🏛️</span>
                <span>Want to inspect the curriculum, faculty legacy, co-op, and fees first?</span>
              </div>
              <button
                type="button"
                className="btn btn-secondary prompt-btn"
                onClick={() => navigateTo('about')}
              >
                <span>Know About MSIT Page</span>
                <span aria-hidden="true">➔</span>
              </button>
            </div>

            {/* The Dedicated Sign-In Card */}
            <div className="signin-box-card centered-signin-card">
              {!submittedStudent ? (
                /* Form View */
                <form onSubmit={handleScreenerSubmit} className="gateway-signin-form">
                  <div className="signin-header">
                    <div className="signin-icon-wrap">
                      <GraduationCapIcon size={26} />
                    </div>
                    <div>
                      <h3>Prospective Student Sign-In</h3>
                      <p>Identify yourself to verify eligibility & log your interest for January 2027 admissions</p>
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
                      1. Academic Standing <span className="req">*</span>
                    </label>
                    <div className="signin-pills-row">
                      <button
                        type="button"
                        className={`signin-pill ${academicStatus === 'final-year' ? 'active' : ''}`}
                        onClick={() => setAcademicStatus('final-year')}
                      >
                        <span className="pill-circle"></span>
                        <span>Final Year UG (2026 Batch)</span>
                      </button>
                      <button
                        type="button"
                        className={`signin-pill ${academicStatus === 'graduated' ? 'active' : ''}`}
                        onClick={() => setAcademicStatus('graduated')}
                      >
                        <span className="pill-circle"></span>
                        <span>Completed UG (Degree Holder)</span>
                      </button>
                      <button
                        type="button"
                        className={`signin-pill ${academicStatus === 'working' ? 'active' : ''}`}
                        onClick={() => setAcademicStatus('working')}
                      >
                        <span className="pill-circle"></span>
                        <span>Working Professional</span>
                      </button>
                      <button
                        type="button"
                        className={`signin-pill ${academicStatus === 'other' ? 'active' : ''}`}
                        onClick={() => setAcademicStatus('other')}
                      >
                        <span className="pill-circle"></span>
                        <span>1st–3rd Year / Other</span>
                      </button>
                    </div>
                  </div>

                  {/* Step 2: Undergrad Stream */}
                  <div className="signin-field-group">
                    <label className="signin-label">
                      2. Undergrad Degree / Stream <span className="req">*</span>
                    </label>
                    <div className="signin-pills-row">
                      <button
                        type="button"
                        className={`signin-pill ${degreeStream === 'btech-cs' ? 'active' : ''}`}
                        onClick={() => setDegreeStream('btech-cs')}
                      >
                        <span className="pill-circle"></span>
                        <span>B.Tech / BE (CSE, IT, AI)</span>
                      </button>
                      <button
                        type="button"
                        className={`signin-pill ${degreeStream === 'btech-other' ? 'active' : ''}`}
                        onClick={() => setDegreeStream('btech-other')}
                      >
                        <span className="pill-circle"></span>
                        <span>B.Tech (ECE, EEE, Mech, etc.)</span>
                      </button>
                      <button
                        type="button"
                        className={`signin-pill ${degreeStream === 'mca-msc' ? 'active' : ''}`}
                        onClick={() => setDegreeStream('mca-msc')}
                      >
                        <span className="pill-circle"></span>
                        <span>MCA / M.Sc (CS / IT / Math)</span>
                      </button>
                      <button
                        type="button"
                        className={`signin-pill ${degreeStream === 'other' ? 'active' : ''}`}
                        onClick={() => setDegreeStream('other')}
                      >
                        <span className="pill-circle"></span>
                        <span>BCA / B.Sc / Other</span>
                      </button>
                    </div>
                  </div>

                  {/* Step 3: Contact Inputs */}
                  <div className="signin-inputs-grid">
                    <div className="signin-input-item">
                      <label htmlFor="studentName">Full Name <span className="req">*</span></label>
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
                      <label htmlFor="studentPhone">WhatsApp / Mobile <span className="req">*</span></label>
                      <input
                        id="studentPhone"
                        type="tel"
                        className="signin-input"
                        placeholder="e.g. +91 98765 43210"
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
                      <label htmlFor="studentCollege">College / Institution</label>
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
                    <span>Sign In & Verify Eligibility</span>
                    <ArrowRightIcon size={18} />
                  </button>

                  <div className="signin-privacy-note">
                    <ShieldCheckIcon size={14} />
                    <span>Official MSIT admissions intake. Information is used strictly for admissions counseling and updates.</span>
                  </div>
                </form>
              ) : (
                /* Verified Dashboard Pass (Once signed in) */
                <div className="signed-in-card">
                  <div className="signed-header">
                    <div className="signed-avatar">
                      {submittedStudent.isEligible ? '🎓' : 'ℹ️'}
                    </div>
                    <div>
                      <span className="signed-kicker">PROSPECTIVE STUDENT PROFILE LOGGED</span>
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
                          ? '✅ Verified Eligible for MSIT January 2027 Cohort' 
                          : 'ℹ️ Conditional / Pre-Screening Review Required'}
                      </strong>
                      <p>
                        {submittedStudent.isEligible
                          ? 'You meet the academic eligibility criteria (Final-year student / Degree holder in Engineering or Computing disciplines). An admissions counselor will reach out to you.'
                          : 'MSIT prioritizes final-year students and degree holders in engineering and computing disciplines. Your profile has been logged for provisional review.'}
                      </p>
                    </div>
                  </div>

                  {/* Profile Summary */}
                  <div className="signed-profile-box">
                    <div className="profile-row">
                      <span>Academic Status:</span>
                      <strong>{getStatusLabel(submittedStudent.academicStatus)}</strong>
                    </div>
                    <div className="profile-row">
                      <span>Degree / Stream:</span>
                      <strong>{getStreamLabel(submittedStudent.degreeStream)}</strong>
                    </div>
                    <div className="profile-row">
                      <span>Contact:</span>
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
                      Download 1-Page Summary (PDF)
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => navigateTo('about')}
                    >
                      <BookOpenIcon size={16} />
                      Enter About MSIT Page ➔
                    </button>
                  </div>

                  <button
                    type="button"
                    className="btn-switch-student"
                    onClick={handleResetStudent}
                  >
                    ✏️ Edit details or sign in as a different student
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
            
            {/* Top Navigation Bar back to Sign In */}
            <div className="about-page-topbar">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigateTo('signin')}
              >
                <span>⬅ Back to Student Sign-In</span>
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
                <span className="about-kicker">ABOUT THE PROGRAMME</span>
                <span className="about-consortium-tag">Consortium of IIIT-H, JNTUH, JNTUK, JNTUA & SVU</span>
              </div>

              <h1 className="about-main-title">Master of Science in Information Technology</h1>
              <h2 className="about-main-sub">
                The AI-Native Technology Master's Programme at IIIT Hyderabad
              </h2>

              <p className="about-lead">
                Conceived in 2001 by Turing Award laureate <strong>Prof. Raj Reddy</strong>, MSIT is an intensive post-graduate master's programme engineering high-impact software, scalable intelligent systems, and immersive corporate co-ops.
              </p>

              {/* 4 Core Pillars */}
              <div className="about-pillars-grid">
                <div className="about-pillar">
                  <div className="about-pillar-icon">💡</div>
                  <div className="about-pillar-body">
                    <strong>100% Active Learning by Doing</strong>
                    <p>No passive lecture halls. Students work in daily cognitive studios, solving algorithmic challenges, designing system architectures, and receiving code reviews from mentors.</p>
                  </div>
                </div>

                <div className="about-pillar">
                  <div className="about-pillar-icon">💼</div>
                  <div className="about-pillar-body">
                    <strong>~50% Corporate Paid Co-op</strong>
                    <p>Spend half of your academic duration working full-time as a software engineering intern at leading tech enterprises, earning a corporate stipend and gaining real production tenure.</p>
                  </div>
                </div>

                <div className="about-pillar">
                  <div className="about-pillar-icon">🧠</div>
                  <div className="about-pillar-body">
                    <strong>Modern AI & Cloud Engineering</strong>
                    <p>Curriculum structured around Generative AI, Large Language Models (LLMs), scalable cloud microservices, distributed systems, and defensive code quality.</p>
                  </div>
                </div>

                <div className="about-pillar">
                  <div className="about-pillar-icon">🏛️</div>
                  <div className="about-pillar-body">
                    <strong>IIIT Hyderabad Campus & Consortium</strong>
                    <p>Delivered on the IIIT Hyderabad campus in collaboration with JNTU Hyderabad, JNTU Kakinada, JNTU Anantapur, and Sri Venkateswara University.</p>
                  </div>
                </div>
              </div>

              {/* Programme Operational Snapshot */}
              <div className="about-snapshot-section">
                <h3>Programme Operational Facts</h3>
                <div className="about-facts-grid">
                  <div className="fact-item">
                    <span>Awarding Institution</span>
                    <strong>IIIT Hyderabad (Consortium)</strong>
                  </div>
                  <div className="fact-item">
                    <span>Next Cohort Intake</span>
                    <strong>January 2027</strong>
                  </div>
                  <div className="fact-item">
                    <span>Campus Location</span>
                    <strong>Gachibowli, Hyderabad</strong>
                  </div>
                  <div className="fact-item">
                    <span>Format</span>
                    <strong>Full-Time On-Campus + Corporate Co-op</strong>
                  </div>
                  <div className="fact-item">
                    <span>Target Background</span>
                    <strong>B.Tech/BE (All branches), MCA, M.Sc</strong>
                  </div>
                  <div className="fact-item">
                    <span>Final-Year Status</span>
                    <strong>2026 Graduating Students Eligible</strong>
                  </div>
                </div>
              </div>

              {/* Bottom Callout to Sign In */}
              <div className="about-cta-banner">
                <div>
                  <h4>Ready to Verify Your Eligibility?</h4>
                  <p>Submit your academic profile on our sign-in page to register your interest for January 2027 admissions.</p>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => navigateTo('signin')}
                >
                  <span>Go to Student Sign-In ➔</span>
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
                <span className="modal-subtitle">January 2027 Cohort Overview & Guide</span>
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
                    <h4>1. Institutional Legacy</h4>
                  </div>
                  <ul className="summary-list compact">
                    <li><strong>Awarding Institution:</strong> International Institute of Information Technology, Hyderabad (IIIT-H).</li>
                    <li><strong>Founding Legacy:</strong> Conceived in 2001 by Turing Award laureate Prof. Raj Reddy.</li>
                    <li><strong>Consortium:</strong> IIIT-H, JNTUH, JNTUK, JNTUA, and SVU.</li>
                  </ul>
                </div>

                <div className="summary-card">
                  <div className="summary-card-head">
                    <BuildingIcon size={18} />
                    <h4>2. Structure & Cadence</h4>
                  </div>
                  <ul className="summary-list compact">
                    <li><strong>Next Cohort:</strong> January 2027 (Full-Time On-Campus at IIIT Hyderabad).</li>
                    <li><strong>Pedagogical Model:</strong> <em>Learn · Think · Do</em> (Cognitive studio practice; zero passive lectures).</li>
                    <li><strong>Industry Co-op:</strong> ~50% spent in corporate engineering tenure with code reviews.</li>
                  </ul>
                </div>

                <div className="summary-card">
                  <div className="summary-card-head">
                    <CpuIcon size={18} />
                    <h4>3. Technical Specialization</h4>
                  </div>
                  <ul className="summary-list compact">
                    <li><strong>Modern AI & Data:</strong> Applied ML, deep neural nets, LLMs, and data pipelines.</li>
                    <li><strong>Cloud & Systems:</strong> Microservices, distributed architecture, and cloud DevOps.</li>
                    <li><strong>Production Craft:</strong> Automated testing, defensive programming, and CI/CD.</li>
                  </ul>
                </div>

                <div className="summary-card">
                  <div className="summary-card-head">
                    <ShieldCheckIcon size={18} />
                    <h4>4. Eligibility & Aid</h4>
                  </div>
                  <ul className="summary-list compact">
                    <li><strong>Eligible Degrees:</strong> B.Tech/B.E. (all branches), MCA, M.Sc (CS/IT/Math).</li>
                    <li><strong>Final-Year Eligibility:</strong> 2026 graduating students eligible to apply.</li>
                    <li><strong>Education Loans:</strong> Pre-approved loan avenues available for IIIT-H programmes.</li>
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
