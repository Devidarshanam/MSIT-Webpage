import React, { useState, useEffect } from 'react';
import { 
  BuildingIcon, DownloadIcon, ArrowRightIcon,
  GraduationCapIcon, CpuIcon, BookOpenIcon, BriefcaseIcon, ShieldCheckIcon, AwardIcon
} from './Icons';

export default function StudentGatewayPage() {
  // Sign-in form state: ONLY Name and Email
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [signedInStudent, setSignedInStudent] = useState(null);
  const [formError, setFormError] = useState('');

  // Exploration modal for "Know About MSIT"
  const [showExploreModal, setShowExploreModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  // Load existing session if previously signed in
  useEffect(() => {
    try {
      const saved = localStorage.getItem('msit_signed_in_student') || localStorage.getItem('msit_prospective_student');
      if (saved) {
        setSignedInStudent(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error reading saved session', e);
    }
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      setFormError('Please enter both your Name and Email Address.');
      return;
    }
    setFormError('');

    const studentData = {
      fullName: fullName.trim(),
      email: email.trim(),
      signedInAt: new Date().toISOString()
    };

    try {
      localStorage.setItem('msit_signed_in_student', JSON.stringify(studentData));
      
      const leads = JSON.parse(localStorage.getItem('msit_intake_leads') || '[]');
      leads.unshift(studentData);
      localStorage.setItem('msit_intake_leads', JSON.stringify(leads.slice(0, 50)));
    } catch (err) {
      console.error('Local storage save error', err);
    }

    setSignedInStudent(studentData);
  };

  const handleSignOut = () => {
    localStorage.removeItem('msit_signed_in_student');
    localStorage.removeItem('msit_prospective_student');
    setSignedInStudent(null);
    setFullName('');
    setEmail('');
  };

  return (
    <div className="gateway-root minimal-gateway-root">
      {/* Top Header - Ultra Clean & Minimal */}
      <header className="gateway-header minimal-header">
        <div className="gateway-container gateway-header-container">
          <div className="gateway-brand">
            <img
              src="https://www.msit.ac.in/assets/msit-logo.png"
              alt="MSIT Logo"
              className="gateway-logo"
              width="38"
              height="38"
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

      {/* Main 2-Section Clean Gateway */}
      <main className="gateway-main minimal-main">
        <div className="gateway-container">
          
          {/* MSIT Heading & Description */}
          <div className="gateway-hero-header">
            <span className="gateway-kicker-badge">UNIVERSITY CONSORTIUM</span>
            <h1 className="gateway-main-title">Master of Science in Information Technology (MSIT)</h1>
            <p className="gateway-main-desc">
              Conceived in 2001 by Turing Award laureate <strong>Prof. Raj Reddy</strong>, MSIT is an intensive postgraduate computing programme offered under the consortium of IIIT Hyderabad and leading state universities. Built around 100% active learning-by-doing and ~50% paid corporate industry co-op.
            </p>
          </div>

          <div className="simple-two-card-grid">
            
            {/* =========================================================================
                LEFT SIDE: BOX WITH ARROW TO EXPLORE / KNOW ABOUT MSIT
                ========================================================================= */}
            <div 
              className="simple-action-card explore-box"
              onClick={() => setShowExploreModal(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowExploreModal(true); }}
              aria-label="Explore and know about MSIT"
            >
              <div className="simple-card-top">
                <span className="simple-mini-badge">EXPLORE</span>
                <div className="simple-card-icon">
                  <BookOpenIcon size={26} />
                </div>
              </div>

              <div className="simple-card-content">
                <h2 className="simple-card-title">Know About MSIT</h2>
                <p className="simple-card-desc">
                  Discover the 100% learning-by-doing model, Turing Laureate Prof. Raj Reddy legacy, and ~50% paid corporate co-op.
                </p>
              </div>

              <div className="simple-card-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary card-arrow-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowExploreModal(true);
                  }}
                >
                  <span>Explore MSIT</span>
                  <ArrowRightIcon size={18} />
                </button>
              </div>
            </div>

            {/* =========================================================================
                RIGHT SIDE: SIGN IN FOR STUDENTS (NAME & EMAIL ONLY)
                ========================================================================= */}
            <div className="simple-action-card signin-box">
              {!signedInStudent ? (
                /* State 1: Sign-In Form with ONLY Name and Email */
                <form onSubmit={handleSignIn} className="simple-signin-form">
                  <div className="simple-card-top">
                    <span className="simple-mini-badge">STUDENT ACCESS</span>
                    <div className="simple-card-icon student-icon">
                      <GraduationCapIcon size={26} />
                    </div>
                  </div>

                  <div className="simple-card-content">
                    <h2 className="simple-card-title">Student Sign In</h2>
                    <p className="simple-card-desc">
                      Sign in to know more about the programme, curriculum tracks, and admission steps.
                    </p>

                    {formError && (
                      <div className="simple-form-error" role="alert">
                        {formError}
                      </div>
                    )}

                    <div className="simple-fields-stack">
                      <div className="simple-field-group">
                        <label htmlFor="studentFullName">Your Name</label>
                        <input
                          id="studentFullName"
                          type="text"
                          className="simple-text-input"
                          placeholder="Enter your full name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          autoComplete="name"
                        />
                      </div>

                      <div className="simple-field-group">
                        <label htmlFor="studentEmail">Email Address</label>
                        <input
                          id="studentEmail"
                          type="email"
                          className="simple-text-input"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          autoComplete="email"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="simple-card-footer">
                    <button type="submit" className="btn btn-primary card-arrow-btn full-width">
                      <span>Know More About Programme</span>
                      <ArrowRightIcon size={18} />
                    </button>
                  </div>
                </form>
              ) : (
                /* State 2: Signed-In Student View */
                <div className="signed-in-content-view">
                  <div className="simple-card-top">
                    <span className="simple-mini-badge success">SIGNED IN</span>
                    <button 
                      type="button" 
                      className="simple-signout-link"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </button>
                  </div>

                  <div className="simple-card-content">
                    <h2 className="simple-card-title">Welcome, {signedInStudent.fullName}!</h2>
                    <p className="student-email-tag">{signedInStudent.email}</p>
                    
                    <div className="programme-quick-highlights">
                      <div className="prog-highlight-row">
                        <span className="bullet-dot"></span>
                        <div>
                          <strong>January 2027 Admissions:</strong>
                          <p>Applications are open for graduates & final-year students (B.Tech, MCA, M.Sc).</p>
                        </div>
                      </div>

                      <div className="prog-highlight-row">
                        <span className="bullet-dot"></span>
                        <div>
                          <strong>~50% Corporate Co-op:</strong>
                          <p>Paid full-time software engineering internship with senior tech mentorship.</p>
                        </div>
                      </div>

                      <div className="prog-highlight-row">
                        <span className="bullet-dot"></span>
                        <div>
                          <strong>Education Loan Assistance:</strong>
                          <p>100% collateral-free bank loan support through nationalized bank partners.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="simple-card-footer split-actions">
                    <button
                      type="button"
                      className="btn btn-primary card-arrow-btn"
                      onClick={() => setShowExploreModal(true)}
                    >
                      <span>Full Programme Details</span>
                      <ArrowRightIcon size={16} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-ghost card-arrow-btn"
                      onClick={() => setShowSummaryModal(true)}
                    >
                      <DownloadIcon size={16} />
                      <span>1-Page PDF</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

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

      {/* "Know About MSIT" Full Modal */}
      {showExploreModal && (
        <div className="modal-backdrop" onClick={() => setShowExploreModal(false)}>
          <div className="modal-dialog modal-dialog-lg" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="exploreModalTitle">
            <div className="modal-header">
              <div>
                <span className="kicker">IIIT Hyderabad Consortium</span>
                <h3 id="exploreModalTitle">About MSIT Programme</h3>
                <span className="modal-subtitle">Master of Science in Information Technology</span>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setShowExploreModal(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="modal-body" style={{ maxHeight: '68vh', overflowY: 'auto' }}>
              <div style={{ marginBottom: '1.4rem' }}>
                <h4 style={{ color: 'var(--primary-900)', marginBottom: '0.35rem' }}>1. Founding Vision & Legacy</h4>
                <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--neutral-700)' }}>
                  Started in 2001 under the guidance of Turing Award laureate <strong>Prof. Raj Reddy</strong>, MSIT was engineered to eliminate passive chalk-and-talk lectures in favor of real-world computing expertise.
                </p>
              </div>

              <div style={{ marginBottom: '1.4rem' }}>
                <h4 style={{ color: 'var(--primary-900)', marginBottom: '0.35rem' }}>2. 100% Learning By Doing</h4>
                <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--neutral-700)' }}>
                  Students work in daily hands-on coding studios from morning to evening. You build production-grade web systems, machine learning pipelines, and cloud services with real-time mentor code reviews.
                </p>
              </div>

              <div style={{ marginBottom: '1.4rem' }}>
                <h4 style={{ color: 'var(--primary-900)', marginBottom: '0.35rem' }}>3. ~50% Paid Corporate Co-op</h4>
                <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--neutral-700)' }}>
                  Roughly half of your master's tenure is spent working full-time as an engineering intern inside partner tech enterprises, earning a monthly corporate stipend before graduation.
                </p>
              </div>

              <div style={{ marginBottom: '1.4rem' }}>
                <h4 style={{ color: 'var(--primary-900)', marginBottom: '0.35rem' }}>4. University Consortium</h4>
                <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--neutral-700)' }}>
                  Offered under the consortium of <strong>IIIT Hyderabad</strong> together with leading state universities: <strong>JNTU Hyderabad, JNTU Kakinada, JNTU Anantapur, and Sri Venkateswara University (SVU)</strong>.
                </p>
              </div>

              <div>
                <h4 style={{ color: 'var(--primary-900)', marginBottom: '0.35rem' }}>5. Key Dates & Intake</h4>
                <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--neutral-700)' }}>
                  <strong>Next Intake:</strong> January 2027<br />
                  <strong>Campus:</strong> IIIT Hyderabad, Gachibowli, Hyderabad
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowExploreModal(false)}>
                Close
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setShowExploreModal(false);
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

      {/* 1-Page Summary Modal */}
      {showSummaryModal && (
        <div className="modal-backdrop" onClick={() => setShowSummaryModal(false)}>
          <div className="modal-dialog modal-dialog-lg" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="summaryModalTitle">
            <div className="modal-header">
              <div className="modal-header-branding">
                <span className="kicker">Official Academic Summary</span>
                <h3 id="summaryModalTitle">MSIT — Master of Science in Information Technology</h3>
                <span className="modal-subtitle">January 2027 Intake Reference</span>
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
                    <li><strong>Institution:</strong> IIIT Hyderabad Consortium.</li>
                    <li><strong>Founded:</strong> 2001 by Turing Award Laureate Prof. Raj Reddy.</li>
                    <li><strong>Partner Universities:</strong> JNTUH, JNTUK, JNTUA, SVU.</li>
                  </ul>
                </div>

                <div className="summary-card">
                  <div className="summary-card-head">
                    <BuildingIcon size={18} />
                    <h4>2. Programme Structure</h4>
                  </div>
                  <ul className="summary-list compact">
                    <li><strong>Batch:</strong> January 2027 (Full-Time On-Campus).</li>
                    <li><strong>Methodology:</strong> 100% Practical Studios.</li>
                    <li><strong>Co-op:</strong> ~50% paid corporate industry internship.</li>
                  </ul>
                </div>

                <div className="summary-card">
                  <div className="summary-card-head">
                    <CpuIcon size={18} />
                    <h4>3. Technical Focus</h4>
                  </div>
                  <ul className="summary-list compact">
                    <li><strong>AI & Machine Learning:</strong> LLMs, Deep Learning, Data Systems.</li>
                    <li><strong>Cloud Architecture:</strong> Distributed systems & microservices.</li>
                    <li><strong>Software Engineering:</strong> Clean code, testing & DevOps.</li>
                  </ul>
                </div>

                <div className="summary-card">
                  <div className="summary-card-head">
                    <ShieldCheckIcon size={18} />
                    <h4>4. Admissions & Support</h4>
                  </div>
                  <ul className="summary-list compact">
                    <li><strong>Eligibility:</strong> Graduates & final-year (B.Tech, MCA, M.Sc).</li>
                    <li><strong>Intake:</strong> January 2027.</li>
                    <li><strong>Bank Loans:</strong> 100% collateral-free education loans.</li>
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
