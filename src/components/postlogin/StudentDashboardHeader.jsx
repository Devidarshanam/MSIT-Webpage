import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CalendarIcon, 
  CheckCircleIcon, 
  ClockIcon,
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
  admissionSettings = null,
  loadingSettings = false,
  onApply 
}) {
  const navigate = useNavigate();
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

  // Dynamic parameters from admin admission settings or fallback
  const commencementDate = admissionSettings?.commencementDate || data?.cohortBadge?.replace('Batch Commencement: ', '') || 'January 2, 2027';
  const commencementVenue = admissionSettings?.commencementVenue || 'IIIT Hyderabad';
  const appStart = admissionSettings?.applicationStartDate || 'October 1, 2026';
  const appDeadline = admissionSettings?.applicationDeadline || 'November 30, 2026';
  const appModes = admissionSettings?.admissionModes || 'GRE, GATE, or MSIT Exam';

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

  // Status-dependent presentation mapping for the top-right blue card
  const statusConfigMap = {
    'Not Started': {
      badge: data?.statusBadge || 'Applications Open Now',
      badgeBg: undefined,
      badgeColor: undefined,
      badgeBorder: undefined,
      dotColor: '#10b981',
      title: `Next Cohort: ${commencementDate}`,
      description: `Applications for the ${commencementDate} intake are now live. Submit your details online to register for the upcoming cohort.`,
      noteIcon: <CheckCircleIcon size={16} />,
      noteBg: undefined,
      noteBorder: undefined,
      noteColor: undefined,
      noteText: 'Online application portal is now active',
      buttonLabel: 'Apply Now'
    },
    'Draft': {
      badge: 'Draft Saved',
      badgeBg: '#fffbeb',
      badgeColor: '#92400e',
      badgeBorder: '#fde68a',
      dotColor: '#f59e0b',
      title: 'Application in Progress',
      description: 'You have an active draft. Reopen your application to complete academic details and required uploads.',
      noteIcon: <ClockIcon size={16} />,
      noteBg: '#fffbeb',
      noteBorder: '#fde68a',
      noteColor: '#92400e',
      noteText: application?.updated_at 
        ? `Last saved: ${new Date(application.updated_at).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`
        : 'Application progress saved',
      buttonLabel: 'Continue Application'
    },
    'Submitted': {
      badge: 'Submitted',
      badgeBg: '#eff6ff',
      badgeColor: '#1e40af',
      badgeBorder: '#bfdbfe',
      dotColor: '#3b82f6',
      title: `Application Ref: ${application?.application_id || 'MSIT-2027'}`,
      description: `Submitted successfully on ${application?.submitted_at ? new Date(application.submitted_at).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }) : 'recently'}. Your details are recorded and queued for admissions review.`,
      noteIcon: <CheckCircleIcon size={16} />,
      noteBg: '#eff6ff',
      noteBorder: '#bfdbfe',
      noteColor: '#1e40af',
      noteText: 'Official application received & recorded',
      buttonLabel: 'View Application'
    },
    'Under Review': {
      badge: 'Under Review',
      badgeBg: '#faf5ff',
      badgeColor: '#6b21a8',
      badgeBorder: '#e9d5ff',
      dotColor: '#a855f7',
      title: `Application Ref: ${application?.application_id || 'MSIT-2027'}`,
      description: 'Your academic background, documents, and statement are being reviewed by the admissions committee.',
      noteIcon: <ClockIcon size={16} />,
      noteBg: '#faf5ff',
      noteBorder: '#e9d5ff',
      noteColor: '#6b21a8',
      noteText: 'Admissions committee review in progress',
      buttonLabel: 'View Application'
    },
    'Additional Information Required': {
      badge: 'Action Required',
      badgeBg: '#fff7ed',
      badgeColor: '#9a3412',
      badgeBorder: '#ffedd5',
      dotColor: '#ea580c',
      title: 'Additional Information Requested',
      description: application?.decision_reason 
        ? `The admissions team requested updates: "${application.decision_reason}". Please update and resubmit your application.`
        : 'The admissions committee has requested document updates or clarifications.',
      noteIcon: <ClockIcon size={16} />,
      noteBg: '#fff7ed',
      noteBorder: '#fed7aa',
      noteColor: '#9a3412',
      noteText: 'Updates permitted by admissions team',
      buttonLabel: 'Update Application'
    },
    'Accepted': {
      badge: 'Accepted 🎉',
      badgeBg: '#ecfdf5',
      badgeColor: '#065f46',
      badgeBorder: '#a7f3d0',
      dotColor: '#10b981',
      title: 'Admission Offered',
      description: `Congratulations! You have received an admission offer for the MSIT ${commencementDate} cohort at IIIT Hyderabad.`,
      noteIcon: <CheckCircleIcon size={16} />,
      noteBg: '#ecfdf5',
      noteBorder: '#a7f3d0',
      noteColor: '#065f46',
      noteText: 'Formal admission decision recorded',
      buttonLabel: 'View Application'
    },
    'Rejected': {
      badge: 'Decision Released',
      badgeBg: '#f8fafc',
      badgeColor: '#334155',
      badgeBorder: '#e2e8f0',
      dotColor: '#64748b',
      title: 'Admissions Decision',
      description: 'The admissions committee has finalized review for this cohort. Thank you for applying to MSIT.',
      noteIcon: <CheckCircleIcon size={16} />,
      noteBg: '#f8fafc',
      noteBorder: '#e2e8f0',
      noteColor: '#334155',
      noteText: 'Evaluation completed for this intake',
      buttonLabel: 'View Application'
    }
  };

  const currentStatusConfig = statusConfigMap[applicationStatus] || statusConfigMap['Not Started'];

  // 1. Application Submission: Mark complete when the student has submitted the application.
  const submittedStatuses = [
    'Submitted', 
    'Under Review', 
    'Accepted', 
    'Declined', 
    'Rejected', 
    'Additional Information Required', 
    'Interview Scheduled', 
    'Interview Completed', 
    'Onboarded', 
    'Enrolled'
  ];
  const isAppSubmitted = Boolean(
    submittedStatuses.includes(applicationStatus) ||
    submittedStatuses.includes(application?.status) ||
    application?.submitted_at ||
    application?.isSubmitted
  );

  // 2. Admission Mode Selection: Mark complete when the student has selected or confirmed an admission mode.
  const isAdmissionModeSelected = Boolean(
    (isAppSubmitted && (application?.entrance_exam_status || application?.admission_mode || true)) ||
    (application?.entrance_exam_status && application?.entrance_exam_status !== '') ||
    application?.admission_mode ||
    application?.selected_admission_mode ||
    application?.admission_mode_confirmed ||
    application?.draft_data?.entranceExamStatus
  );

  // 3. Technical Interview & Counselling: Mark complete when the relevant interview/counselling stage has been completed or the admin has updated its status accordingly.
  const isInterviewComplete = Boolean(
    ['Accepted', 'Interview Completed', 'Counselling Completed', 'Onboarded', 'Enrolled'].includes(application?.status) ||
    ['Accepted', 'Interview Completed', 'Counselling Completed', 'Onboarded', 'Enrolled'].includes(applicationStatus) ||
    application?.interview_status === 'Completed' ||
    application?.interview_status === 'Passed' ||
    application?.interview_completed === true ||
    application?.counselling_status === 'Completed' ||
    admissionSettings?.interviewCompleted === true
  );

  // 4. Batch Onboarding: Mark complete when the student has completed the required onboarding steps or the admin has marked onboarding as complete.
  const isOnboardingComplete = Boolean(
    ['Onboarded', 'Enrolled'].includes(application?.status) ||
    ['Onboarded', 'Enrolled'].includes(applicationStatus) ||
    application?.onboarding_status === 'Completed' ||
    application?.onboarding_status === 'Onboarded' ||
    application?.is_onboarded === true ||
    application?.onboarding_completed === true ||
    admissionSettings?.onboardingCompleted === true
  );

  // Dynamic Admission Status Checklist reflecting prospective student's admission progress
  const admissionSteps = [
    {
      id: "1",
      title: "Application Submission",
      done: isAppSubmitted
    },
    {
      id: "2",
      title: "Admission Mode Selection",
      done: isAdmissionModeSelected
    },
    {
      id: "3",
      title: "Technical Interview & Counselling",
      done: isInterviewComplete
    },
    {
      id: "4",
      title: "Batch Onboarding",
      done: isOnboardingComplete
    }
  ];

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
                <span>Batch Commencement: {commencementDate}</span>
              </span>
            </div>

            <h1 className="welcome-student-title">
              Welcome, <span className="highlight-text">{displayName}</span>!
            </h1>
            <p className="welcome-student-desc">
              {data?.welcomeSubtitle || 'Explore official programme specifications, academic learning structure, admissions criteria, and application preparation for the upcoming cohort.'}
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

          {/* Current Application Status Box (Top-Right Blue Element Restored) */}
          <div className="application-status-card">
            <div className="status-card-header">
              <span className="status-kicker">APPLICATION STATUS</span>
              <span 
                className="status-beacon-pill" 
                style={currentStatusConfig.badgeBg ? { 
                  background: currentStatusConfig.badgeBg, 
                  color: currentStatusConfig.badgeColor, 
                  borderColor: currentStatusConfig.badgeBorder 
                } : undefined}
              >
                <span 
                  className="beacon-dot" 
                  style={{ background: currentStatusConfig.dotColor || '#10b981' }}
                />
                {currentStatusConfig.badge}
              </span>
            </div>

            <div className="status-card-body">
              <h3>{currentStatusConfig.title}</h3>
              <p>{currentStatusConfig.description}</p>
              <div 
                className="status-note-box" 
                style={currentStatusConfig.noteBg ? { 
                  background: currentStatusConfig.noteBg, 
                  borderColor: currentStatusConfig.noteBorder, 
                  color: currentStatusConfig.noteColor 
                } : undefined}
              >
                {currentStatusConfig.noteIcon}
                <span>{currentStatusConfig.noteText}</span>
              </div>
            </div>

            <div className="status-card-footer" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <button 
                type="button" 
                className="btn btn-primary btn-sm full-width"
                style={{ justifyContent: 'center', width: '100%' }}
                onClick={handleActionClick}
              >
                <span>{currentStatusConfig.buttonLabel}</span>
                <ArrowRightIcon size={14} />
              </button>
              <button 
                type="button" 
                className="status-jump-btn"
                onClick={() => {
                  const el = document.getElementById('eligibility');
                  if (el) {
                    scrollToSection('eligibility');
                  } else {
                    navigate('/#eligibility');
                  }
                }}
              >
                <span>Check Eligibility Criteria</span>
                <ArrowRightIcon size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Actionable Admission Status Checklist Area */}
        <div className="decision-prep-area">
          <div className="decision-prep-header">
            <div className="prep-title-group">
              <SparklesIcon size={20} className="prep-icon" />
              <div>
                <h2>Admission Status</h2>
              </div>
            </div>
          </div>

          {loadingSettings ? (
            <div className="prep-checklist-grid" aria-label="Loading admission status">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="prep-skeleton-card">
                  <div className="prep-skeleton-circle" />
                  <div className="prep-skeleton-lines">
                    <div className="prep-skeleton-bar-title" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="prep-checklist-grid">
              {admissionSteps.map((item) => (
                <div key={item.id} className={`prep-checklist-card ${item.done ? 'is-done' : ''}`}>
                  <div className="checklist-num-wrap">
                    {item.done ? (
                      <span className="checklist-check-icon">✓</span>
                    ) : (
                      <span className="checklist-step-num">{item.id}</span>
                    )}
                  </div>
                  <div className="checklist-card-content">
                    <h4>{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

