import React from 'react';
import { 
  CorporateBuildingIcon, 
  RocketIcon, 
  CheckCircleIcon, 
  BuildingIcon, 
  TerminalIcon
} from '../Icons';

export default function ExplorePracticum() {
  return (
    <section className="explore-section bg-white" id="real-world-practicum">
      <div className="explore-container">
        
        {/* Section Header */}
        <div className="explore-section-header">
          <span className="practicum-kicker-badge">
            <span className="practicum-kicker-dot"></span>
            Industry Integration
          </span>
          <h2>Real-World Practicum &amp; Venture Studio</h2>
          <p className="section-lead">
            The final phase of MSIT is entirely experiential. Students spend approximately half their programme 
            duration transitioning from learning studios into full-time corporate environments or deep-tech venture studios.
          </p>
        </div>

        {/* 50/50 Dual-Phase Learning Horizon Strip */}
        <div className="practicum-horizon-banner">
          <div className="horizon-phase phase-academic">
            <div className="horizon-phase-badge">
              <span>Phase 1 • ~50% Tenure</span>
            </div>
            <h4>Studio-Based Foundations</h4>
            <p>Intensive software engineering, system architecture, and AI-assisted workflows built in collaborative studios.</p>
          </div>

          <div className="horizon-connector">
            <span className="connector-pill">
              <span className="connector-arrow">→</span>
              <span>Smooth Transition</span>
            </span>
          </div>

          <div className="horizon-phase phase-industry">
            <div className="horizon-phase-badge badge-highlight">
              <span>Phase 2 • ~50% Tenure</span>
            </div>
            <h4>Full-Time Practicum Immersion</h4>
            <p>Direct integration into production corporate engineering teams, venture creation, or advanced research labs.</p>
          </div>
        </div>

        {/* Dual Experiential Tracks Grid */}
        <div className="practicum-tracks-grid">
          
          {/* Track 1: Corporate Co-op */}
          <div className="practicum-track-card card-coop">
            <div className="track-card-media">
              <img 
                src="/assets/iiit-coop.jpg" 
                alt="Corporate Industry Co-op at MSIT" 
                className="track-card-image"
                loading="lazy" 
              />
              <div className="track-media-overlay"></div>
              <div className="track-pill-tag tag-coop">
                <CorporateBuildingIcon size={15} />
                <span>Industry Track</span>
              </div>
            </div>

            <div className="track-card-body">
              <div className="track-header-row">
                <h3>Corporate Co-op Apprenticeship</h3>
                <span className="track-tenure-badge">Industry Immersion</span>
              </div>
              
              <p className="track-lead-desc">
                A rigorous, full-time industry engagement where students integrate directly into professional 
                engineering teams—contributing to live production code and scaling real software architectures.
              </p>

              <div className="track-features-list">
                <div className="track-feature-item">
                  <span className="track-check-bullet check-blue">✓</span>
                  <div>
                    <strong>Production Codebases</strong>
                    <span>Write, test, and merge code that ships into live customer-facing enterprise systems.</span>
                  </div>
                </div>

                <div className="track-feature-item">
                  <span className="track-check-bullet check-blue">✓</span>
                  <div>
                    <strong>Practitioner Mentorship</strong>
                    <span>Receive continuous feedback, architectural reviews, and code guidance from active tech leads.</span>
                  </div>
                </div>

                <div className="track-feature-item">
                  <span className="track-check-bullet check-blue">✓</span>
                  <div>
                    <strong>Modern Team Workflows</strong>
                    <span>Gain hands-on fluency with production CI/CD pipelines, pull request reviews, and sprint delivery.</span>
                  </div>
                </div>
              </div>

              <div className="track-footer-strip strip-coop">
                <BuildingIcon size={16} />
                <span>Direct transition pathway to full-time corporate software engineering roles</span>
              </div>
            </div>
          </div>

          {/* Track 2: Venture Studio & Research */}
          <div className="practicum-track-card card-venture">
            <div className="track-card-media">
              <img 
                src="/assets/iiit-ai-lab.jpg" 
                alt="Venture Studio and Applied AI Research at IIIT Hyderabad" 
                className="track-card-image"
                loading="lazy" 
              />
              <div className="track-media-overlay"></div>
              <div className="track-pill-tag tag-venture">
                <RocketIcon size={15} />
                <span>Innovation Track</span>
              </div>
            </div>

            <div className="track-card-body">
              <div className="track-header-row">
                <h3>Venture Studio &amp; Applied Research</h3>
                <span className="track-tenure-badge badge-venture">Deep Tech &amp; Startups</span>
              </div>
              
              <p className="track-lead-desc">
                Designed for builder-minded engineers inclined toward deep technology, startup incubation, 
                or cutting-edge research within premier computing centers at IIIT Hyderabad.
              </p>

              <div className="track-features-list">
                <div className="track-feature-item">
                  <span className="track-check-bullet check-purple">✓</span>
                  <div>
                    <strong>Zero-to-One Product Building</strong>
                    <span>Transform validated problem statements into viable, functional software products and MVPs.</span>
                  </div>
                </div>

                <div className="track-feature-item">
                  <span className="track-check-bullet check-purple">✓</span>
                  <div>
                    <strong>Premier Research Centers</strong>
                    <span>Collaborate with advanced research labs in AI, Natural Language Processing, and Computer Vision.</span>
                  </div>
                </div>

                <div className="track-feature-item">
                  <span className="track-check-bullet check-purple">✓</span>
                  <div>
                    <strong>Builder Mindset Shift</strong>
                    <span>Move beyond asking "How do I pass an exam?" to asking "What real problems can I solve?".</span>
                  </div>
                </div>
              </div>

              <div className="track-footer-strip strip-venture">
                <TerminalIcon size={16} />
                <span>Incubation support, intellectual property creation, and startup acceleration exposure</span>
              </div>
            </div>
          </div>

        </div>

        {/* Practicum Key Metrics Strip */}
        <div className="practicum-metrics-strip">
          <div className="practicum-metric-box">
            <span className="p-metric-val">~50%</span>
            <span className="p-metric-title">Program Tenure</span>
            <span className="p-metric-sub">Dedicated to full-time experiential practicum</span>
          </div>

          <div className="practicum-metric-divider"></div>

          <div className="practicum-metric-box">
            <span className="p-metric-val">100%</span>
            <span className="p-metric-title">Zero Lectures</span>
            <span className="p-metric-sub">Purely experiential, hands-on professional work</span>
          </div>

          <div className="practicum-metric-divider"></div>

          <div className="practicum-metric-box">
            <span className="p-metric-val">Live</span>
            <span className="p-metric-title">Production Code</span>
            <span className="p-metric-sub">Real features deployed in real engineering setups</span>
          </div>

          <div className="practicum-metric-divider"></div>

          <div className="practicum-metric-box">
            <span className="p-metric-val">Dual</span>
            <span className="p-metric-title">Mentorship Model</span>
            <span className="p-metric-sub">Supervised jointly by industry leaders &amp; faculty</span>
          </div>
        </div>

      </div>
    </section>
  );
}
