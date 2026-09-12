import React from 'react';
import { AwardIcon, getSmartIcon } from './Icons';

export default function ProgrammeOverview({ data }) {
  return (
    <section className="section" id={data.sectionId}>
      <div className="container">
        <div className="section-heading">
          <span className="kicker">{data.kicker}</span>
          <h2>{data.heading}</h2>
        </div>

        {/* Distinguished Turing Award Laureate Quote / Legacy Banner */}
        <div className="legacy-prestige-card">
          <div className="legacy-seal" aria-hidden="true">
            <AwardIcon size={32} />
          </div>
          <div className="legacy-content">
            <blockquote className="legacy-quote">
              “MSIT was founded to pioneer practical post-graduate computing education that bridges academic depth with real-world execution.”
            </blockquote>
            <cite className="legacy-author">
              <strong>Conceived by Prof. Raj Reddy</strong> · Turing Award Laureate & Co-Founder of MSIT
            </cite>
          </div>
        </div>

        <div className="overview-copy-block">
          <p>{data.leadParagraph}</p>
          <p>{data.bodyParagraph}</p>
        </div>

        <div className="four-up-grid">
          {data.cards.map((card, idx) => (
            <div key={idx} className="overview-card">
              <div className="overview-card-icon" aria-hidden="true">
                {getSmartIcon(card.label, 20)}
              </div>
              <span className="overview-card-label">{card.label}</span>
              <strong>{card.value}</strong>
            </div>
          ))}
        </div>

        <div className="highlight-banner">
          <h3>{data.highlight.title}</h3>
          <p>{data.highlight.text}</p>
        </div>
      </div>
    </section>
  );
}
