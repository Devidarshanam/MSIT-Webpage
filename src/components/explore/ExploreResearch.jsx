import React from 'react';
import { 
  UsersIcon, 
  AwardIcon, 
  TargetIcon, 
  CheckCircleIcon
} from '../Icons';

export default function ExploreResearch() {
  return (
    <section className="explore-section bg-light" id="learning-sciences">
      <div id="research-philosophy" style={{ position: 'relative', top: '-80px', height: 0 }} aria-hidden="true"></div>
      <div className="explore-container">
        
        {/* Section Header */}
        <div className="explore-section-header">
          <span className="research-kicker-badge">
            <span className="research-kicker-dot"></span>
            Why the MSIT Approach Works
          </span>
          <h2>How MSIT Helps You Learn</h2>
          <p className="section-lead">
            MSIT combines practical projects, mentor guidance, and regular feedback to help you understand concepts and build your skills step by step.
          </p>
        </div>

        {/* 3 Learning Approach Cards */}
        <div className="research-framework-grid">
          
          {/* Card 01: Learn by Doing */}
          <div className="research-pillar-card card-apprenticeship">
            <div className="research-card-accent accent-apprenticeship"></div>
            
            <div className="research-card-header">
              <div className="research-card-icon icon-apprenticeship">
                <TargetIcon size={24} />
              </div>
              <div className="research-card-meta">
                <span className="research-domain-tag tag-blue">How You Learn</span>
                <span className="research-citation">Build while you learn</span>
              </div>
            </div>

            <h3>Learn by Doing</h3>
            <p className="research-pillar-desc">
              Work on practical projects that help you understand concepts through experience.
            </p>

            <div className="research-mechanisms">
              <div className="mechanism-item">
                <span className="mech-bullet bullet-blue">✓</span>
                <div>
                  <strong>Learn through projects</strong>
                </div>
              </div>
              <div className="mechanism-item">
                <span className="mech-bullet bullet-blue">✓</span>
                <div>
                  <strong>Apply concepts in practice</strong>
                </div>
              </div>
              <div className="mechanism-item">
                <span className="mech-bullet bullet-blue">✓</span>
                <div>
                  <strong>Build real skills</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Card 02: Learn with Guidance */}
          <div className="research-pillar-card card-mastery">
            <div className="research-card-accent accent-mastery"></div>
            
            <div className="research-card-header">
              <div className="research-card-icon icon-mastery">
                <UsersIcon size={24} />
              </div>
              <div className="research-card-meta">
                <span className="research-domain-tag tag-emerald">Mentor Support</span>
                <span className="research-citation">Get help when you need it</span>
              </div>
            </div>

            <h3>Learn with Guidance</h3>
            <p className="research-pillar-desc">
              Work with mentors who guide you, answer questions, and help you improve.
            </p>

            <div className="research-mechanisms">
              <div className="mechanism-item">
                <span className="mech-bullet bullet-emerald">✓</span>
                <div>
                  <strong>Mentor guidance</strong>
                </div>
              </div>
              <div className="mechanism-item">
                <span className="mech-bullet bullet-emerald">✓</span>
                <div>
                  <strong>Regular feedback</strong>
                </div>
              </div>
              <div className="mechanism-item">
                <span className="mech-bullet bullet-emerald">✓</span>
                <div>
                  <strong>Support when you need it</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Card 03: Learn Step by Step */}
          <div className="research-pillar-card card-practice">
            <div className="research-card-accent accent-practice"></div>
            
            <div className="research-card-header">
              <div className="research-card-icon icon-practice">
                <AwardIcon size={24} />
              </div>
              <div className="research-card-meta">
                <span className="research-domain-tag tag-purple">Your Progress</span>
                <span className="research-citation">Build your skills with confidence</span>
              </div>
            </div>

            <h3>Learn Step by Step</h3>
            <p className="research-pillar-desc">
              Learn concepts in sequence, practise them, and move forward as you gain understanding.
            </p>

            <div className="research-mechanisms">
              <div className="mechanism-item">
                <span className="mech-bullet bullet-purple">✓</span>
                <div>
                  <strong>Learn concepts in sequence</strong>
                </div>
              </div>
              <div className="mechanism-item">
                <span className="mech-bullet bullet-purple">✓</span>
                <div>
                  <strong>Practise what you learn</strong>
                </div>
              </div>
              <div className="mechanism-item">
                <span className="mech-bullet bullet-purple">✓</span>
                <div>
                  <strong>Improve before moving forward</strong>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
