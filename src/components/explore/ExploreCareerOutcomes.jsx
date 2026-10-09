import React from 'react';
import { 
  AwardIcon, 
  RocketIcon, 
  UsersIcon,
  CalendarIcon
} from '../Icons';

export default function ExploreCareerOutcomes() {
  return (
    <section className="explore-section bg-white" id="career-outcomes">
      <div className="explore-container">
        
        {/* Section Header */}
        <div className="explore-section-header">
          <span className="career-kicker-badge">
            <span className="career-kicker-dot"></span>
            Career Outcomes
          </span>
          <h2>Where Can MSIT Take You?</h2>
          <p className="section-lead">
            Build practical skills, explore different technology careers, and prepare for opportunities in software development, AI, data science, and cloud computing.
          </p>
        </div>

        {/* Outcome Stats Banner: Deep-Navy Horizontal Panel */}
        <div className="career-stats-banner">
          <div className="career-stat-col">
            <div className="c-stat-icon-wrap icon-amber" aria-hidden="true">
              <AwardIcon size={18} />
            </div>
            <div className="c-stat-info">
              <span className="c-stat-num">₹22 LPA</span>
              <span className="c-stat-title">Highest Package</span>
              <span className="c-stat-desc">2021–23 batch placement record</span>
            </div>
          </div>

          <div className="career-stat-divider" aria-hidden="true"></div>

          <div className="career-stat-col">
            <div className="c-stat-icon-wrap icon-blue" aria-hidden="true">
              <RocketIcon size={18} />
            </div>
            <div className="c-stat-info">
              <span className="c-stat-num">₹8.27 LPA</span>
              <span className="c-stat-title">Average Package</span>
              <span className="c-stat-desc">2021–23 batch placement report</span>
            </div>
          </div>

          <div className="career-stat-divider" aria-hidden="true"></div>

          <div className="career-stat-col">
            <div className="c-stat-icon-wrap icon-emerald" aria-hidden="true">
              <UsersIcon size={18} />
            </div>
            <div className="c-stat-info">
              <span className="c-stat-num">3,000+</span>
              <span className="c-stat-title">Alumni Network</span>
              <span className="c-stat-desc">Graduates across 25 batches</span>
            </div>
          </div>

          <div className="career-stat-divider" aria-hidden="true"></div>

          <div className="career-stat-col">
            <div className="c-stat-icon-wrap icon-purple" aria-hidden="true">
              <CalendarIcon size={18} />
            </div>
            <div className="c-stat-info">
              <span className="c-stat-num">25+</span>
              <span className="c-stat-title">Years Legacy</span>
              <span className="c-stat-desc">Hands-on learning since 2001</span>
            </div>
          </div>
        </div>

        {/* Employers Recorded in Alumni Outcomes */}
        <div className="career-ecosystem-card">
          <div className="ecosystem-header-row">
            <div>
              <span className="ecosystem-tag">CORPORATE RECRUITMENT &amp; PRACTICUM PARTNERS</span>
              <h4>Employers Recorded in Alumni Outcomes</h4>
            </div>
          </div>

          <p className="ecosystem-desc">
            MSIT graduates have recorded career outcomes across technology, financial services, analytics, and enterprise software organizations.
          </p>

          <div className="ecosystem-sectors-grid">
            <div className="sector-group">
              <span className="sector-title">TECH &amp; AI SYSTEMS</span>
              <div className="sector-tags-row">
                <span className="sector-tag">Kore.AI</span>
                <span className="sector-tag">BizAcuity</span>
                <span className="sector-tag">Zest Labs</span>
              </div>
            </div>

            <div className="sector-group">
              <span className="sector-title">FINTECH &amp; PAYMENTS</span>
              <div className="sector-tags-row">
                <span className="sector-tag">American Express</span>
                <span className="sector-tag">Quantana</span>
                <span className="sector-tag">Q3 Veni Financial Information Pvt. Ltd.</span>
              </div>
            </div>

            <div className="sector-group">
              <span className="sector-title">ENTERPRISE SOFTWARE &amp; SAAS</span>
              <div className="sector-tags-row">
                <span className="sector-tag">Skill Intern Pvt. Ltd.</span>
                <span className="sector-tag">Synactive</span>
                <span className="sector-tag">Synectiks</span>
                <span className="sector-tag">Modak Analytics</span>
              </div>
            </div>

            <div className="sector-group">
              <span className="sector-title">DIGITAL &amp; ENGINEERING IT</span>
              <div className="sector-tags-row">
                <span className="sector-tag">Saavan</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
