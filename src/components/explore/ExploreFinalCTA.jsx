import React from 'react';
import { ArrowRightIcon, GraduationCapIcon, BuildingIcon, BriefcaseIcon, ShieldCheckIcon } from '../Icons';

export default function ExploreFinalCTA({ onGoToSignIn }) {
  return (
    <section className="explore-final-cta-section" id="final-cta">
      <div className="explore-container">
        <div className="final-cta-card">
          <div className="final-cta-glow-bg" aria-hidden="true"></div>
          <div className="final-cta-content">
            <div className="final-cta-badge">
              <span className="cta-sparkle-dot"></span>
              <span>Next Cohort Admissions Open • IIIT Hyderabad Campus</span>
            </div>
            
            <h2>Ready to Transform into a Production-Ready Software Engineer?</h2>
            
            <p className="final-cta-lead">
              Experience the 100% active learning-by-doing pedagogy. Work in dedicated workstation studios, solve industry challenges, and graduate with a prestigious multi-university Master's degree.
            </p>
            
            <div className="final-cta-actions">
              <button 
                className="btn btn-primary btn-cta-primary" 
                onClick={onGoToSignIn}
                id="cta-apply-btn"
              >
                <span>Check Eligibility &amp; Apply Now</span>
                <ArrowRightIcon size={18} />
              </button>
              <a href="#admission-journey" className="btn btn-outline-white btn-cta-secondary">
                <span>View Selection Process</span>
              </a>
            </div>

            <div className="final-cta-highlights">
              <div className="cta-highlight-item">
                <GraduationCapIcon size={18} />
                <span>Multi-University Master's</span>
              </div>
              <div className="cta-highlight-item">
                <BuildingIcon size={18} />
                <span>IIIT Hyderabad Campus</span>
              </div>
              <div className="cta-highlight-item">
                <BriefcaseIcon size={18} />
                <span>Industry Practicum &amp; Co-op</span>
              </div>
              <div className="cta-highlight-item">
                <ShieldCheckIcon size={18} />
                <span>25-Year Academic Heritage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
