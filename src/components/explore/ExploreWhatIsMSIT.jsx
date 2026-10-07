import React from 'react';

export default function ExploreWhatIsMSIT() {
  return (
    <section className="explore-section bg-light" id="what-is-msit">
      <div className="explore-container">
        <div className="explore-section-header">
          <span className="section-kicker">Heritage & Evolution</span>
          <h2>A Quarter-Century of Active Learning</h2>
          <p className="section-lead">
            Founded in 2001 by Turing Laureate Prof. Raj Reddy with Carnegie Mellon University 
            guidance, MSIT replaced passive lectures to pioneer India’s premier studio-based computing master’s.
          </p>
        </div>

        <div className="origin-merged-grid">
          {/* Left Column: Visionary Anchor */}
          <div className="origin-anchor-col">
            <div className="spotlight-card origin-merged-spotlight">
              <div className="spotlight-profile-layout">
                <div className="spotlight-img-frame">
                  <img 
                    src="/assets/rajreddy.jpg" 
                    alt="Prof. Raj Reddy - Turing Award Laureate & MSIT Founding Chair" 
                    className="spotlight-portrait-img"
                  />
                </div>
                <div className="spotlight-meta-info">
                  <div className="spotlight-badge-row">
                    <span className="spotlight-badge">Academic Visionary</span>
                    <span className="spotlight-award-tag">Turing Laureate 1994</span>
                  </div>
                  <h3 className="spotlight-name">Prof. Raj Reddy</h3>
                  <p className="spotlight-role-title">Founding Chair, MSIT • Former Dean, School of Computer Science, Carnegie Mellon University</p>
                  <p className="spotlight-desc">Conceived MSIT in 2001 to promote active, studio-based software engineering education.</p>
                </div>
              </div>

              {/* 3 Vital Stats Row */}
              <div className="spotlight-stats-row">
                <div className="spot-stat">
                  <strong>25+</strong>
                  <span>Years Legacy</span>
                </div>
                <div className="spot-stat">
                  <strong>3,000+</strong>
                  <span>Global Alumni</span>
                </div>
                <div className="spot-stat">
                  <strong>Focus</strong>
                  <span>Studio Pedagogy</span>
                </div>
              </div>
            </div>

            {/* Signature Quote Box */}
            <div 
              className="origin-quote-box origin-quote-merged"
              style={{
                background: 'linear-gradient(135deg, #091a38 0%, #17386d 100%)',
                border: '1.5px solid rgba(59, 130, 246, 0.45)',
                borderRadius: '10px',
                padding: '0.75rem 1.15rem',
                color: '#ffffff',
                boxShadow: '0 4px 16px rgba(9, 26, 56, 0.25)'
              }}
            >
              <p 
                className="origin-quote-text"
                style={{
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.86rem',
                  lineHeight: '1.45',
                  margin: '0 0 0.35rem 0',
                  fontStyle: 'italic',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)'
                }}
              >
                “In computing, learning is not a spectator sport. You don't learn by watching; you learn by building, breaking, debugging, and deploying.”
              </p>
              <span 
                className="quote-author"
                style={{
                  color: '#fde047',
                  fontWeight: 700,
                  fontSize: '0.74rem',
                  display: 'block'
                }}
              >
                — Prof. Raj Reddy, Turing Award Laureate & MSIT Founding Chair
              </span>
            </div>
          </div>

          {/* Right Column: 4-Era Evolution Milestones Rail */}
          <div className="journey-rail-col">
            <div className="journey-rail-header">
              <div className="rail-header-tag-group">
                <span className="journey-rail-pill">Quarter-Century Evolution</span>
                <span className="journey-rail-sub">2001 Foundation to 2026 AI Era</span>
              </div>
              <span className="journey-rail-note">Active Learning Model</span>
            </div>

            <div className="journey-eras-grid">
              {/* Era 1: 2001-2005 */}
              <div className="journey-era-card card-m2001">
                <div className="journey-card-top">
                  <span className="journey-year-badge">2001–2005</span>
                  <span className="journey-era-label">Inception & Pedagogy</span>
                </div>
                <h4>CIHL & CMU Mastery Model</h4>
                <p>Founded at IIIT Hyderabad under CIHL with Carnegie Mellon guidance. Pioneered 90%+ mastery thresholds and collaborative coding studios under dedicated 1:10 mentors.</p>
              </div>

              {/* Era 2: 2006-2015 */}
              <div className="journey-era-card card-m2006">
                <div className="journey-card-top">
                  <span className="journey-year-badge">2006–2015</span>
                  <span className="journey-era-label">Expansion & Scalability</span>
                </div>
                <h4>Multi-Campus IT Hubs</h4>
                <p>Scaled the studio model across JNTUH, JNTUK, JNTUA, and SVU. Institutionalized Soft Skills and Professional Development alongside deep technical rigor.</p>
              </div>

              {/* Era 3: 2016-2023 */}
              <div className="journey-era-card card-m2016">
                <div className="journey-card-top">
                  <span className="journey-year-badge">2016–2023</span>
                  <span className="journey-era-label">Agile & Cloud Shift</span>
                </div>
                <h4>DevOps & Specializations</h4>
                <p>Transitioned from monolithic software engineering to Cloud, Data Science, and Machine Learning tracks. Embedded Agile/Scrum directly into daily student workflows.</p>
              </div>

              {/* Era 4: 2024-Present */}
              <div className="journey-era-card card-m2024 active-era">
                <div className="journey-card-top">
                  <span className="journey-year-badge">2024–Present</span>
                  <span className="journey-era-label">The Future</span>
                </div>
                <h4>The AI-Native Core</h4>
                <p>Curriculum fully rebuilt for the LLM era. Students use agentic workflows, Copilots, and advanced AI systems, focusing on higher-order system architecture.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
