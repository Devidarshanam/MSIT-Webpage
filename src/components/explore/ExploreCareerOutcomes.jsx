import React from 'react';
import { 
  AwardIcon, 
  RocketIcon, 
  UsersIcon,
  CalendarIcon
} from '../Icons';

const ALUMNI_TOP_EMPLOYERS = [
  { rank: 1, name: 'Kore.AI', placements: 9 },
  { rank: 2, name: 'Skill Intern Pvt. Ltd.', placements: 8 },
  { rank: 3, name: 'BizAcuity', placements: 8 },
  { rank: 4, name: 'Zest Labs', placements: 7 },
  { rank: 5, name: 'Q3 Veni Financial Information Pvt. Ltd.', placements: 6 },
  { rank: 6, name: 'Quantana', placements: 4 },
  { rank: 7, name: 'Saavan', placements: 4 },
  { rank: 8, name: 'Synactive', placements: 4 },
  { rank: 9, name: 'Synectiks', placements: 4 },
  { rank: 10, name: 'Modak Analytics', placements: 3 },
];

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
        <div className="career-ecosystem-card alumni-outcomes-card">
          <div className="alumni-outcomes-header">
            <h3 className="alumni-outcomes-title">Employers Recorded in Alumni Outcomes</h3>
            <p className="alumni-outcomes-desc">
              MSIT graduates have recorded career outcomes across technology, financial services, analytics, and enterprise software organizations.
            </p>
          </div>

          <div className="alumni-employers-grid">
            {ALUMNI_TOP_EMPLOYERS.map((company) => (
              <div 
                className={`alumni-employer-card ${company.rank <= 3 ? 'top-rank' : ''}`} 
                key={company.rank}
              >
                <div className="employer-rank-badge">
                  #{company.rank}
                </div>
                <div className="employer-info">
                  <h4 className="employer-name">{company.name}</h4>
                  <span className="employer-subtext">Recorded Alumni Placement</span>
                </div>
                <div className="employer-count-badge">
                  <span className="count-number">{company.placements}</span>
                  <span className="count-label">{company.placements === 1 ? 'Placement' : 'Placements'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
