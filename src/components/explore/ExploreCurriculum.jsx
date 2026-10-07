import React from 'react';
import { 
  SparklesIcon, 
  CpuIcon, 
  TerminalIcon, 
  UsersIcon 
} from '../Icons';

export default function ExploreCurriculum() {
  return (
    <section className="explore-section bg-light" id="t-shaped-curriculum">
      <div className="explore-container">
        
        {/* Section Header */}
        <div className="explore-section-header">
          <span className="curriculum-kicker-badge">
            <span className="curriculum-kicker-dot"></span>
            Academic Structure
          </span>
          <h2>The T-Shaped Curriculum</h2>
          <p className="section-lead">
            MSIT prepares developers for the AI era through a balanced T-shaped model: 
            anchored by deep core software engineering, capped by generative AI proficiency, and complemented by 
            adjacent engineering and professional breadth.
          </p>
        </div>

        {/* The Exact Figure 3 T-Shape Visual Architecture Container */}
        <div className="fse-tshape-container">
          
          {/* TOP BAR OF THE 'T': GenAI Usage (Domain 1) */}
          <div className="tshape-top-bar">
            <div className="tshape-top-header">
              <div className="tshape-top-icon-title">
                <div className="tshape-top-icon">
                  <SparklesIcon size={22} />
                </div>
                <div>
                  <span className="tshape-domain-badge">Domain 1 • Horizontal Breadth</span>
                  <h3>GenAI Usage</h3>
                </div>
              </div>
              <span className="tshape-role-chip">Everyday Force Multiplier</span>
            </div>
            <p className="tshape-top-desc">
              Learning to use AI tools responsibly and productively to explore ideas, solve problems faster, and write better code.
            </p>
            <div className="tshape-top-pills">
              <span className="tshape-pill pill-ai">AI Coding Tools & Copilots</span>
              <span className="tshape-pill pill-ai">Prompting & Problem Framing</span>
              <span className="tshape-pill pill-ai">Reviewing & Testing AI Outputs</span>
              <span className="tshape-pill pill-ai">Responsible AI Best Practices</span>
            </div>
          </div>

          {/* LOWER SECTION: Flanked Wings + Deep Center Stem */}
          <div className="tshape-lower-grid">
            
            {/* LEFT WING: Adjacent Engineering (Domain 3) */}
            <div className="tshape-wing-card wing-left">
              <div className="tshape-wing-header">
                <div className="tshape-wing-icon icon-adjacent">
                  <TerminalIcon size={20} />
                </div>
                <div>
                  <span className="wing-domain-badge">Domain 3</span>
                  <h4>Adjacent Engineering</h4>
                </div>
              </div>
              <p className="wing-desc">
                Broad practical exposure to modern technologies that connect with core software systems.
              </p>
              <ul className="wing-list">
                <li>
                  <span className="wing-bullet">•</span>
                  <div>
                    <strong>Cloud Platforms & Deployment</strong>
                    <span className="wing-subtext">Deploying applications to modern cloud environments</span>
                  </div>
                </li>
                <li>
                  <span className="wing-bullet">•</span>
                  <div>
                    <strong>Data Science & AI Basics</strong>
                    <span className="wing-subtext">Understanding data workflows and intelligence pipelines</span>
                  </div>
                </li>
                <li>
                  <span className="wing-bullet">•</span>
                  <div>
                    <strong>DevOps & Automation</strong>
                    <span className="wing-subtext">Version control, continuous integration, and delivery</span>
                  </div>
                </li>
                <li>
                  <span className="wing-bullet">•</span>
                  <div>
                    <strong>Web & API Technologies</strong>
                    <span className="wing-subtext">Building responsive interfaces and connecting services</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* CENTER STEM: Core Software Engineering (Domain 2) - DIGNIFIED & NEAT */}
            <div className="tshape-center-stem">
              <div className="tshape-stem-header">
                <div className="tshape-stem-icon">
                  <CpuIcon size={24} />
                </div>
                <div>
                  <span className="stem-domain-badge">Domain 2 • Core Depth</span>
                  <h3>Core Software Engineering</h3>
                </div>
              </div>
              <p className="tshape-stem-lead">
                Deep foundations in building robust, reliable software that withstand technological shifts.
              </p>

              <div className="tshape-stem-clean-list">
                <div className="stem-clean-item">
                  <span className="stem-item-icon">✓</span>
                  <div>
                    <strong>System Design & Architecture</strong>
                    <span>Building scalable, maintainable software systems</span>
                  </div>
                </div>

                <div className="stem-clean-item">
                  <span className="stem-item-icon">✓</span>
                  <div>
                    <strong>Data Structures & Algorithms</strong>
                    <span>Strong computational thinking and problem-solving</span>
                  </div>
                </div>

                <div className="stem-clean-item">
                  <span className="stem-item-icon">✓</span>
                  <div>
                    <strong>Backend & Database Engineering</strong>
                    <span>Practical application logic and reliable data systems</span>
                  </div>
                </div>

                <div className="stem-clean-item">
                  <span className="stem-item-icon">✓</span>
                  <div>
                    <strong>Core Programming Principles</strong>
                    <span>Clean, well-structured, and readable codebases</span>
                  </div>
                </div>

                <div className="stem-clean-item">
                  <span className="stem-item-icon">✓</span>
                  <div>
                    <strong>Code Quality & Testing</strong>
                    <span>Rigorous testing, debugging, and continuous improvement</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT WING: Non-Engineering (Domain 4) - SOFT SKILLS & REVIEWS */}
            <div className="tshape-wing-card wing-right">
              <div className="tshape-wing-header">
                <div className="tshape-wing-icon icon-non-eng">
                  <UsersIcon size={20} />
                </div>
                <div>
                  <span className="wing-domain-badge">Domain 4</span>
                  <h4>Non-Engineering</h4>
                </div>
              </div>
              <p className="wing-desc">
                Developing soft skills, professional communication, and constructive review habits for collaborative excellence.
              </p>
              <ul className="wing-list">
                <li>
                  <span className="wing-bullet">•</span>
                  <div>
                    <strong>Communication & Presentation</strong>
                    <span className="wing-subtext">Expressing technical ideas clearly to team members</span>
                  </div>
                </li>
                <li>
                  <span className="wing-bullet">•</span>
                  <div>
                    <strong>Peer Reviews & Feedback</strong>
                    <span className="wing-subtext">Giving and receiving constructive code walkthroughs</span>
                  </div>
                </li>
                <li>
                  <span className="wing-bullet">•</span>
                  <div>
                    <strong>Behavioral & Professional Skills</strong>
                    <span className="wing-subtext">Teamwork, workplace etiquette, and accountability</span>
                  </div>
                </li>
                <li>
                  <span className="wing-bullet">•</span>
                  <div>
                    <strong>Soft Skills & Adaptability</strong>
                    <span className="wing-subtext">Empathy, active listening, and continuous learning</span>
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
