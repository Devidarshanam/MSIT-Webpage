import React, { useState, useEffect } from 'react';
import { 
  BuildingIcon, DownloadIcon, CheckCircleIcon, ArrowRightIcon,
  GraduationCapIcon, CpuIcon, BookOpenIcon, BriefcaseIcon, ShieldCheckIcon
} from './Icons';

export default function StudentGatewayPage() {
  // Simple Student Sign-In Form state (No eligibility options/questions)
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [signedInStudent, setSignedInStudent] = useState(null);
  const [formError, setFormError] = useState('');

  // Modals for deeper exploration
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  // Load saved student if previously signed in
  useEffect(() => {
    try {
      const saved = localStorage.getItem('msit_signed_in_student') || localStorage.getItem('msit_prospective_student');
      if (saved) {
        setSignedInStudent(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading saved student session', e);
    }
  }, []);

  const handleStudentSignIn = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setFormError('Please fill in your Full Name, Mobile/WhatsApp, and Email.');
      return;
    }
    setFormError('');

    const studentData = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      college: college.trim(),
      signedInAt: new Date().toISOString()
    };

    try {
      localStorage.setItem('msit_signed_in_student', JSON.stringify(studentData));
      
      const leads = JSON.parse(localStorage.getItem('msit_intake_leads') || '[]');
      leads.unshift(studentData);
      localStorage.setItem('msit_intake_leads', JSON.stringify(leads.slice(0, 50)));
    } catch (err) {
      console.error('Local storage write error', err);
    }

    setSignedInStudent(studentData);
  };

  const handleSignOut = () => {
    localStorage.removeItem('msit_signed_in_student');
    localStorage.removeItem('msit_prospective_student');
    setSignedInStudent(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setCollege('');
  };

  return (
    <div className="gateway-root minimal-gateway-root">
      {/* Clean Minimal Header */}
      <header className="gateway-header minimal-header">
        <div className="gateway-container gateway-header-container">
          <div className="gateway-brand">
            <img
              src="https://www.msit.ac.in/assets/msit-logo.png"
              alt="MSIT Logo"
              className="gateway-logo"
              width="40"
              height="40"
            />
            <div className="gateway-brand-text">
              <span className="gateway-brand-title">IIIT Hyderabad Consortium</span>
              <span className="gateway-brand-subtitle">MSIT · Master of Science in Information Technology</span>
            </div>
          </div>
          
          <div className="gateway-header-badges">
            <span className="gateway-cohort-pill">
              <span className="gateway-pulse-dot" aria-hidden="true"></span>
              Batch: January 2027
            </span>
          </div>
        </div>
      </header>

      {/* Main 2 Sections in One Page: Left for Exploring | Right for Students */}
      <main className="gateway-main minimal-main">
        <div className="gateway-container">
          <div className="minimal-two-section-grid">
            
            {/* =========================================================================
                LEFT SECTION: FOR EXPLORING
                ========================================================================= */}
            <section className="explore-section-card" aria-label="Explore MSIT">
              <div className="explore-header-kicker">
                <span className="mini-tag">UNIVERSITY CONSORTIUM</span>
                <span className="mini-subtag">IIIT Hyderabad · JNTUH · JNTUK · JNTUA · SVU</span>
              </div>

              <h1 className="explore-title">
                Master of Science in<br />
                Information Technology
              </h1>
              
              <p className="explore-lead">
                Founded in 2001 under the guidance of Turing Award laureate <strong>Prof. Raj Reddy</strong>, MSIT is an intensive postgraduate master's programme engineering high-impact software, scalable AI systems, and paid corporate co-ops.
              </p>

              {/* Informative Highlights */}
              <div className="explore-highlights-stack">
                <div className="explore-highlight-item">
                  <div className="highlight-icon">💻</div>
                  <div className="highlight-text">
                    <strong>100% Practical Learning by Doing</strong>
                    <p>Daily hands-on coding studios; build production software with mentor code reviews. Zero passive lectures.</p>
                  </div>
                </div>

                <div className="explore-highlight-item">
                  <div className="highlight-icon">💼</div>
                  <div className="highlight-text">
                    <strong>~50% Paid Corporate Co-op</strong>
                    <p>Work full-time as a software engineering intern at leading tech firms, earning a corporate stipend before graduation.</p>
                  </div>
                </div>

                <div className="explore-highlight-item">
                  <div className="highlight-icon">🧠</div>
                  <div className="highlight-text">
                    <strong>Modern AI, Cloud & Systems</strong>
                    <p>Comprehensive curriculum covering Generative AI, LLMs, scalable cloud architectures, and production-grade code quality.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons for Exploring */}
              <div className="explore-actions">
                <button
                  type="button"
                  className="btn btn-secondary explore-btn"
                  onClick={() => setShowGuideModal(true)}
                >
                  <BookOpenIcon size={16} />
                  <span>Read Programme Guide</span>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-ghost explore-btn"
                  onClick={() => setShowSummaryModal(true)}
                >
                  <DownloadIcon size={16} />
                  <span>1-Page Summary (PDF)</span>
                </button>
              </div>
            </section>

            {/* =========================================================================
                RIGHT SECTION: FOR STUDENTS (SIGN IN & DETAILS)
                ========================================================================= */}
            <section className="signin-section-card" aria-label="Student Sign In & Programme Details">
              {!signedInStudent ? (
                /* Student Sign In Form */
                <form onSubmit={handleStudentSignIn} className="minimal-signin-form">
                  <div className="signin-card-header">
                    <div className="signin-badge-icon">
                      <GraduationCapIcon size={24} />
                    </div>
                    <div>
                      <span className="signin-kicker">STUDENT ACCESS</span>
                      <h2>Student Sign In</h2>
                      <p>Enter your details to view full programme details, syllabus tracks, co-op partners, and admission steps.</p>
                    </div>
                  </div>

                  {formError && (
                    <div className="signin-error-alert" role="alert">
                      {formError}
                    </div>
                  )}

                  {/* Inputs */}
                  <div className="contact-two-col">
                    <div className="input-group">
                      <label htmlFor="studentName">Full Name <span className="req">*</span></label>
                      <input
                        id="studentName"
                        type="text"
                        className="minimal-input"
                        placeholder="e.g. Rahul Sharma"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="studentPhone">Mobile / WhatsApp <span className="req">*</span></label>
                      <input
                        id="studentPhone"
                        type="tel"
                        className="minimal-input"
                        placeholder="e.g. 9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="contact-two-col">
                    <div className="input-group">
                      <label htmlFor="studentEmail">Email Address <span className="req">*</span></label>
                      <input
                        id="studentEmail"
                        type="email"
                        className="minimal-input"
                        placeholder="e.g. rahul@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="studentCollege">College / Degree</label>
                      <input
                        id="studentCollege"
                        type="text"
                        className="minimal-input"
                        placeholder="e.g. CBIT, B.Tech CSE"
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn btn-primary signin-submit-btn">
                    <span>Sign In & View Programme Details ➔</span>
                  </button>

                  <div className="signin-privacy-note">
                    <ShieldCheckIcon size={14} />
                    <span>Your information is confidential and used only for academic admissions assistance.</span>
                  </div>
                </form>
              ) : (
                /* Signed In View: Shows Programme Details to the Student */
                <div className="unlocked-details-view">
                  <div className="unlocked-status-banner">
                    <div className="status-badge-icon">🎓</div>
                    <div>
                      <span className="status-mini-kicker">STUDENT ACCESS ACTIVE</span>
                      <h3>Welcome, {signedInStudent.fullName}!</h3>
                      <p>You have access to all details for the <strong>January 2027 MSIT Batch</strong>.</p>
                    </div>
                  </div>

                  {/* Student Info Strip */}
                  <div className="minimal-cred-strip">
                    <div className="cred-block">
                      <span>Email:</span>
                      <strong>{signedInStudent.email}</strong>
                    </div>
                    <div className="cred-block">
                      <span>Phone:</span>
                      <strong>{signedInStudent.phone}</strong>
                    </div>
                    {signedInStudent.college && (
                      <div className="cred-block">
                        <span>Institution:</span>
                        <strong>{signedInStudent.college}</strong>
                      </div>
                    )}
                  </div>

                  {/* Programme Details */}
                  <div className="unlocked-programme-body">
                    <h4>Available Programme Details:</h4>

                    <div className="unlocked-info-box">
                      <div className="info-box-head">
                        <span className="box-step">01</span>
                        <strong>Intensive Computing Foundations & AI</strong>
                      </div>
                      <p>Hands-on daily studios covering Data Structures & Algorithms, Full-Stack Architecture, Generative AI, and Machine Learning.</p>
                    </div>

                    <div className="unlocked-info-box">
                      <div className="info-box-head">
                        <span className="box-step">02</span>
                        <strong>~50% Paid Corporate Co-op</strong>
                      </div>
                      <p>Full-time paid software engineering tenure at partner tech enterprises with live mentor reviews and monthly stipend.</p>
                    </div>

                    <div className="unlocked-info-box">
                      <div className="info-box-head">
                        <span className="box-step">03</span>
                        <strong>Admissions & Loan Assistance</strong>
                      </div>
                      <p>Next batch starts January 2027 at IIIT Hyderabad. 100% pre-approved collateral-free bank loan assistance available.</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="unlocked-actions-row">
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
                      onClick={() => setShowGuideModal(true)}
                    >
                      <BookOpenIcon size={16} />
                      Read Full Programme Guide
                    </button>
                  </div>

                  <button
                    type="button"
                    className="btn-link-subtle"
                    onClick={handleSignOut}
                  >
                    ← Sign out / Sign in with different details
                  </button>
                </div>
              )}
            </section>

          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="gateway-footer minimal-footer">
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
                    <h4>4. Admission & Bank Loans</h4>
                  </div>
                  <ul className="summary-list compact">
                    <li><strong>Eligible Candidates:</strong> Graduates & final-year students in B.Tech/B.E., MCA, or M.Sc.</li>
                    <li><strong>January 2027 Intake:</strong> Applications currently open.</li>
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

      {/* Guide Modal (For deeper exploration without page reloading) */}
      {showGuideModal && (
        <div className="modal-backdrop" onClick={() => setShowGuideModal(false)}>
          <div className="modal-dialog modal-dialog-lg" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="guideModalTitle">
            <div className="modal-header">
              <div>
                <span className="kicker">Consortium of IIIT-H & State Universities</span>
                <h3 id="guideModalTitle">MSIT Academic Programme Guide</h3>
                <span className="modal-subtitle">Master of Science in Information Technology</span>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setShowGuideModal(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="modal-body" style={{ maxHeight: '68vh', overflowY: 'auto' }}>
              <div style={{ marginBottom: '1.4rem' }}>
                <h4 style={{ color: 'var(--primary-900)', marginBottom: '0.3rem' }}>Founding Legacy & Leadership</h4>
                <p style={{ fontSize: '0.92rem', lineHeight: '1.55', color: 'var(--neutral-700)' }}>
                  Conceived in 2001 by Turing Award laureate <strong>Prof. Raj Reddy</strong>, MSIT is an innovative computing master’s programme designed to bridge the chasm between textbook academic theory and real-world global tech industry practice.
                </p>
              </div>

              <div style={{ marginBottom: '1.4rem' }}>
                <h4 style={{ color: 'var(--primary-900)', marginBottom: '0.3rem' }}>2 Distinct Phases: From Foundations to Corporate Tenure</h4>
                <ul style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--neutral-700)', paddingLeft: '1.2rem' }}>
                  <li><strong>Phase 1: Deep Campus Immersion (IIIT Hyderabad)</strong> — Intensive full-day studio labs, algorithmic problem solving, modern web/cloud systems, and AI model deployment. Zero rote lectures.</li>
                  <li><strong>Phase 2: ~50% Corporate Co-op</strong> — Full-time software engineering tenure inside partner tech companies with senior engineer mentorship, live code reviews, and monthly corporate stipends.</li>
                </ul>
              </div>

              <div style={{ marginBottom: '1.4rem' }}>
                <h4 style={{ color: 'var(--primary-900)', marginBottom: '0.3rem' }}>Key Curriculum Pillars</h4>
                <p style={{ fontSize: '0.92rem', lineHeight: '1.55', color: 'var(--neutral-700)' }}>
                  Full-Stack Application Development · Artificial Intelligence & Machine Learning · Scalable Cloud Architectures · DevOps & Production Quality Systems.
                </p>
              </div>

              <div>
                <h4 style={{ color: 'var(--primary-900)', marginBottom: '0.3rem' }}>Batch Commencement</h4>
                <p style={{ fontSize: '0.92rem', lineHeight: '1.55', color: 'var(--neutral-700)' }}>
                  <strong>Next Intake:</strong> January 2027<br />
                  <strong>Campus:</strong> IIIT Hyderabad, Gachibowli, Hyderabad
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowGuideModal(false)}>
                Close
              </button>
              <button 
                className="btn btn-primary" 
                onClick={() => {
                  setShowGuideModal(false);
                  setShowSummaryModal(true);
                }}
              >
                <DownloadIcon size={16} />
                Download 1-Page Summary
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
