import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthFlow from './AuthFlow';
import { 
  BuildingIcon, DownloadIcon, ArrowRightIcon,
  GraduationCapIcon, CpuIcon, BookOpenIcon, BriefcaseIcon, ShieldCheckIcon, AwardIcon,
  InfoIcon
} from './Icons';
import KnowAboutMSITPage from './KnowAboutMSITPage';

export default function StudentGatewayPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Page view: 'gateway' | 'about-msit'
  const [view, setView] = useState('gateway');

  // Exploration modal for 1-page summary
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  // If user is already authenticated and lands on gateway, smoothly redirect to programme dashboard
  React.useEffect(() => {
    if (user && view === 'gateway') {
      navigate('/programme', { replace: true });
    }
  }, [user, view, navigate]);

  // If user navigated to "Know About MSIT" slideshow page
  if (view === 'about-msit') {
    return (
      <KnowAboutMSITPage 
        onBack={() => setView('gateway')}
        onGoToSignIn={() => {
          setView('gateway');
          setTimeout(() => {
            document.getElementById('email')?.focus();
          }, 150);
        }}
      />
    );
  }

  return (
    <div className="gateway-root minimal-gateway-root">
      {/* Main 2-Section Clean Gateway */}
      <main className="gateway-main minimal-main" style={{ paddingTop: 'clamp(1.5rem, 3.5vh, 2.5rem)' }}>
        <div className="gateway-container">
          
          {/* MSIT Heading & Unified Identity Area */}
          <div className="gateway-hero-header">
            <div className="gateway-identity-group">
              <img
                src="/assets/msit-logo.png"
                alt="25 Years of MSIT Logo"
                className="gateway-hero-logo"
                width="115"
                height="115"
              />
              <div className="gateway-title-group">
                <h1 className="gateway-main-title">
                  <span className="title-line-1">Master of Science In</span>
                  <span className="title-line-2">Information Technology</span>
                </h1>
              </div>
            </div>
            <p className="gateway-main-desc">
              A postgraduate/master’s program designed to build expertise in computing and software engineering, offered through IIIT Hyderabad and leading state universities.
            </p>
          </div>

          <div className="simple-two-card-grid">
            
            {/* =========================================================================
                LEFT SIDE: BOX WITH ARROW TO EXPLORE / KNOW ABOUT MSIT
                ========================================================================= */}
            <div className="simple-action-card explore-box">
              <div className="simple-card-top">
                <span className="simple-mini-badge">ABOUT MSIT</span>
                <div className="simple-card-icon">
                  <InfoIcon size={24} />
                </div>
              </div>

              <div className="simple-card-content">
                <h2 className="simple-card-title">Know About MSIT</h2>
                <p className="simple-card-desc">
                  Discover our 25+ year founding legacy under Turing Laureate Prof. Raj Reddy, the zero-lecture studio learning model, and 50% real-world practicum.
                </p>
                <div className="explore-highlights-row">
                  <span className="explore-chip">25+ Yrs Legacy</span>
                  <span className="explore-chip">Zero Lectures</span>
                  <span className="explore-chip">50% Practicum</span>
                </div>
              </div>

              {/* Meaningful Visual: Studio & Campus Life Preview Placed AFTER Information */}
              <div className="explore-preview-frame">
                <img 
                  src="/assets/msit-convocation.jpg" 
                  alt="MSIT Convocation and Campus Life" 
                  className="explore-preview-img"
                  loading="eager"
                />
              </div>

              <div className="simple-card-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary card-arrow-btn"
                  onClick={() => setView('about-msit')}
                  aria-label="Explore Slides"
                >
                  <span>Explore Slides</span>
                  <ArrowRightIcon size={18} />
                </button>
              </div>
            </div>

            {/* =========================================================================
                RIGHT SIDE: INTERESTED IN MSIT / ADMISSION PORTAL
                ========================================================================= */}
            <div className="simple-action-card signin-box">
              {!user ? (
                <AuthFlow />
              ) : (
                <div className="signed-in-content-view">
                  <div className="simple-card-top">
                    <span className="simple-mini-badge success">VERIFIED</span>
                    <button 
                      type="button" 
                      className="simple-signout-link"
                      onClick={() => signOut()}
                    >
                      Sign Out
                    </button>
                  </div>

                  <div className="simple-card-content">
                    <h2 className="simple-card-title">Welcome Back!</h2>
                    <p className="student-email-tag">{user.email}</p>
                    
                    <p className="simple-card-desc">
                      Your email is verified. Access the full programme details,
                      curriculum, admissions roadmap, and application information.
                    </p>
                  </div>

                  <div className="simple-card-footer" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    <button
                      type="button"
                      className="btn btn-primary card-arrow-btn full-width"
                      onClick={() => navigate('/apply')}
                    >
                      <span>Apply Now (January 2027)</span>
                      <ArrowRightIcon size={18} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary card-arrow-btn full-width"
                      onClick={() => navigate('/programme')}
                    >
                      <span>Open Programme Dashboard</span>
                      <ArrowRightIcon size={18} />
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
                    <li><strong>Institution:</strong> MSIT.</li>
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
                    <li><strong>Eligibility:</strong> Graduates & final-year (B.Tech / B.E. all branches).</li>
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
