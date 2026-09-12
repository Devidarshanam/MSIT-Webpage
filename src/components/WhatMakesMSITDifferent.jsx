import React from 'react';
import { BookOpenIcon, SparklesIcon, CpuIcon, ArrowRightIcon, ShieldCheckIcon } from './Icons';

export default function WhatMakesMSITDifferent({ data }) {
  const pillarIcons = [
    <BookOpenIcon size={22} />,
    <SparklesIcon size={22} />,
    <CpuIcon size={22} />
  ];

  return (
    <section className="section section-pedagogy" id={data.sectionId}>
      <div className="container">
        <div className="section-heading">
          <span className="kicker">{data.kicker}</span>
          <h2>{data.heading}</h2>
          <p>{data.description}</p>
        </div>

        <div className="pillars-triad-grid">
          {data.pillars.map((pillar, idx) => (
            <div key={idx} className="pillar-card">
              <div className="pillar-top-row">
                <span className="pillar-step-badge">Pillar {pillar.step}</span>
                <div className="pillar-icon" aria-hidden="true">
                  {pillarIcons[idx] || <SparklesIcon size={22} />}
                </div>
              </div>
              <h3>{pillar.name}</h3>
              <div className="pillar-subhead">{pillar.subtitle}</div>
              <p>{pillar.description}</p>
            </div>
          ))}
        </div>

        <div className="cetls-box">
          <div className="cetls-badge-row">
            <span className="badge">
              <ShieldCheckIcon size={14} />
              {data.cetlsHighlight.badge}
            </span>
          </div>
          <h3>{data.cetlsHighlight.title}</h3>
          <p>{data.cetlsHighlight.description}</p>
        </div>

        <div className="mindset-shift-container">
          <div className="mindset-col from">
            <span className="mindset-label">{data.mindsetShift.fromLabel}</span>
            <div className="mindset-quote">{data.mindsetShift.from}</div>
          </div>
          <div className="mindset-arrow" aria-hidden="true">
            <ArrowRightIcon size={24} />
          </div>
          <div className="mindset-col to">
            <span className="mindset-label">{data.mindsetShift.toLabel}</span>
            <div className="mindset-quote">{data.mindsetShift.to}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
