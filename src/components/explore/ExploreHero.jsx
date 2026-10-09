import React from 'react';
import { ArrowRightIcon, AwardIcon, BuildingIcon, BriefcaseIcon } from '../Icons';

export default function ExploreHero({ onGoToSignIn }) {
  return (
    <section className="explore-hero-section">
      <div className="explore-container hero-content-wrapper">
        <div className="hero-content">
          <span className="hero-kicker">International Institute of Information Technology, Hyderabad</span>
          <h1 className="hero-title">
            Master of Science in <span className="highlight">Information Technology</span>
          </h1>
          <p className="hero-lead">
            Learn technology by building real projects, solving practical problems, and developing the skills you need for a career in the IT industry.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={onGoToSignIn}>
              <span>Register Interest / Apply</span>
              <ArrowRightIcon size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="hero-metrics-bar">
        <div className="explore-container metrics-container">
          <div className="metric-item">
            <AwardIcon size={28} className="metric-icon" />
            <div className="metric-text">
              <strong>25+ Years</strong>
              <span>Learning &amp; Experience</span>
            </div>
          </div>
          <div className="metric-divider"></div>
          <div className="metric-item">
            <BuildingIcon size={28} className="metric-icon" />
            <div className="metric-text">
              <strong>Learn by Doing</strong>
              <span>Practical Projects</span>
            </div>
          </div>
          <div className="metric-divider"></div>
          <div className="metric-item">
            <BriefcaseIcon size={28} className="metric-icon" />
            <div className="metric-text">
              <strong>Industry Exposure</strong>
              <span>Real-World Experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
