import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CalendarIcon, 
  CheckCircleIcon, 
  ArrowRightIcon, 
  SparklesIcon,
  DownloadIcon
} from '../Icons';
import { getStudentDisplayName } from '../../utils/userUtils';

export default function StudentDashboardHeader({ 
  user, 
  data, 
  application = null,
  applicationStatus = 'Not Started',
  onApply 
}) {
  const navigate = useNavigate();
  // Extract real student name cleanly
  const displayName = getStudentDisplayName(user);

  const getButtonLabel = () => {
    if (applicationStatus === 'Draft') return 'Continue Application';
    if (['Submitted', 'Under Review', 'Accepted', 'Rejected'].includes(applicationStatus)) return 'View Application';
    if (applicationStatus === 'Additional Information Required') return 'Update Application';
    return 'Apply Now (Jan 2027)';
  };

  const handleActionClick = () => {
    if (onApply) {
      onApply(applicationStatus);
    } else {
      navigate('/apply');
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
                onClick={handleActionClick}
              >
                <span>{getButtonLabel()}</span>
                <ArrowRightIcon size={16} />
              </button>
            </div>

            {/* Admission Notification Item */}
            <div className="admission-notification-item">
              <div className="admission-notification-header">
                <span className="admission-notification-title">Admission Notification</span>
              </div>
              <a 
                href="/documents/MSIT_Admission_Notification_2026-27.pdf" 
                download="MSIT_Admission_Notification_2026-27.pdf"
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm admission-notification-download-btn"
              >
                <DownloadIcon size={15} />
                <span>Download</span>
              </a>
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
                  <span className="checklist-step-num">{item.id}</span>
                </div>
                <div className="checklist-card-content">
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
