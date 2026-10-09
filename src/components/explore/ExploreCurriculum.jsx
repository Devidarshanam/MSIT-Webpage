import React from 'react';
import { 
  GenAIIcon, 
  CodeIcon, 
  LayersIcon, 
  MessageSquareIcon 
} from '../Icons';

export default function ExploreCurriculum() {
  return (
    <section className="explore-section bg-light" id="t-shaped-curriculum">
      <div className="explore-container">
        
        {/* Section Header */}
        <div className="explore-section-header">
          <span className="curriculum-kicker-badge">
            <span className="curriculum-kicker-dot"></span>
            What You'll Learn
          </span>
          <h2>The T-Shaped Curriculum</h2>
          <p className="section-lead">
            Learn the fundamentals, explore different areas of technology, and build deeper skills in the areas that matter to your career.
          </p>
        </div>

        {/* The Exact Figure 3 T-Shape Visual Architecture Container */}
        <div className="fse-tshape-container">
          
          {/* TOP BAR OF THE 'T': Generative AI (Domain 1) */}
          <div className="tshape-top-bar">
            <div className="tshape-top-header">
              <div className="tshape-top-icon-title">
                <div className="tshape-top-icon">
                  <GenAIIcon size={22} />
                </div>
                <div>
                  <span className="tshape-domain-badge">Domain 1 • Horizontal Breadth</span>
                  <h3>Generative AI</h3>
                </div>
              </div>
              <span className="tshape-role-chip">Modern AI Tools</span>
            </div>
            <p className="tshape-top-desc">
              Learn how to use modern AI tools to learn, create, and solve problems.
            </p>
            <div className="tshape-top-pills">
              <span className="tshape-pill pill-ai">AI Tools</span>
              <span className="tshape-pill pill-ai">Working with AI</span>
              <span className="tshape-pill pill-ai">Using AI Responsibly</span>
            </div>
          </div>

          {/* LOWER SECTION: Flanked Wings + Deep Center Stem */}
          <div className="tshape-lower-grid">
            
            {/* LEFT WING: Technology Areas (Domain 3) */}
            <div className="tshape-wing-card wing-left">
              <div className="tshape-wing-header">
                <div className="tshape-wing-icon icon-adjacent">
                  <LayersIcon size={20} />
                </div>
                <div>
                  <span className="wing-domain-badge">Domain 3</span>
                  <h4>Technology Areas</h4>
                </div>
              </div>
              <p className="wing-desc">
                Explore different areas of technology and understand how they work together.
              </p>
              <ul className="wing-list">
                <li>
                  <span className="wing-bullet">•</span>
                  <div>
                    <strong>Web Development</strong>
                    <span className="wing-subtext">Build websites and applications.</span>
                  </div>
                </li>
                <li>
                  <span className="wing-bullet">•</span>
                  <div>
                    <strong>Data & AI</strong>
                    <span className="wing-subtext">Work with data and explore artificial intelligence.</span>
                  </div>
                </li>
                <li>
                  <span className="wing-bullet">•</span>
                  <div>
                    <strong>Cloud & Deployment</strong>
                    <span className="wing-subtext">Learn how applications are made available to users.</span>
                  </div>
                </li>
                <li>
                  <span className="wing-bullet">•</span>
                  <div>
                    <strong>APIs & Modern Applications</strong>
                    <span className="wing-subtext">Learn how different applications communicate with each other.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* CENTER STEM: Software Development (Domain 2) - CORE DEPTH */}
            <div className="tshape-center-stem">
              <div className="tshape-stem-header">
                <div className="tshape-stem-icon">
                  <CodeIcon size={24} />
                </div>
                <div>
                  <span className="stem-domain-badge">Domain 2 • Core Depth</span>
                  <h3>Software Development</h3>
                </div>
              </div>
              <p className="tshape-stem-lead">
                Build a strong foundation in programming and learn how to create reliable software.
              </p>

              <div className="tshape-stem-clean-list">
                <div className="stem-clean-item">
                  <span className="stem-item-icon">✓</span>
                  <div>
                    <strong>Programming Fundamentals</strong>
                    <span>Learn how to write clear and structured programs.</span>
                  </div>
                </div>

                <div className="stem-clean-item">
                  <span className="stem-item-icon">✓</span>
                  <div>
                    <strong>Problem Solving</strong>
                    <span>Learn how to break down problems and find solutions.</span>
                  </div>
                </div>

                <div className="stem-clean-item">
                  <span className="stem-item-icon">✓</span>
                  <div>
                    <strong>Software Design</strong>
                    <span>Understand how different parts of a software application work together.</span>
                  </div>
                </div>

                <div className="stem-clean-item">
                  <span className="stem-item-icon">✓</span>
                  <div>
                    <strong>Databases</strong>
                    <span>Learn how applications store and work with information.</span>
                  </div>
                </div>

                <div className="stem-clean-item">
                  <span className="stem-item-icon">✓</span>
                  <div>
                    <strong>Building & Testing Software</strong>
                    <span>Build software, test it, and improve it.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT WING: Professional Skills (Domain 4) */}
            <div className="tshape-wing-card wing-right">
              <div className="tshape-wing-header">
                <div className="tshape-wing-icon icon-non-eng">
                  <MessageSquareIcon size={20} />
                </div>
                <div>
                  <span className="wing-domain-badge">Domain 4</span>
                  <h4>Professional Skills</h4>
                </div>
              </div>
              <p className="wing-desc">
                Build the communication and teamwork skills needed to work effectively in the technology industry.
              </p>
              <ul className="wing-list">
                <li>
                  <span className="wing-bullet">•</span>
                  <div>
                    <strong>Communication</strong>
                    <span className="wing-subtext">Express your ideas clearly.</span>
                  </div>
                </li>
                <li>
                  <span className="wing-bullet">•</span>
                  <div>
                    <strong>Teamwork</strong>
                    <span className="wing-subtext">Work effectively with others.</span>
                  </div>
                </li>
                <li>
                  <span className="wing-bullet">•</span>
                  <div>
                    <strong>Presenting Ideas</strong>
                    <span className="wing-subtext">Explain your work with confidence.</span>
                  </div>
                </li>
                <li>
                  <span className="wing-bullet">•</span>
                  <div>
                    <strong>Feedback & Improvement</strong>
                    <span className="wing-subtext">Learn from feedback and improve your work.</span>
                  </div>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
