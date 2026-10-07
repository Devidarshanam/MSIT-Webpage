import React from 'react';
import { ShieldCheckIcon } from '../Icons';

export default function ExploreWhoIsFor() {
  return (
    <section className="explore-section bg-light" id="who-is-for">
      <div className="explore-container">
        <div className="explore-section-header">
          <span className="section-kicker">Candidate Profile</span>
          <h2>Who is MSIT For?</h2>
          <p className="section-lead">
            MSIT is designed for driven individuals who want to transition from traditional learning 
            into high-impact software engineering roles. It demands critical thinking, adaptability, 
            and a passion for continuous learning.
          </p>
        </div>

        <div className="who-is-for-grid">
          <div className="who-card">
            <h3>Target Student Profile</h3>
            <p>
              Ideal for graduates and early-career software engineers seeking to transition from maintenance 
              roles into high-impact engineering leadership through a practitioner-led co-op model.
            </p>
          </div>
          <div className="who-card">
            <h3>Eligibility Information</h3>
            <p>
              Admission to MSIT is based on undergraduate academic qualifications and performance in accepted 
              aptitude evaluations. Detailed eligibility requirements and qualifying degree criteria will be 
              published in the latest official admission notification.
            </p>
            <div className="cetls-badge-row mt-3">
              <span className="badge">
                <ShieldCheckIcon size={14} />
                Pending Official Notification
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
