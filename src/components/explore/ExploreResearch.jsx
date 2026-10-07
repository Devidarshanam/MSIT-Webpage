import React from 'react';
import { 
  UsersIcon, 
  AwardIcon, 
  TerminalIcon, 
  CheckCircleIcon,
  SparklesIcon
} from '../Icons';

export default function ExploreResearch() {
  return (
    <section className="explore-section bg-light" id="research-philosophy">
      <div className="explore-container">
        
        {/* Section Header */}
        <div className="explore-section-header">
          <span className="research-kicker-badge">
            <span className="research-kicker-dot"></span>
            Educational Science & Pedagogy
          </span>
          <h2>The Research Behind the Curriculum</h2>
          <p className="section-lead">
            The MSIT curriculum is grounded in decades of cognitive science and learning research—proven 
            frameworks that transform students from passive listeners into independent, confident engineers.
          </p>
        </div>

        {/* 3 Pedagogical Research Pillars Grid */}
        <div className="research-framework-grid">
          
          {/* Pillar 1: Cognitive Apprenticeship */}
          <div className="research-pillar-card card-apprenticeship">
            <div className="research-card-accent accent-apprenticeship"></div>
            
            <div className="research-card-header">
              <div className="research-card-icon icon-apprenticeship">
                <UsersIcon size={24} />
              </div>
              <div className="research-card-meta">
                <span className="research-domain-tag tag-blue">Learning Framework</span>
                <span className="research-citation">Collins, Brown &amp; Newman</span>
              </div>
            </div>

            <h3>Cognitive Apprenticeship</h3>
            <p className="research-pillar-desc">
              Shifts learning from passive lecturing to active mentorship—mimicking the expert-novice dynamic 
              of high-performing engineering teams.
            </p>

            <div className="research-mechanisms">
              <div className="mechanism-item">
                <span className="mech-bullet bullet-blue">✓</span>
                <div>
                  <strong>Modeling &amp; Scaffolding</strong>
                  <span>Mentors demonstrate problem-solving thought processes in real time.</span>
                </div>
              </div>
              <div className="mechanism-item">
                <span className="mech-bullet bullet-blue">✓</span>
                <div>
                  <strong>Guided Exploration</strong>
                  <span>Students tackle real challenges with supportive mentor safety nets.</span>
                </div>
              </div>
              <div className="mechanism-item">
                <span className="mech-bullet bullet-blue">✓</span>
                <div>
                  <strong>Fading &amp; Autonomy</strong>
                  <span>Support gradually tapers as students develop independent problem-solving skills.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 2: Mastery-Based Learning */}
          <div className="research-pillar-card card-mastery">
            <div className="research-card-accent accent-mastery"></div>
            
            <div className="research-card-header">
              <div className="research-card-icon icon-mastery">
                <AwardIcon size={24} />
              </div>
              <div className="research-card-meta">
                <span className="research-domain-tag tag-emerald">Educational Standard</span>
                <span className="research-citation">Benjamin Bloom's Model</span>
              </div>
            </div>

            <h3>Mastery Learning</h3>
            <p className="research-pillar-desc">
              Progression occurs only after demonstrating genuine conceptual and practical understanding, 
              preventing cumulative learning gaps.
            </p>

            <div className="research-mechanisms">
              <div className="mechanism-item">
                <span className="mech-bullet bullet-emerald">✓</span>
                <div>
                  <strong>Zero Conceptual Debt</strong>
                  <span>Students never move to advanced topics with unaddressed fundamental doubts.</span>
                </div>
              </div>
              <div className="mechanism-item">
                <span className="mech-bullet bullet-emerald">✓</span>
                <div>
                  <strong>Iterative Refinement</strong>
                  <span>Code is refined and improved until it meets clean, production-grade quality.</span>
                </div>
              </div>
              <div className="mechanism-item">
                <span className="mech-bullet bullet-emerald">✓</span>
                <div>
                  <strong>Reliable Baseline</strong>
                  <span>Ensures every single graduate achieves a high standard of competence.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 3: Deliberate Practice & Learning by Doing */}
          <div className="research-pillar-card card-practice">
            <div className="research-card-accent accent-practice"></div>
            
            <div className="research-card-header">
              <div className="research-card-icon icon-practice">
                <TerminalIcon size={24} />
              </div>
              <div className="research-card-meta">
                <span className="research-domain-tag tag-purple">Skill Acquisition</span>
                <span className="research-citation">K. Anders Ericsson</span>
              </div>
            </div>

            <h3>Deliberate Practice</h3>
            <p className="research-pillar-desc">
              True engineering skill comes from targeted hands-on building, rapid feedback loops, and daily 
              practical problem solving in studio spaces.
            </p>

            <div className="research-mechanisms">
              <div className="mechanism-item">
                <span className="mech-bullet bullet-purple">✓</span>
                <div>
                  <strong>Authentic Software Projects</strong>
                  <span>Building real working software daily instead of memorizing exam answers.</span>
                </div>
              </div>
              <div className="mechanism-item">
                <span className="mech-bullet bullet-purple">✓</span>
                <div>
                  <strong>Immediate Feedback Loops</strong>
                  <span>Regular 1-on-1 mentor code reviews identify and correct flaws early.</span>
                </div>
              </div>
              <div className="mechanism-item">
                <span className="mech-bullet bullet-purple">✓</span>
                <div>
                  <strong>Compounding Confidence</strong>
                  <span>Continuous practical building develops muscle memory and architectural maturity.</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Evidence in Action Comparison Card */}
        <div className="research-comparison-wrapper">
          <div className="research-comparison-header">
            <div className="comparison-kicker">
              <SparklesIcon size={16} />
              <span>Evidence in Action</span>
            </div>
            <h4>Why Method Matters: Traditional Lecture vs. MSIT Studio</h4>
            <p>Decades of learning research show that how you learn determines how effectively you perform in the software industry.</p>
          </div>

          <div className="research-comparison-grid">
            {/* Traditional Model */}
            <div className="comparison-side comparison-traditional">
              <div className="comp-side-badge">Traditional Classroom</div>
              <div className="comp-stat-callout">
                <span className="comp-stat-number">~10%</span>
                <span className="comp-stat-label">Long-Term Retention Rate</span>
              </div>
              <ul className="comp-feature-list">
                <li>
                  <span className="comp-bullet comp-bullet-cross">✕</span>
                  <span>Passive 50-minute lectures with minimal student engagement</span>
                </li>
                <li>
                  <span className="comp-bullet comp-bullet-cross">✕</span>
                  <span>Rote memorization focused strictly on passing written exams</span>
                </li>
                <li>
                  <span className="comp-bullet comp-bullet-cross">✕</span>
                  <span>Unresolved knowledge gaps snowball as semesters advance</span>
                </li>
              </ul>
            </div>

            {/* Divider Badge */}
            <div className="comparison-vs-badge">
              <span>VS</span>
            </div>

            {/* MSIT Research Studio Model */}
            <div className="comparison-side comparison-msit">
              <div className="comp-side-badge msit-badge">MSIT Research-Backed Studio</div>
              <div className="comp-stat-callout msit-stat">
                <span className="comp-stat-number">&gt;75%</span>
                <span className="comp-stat-label">Practical Mastery Retention Rate</span>
              </div>
              <ul className="comp-feature-list">
                <li>
                  <span className="comp-bullet comp-bullet-check">✓</span>
                  <span>Hands-on active building in collaborative studio environments</span>
                </li>
                <li>
                  <span className="comp-bullet comp-bullet-check">✓</span>
                  <span>Immediate mentor guidance, daily code walkthroughs &amp; peer reviews</span>
                </li>
                <li>
                  <span className="comp-bullet comp-bullet-check">✓</span>
                  <span>Zero conceptual debt—master each milestone before moving forward</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Synthesis Takeaway Banner */}
        <div className="research-synthesis-banner">
          <div className="synthesis-icon-box">
            <CheckCircleIcon size={22} />
          </div>
          <div className="synthesis-text">
            <strong>Why This Matters for Students:</strong>
            <span> In traditional education, passive lecture recall drops sharply within weeks. By grounding our curriculum in cognitive apprenticeship, mastery learning, and deliberate practice, MSIT ensures you build real engineering capability that stays with you throughout your career.</span>
          </div>
        </div>

      </div>
    </section>
  );
}
