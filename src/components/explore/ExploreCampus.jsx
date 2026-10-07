import React from 'react';

export default function ExploreCampus() {
  return (
    <section className="explore-section bg-light" id="campus-experience">
      <div className="explore-container">
        <div className="explore-section-header">
          <span className="section-kicker">Student Experience</span>
          <h2>Campus Life at IIIT Hyderabad</h2>
          <p className="section-lead">
            Experience an immersive, vibrant academic ecosystem located at the heart of India's tech hub.
          </p>
        </div>

        <div className="campus-highlight-banner">
          <img 
            src="/assets/iiit-campus.jpg" 
            alt="IIIT Hyderabad Campus" 
            className="img-cover radius-lg"
          />
        </div>

        <div className="campus-features-grid mt-4">
          <div className="campus-feature">
            <h4>24/7 Innovation Spaces</h4>
            <p>Access to advanced computing labs and collaborative spaces around the clock.</p>
          </div>
          <div className="campus-feature">
            <h4>Vibrant Tech Community</h4>
            <p>Engage in hackathons, research symposiums, and a highly active student developer community.</p>
          </div>
          <div className="campus-feature">
            <h4>Holistic Wellbeing</h4>
            <p>Comprehensive sports facilities, recreation centers, and on-campus accommodation.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
