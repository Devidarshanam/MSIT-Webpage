import React from 'react';
import { BookOpenIcon, BrainIcon, ToolsIcon } from '../Icons';

export default function ExploreWhyMSIT() {
  return (
    <section className="explore-section why-msit-section" id="why-msit">
      <div className="explore-container">
        {/* Section Header */}
        <div className="explore-section-header">
          <span className="why-msit-kicker-badge">
            <span className="why-kicker-dot"></span>
            MSIT at 25 • The AI Era
          </span>
          <h2>Why MSIT? Why Now?</h2>
          <p className="section-lead">
            As the technology landscape rapidly shifts toward AI-native environments, traditional coding 
            is becoming automated. MSIT bridges this gap by connecting technical skills with critical thinking, 
            communication, adaptability, and continuous learning.
          </p>
        </div>

        {/* Principles Container */}
        <div className="why-principles-wrapper">
          <div className="principles-section-header">
            <span className="principles-mini-pill">Pedagogical Framework</span>
            <h3 className="principles-title">Anchored in Three Core Principles</h3>
            <div className="principles-accent-divider"></div>
          </div>

          {/* 3 Pillar Cards */}
          <div className="why-pillars-grid">
            {/* Pillar 1 */}
            <div className="why-pillar-card pillar-learn">
              <div className="pillar-accent-stripe"></div>
              <div className="why-pillar-top">
                <span className="why-pillar-number">Pillar 01</span>
                <div className="why-pillar-icon" title="Learning to Learn">
                  <BookOpenIcon size={24} />
                </div>
              </div>
              <span className="pillar-focus-tag">Adaptability & Agility</span>
              <h3>Learning to Learn</h3>
              <p>
                In a world where frameworks change constantly, the most critical skill is adaptability. 
                We teach you how to rapidly acquire new paradigms on your own.
              </p>
              <div className="pillar-micro-points">
                <span className="micro-point-tag">Framework Independence</span>
                <span className="micro-point-tag">Autonomous Research</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="why-pillar-card pillar-think">
              <div className="pillar-accent-stripe"></div>
              <div className="why-pillar-top">
                <span className="why-pillar-number">Pillar 02</span>
                <div className="why-pillar-icon" title="Learning to Think">
                  <BrainIcon size={24} />
                </div>
              </div>
              <span className="pillar-focus-tag">Architecture & Logic</span>
              <h3>Learning to Think</h3>
              <p>
                Beyond syntax, we focus on system architecture, logical reasoning, 
                and AI-assisted workflows to solve complex engineering challenges.
              </p>
              <div className="pillar-micro-points">
                <span className="micro-point-tag">System Design</span>
                <span className="micro-point-tag">AI-Augmented Logic</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="why-pillar-card pillar-do">
              <div className="pillar-accent-stripe"></div>
              <div className="why-pillar-top">
                <span className="why-pillar-number">Pillar 03</span>
                <div className="why-pillar-icon" title="Learning to Do">
                  <ToolsIcon size={24} />
                </div>
              </div>
              <span className="pillar-focus-tag">Studio Practice</span>
              <h3>Learning to Do</h3>
              <p>
                Knowledge is solidified through action. Our studio methodology ensures 
                you are building, testing, and deploying real systems daily.
              </p>
              <div className="pillar-micro-points">
                <span className="micro-point-tag">Daily Deployment</span>
                <span className="micro-point-tag">Practicum Delivery</span>
              </div>
            </div>
          </div>

          {/* Connected Flow / Triad Summary Rail */}
          <div className="principles-synergy-rail">
            <div className="synergy-step">
              <span className="synergy-num">1</span>
              <span className="synergy-text">Acquire Paradigms</span>
            </div>
            <div className="synergy-arrow" aria-hidden="true">→</div>
            <div className="synergy-step">
              <span className="synergy-num">2</span>
              <span className="synergy-text">Architect Systems</span>
            </div>
            <div className="synergy-arrow" aria-hidden="true">→</div>
            <div className="synergy-step">
              <span className="synergy-num">3</span>
              <span className="synergy-text">Build & Deploy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
