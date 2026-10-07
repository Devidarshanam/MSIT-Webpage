import React from 'react';

export default function ExploreWhatIsMSIT() {
  return (
    <section className="explore-section bg-light" id="what-is-msit">
      <div className="explore-container">
        
        {/* ========================================================
            PART 1: Heritage & Founder's Vision
            ======================================================== */}
        <div className="heritage-founder-block">
          <div className="explore-section-header">
            <span className="section-kicker">Heritage & Leadership</span>
            <h2>Founded on Active Learning</h2>
            <p className="section-lead">
              Conceived in 2001 by Turing Award Laureate Prof. Raj Reddy with Carnegie Mellon University guidance,
              MSIT pioneered studio-based computing education in India.
            </p>
          </div>

          <div className="heritage-founder-grid">
            {/* Left Column: Portrait Card */}
            <div className="heritage-profile-panel">
              <div className="heritage-portrait-frame">
                <img 
                  src="/assets/rajreddy.jpg" 
                  alt="Prof. Raj Reddy - Turing Award Laureate & MSIT Founding Chair" 
                />
              </div>
              <div className="heritage-profile-header">
                <div className="heritage-badges">
                  <span className="heritage-badge">Academic Visionary</span>
                  <span className="heritage-badge accent">Turing Laureate 1994</span>
                </div>
                <h3>Prof. Raj Reddy</h3>
                <p className="heritage-profile-title">
                  Founding Chair, MSIT • Former Dean, School of Computer Science, Carnegie Mellon University
                </p>
              </div>
            </div>

            {/* Right Column: Narrative, Stats & Quote */}
            <div className="heritage-narrative-panel">
              <div className="heritage-story-card">
                <h4>A Breakthrough in Computer Science Pedagogy</h4>
                <p>
                  In 2001, Prof. Raj Reddy envisioned an educational paradigm where students would master computer science not by listening to passive lectures, but by building real systems under mentorship.
                </p>
                <p>
                  In partnership with Carnegie Mellon University, the Consortium of Institutes of Higher Learning (CIHL) launched MSIT at IIIT Hyderabad, establishing India's premier studio-based computing master's program with continuous mastery evaluation.
                </p>
              </div>

              {/* 3 Impact Stat Cards */}
              <div className="heritage-stats-grid">
                <div className="heritage-stat-box">
                  <span className="stat-number">25+</span>
                  <span className="stat-label">Years of Innovation</span>
                </div>
                <div className="heritage-stat-box">
                  <span className="stat-number">3,000+</span>
                  <span className="stat-label">Global Alumni</span>
                </div>
                <div className="heritage-stat-box">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Active Studio Pedagogy</span>
                </div>
              </div>

              {/* Quote Box */}
              <div className="heritage-quote-card">
                <div className="quote-mark">“</div>
                <blockquote>
                  In computing, learning is not a spectator sport. You don't learn by watching; you learn by building, breaking, debugging, and deploying.
                </blockquote>
                <cite>— Prof. Raj Reddy, Turing Award Laureate & MSIT Founding Chair</cite>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            PART 2: Quarter-Century Evolution (4 Eras Across Full Width)
            ======================================================== */}
        <div className="heritage-evolution-block">
          <div className="explore-section-header">
            <span className="evolution-kicker-badge">
              <span className="evolution-kicker-dot"></span>
              Quarter-Century Evolution
            </span>
            <h2>The 25-Year Journey: 2001 to 2026</h2>
            <p className="section-lead">
              From the original CMU mastery studios to modern AI-native engineering, 
              MSIT has continuously adapted its curriculum to lead industry shifts.
            </p>
          </div>

          {/* Interactive Connected Timeline Track Rail */}
          <div className="journey-timeline-track" aria-hidden="true">
            <div className="journey-track-nodes">
              <div className="journey-node">
                <div className="journey-marker">
                  <span className="journey-core"></span>
                </div>
                <div className="journey-info">
                  <span className="journey-year">2001</span>
                  <span className="journey-caption">Inception</span>
                </div>
              </div>

              <div className="journey-node">
                <div className="journey-marker">
                  <span className="journey-core"></span>
                </div>
                <div className="journey-info">
                  <span className="journey-year">2006</span>
                  <span className="journey-caption">Expansion</span>
                </div>
              </div>

              <div className="journey-node">
                <div className="journey-marker">
                  <span className="journey-core"></span>
                </div>
                <div className="journey-info">
                  <span className="journey-year">2016</span>
                  <span className="journey-caption">Cloud & Modern Tech</span>
                </div>
              </div>

              <div className="journey-node active">
                <div className="journey-marker active">
                  <span className="journey-pulse"></span>
                  <span className="journey-core active"></span>
                </div>
                <div className="journey-info">
                  <span className="journey-year active">Present</span>
                  <span className="journey-caption active">AI-Native</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Cards Grid */}
          <div className="heritage-timeline-progression">
            {/* Step 1 */}
            <div className="heritage-milestone-card era-1">
              <div className="milestone-accent-bar"></div>
              <div className="milestone-top">
                <div className="milestone-step-wrapper">
                  <span className="milestone-step">01</span>
                  <div className="milestone-icon-box" title="Carnegie Mellon Pedagogy">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                      <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                    </svg>
                  </div>
                </div>
                <span className="milestone-year">2001–2005</span>
              </div>
              <span className="milestone-tag tag-pedagogy">Inception & Pedagogy</span>
              <h4>CIHL & CMU Mastery Model</h4>
              <p>
                Founded at IIIT Hyderabad under CIHL with Carnegie Mellon guidance. Pioneered mastery-based learning and collaborative coding studios under dedicated full-time mentors.
              </p>
            </div>

            {/* Step 2 */}
            <div className="heritage-milestone-card era-2">
              <div className="milestone-accent-bar"></div>
              <div className="milestone-top">
                <div className="milestone-step-wrapper">
                  <span className="milestone-step">02</span>
                  <div className="milestone-icon-box" title="Network & Expansion">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="5" r="3"></circle>
                      <circle cx="5" cy="19" r="3"></circle>
                      <circle cx="19" cy="19" r="3"></circle>
                      <line x1="12" y1="8" x2="5" y2="16"></line>
                      <line x1="12" y1="8" x2="19" y2="16"></line>
                    </svg>
                  </div>
                </div>
                <span className="milestone-year">2006–2015</span>
              </div>
              <span className="milestone-tag tag-expansion">Evolution & Expansion</span>
              <h4>Growing the Learning-by-Doing Model</h4>
              <p>
                MSIT strengthened its hands-on learning approach, expanded its learning-centre network, and evolved its curriculum with emerging technologies.
              </p>
            </div>

            {/* Step 3 */}
            <div className="heritage-milestone-card era-3">
              <div className="milestone-accent-bar"></div>
              <div className="milestone-top">
                <div className="milestone-step-wrapper">
                  <span className="milestone-step">03</span>
                  <div className="milestone-icon-box" title="Cloud & DevOps Shift">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
                      <polyline points="10 13 12 11 14 13"></polyline>
                      <line x1="12" y1="11" x2="12" y2="17"></line>
                    </svg>
                  </div>
                </div>
                <span className="milestone-year">2016–2023</span>
              </div>
              <span className="milestone-tag tag-cloud">Cloud & Modern Engineering</span>
              <h4>DevOps & Specializations</h4>
              <p>
                Transitioned to Cloud, Data Science, and Machine Learning tracks, embedding collaborative team projects and hands-on software development directly into student learning.
              </p>
            </div>

            {/* Step 4 */}
            <div className="heritage-milestone-card era-4 active">
              <div className="milestone-accent-bar"></div>
              <div className="milestone-top">
                <div className="milestone-step-wrapper">
                  <span className="milestone-step">04</span>
                  <div className="milestone-icon-box active" title="AI-Native Engineering">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"></path>
                    </svg>
                  </div>
                </div>
                <div className="milestone-year-wrapper">
                  <span className="milestone-live-pill">
                    <span className="live-pulse-dot"></span>
                    ACTIVE
                  </span>
                  <span className="milestone-year current">2024–Present</span>
                </div>
              </div>
              <span className="milestone-tag current">Current Era</span>
              <h4>The AI-Native Core</h4>
              <p>
                Curriculum fully rebuilt for the LLM era. Students use agentic workflows, Copilots, and advanced AI systems, focusing on higher-order system architecture.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
