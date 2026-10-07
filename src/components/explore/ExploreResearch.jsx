import React from 'react';
import { BookOpenIcon, InfoIcon } from '../Icons';

export default function ExploreResearch() {
  return (
    <section className="explore-section bg-light" id="research-philosophy">
      <div className="explore-container">
        <div className="explore-section-header">
          <span className="section-kicker">Pedagogical Research</span>
          <h2>The Research Behind the Curriculum</h2>
          <p className="section-lead">
            The MSIT curriculum is not just an industry response; it is grounded in decades of 
            pedagogical research and cognitive science on how adults learn complex engineering systems.
          </p>
        </div>

        <div className="research-summary-box">
          <div className="research-icon">
            <BookOpenIcon size={32} />
          </div>
          <div className="research-content">
            <h3>Cognitive Apprenticeship in Computing</h3>
            <p>
              By shifting from passive instruction to "cognitive apprenticeship," the curriculum mimics 
              the expert-novice dynamic found in real engineering teams. Research shows this approach 
              significantly improves retention, complex problem-solving abilities, and the capacity to 
              transfer skills to novel domains.
            </p>
            
            <div className="pending-link-alert mt-4">
              <InfoIcon size={16} />
              <span>Pending Content Dependency: The official research paper/link will be integrated here once confirmed by the academic team.</span>
            </div>
            
            {/* 
              TODO: Once actual paper/link is confirmed, use a proper button:
              <a href="URL_PENDING" className="btn btn-outline" target="_blank" rel="noopener noreferrer">
                Read the Research Paper
              </a> 
            */}
          </div>
        </div>
      </div>
    </section>
  );
}
