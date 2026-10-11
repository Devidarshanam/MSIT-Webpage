import React from 'react';
import { UsersIcon, GraduationCapIcon, ArrowRightIcon } from '../Icons';

export default function ExploreWhoIsFor() {
  return (
    <section className="explore-section bg-light" id="who-is-for">
      <div className="explore-container">
        
        {/* Section Header */}
        <div className="explore-section-header">
          <span className="who-kicker-badge">
            <span className="who-kicker-dot"></span>
            Candidate Profile &amp; Eligibility
          </span>
          <h2>Who is MSIT For?</h2>
          <p className="section-lead">
            MSIT is for students who want to build a career in technology and are ready to learn through practical work and projects.
          </p>
        </div>

        {/* 2 Symmetrical Feature Cards */}
        <div className="who-is-for-grid">
          
          {/* Card 1: Who Should Apply */}
          <div className="who-card target-profile">
            <div className="who-card-accent"></div>
            
            <div className="who-card-header">
              <div className="who-card-icon-box" title="Who Should Apply">
                <UsersIcon size={24} />
              </div>
              <span className="who-category-tag">Who Should Apply</span>
            </div>

            <h3>Is MSIT Right for Me?</h3>
            <p className="who-card-lead">
              You may be a good fit if you want to build a career in technology and are ready to learn, practice, and solve problems.
            </p>

            <div className="who-points-list">
              <div className="who-point-item">
                <span className="who-check-icon">✓</span>
                <span>Want to build a career in technology</span>
              </div>
              <div className="who-point-item">
                <span className="who-check-icon">✓</span>
                <span>Enjoy learning and solving problems</span>
              </div>
              <div className="who-point-item">
                <span className="who-check-icon">✓</span>
                <span>Are willing to learn through practical projects</span>
              </div>
              <div className="who-point-item">
                <span className="who-check-icon">✓</span>
                <span>Want to develop skills for the IT industry</span>
              </div>
            </div>
          </div>

          {/* Card 2: Eligibility */}
          <div className="who-card eligibility-info">
            <div className="who-card-accent"></div>
            
            <div className="who-card-header">
              <div className="who-card-icon-box" title="Eligibility">
                <GraduationCapIcon size={24} />
              </div>
              <span className="who-category-tag">Eligibility</span>
            </div>

            <h3>What Do I Need to Apply?</h3>
            <p className="who-card-lead">
              Here’s a quick overview of the requirements. See the detailed eligibility page for the complete information.
            </p>

            <div className="who-eligibility-list">
              <div className="who-eligibility-item">
                <span className="who-eligibility-bullet">01</span>
                <div>
                  <strong>16 Years of Education:</strong> Graduates with 16 years of formal education with a willingness to work with Computer Science, AI and Math.
                </div>
              </div>
              <div className="who-eligibility-item">
                <span className="who-eligibility-bullet">02</span>
                <div>
                  <strong>Subject Orientation:</strong> Interest and willingness to work with Computer Science and AI.
                </div>
              </div>
              <div className="who-eligibility-item">
                <span className="who-eligibility-bullet">03</span>
                <div>
                  <strong>Entrance Evaluation:</strong> Qualify through recognized exams (GATE / GRE) or the official MSIT Entrance Test.
                </div>
              </div>
              <div className="who-eligibility-item">
                <span className="who-eligibility-bullet">04</span>
                <div>
                  <strong>Readiness Interview:</strong> A personal discussion focused on problem-solving mindset and learning readiness.
                </div>
              </div>
            </div>

            <a href="#admission-journey" className="who-eligibility-btn">
              <span>View Detailed Eligibility</span>
              <ArrowRightIcon size={16} />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
