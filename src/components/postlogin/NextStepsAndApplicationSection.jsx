import React from 'react';
import { ArrowRightIcon, CheckCircleIcon, ClockIcon, MailIcon, BuildingIcon } from '../Icons';

export default function NextStepsAndApplicationSection({ data, user, applicationPortalUrl }) {
  return (
    <section className="section next-steps-section" id="next-steps">
      <div className="container">
        <div className="next-steps-banner-card">
          <div className="steps-banner-top">
            <span className="kicker kicker-light">{data.kicker}</span>
            <h2>{data.heading}</h2>
            <p className="banner-subtext">{data.description}</p>
          </div>

          <div className="portal-action-box">
            <div className="portal-status-group">
              <span className="portal-badge-cohort">{data.cohort}</span>
              <div className="portal-live-indicator">
                <span className="live-dot" aria-hidden="true"></span>
                <strong>Status: {data.currentStatus}</strong>
              </div>
            </div>

            {applicationPortalUrl ? (
              <div className="portal-active-view">
                <p>Applications for the upcoming cohort are now officially open.</p>
                <a
                  href={applicationPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary portal-cta-btn"
                >
                  <span>Launch Official Application Portal</span>
                  <ArrowRightIcon size={16} />
                </a>
              </div>
            ) : (
              <div className="portal-opening-soon-view">
                <p>
                  The official application portal for the <strong>January 2027</strong> cohort is scheduled to open shortly following the formal notification circular.
                </p>
                <div className="email-alert-confirmation">
                  <CheckCircleIcon size={18} />
                  <span>
                    Official alerts will be dispatched directly to your registered email: <strong>{user?.email || 'Registered Candidate'}</strong>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Actionable "What Should You Do Now?" Checklist */}
          <div className="applicant-prep-checklist-wrap">
            <h3>{data?.adviceHeader}</h3>
            <div className="prep-steps-grid">
              {(data?.steps || []).map((item) => (
                <div key={item.step} className="prep-step-card">
                  <span className="step-circle">{item.step}</span>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Official Admissions Support Card */}
          <div className="admissions-support-card">
            <div className="support-info">
              <h4>{data.supportBox.title}</h4>
              <p>{data.supportBox.text}</p>
            </div>
            <div className="support-contacts">
              <a href={`mailto:${data.supportBox.email}`} className="contact-chip">
                <MailIcon size={16} />
                <span>{data.supportBox.email}</span>
              </a>
              <span className="contact-chip phone-chip">
                <BuildingIcon size={16} />
                <span>{data.supportBox.phone}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
