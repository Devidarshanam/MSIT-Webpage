import React, { useState } from 'react';
import { 
  BookOpenIcon, 
  CodeIcon, 
  TerminalIcon, 
  TrendingUpIcon, 
  ArrowRightIcon 
} from '../Icons';

export default function ExploreWhatIsMSIT() {
  const [showStoryModal, setShowStoryModal] = useState(false);

  return (
    <section className="explore-section bg-light how-msit-section" id="what-is-msit">
      <div className="explore-container">
        
        {/* Section Header */}
        <div className="explore-section-header">
          <span className="section-kicker">HOW MSIT STARTED</span>
          <h2>Learning by Doing, Since 2001</h2>
          <p className="section-lead">
            MSIT began in 2001 with a simple idea: students learn technology best by building, practicing, and solving real problems.
          </p>
        </div>

        {/* Visual Flow: LEARN → BUILD → PRACTICE → GROW */}
        <div className="how-msit-flow-container">
          <div className="how-msit-flow-grid">
            
            {/* Step 1: LEARN */}
            <div className="how-flow-card">
              <div className="how-flow-card-top">
                <span className="how-flow-step-num">01</span>
                <div className="how-flow-icon">
                  <BookOpenIcon size={20} />
                </div>
              </div>
              <h3 className="how-flow-title">LEARN</h3>
              <p className="how-flow-desc">Understand the fundamentals.</p>
            </div>

            {/* Step 2: BUILD */}
            <div className="how-flow-card">
              <div className="how-flow-card-top">
                <span className="how-flow-step-num">02</span>
                <div className="how-flow-icon">
                  <CodeIcon size={20} />
                </div>
              </div>
              <h3 className="how-flow-title">BUILD</h3>
              <p className="how-flow-desc">Create practical projects.</p>
            </div>

            {/* Step 3: PRACTICE */}
            <div className="how-flow-card">
              <div className="how-flow-card-top">
                <span className="how-flow-step-num">03</span>
                <div className="how-flow-icon">
                  <TerminalIcon size={20} />
                </div>
              </div>
              <h3 className="how-flow-title">PRACTICE</h3>
              <p className="how-flow-desc">Apply what you learn to real problems.</p>
            </div>

            {/* Step 4: GROW */}
            <div className="how-flow-card">
              <div className="how-flow-card-top">
                <span className="how-flow-step-num">04</span>
                <div className="how-flow-icon">
                  <TrendingUpIcon size={20} />
                </div>
              </div>
              <h3 className="how-flow-title">GROW</h3>
              <p className="how-flow-desc">Develop skills for your technology career.</p>
            </div>

          </div>
        </div>

        {/* Compact Historical / Founding Vision Card */}
        <div className="how-founder-bar">
          <div className="how-founder-image-wrap">
            <img 
              src="/assets/rajreddy.jpg" 
              alt="Prof. Raj Reddy - MSIT Founding Visionary" 
              className="how-founder-image"
            />
          </div>

          <div className="how-founder-content">
            <span className="how-founder-tag">FOUNDING VISION</span>
            <h3 className="how-founder-title">Founded with a vision from Prof. Raj Reddy</h3>
            <p className="how-founder-desc">MSIT was founded in 2001 with a focus on practical, hands-on learning.</p>
            <div className="how-founder-action">
              <button 
                type="button" 
                className="how-story-btn"
                onClick={() => setShowStoryModal(true)}
                aria-haspopup="dialog"
              >
                <span>Explore Our Story</span>
                <ArrowRightIcon size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Lightweight History Story Modal */}
      {showStoryModal && (
        <div 
          className="story-modal-backdrop" 
          onClick={() => setShowStoryModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="story-modal-card" onClick={(e) => e.stopPropagation()}>
            <button 
              type="button" 
              className="story-modal-close" 
              onClick={() => setShowStoryModal(false)}
              aria-label="Close dialog"
            >
              ✕
            </button>

            <span className="how-founder-tag" style={{ marginBottom: '0.4rem', display: 'inline-block' }}>OUR STORY</span>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1rem 0' }}>
              Learning by Doing Since 2001
            </h3>
            
            <p style={{ fontSize: '0.94rem', color: '#334155', lineHeight: 1.6, margin: '0 0 0.85rem 0' }}>
              In 2001, Turing Award Laureate <strong>Prof. Raj Reddy</strong> envisioned an educational model where students learn technology best not through passive lectures, but by actively building real systems.
            </p>
            <p style={{ fontSize: '0.94rem', color: '#334155', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
              MSIT was founded at IIIT Hyderabad with that simple, powerful focus on practical, hands-on learning. Today, the program continues to help motivated students from all backgrounds develop the confidence and practical skills needed for long-term technology careers.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => setShowStoryModal(false)}
                style={{ padding: '0.5rem 1.25rem', fontSize: '0.88rem' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
