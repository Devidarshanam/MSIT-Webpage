import React from 'react';
import { 
  GraduationCapIcon, 
  CheckCircleIcon, 
  UsersIcon, 
  ZapIcon, 
  ArrowRightIcon, 
  ShieldCheckIcon,
  UserIcon
} from '../Icons';

export default function ExploreAdmissions({ onGoToSignIn }) {
  return (
    <section className="explore-section bg-light" id="admission-journey">
      <div className="explore-container">
        
        {/* Section Header */}
        <div className="explore-section-header">
          <span className="admissions-kicker-badge">
            <span className="admissions-kicker-dot"></span>
            Admission Pathway &amp; Eligibility
          </span>
          <h2>How to Join the MSIT Cohort</h2>
          <p className="section-lead">
            We follow a structured evaluation pathway designed to identify motivated problem-solvers with an active 
            builder mindset. Open to engineering graduates and final-year students from all engineering disciplines.
          </p>
        </div>

        {/* Academic Qualification & Eligibility Spotlight */}
        <div className="admissions-eligibility-spotlight">
          <div className="eligibility-spotlight-header">
            <div className="spotlight-icon-box">
              <GraduationCapIcon size={26} />
            </div>
            <div>
              <span className="spotlight-tag">Academic Eligibility</span>
              <h3>Graduates with 16 Years of Formal Education</h3>
              <p className="spotlight-lead-requirement">
                Graduates with 16 years of formal education with a willingness to work with Computer Science, AI and Math.
              </p>
            </div>
          </div>

          <div className="eligibility-details-grid">
            <div className="eligibility-detail-card highlight-card">
              <span className="detail-check">✓</span>
              <div>
                <strong>16 Years Formal Education</strong>
                <p>Graduates with 16 years of formal education with a willingness to work with Computer Science, AI and Math.</p>
              </div>
            </div>

            <div className="eligibility-detail-card">
              <span className="detail-check">✓</span>
              <div>
                <strong>Flexible Entrance Evaluation</strong>
                <p>Qualify via valid national exam scores (GATE / GRE) or take the dedicated MSIT Graduate Aptitude Test (GAT).</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Progressive Admission Pathway Grid */}
        <div className="admissions-process-grid">
          
          {/* Step 1 */}
          <div className="admissions-step-card">
            <div className="step-card-header">
              <span className="step-number-badge">01</span>
              <div className="step-icon-wrap icon-register">
                <UserIcon size={20} />
              </div>
            </div>
            <span className="step-stage-tag">Step 1 • Initial Registration</span>
            <h4>Register Interest &amp; Profile</h4>
            <p>Create your candidate account on the admissions portal, submit undergraduate academic details, and select your preferred specialization track.</p>
          </div>

          {/* Step 2 */}
          <div className="admissions-step-card">
            <div className="step-card-header">
              <span className="step-number-badge">02</span>
              <div className="step-icon-wrap icon-eval">
                <ZapIcon size={20} />
              </div>
            </div>
            <span className="step-stage-tag">Step 2 • Aptitude Assessment</span>
            <h4>Aptitude Evaluation</h4>
            <p>Demonstrate logical reasoning and problem-solving through valid GATE / GRE percentiles or the official MSIT online entrance test (GAT).</p>
          </div>

          {/* Step 3 */}
          <div className="admissions-step-card">
            <div className="step-card-header">
              <span className="step-number-badge">03</span>
              <div className="step-icon-wrap icon-interview">
                <UsersIcon size={20} />
              </div>
            </div>
            <span className="step-stage-tag">Step 3 • Technical Counseling</span>
            <h4>Interactive Interview</h4>
            <p>Engage in a constructive 1-on-1 dialogue with academic mentors focused on analytical thinking, curiosity, and learning mindset.</p>
          </div>

          {/* Step 4 */}
          <div className="admissions-step-card">
            <div className="step-card-header">
              <span className="step-number-badge">04</span>
              <div className="step-icon-wrap icon-offer">
                <CheckCircleIcon size={20} />
              </div>
            </div>
            <span className="step-stage-tag">Step 4 • Studio Onboarding</span>
            <h4>Studio Allotment &amp; Offer</h4>
            <p>Receive your admission confirmation, get your workstation, and prepare to begin the programme.</p>
          </div>

        </div>

        {/* Admissions Action & Guidance Card */}
        <div className="admissions-action-card">
          <div className="action-card-text">
            <div className="action-tag-row">
              <span className="action-status-dot"></span>
              <span className="action-tag-text">Next Cohort Admissions Open • IIIT Hyderabad</span>
            </div>
            <h4>Ready to Transform into a Production-Ready Software &amp; AI Engineer?</h4>
            <p>
              Experience the 100% active learning-by-doing pedagogy. Open to all graduates with 16 years of formal education with a willingness to work with Computer Science, AI and Math. Work in dedicated workstation studios and earn a prestigious multi-university Master's degree.
            </p>
            <div className="admissions-action-badges-row">
              <span className="action-badge-pill">🎓 Multi-University Master's</span>
              <span className="action-badge-pill">🏛️ IIIT Hyderabad Campus</span>
              <span className="action-badge-pill">💼 Industry Practicum &amp; Co-op</span>
              <span className="action-badge-pill">🌟 25-Year Heritage</span>
            </div>
          </div>

          {onGoToSignIn && (
            <div className="action-card-btn-wrap">
              <button className="btn btn-primary btn-admissions-action" onClick={onGoToSignIn}>
                <span>Check Eligibility &amp; Apply Now</span>
                <ArrowRightIcon size={18} />
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
