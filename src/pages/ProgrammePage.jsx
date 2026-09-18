import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRightIcon, BookOpenIcon } from '../components/Icons';

// Curated programme components (8 selected)
import Navbar from '../components/Navbar';
import ProgrammeAtGlance from '../components/ProgrammeAtGlance';
import WhyChooseMSIT from '../components/WhyChooseMSIT';
import Curriculum from '../components/Curriculum';
import AdmissionsCenter from '../components/AdmissionsCenter';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

// Centralized data
import msitData from '../data/msitData.json';

/**
 * Application portal URL — configurable via environment variable.
 * If not set, the Apply Now button shows a placeholder message.
 */
const APPLICATION_PORTAL_URL = import.meta.env.VITE_APPLICATION_PORTAL_URL;

export default function ProgrammePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="programme-page-root">
      {/* ============================================================
          PROGRAMME HEADER
          ============================================================ */}
      <header className="programme-header">
        <div className="programme-header-container">
          <a href="/" className="programme-brand" aria-label="Back to home">
            <img
              src="/assets/msit-25-logo.png"
              alt="25 Years of MSIT"
              className="brand-logo"
              style={{ objectFit: 'contain' }}
              width="38"
              height="38"
            />
            <div className="gateway-brand-text">
              <span className="gateway-brand-title">IIIT Hyderabad Consortium</span>
              <span className="gateway-brand-subtitle">MSIT Programme Information</span>
            </div>
          </a>

          <div className="programme-header-actions">
            {user && (
              <span className="programme-user-email">{user.email}</span>
            )}

            {APPLICATION_PORTAL_URL ? (
              <a
                href={APPLICATION_PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary programme-apply-btn"
              >
                <span>Apply Now</span>
                <ArrowRightIcon size={16} />
              </a>
            ) : (
              <span className="programme-apply-placeholder" title="Application portal URL not yet configured">
                Applications Opening Soon
              </span>
            )}

            <button
              type="button"
              className="programme-signout-btn"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================
          PROGRAMME WELCOME BANNER
          ============================================================ */}
      <section className="programme-welcome-banner">
        <div className="container">
          <div className="programme-welcome-content">
            <div className="programme-welcome-icon">
              <BookOpenIcon size={28} />
            </div>
            <div>
              <h1 className="programme-welcome-title">
                MSIT — Programme Information
              </h1>
              <p className="programme-welcome-desc">
                Welcome! Explore the complete details of the Master of Science in
                Information Technology programme at IIIT Hyderabad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CURATED PROGRAMME SECTIONS
          Extensible: to add a section later, import the component and
          add a single <ComponentName data={msitData.sectionKey} /> line.
          ============================================================ */}

      <ProgrammeAtGlance data={msitData.glance} />

      <WhyChooseMSIT data={msitData.whyChoose} />

      <Curriculum data={msitData.curriculum} />

      <AdmissionsCenter data={msitData.admissionsCenter} />

      <FAQ data={msitData.faq} />

      {/* ============================================================
          APPLY NOW CTA SECTION
          ============================================================ */}
      <section className="section cta-section" id="apply">
        <div className="container">
          <div className="cta-box">
            <span className="kicker light">Next Steps</span>
            <h2>Ready to Apply?</h2>
            {APPLICATION_PORTAL_URL ? (
              <>
                <p>
                  Begin your MSIT journey. Click below to access the official
                  application portal.
                </p>
                <a
                  href={APPLICATION_PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary light"
                  style={{ marginTop: '1rem' }}
                >
                  Apply Now — Official Portal
                  <ArrowRightIcon size={16} />
                </a>
              </>
            ) : (
              <>
                <p>
                  The official application portal for the January 2027 cohort
                  will be opening soon. We'll notify you at{' '}
                  <strong>{user?.email}</strong> when applications open.
                </p>
                <p style={{ fontSize: '0.92rem', opacity: 0.85, marginTop: '0.6rem' }}>
                  Have questions? Contact{' '}
                  <a href="mailto:query@msit.ac.in" style={{ color: '#fff', textDecoration: 'underline' }}>
                    query@msit.ac.in
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer data={msitData.footer} />
    </div>
  );
}
