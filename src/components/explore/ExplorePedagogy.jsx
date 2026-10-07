import React from 'react';
import { 
  UsersIcon,
  AwardIcon,
  CodeIcon
} from '../Icons';

export default function ExplorePedagogy() {
  return (
    <section className="explore-section bg-light" id="how-students-learn">
      <div className="explore-container">
        {/* Section Header */}
        <div className="explore-section-header">
          <span className="pedagogy-kicker-badge">
            <span className="pedagogy-kicker-dot"></span>
            Curriculum Philosophy
          </span>
          <h2>How Students Learn</h2>
          <p className="section-lead">
            The MSIT learning model replaces lecture-heavy memorization with hands-on practice. 
            Students learn by building real projects, receiving regular mentor guidance, and mastering concepts step-by-step.
          </p>
        </div>

        {/* Learning Cycle Container */}
        <div className="pedagogy-container-card">
          <div className="pedagogy-block-header">
            <span className="pedagogy-cycle-tag">The 6-Stage Learning Cycle</span>
            <h3 className="pedagogy-cycle-title">From Concept to Practical Mastery</h3>
          </div>

          {/* 6 Progressive Stage Cards */}
          <div className="pedagogy-cycle-grid">
            {/* Stage 1 */}
            <div className="cycle-stage-card stage-1">
              <div className="stage-accent-bar"></div>
              <div className="stage-top-row">
                <span className="stage-number">01</span>
              </div>
              <span className="stage-tag">Exploration</span>
              <h4>1. Learn</h4>
              <p>Understand core concepts through guided study and structured learning materials.</p>
            </div>

            {/* Stage 2 */}
            <div className="cycle-stage-card stage-2">
              <div className="stage-accent-bar"></div>
              <div className="stage-top-row">
                <span className="stage-number">02</span>
              </div>
              <span className="stage-tag">Problem Solving</span>
              <h4>2. Think</h4>
              <p>Break down complex problems, plan logical system designs, and reason through solutions.</p>
            </div>

            {/* Stage 3 */}
            <div className="cycle-stage-card stage-3">
              <div className="stage-accent-bar"></div>
              <div className="stage-top-row">
                <span className="stage-number">03</span>
              </div>
              <span className="stage-tag">Hands-on Coding</span>
              <h4>3. Build</h4>
              <p>Write clean code, test components, and build working prototypes in studio sessions.</p>
            </div>

            {/* Stage 4 */}
            <div className="cycle-stage-card stage-4">
              <div className="stage-accent-bar"></div>
              <div className="stage-top-row">
                <span className="stage-number">04</span>
              </div>
              <span className="stage-tag">Real Application</span>
              <h4>4. Apply</h4>
              <p>Run and test software in real-world scenarios to see how it operates in practice.</p>
            </div>

            {/* Stage 5 */}
            <div className="cycle-stage-card stage-5">
              <div className="stage-accent-bar"></div>
              <div className="stage-top-row">
                <span className="stage-number">05</span>
              </div>
              <span className="stage-tag">Mentor Review</span>
              <h4>5. Reflect</h4>
              <p>Receive 1-on-1 code reviews with mentors and discuss improvements with peers.</p>
            </div>

            {/* Stage 6 */}
            <div className="cycle-stage-card stage-6">
              <div className="stage-accent-bar"></div>
              <div className="stage-top-row">
                <span className="stage-number">06</span>
              </div>
              <span className="stage-tag">Continuous Mastery</span>
              <h4>6. Improve</h4>
              <p>Refine and enhance your solutions until you achieve genuine mastery of the subject.</p>
            </div>
          </div>

          {/* Continuous Mastery Loop Banner */}
          <div className="pedagogy-loop-banner">
            <div className="loop-icon-circle">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
                <path d="M16 21h5v-5"/>
              </svg>
            </div>
            <div className="loop-banner-text">
              <strong>The Continuous Learning Cycle:</strong>
              <span>Each project you complete builds upon the previous one, strengthening your problem-solving skills and turning you into an independent, confident software engineer.</span>
            </div>
          </div>

          {/* 3 Pedagogy Advantage Pillars */}
          <div className="pedagogy-pillars-row">
            <div className="pedagogy-pillar-item pillar-mentorship">
              <div className="pillar-item-icon">
                <UsersIcon size={22} />
              </div>
              <div className="pillar-item-content">
                <span className="pillar-item-tag">Personalized Support</span>
                <h4>Personalized Mentorship Studio</h4>
                <p>Experienced mentors work directly with students in collaborative studio spaces, offering daily 1-on-1 code walkthroughs, real-time troubleshooting, and continuous guidance.</p>
              </div>
            </div>

            <div className="pedagogy-pillar-item pillar-mastery">
              <div className="pillar-item-icon">
                <AwardIcon size={22} />
              </div>
              <div className="pillar-item-content">
                <span className="pillar-item-tag">Mastery Standard</span>
                <h4>Mastery-Based Learning</h4>
                <p>You advance to the next module only after truly understanding current concepts and building working solutions, ensuring strong fundamentals without getting left behind.</p>
              </div>
            </div>

            <div className="pedagogy-pillar-item pillar-projects">
              <div className="pillar-item-icon">
                <CodeIcon size={22} />
              </div>
              <div className="pillar-item-content">
                <span className="pillar-item-tag">Learning by Doing</span>
                <h4>Daily Practical Project Work</h4>
                <p>Instead of memorizing theory for exams, you build real software applications every day—learning through direct practice, team collaboration, and continuous feedback.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
