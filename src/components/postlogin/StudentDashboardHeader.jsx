import React from 'react';
import { 
  ShieldCheckIcon, 
  CalendarIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  ArrowRightIcon, 
  BookOpenIcon,
  SparklesIcon
} from '../Icons';
import { getStudentDisplayName } from '../../utils/userUtils';

export default function StudentDashboardHeader({ user, data }) {
  // Extract real student name cleanly
  const displayName = getStudentDisplayName(user);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -120;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="student-dashboard-hero" id="overview">
      <div id="dashboard" style={{ position: 'absolute', top: 0 }} />
      <div className="container">
        {/* Top Identification & Welcome Row */}
        <div className="dashboard-welcome-card">
          <div className="welcome-main-info">
            <div className="student-badge-row">
              <span className="student-verified-pill">
                <CheckCircleIcon size={14} />
                <span>Verified Prospective Student</span>
              </span>
              <span className="student-email-pill">
                {user?.email || 'student@msit.ac.in'}
              </span>
              <span className="student-cohort-pill">
                <CalendarIcon size={14} />
                <span>{data.cohortBadge}</span>
              </span>
            </div>

            <h1 className="welcome-student-title">
              Welcome, <span className="highlight-text">{displayName}</span>!
            </h1>
            <p className="welcome-student-desc">
              {data.welcomeSubtitle}
            </p>

            <div className="welcome-quick-ctas">
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => scrollToSection('next-steps')}
              >
                <span>View Application Timeline</span>
                <ArrowRightIcon size={16} />
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => scrollToSection('curriculum')}
              >
                <BookOpenIcon size={16} />
                <span>Explore Curriculum</span>
              </button>
            </div>
          </div>

          {/* Current Application Status Box */}
          <div className="application-status-card">
            <div className="status-card-header">
              <span className="status-kicker">APPLICATION STATUS</span>
              <span className="status-beacon-pill">
                <span className="beacon-dot"></span>
                {data.statusBadge}
              </span>
            </div>

            <div className="status-card-body">
              <h3>Next Cohort: January 2027</h3>
              <p>
                Official admission circular, online registration portal, and entrance syllabus are scheduled for announcement shortly.
              </p>
              <div className="status-note-box">
                <ClockIcon size={16} />
                <span>Notification alert active for <strong>{user?.email || 'Registered Candidate'}</strong></span>
              </div>
            </div>

            <div className="status-card-footer">
              <button 
                type="button" 
                className="status-jump-btn"
                onClick={() => scrollToSection('eligibility')}
              >
                <span>Check Eligibility Criteria</span>
                <ArrowRightIcon size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Actionable "What Should I Do Next?" Checklist Area */}
        <div className="decision-prep-area">
          <div className="decision-prep-header">
            <div className="prep-title-group">
              <SparklesIcon size={20} className="prep-icon" />
              <div>
                <h2>{data.nextActionTitle}</h2>
                <p>{data.nextActionDesc}</p>
              </div>
            </div>
          </div>

          <div className="prep-checklist-grid">
            {(data?.actionChecklist || []).map((item) => (
              <div key={item.id} className={`prep-checklist-card ${item.done ? 'is-done' : ''}`}>
                <div className="checklist-num-wrap">
                  {item.done ? (
                    <span className="checklist-check-icon">✓</span>
                  ) : (
                    <span className="checklist-num">{item.id}</span>
                  )}
                </div>
                <div className="checklist-card-content">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
