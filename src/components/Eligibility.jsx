import React from 'react';

export default function Eligibility({ data }) {
  return (
    <section className="section section-alt" id={data.sectionId}>
      <div className="container">
        <div className="section-heading">
          <span className="kicker">{data.kicker}</span>
          <h2>{data.heading}</h2>
          <p>{data.description}</p>
        </div>

        <div className="eligibility-grid">
          {data.criteriaCards.map((card, idx) => (
            <div key={idx} className="eligibility-card">
              <div className="eligibility-card-header">
                <h3>{card.title}</h3>
                <span className="status-badge-tba">{card.status}</span>
              </div>
              <p>{card.description}</p>
            </div>
          ))}
        </div>

        <div className="note-box">
          {data.note}
        </div>

        <div className="eligibility-action">
          <a href="#apply" className="btn btn-primary">
            Register for Eligibility Updates
          </a>
        </div>
      </div>
    </section>
  );
}
