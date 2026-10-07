import React from 'react';
import { ArrowRightIcon, UserIcon } from '../Icons';

export default function ExploreFinalCTA({ onGoToSignIn, onGoToDashboard }) {
  // If the user is authenticated, we show "Open Dashboard" instead of Sign In.
  const isAuthenticated = false; // We can pass this as a prop later from KnowAboutMSITPage

  return (
    <section className="explore-section bg-dark text-white" id="final-cta">
      <div className="explore-container text-center">
        <h2>Ready to explore MSIT?</h2>
        <p className="section-lead" style={{ color: 'var(--neutral-300)', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
          Create an account to access the detailed curriculum, verify your eligibility, and 
          begin your application for the upcoming cohort.
        </p>
        
        <div className="hero-actions" style={{ justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={onGoToSignIn}>
            <UserIcon size={18} />
            <span>Register Interest / Check Eligibility</span>
          </button>
        </div>
      </div>
    </section>
  );
}
