import React from 'react';
import { BookOpenIcon, BrainIcon, ToolsIcon } from '../Icons';

export default function ExploreWhyMSIT() {
  return (
    <section className="explore-section why-msit-section" id="why-msit">
      <div className="explore-container">
        
        {/* Section Header */}
        <div className="explore-section-header">
          <span className="section-kicker">WHY MSIT?</span>
          <h2>Why Choose MSIT?</h2>
          <p className="section-lead">
            Technology keeps changing. MSIT helps you build strong fundamentals, learn new technologies, and gain practical experience so you can grow with the industry.
          </p>
        </div>

        {/* Principles Container */}
        <div className="why-principles-wrapper">
          <div className="principles-section-header">
            <span className="principles-mini-pill">HOW YOU’LL LEARN AT MSIT</span>
            <h3 className="principles-title">How You’ll Learn at MSIT</h3>
            <div className="principles-accent-divider"></div>
          </div>

          {/* 3 Pillar Cards */}
          <div className="why-pillars-grid">
            
            {/* Card 01 */}
            <div className="why-pillar-card pillar-learn">
              <div className="pillar-accent-stripe"></div>
              <div className="why-pillar-top">
                <span className="why-pillar-number">01</span>
                <div className="why-pillar-icon" title="Build Strong Foundations">
                  <BookOpenIcon size={24} />
                </div>
              </div>
              <span className="pillar-focus-tag">BUILDING FOUNDATIONS</span>
              <h3>Build Strong Foundations</h3>
              <p>
                Understand the basics and learn how technology works. Build the ability to learn new technologies as they change.
              </p>
              <div className="pillar-micro-points">
                <span className="micro-point-tag">Strong Fundamentals</span>
              </div>
            </div>

            {/* Card 02 */}
            <div className="why-pillar-card pillar-think">
              <div className="pillar-accent-stripe"></div>
              <div className="why-pillar-top">
                <span className="why-pillar-number">02</span>
                <div className="why-pillar-icon" title="Learn to Solve Problems">
                  <BrainIcon size={24} />
                </div>
              </div>
              <span className="pillar-focus-tag">PROBLEM SOLVING</span>
              <h3>Learn to Solve Problems</h3>
              <p>
                Learn how to break down problems, find solutions, and think clearly.
              </p>
              <div className="pillar-micro-points">
                <span className="micro-point-tag">Problem Solving</span>
              </div>
            </div>

            {/* Card 03 */}
            <div className="why-pillar-card pillar-do">
              <div className="pillar-accent-stripe"></div>
              <div className="why-pillar-top">
                <span className="why-pillar-number">03</span>
                <div className="why-pillar-icon" title="Build Real Projects">
                  <ToolsIcon size={24} />
                </div>
              </div>
              <span className="pillar-focus-tag">PRACTICAL LEARNING</span>
              <h3>Build Real Projects</h3>
              <p>
                Put what you learn into practice by working on practical projects.
              </p>
              <div className="pillar-micro-points">
                <span className="micro-point-tag">Hands-On Practice</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
