import React from 'react';
import { getSmartIcon, AwardIcon } from './Icons';

export default function WhyChooseMSIT({ data }) {
  return (
    <section className="section section-alt" id={data.sectionId}>
      <div className="container">
        <div className="section-heading">
          <span className="kicker">{data.kicker}</span>
          <h2>{data.heading}</h2>
          <p>{data.description}</p>
        </div>

        {/* Founding Legacy Banner (Prof. Raj Reddy) */}
        {data.legacyQuote && (
          <div className="legacy-prestige-card">
            <div className="legacy-seal" aria-hidden="true">
              <AwardIcon size={28} />
            </div>
            <div className="legacy-content">
              <blockquote className="legacy-quote">
                {data.legacyQuote.quote}
              </blockquote>
              <cite className="legacy-author">
                <strong>{data.legacyQuote.author}</strong> · {data.legacyQuote.title}
              </cite>
            </div>
          </div>
        )}

        {/* 4 Core Pillars Grid */}
        <div className="four-pillars-grid">
          {data.cards.map((card, idx) => (
            <div key={idx} className="benefit-card">
              <div className="benefit-card-header">
                <div className="benefit-icon" aria-hidden="true">
                  {getSmartIcon(card.icon || card.title, 20)}
                </div>
                <h3>{card.title}</h3>
              </div>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
