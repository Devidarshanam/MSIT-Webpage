import React from 'react';

export default function WhoShouldApply({ data }) {
  return (
    <section className="section" id={data.sectionId}>
      <div className="container who-should-container">
        <div className="section-heading">
          <span className="kicker">{data.kicker}</span>
          <h2>{data.heading}</h2>
          <p>{data.description}</p>
        </div>

        <div className="self-assessment-card">
          <div className="checklist-items">
            {data.checklist.map((item, idx) => (
              <div key={idx} className="check-item">
                <div className="check-icon" aria-hidden="true">✓</div>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="assessment-conclusion">
            {data.conclusion}
          </div>
        </div>
      </div>
    </section>
  );
}
