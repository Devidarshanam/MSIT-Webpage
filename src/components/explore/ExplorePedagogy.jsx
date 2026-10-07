import React from 'react';
import { ArrowRightIcon } from '../Icons';

export default function ExplorePedagogy() {
  return (
    <section className="explore-section bg-light" id="how-students-learn">
      <div className="explore-container">
        <div className="explore-section-header">
          <span className="section-kicker">Curriculum Philosophy</span>
          <h2>How Students Learn</h2>
          <p className="section-lead">
            The MSIT curriculum philosophy shifts the focus from theoretical memorization to 
            active creation. We guide students through an iterative cycle that mirrors real-world 
            engineering workflows.
          </p>
        </div>

        <div className="learning-cycle-container">
          <div className="learning-cycle-visual">
            <div className="cycle-node">
              <h4>1. Learn</h4>
              <p>Self-directed exploration of core concepts</p>
            </div>
            <div className="cycle-arrow"><ArrowRightIcon size={20} /></div>
            
            <div className="cycle-node">
              <h4>2. Think</h4>
              <p>Architecting solutions and logical reasoning</p>
            </div>
            <div className="cycle-arrow"><ArrowRightIcon size={20} /></div>
            
            <div className="cycle-node">
              <h4>3. Build</h4>
              <p>Hands-on studio coding and prototyping</p>
            </div>
            <div className="cycle-arrow"><ArrowRightIcon size={20} /></div>
            
            <div className="cycle-node">
              <h4>4. Apply</h4>
              <p>Deploying solutions in real-world scenarios</p>
            </div>
            <div className="cycle-arrow"><ArrowRightIcon size={20} /></div>
            
            <div className="cycle-node">
              <h4>5. Reflect</h4>
              <p>Mentor reviews and peer evaluation</p>
            </div>
            <div className="cycle-arrow"><ArrowRightIcon size={20} /></div>
            
            <div className="cycle-node">
              <h4>6. Improve</h4>
              <p>Iterative refinement of the system</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
