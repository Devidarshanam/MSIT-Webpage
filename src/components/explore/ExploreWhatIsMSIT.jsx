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
            guidance, MSIT replaced passive lectures to pioneer India's premier studio-based computing master's.
          </p>
        </div>

        <div className="heritage-layout">
          {/* Left Column: Founder Profile Card */}
          <div className="heritage-founder-card">
            <div className="heritage-founder-top">
              <div className="heritage-founder-img">
                <img 
                  src="/assets/rajreddy.jpg" 
                  alt="Prof. Raj Reddy - Turing Award Laureate & MSIT Founding Chair" 
                />
              </div>
              <div className="heritage-founder-info">
                <div className="heritage-badges">
                  <span className="heritage-badge">Academic Visionary</span>
                  <span className="heritage-badge accent">Turing Laureate 1994</span>
                </div>
                <h3>Prof. Raj Reddy</h3>
                <p className="heritage-founder-role">Founding Chair, MSIT • Former Dean, School of Computer Science, Carnegie Mellon University</p>
                <p className="heritage-founder-desc">Conceived MSIT in 2001 to promote active, studio-based software engineering education.</p>
              </div>
            </div>

            <div className="heritage-stats-row">
              <div className="heritage-stat">
                <strong>25+</strong>
                <span>Years Legacy</span>
              </div>
              <div className="heritage-stat">
                <strong>3,000+</strong>
                <span>Global Alumni</span>
              </div>
              <div className="heritage-stat">
                <strong>Focus</strong>
                <span>Studio Pedagogy</span>
              </div>
            </div>
          </div>

          {/* Right Column: Evolution Timeline */}
          <div className="heritage-timeline">
            <div className="heritage-timeline-header">
              <span className="heritage-timeline-pill">Quarter-Century Evolution</span>
              <span className="heritage-timeline-sub">2001 → 2026</span>
            </div>

            <div className="heritage-eras-grid">
              <div className="heritage-era-card">
                <div className="heritage-era-top">
                  <span className="heritage-year">2001–2005</span>
                  <span className="heritage-era-label">Inception & Pedagogy</span>
                </div>
                <h4>CIHL & CMU Mastery Model</h4>
                <p>Founded at IIIT Hyderabad under CIHL with Carnegie Mellon guidance. Pioneered 90%+ mastery thresholds and collaborative coding studios under dedicated 1:10 mentors.</p>
              </div>

              <div className="heritage-era-card">
                <div className="heritage-era-top">
                  <span className="heritage-year">2006–2015</span>
                  <span className="heritage-era-label">Expansion & Scalability</span>
                </div>
                <h4>Multi-Campus IT Hubs</h4>
                <p>Scaled the studio model across JNTUH, JNTUK, JNTUA, and SVU. Institutionalized Soft Skills and Professional Development alongside deep technical rigor.</p>
              </div>

              <div className="heritage-era-card">
                <div className="heritage-era-top">
                  <span className="heritage-year">2016–2023</span>
                  <span className="heritage-era-label">Agile & Cloud Shift</span>
                </div>
                <h4>DevOps & Specializations</h4>
                <p>Transitioned from monolithic software engineering to Cloud, Data Science, and Machine Learning tracks. Embedded Agile/Scrum directly into daily student workflows.</p>
              </div>

              <div className="heritage-era-card active">
                <div className="heritage-era-top">
                  <span className="heritage-year">2024–Present</span>
                  <span className="heritage-era-label">The Future</span>
                </div>
                <h4>The AI-Native Core</h4>
                <p>Curriculum fully rebuilt for the LLM era. Students use agentic workflows, Copilots, and advanced AI systems, focusing on higher-order system architecture.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Quote Banner */}
        <div className="heritage-quote-banner">
          <p>
            "In computing, learning is not a spectator sport. You don't learn by watching; 
            you learn by building, breaking, debugging, and deploying."
          </p>
          <span>— Prof. Raj Reddy, Turing Award Laureate & MSIT Founding Chair</span>
        </div>
      </div>
    </section>
  );
}
