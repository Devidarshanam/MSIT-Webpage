import React from 'react';
import { BriefcaseIcon, TerminalIcon, RocketIcon, TargetIcon, UsersIcon, CheckCircleIcon } from '../Icons';

export default function RealWorldPracticumSection({ data }) {
  const getPillarIcon = (idx) => {
    switch (idx) {
      case 0: return <BriefcaseIcon size={22} />;
      case 1: return <TerminalIcon size={22} />;
      case 2: return <RocketIcon size={22} />;
      default: return <TargetIcon size={22} />;
    }
  };

  return (
    <section className="section practicum-section" id="practicum">
      <div className="container">
        <div className="section-heading">
          <span className="kicker">{data.kicker}</span>
          <h2>{data.heading}</h2>
          <p>{data.description}</p>
        </div>

        {/* 50/50 Practicum Model Highlight Banner */}
        <div className="practicum-ratio-banner">
          <div className="ratio-splits">
            <div className="ratio-box learning-box">
              <span className="ratio-tag">PHASE ARCHITECTURE</span>
              <h3>{data.modelHighlight.learningRatio}</h3>
              <p>Active computing studios, AI-assisted labs, foundational algorithms, and systems design.</p>
            </div>
            <div className="ratio-divider">
              <span className="ratio-plus">+</span>
            </div>
            <div className="ratio-box practical-box">
              <span className="ratio-tag">INDUSTRY IMMERSION</span>
              <h3>{data.modelHighlight.practicumRatio}</h3>
              <p>Authentic corporate engineering problems, practitioner code reviews, or venture creation.</p>
            </div>
          </div>
          <div className="ratio-summary-footer">
            <p>{data.modelHighlight.summary}</p>
          </div>
        </div>

        {/* 4 Core Pillars of the Practicum & Venture Studio */}
        <div className="practicum-pillars-grid">
          {(data?.pillars || []).map((pillar, idx) => (
            <div key={idx} className="practicum-pillar-card">
              <div className="pillar-top-row">
                <div className="pillar-icon-wrap" aria-hidden="true">
                  {getPillarIcon(idx)}
                </div>
                <span className="pillar-index">0{idx + 1}</span>
              </div>
              <h4>{pillar.title}</h4>
              <p>{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Conditionality Note */}
        <div className="practicum-condition-note">
          <p>{data.note}</p>
        </div>
      </div>
    </section>
  );
}
