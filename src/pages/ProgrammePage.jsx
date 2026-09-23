import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRightIcon, UserIcon } from '../components/Icons';

// Centralized post-login data source
import msitData from '../data/msitData.json';

// Modular Post-Login Dashboard Components
import DashboardSubNav from '../components/postlogin/DashboardSubNav';
import StudentDashboardHeader from '../components/postlogin/StudentDashboardHeader';
import ProgrammeOverviewSection from '../components/postlogin/ProgrammeOverviewSection';
import CurriculumSection from '../components/postlogin/CurriculumSection';
import EligibilityAndAdmissionsSection from '../components/postlogin/EligibilityAndAdmissionsSection';
import FeesAndFinancialSupportSection from '../components/postlogin/FeesAndFinancialSupportSection';
import CareerOutcomesSection from '../components/postlogin/CareerOutcomesSection';
import RealWorldPracticumSection from '../components/postlogin/RealWorldPracticumSection';
import CampusAndStudentLifeSection from '../components/postlogin/CampusAndStudentLifeSection';
import DocumentsAndFAQSection from '../components/postlogin/DocumentsAndFAQSection';
import NextStepsAndApplicationSection from '../components/postlogin/NextStepsAndApplicationSection';
import AcademicSummaryModal from '../components/postlogin/AcademicSummaryModal';
import Footer from '../components/Footer';
import { getStudentDisplayName } from '../utils/userUtils';
import { APPLICATION_CONFIG } from '../data/applicationConfig';

const APPLICATION_PORTAL_URL = APPLICATION_CONFIG?.isApplicationOpen
  ? APPLICATION_CONFIG.standbyRoute
  : import.meta.env.VITE_APPLICATION_PORTAL_URL;

export default function ProgrammePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Resolved student display name
  const displayName = getStudentDisplayName(user);

  // Factsheet modal state
  const [showFactsheetModal, setShowFactsheetModal] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (e) {
      console.error('Sign out error:', e);
    }
    navigate('/');
  };

  return (
    <div className="programme-page-root student-decision-dashboard">
      {/* ============================================================
          TOP STICKY NAVIGATION GROUP (Header + Subnav pinned together)
          ============================================================ */}
      <div className="programme-sticky-nav-shell">
        <header className="programme-header">
          <div className="programme-header-container">
            <a href="#dashboard" className="programme-brand" aria-label="MSIT Dashboard">
              <img
                src="/assets/msit-logo.png"
                alt="MSIT Logo"
                className="brand-logo"
                style={{ objectFit: 'contain' }}
                width="38"
                height="38"
              />
              <div className="gateway-brand-text">
                <span className="gateway-brand-title">MSIT</span>
                <span className="gateway-brand-subtitle">Master of Science in Information Technology</span>
              </div>
            </a>

            <div className="programme-header-actions">
              {user && (
                <div className="header-student-profile-chip" title={`Authenticated as ${displayName} (${user.email})`}>
                  <span className="student-avatar-initial" aria-hidden="true">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                  <span className="programme-user-email">{displayName}</span>
                </div>
              )}

              <button
                type="button"
                className="btn btn-primary programme-apply-btn"
                onClick={() => navigate('/apply')}
              >
                <span>Apply Now</span>
                <ArrowRightIcon size={16} />
              </button>

              <button
                type="button"
                className="programme-signout-btn"
                onClick={handleSignOut}
                aria-label="Sign out of student account"
              >
                Sign Out
              </button>
            </div>
          </div>
        </header>

        {/* POST-LOGIN STICKY SUB-NAVIGATION */}
        <DashboardSubNav />
      </div>

      {/* ============================================================
          1. STUDENT DASHBOARD / WELCOME & ACTION HUB
          ============================================================ */}
      <StudentDashboardHeader 
        user={user} 
        data={msitData.dashboard} 
        onApply={() => navigate('/apply')} 
      />

      {/* ============================================================
          2. PROGRAMME OVERVIEW (Specifications & Academic Anchor)
          ============================================================ */}
      <ProgrammeOverviewSection data={msitData.overview} />

      {/* ============================================================
          3. CURRICULUM & LEARNING STRUCTURE
          ============================================================ */}
      <CurriculumSection data={msitData.curriculum} />

      {/* ============================================================
          4. ELIGIBILITY & ADMISSIONS PROCESS
          ============================================================ */}
      <EligibilityAndAdmissionsSection data={msitData.eligibility} />

      {/* ============================================================
          5. FEES & FINANCIAL SUPPORT
          ============================================================ */}
      <FeesAndFinancialSupportSection data={msitData.fees} />

      {/* ============================================================
          6. CAREER PATHWAYS & OUTCOMES
          ============================================================ */}
      <CareerOutcomesSection data={msitData.careers} />

      {/* ============================================================
          7. REAL-WORLD PRACTICUM & VENTURE STUDIO
          ============================================================ */}
      <RealWorldPracticumSection data={msitData.practicum} />

      {/* ============================================================
          8. CAMPUS & STUDENT LIFE
          ============================================================ */}
      <CampusAndStudentLifeSection data={msitData.campusLife} />

      {/* ============================================================
          9. DOCUMENTS & FAQ
          ============================================================ */}
      <DocumentsAndFAQSection 
        documentsData={msitData.documents} 
        faqData={msitData.faq} 
        onOpenSummaryModal={() => setShowFactsheetModal(true)}
      />

      {/* ============================================================
          10. APPLICATION STATUS & NEXT STEPS
          ============================================================ */}
      <NextStepsAndApplicationSection 
        data={msitData.nextSteps} 
        user={user} 
        applicationPortalUrl={APPLICATION_PORTAL_URL} 
      />

      {/* ============================================================
          OFFICIAL FOOTER
          ============================================================ */}
      <Footer data={msitData.footer} />

      {/* ============================================================
          FACTSHEET MODAL
          ============================================================ */}
      <AcademicSummaryModal 
        isOpen={showFactsheetModal} 
        onClose={() => setShowFactsheetModal(false)} 
      />
    </div>
  );
}
