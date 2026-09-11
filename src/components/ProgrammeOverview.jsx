import React from 'react';

export default function ProgrammeOverview({ data }) {
  return (
    <section className="section" id={data.sectionId}>
      <div className="container">
        <div className="section-heading">
          <span className="kicker">{data.kicker}</span>
          <h2>{data.heading}</h2>
        </div>

        <div className="overview-copy-block">
          <p>{data.leadParagraph}</p>
          <p>{data.bodyParagraph}</p>
        </div>

        <div className="four-up-grid">
          {data.cards.map((card, idx) => (
            <div key={idx} className="overview-card">
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
