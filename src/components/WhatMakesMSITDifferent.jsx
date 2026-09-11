import React from 'react';

export default function WhatMakesMSITDifferent({ data }) {
  return (
    <section className="section" id={data.sectionId}>
      <div className="container">
        <div className="section-heading">
          <span className="kicker">{data.kicker}</span>
          <h2>{data.heading}</h2>
          <p>{data.description}</p>
        </div>

        <div className="pillars-triad-grid">
          {data.pillars.map((pillar, idx) => (
            <div key={idx} className="pillar-card">
              <span className="pillar-step-badge">Pillar {pillar.step}</span>
              <h3>{pillar.name}</h3>
              <div className="pillar-subhead">{pillar.subtitle}</div>
              <p>{pillar.description}</p>
            </div>
          ))}
        </div>

        <div className="cetls-box">
          <span className="badge">{data.cetlsHighlight.badge}</span>
          <h3>{data.cetlsHighlight.title}</h3>
          <p>{data.cetlsHighlight.description}</p>
        </div>

        <div className="mindset-shift-container">
          <div className="mindset-col from">
            <span className="mindset-label">{data.mindsetShift.fromLabel}</span>
            <div className="mindset-quote">{data.mindsetShift.from}</div>
          </div>
          <div className="mindset-arrow" aria-hidden="true">→</div>
          <div className="mindset-col to">
            <span className="mindset-label">{data.mindsetShift.toLabel}</span>
            <div className="mindset-quote">{data.mindsetShift.to}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
