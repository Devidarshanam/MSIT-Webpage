import React from 'react';

export default function CareerOutcomes({ data }) {
  return (
    <section className="section section-alt" id={data.sectionId}>
      <div className="container">
        <div className="section-heading">
          <span className="kicker">{data.kicker}</span>
          <h2>{data.heading}</h2>
          <p>{data.description}</p>
        </div>

        <div className="career-pillars-grid">
          {data.pillars.map((pillar, idx) => (
            <div key={idx} className="career-pillar-card">
              <span className="career-badge">{pillar.badge}</span>
              <h3>{pillar.title}</h3>
              <ul className="career-points-list">
                {pillar.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="integrity-disclaimer">
          <strong>Note on Placement Transparency:</strong> {data.integrityNote}
        </div>
      </div>
    </section>
  );
}
