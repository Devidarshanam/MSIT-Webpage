import React from 'react';
import { ArrowRightIcon } from '../Icons';

export default function ExploreHero({ onGoToSignIn }) {
  return (
    <section className="explore-hero-section">
      <div className="explore-container">
        <div className="hero-content">
          <span className="hero-kicker">International Institute of Information Technology, Hyderabad</span>
          <h1 className="hero-title">
            Master of Science in <span className="highlight">Information Technology</span>
          </h1>
          <p className="hero-lead">
            An advanced, active-learning master's degree preparing the next generation of 
            technology leaders through hands-on studios, AI-native workflows, and real-world 
            systems engineering.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={onGoToSignIn}>
              <span>Register Interest / Apply</span>
              <ArrowRightIcon size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
