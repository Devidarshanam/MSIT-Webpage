import React from 'react';

export default function WhyChooseMSIT({ data }) {
  return (
    <section className="section section-alt" id={data.sectionId}>
      <div className="container">
        <div className="section-heading">
          <span className="kicker">{data.kicker}</span>
          <h2>{data.heading}</h2>
          <p>{data.description}</p>
        </div>

        <div className="cards-six-grid">
          {data.cards.map((card, idx) => (
            <div key={idx} className="benefit-card">
              <div className="benefit-card-header">
                <div className="benefit-icon" aria-hidden="true">
                  {card.icon}
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
