import React from 'react';
import { ShieldCheckIcon } from '../Icons';

export default function ExploreAdmissions() {
  return (
    <section className="explore-section" id="admission-journey">
      <div className="explore-container">
        <div className="explore-section-header">
          <span className="section-kicker">Begin Your Journey</span>
          <h2>Admission Pathway</h2>
          <p className="section-lead">
            We follow a structured evaluation pathway designed to identify candidates with strong problem-solving 
            potential and the drive to succeed in an active learning environment.
          </p>
        </div>

        <div className="admissions-timeline-flexible">
          <div className="timeline-node">
            <div className="node-marker">1</div>
            <div className="node-content">
              <h4>Register Interest</h4>
              <p>Create an account to receive official updates and access the application portal.</p>
            </div>
          </div>
          <div className="timeline-node">
            <div className="node-marker">2</div>
            <div className="node-content">
              <h4>Eligibility & Documents</h4>
              <p>Submit academic records to verify your qualifying undergraduate degree.</p>
            </div>
          </div>
          <div className="timeline-node">
            <div className="node-marker">3</div>
            <div className="node-content">
              <h4>Aptitude Evaluation</h4>
              <p>Qualify via recognized national exams (e.g., GRE, GATE) or the MSIT entrance test.</p>
            </div>
          </div>
          <div className="timeline-node">
            <div className="node-marker">4</div>
            <div className="node-content">
              <h4>Interview & Admission</h4>
              <p>Technical and qualitative interview, followed by formal admission offers.</p>
            </div>
          </div>
        </div>
        
        <div className="pending-alert-box mt-4">
          <ShieldCheckIcon size={18} />
          <span>
            <strong>Note:</strong> Exact dates and specific workflow requirements are pending final confirmation 
            from the admissions committee.
          </span>
        </div>
      </div>
    </section>
  );
}
