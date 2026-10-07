import React from 'react';
import { UsersIcon, GraduationCapIcon } from '../Icons';

export default function ExploreWhoIsFor() {
  return (
    <section className="explore-section bg-light" id="who-is-for">
      <div className="explore-container">
        {/* Section Header */}
        <div className="explore-section-header">
          <span className="who-kicker-badge">
            <span className="who-kicker-dot"></span>
            Candidate Profile & Eligibility
          </span>
          <h2>Who is MSIT For?</h2>
          <p className="section-lead">
            MSIT is designed for driven individuals who want to transition from traditional learning 
            into high-impact software engineering roles. It demands critical thinking, adaptability, 
            and a passion for continuous learning.
          </p>
        </div>

        {/* 2 Symmetrical Feature Cards */}
        <div className="who-is-for-grid">
          {/* Card 1: Target Student Profile */}
          <div className="who-card target-profile">
            <div className="who-card-accent"></div>
            
            <div className="who-card-header">
              <div className="who-card-icon-box" title="Candidate Profile">
                <UsersIcon size={24} />
              </div>
              <span className="who-category-tag">Who Should Apply</span>
            </div>

            <h3>Target Student Profile</h3>
            <p className="who-card-lead">
              Ideal for engineering graduates and early-career software engineers seeking to transition 
              from routine maintenance roles into high-impact engineering leadership through a practitioner-led co-op model.
            </p>

            <div className="who-persona-pills">
              <span className="persona-pill">B.Tech Graduates (Any Branch)</span>
              <span className="persona-pill">Early-Career Engineers</span>
              <span className="persona-pill">Aspiring System Architects</span>
            </div>

            <div className="who-breakdown-box">
              <div className="who-breakdown-item">
                <span className="breakdown-bullet">✓</span>
                <div>
                  <strong>Growth Mindset:</strong> Ambition to transition from syntax-level coding to higher-order system architecture.
                </div>
              </div>
              <div className="who-breakdown-item">
                <span className="breakdown-bullet">✓</span>
                <div>
                  <strong>Active Builder:</strong> Thrives in hands-on coding studios rather than traditional lecture halls.
                </div>
              </div>
              <div className="who-breakdown-item">
                <span className="breakdown-bullet">✓</span>
                <div>
                  <strong>Collaborative Mentorship:</strong> Ready to build real systems with close guidance and daily code reviews from dedicated mentors.
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Eligibility Information */}
          <div className="who-card eligibility-info">
            <div className="who-card-accent"></div>
            
            <div className="who-card-header">
              <div className="who-card-icon-box" title="Eligibility & Standards">
                <GraduationCapIcon size={24} />
              </div>
              <span className="who-category-tag">Admission Standards</span>
            </div>

            <h3>Eligibility Information</h3>
            <p className="who-card-lead">
              Graduates with 16 years of formal education with a willingness to work with Computer Science, AI and Math. Open to B.Tech / B.E. graduates across all engineering branches.
            </p>

            <div className="who-persona-pills">
              <span className="persona-pill">16 Years Formal Education</span>
              <span className="persona-pill">CS, AI &amp; Math Orientation</span>
              <span className="persona-pill">All Engineering Branches</span>
            </div>

            <div className="who-breakdown-box">
              <div className="who-breakdown-item">
                <span className="breakdown-bullet">01</span>
                <div>
                  <strong>Academic Qualifications:</strong> Graduates with 16 years of formal education with a willingness to work with Computer Science, AI and Math (B.Tech / B.E. across any discipline).
                </div>
              </div>
              <div className="who-breakdown-item">
                <span className="breakdown-bullet">02</span>
                <div>
                  <strong>Aptitude Evaluation:</strong> Evaluation via recognized aptitude exams (GATE, GRE) or the official MSIT Entrance Test.
                </div>
              </div>
              <div className="who-breakdown-item">
                <span className="breakdown-bullet">03</span>
                <div>
                  <strong>Interviews & Readiness:</strong> Comprehensive evaluation focusing on analytical thinking and active learning orientation.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
