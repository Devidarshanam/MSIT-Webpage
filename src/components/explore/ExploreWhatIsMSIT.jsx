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
            <span className="section-kicker">Quarter-Century Evolution</span>
            <h2>The 25-Year Journey: 2001 to 2026</h2>
            <p className="section-lead">
              From the original CMU mastery studios to modern AI-native engineering, 
              MSIT has continuously adapted its curriculum to lead industry shifts.
            </p>
          </div>

          <div className="heritage-timeline-progression">
            {/* Step 1 */}
            <div className="heritage-milestone-card">
              <div className="milestone-top">
                <span className="milestone-step">01</span>
                <span className="milestone-year">2001–2005</span>
              </div>
              <span className="milestone-tag">Inception & Pedagogy</span>
              <h4>CIHL & CMU Mastery Model</h4>
              <p>
                Founded at IIIT Hyderabad under CIHL with Carnegie Mellon guidance. Pioneered 90%+ mastery thresholds and collaborative coding studios under dedicated 1:10 mentors.
              </p>
            </div>

            {/* Step 2 */}
            <div className="heritage-milestone-card">
              <div className="milestone-top">
                <span className="milestone-step">02</span>
                <span className="milestone-year">2006–2015</span>
              </div>
              <span className="milestone-tag">Expansion & Scalability</span>
              <h4>Multi-Campus IT Hubs</h4>
              <p>
                Scaled the studio model across JNTUH, JNTUK, JNTUA, and SVU. Institutionalized Soft Skills and Professional Development alongside deep technical rigor.
              </p>
            </div>

            {/* Step 3 */}
            <div className="heritage-milestone-card">
              <div className="milestone-top">
                <span className="milestone-step">03</span>
                <span className="milestone-year">2016–2023</span>
              </div>
              <span className="milestone-tag">Agile & Cloud Shift</span>
              <h4>DevOps & Specializations</h4>
              <p>
                Transitioned from monolithic software engineering to Cloud, Data Science, and Machine Learning tracks. Embedded Agile/Scrum directly into daily student workflows.
              </p>
            </div>

            {/* Step 4 */}
            <div className="heritage-milestone-card active">
              <div className="milestone-top">
                <span className="milestone-step">04</span>
                <span className="milestone-year">2024–Present</span>
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
