import React from 'react';

export default function ProgrammeAtGlance({ data }) {
  return (
    <section className="section section-alt" id={data.sectionId}>
      <div className="container">
        <div className="section-heading">
          <span className="kicker">{data.kicker}</span>
          <h2>{data.heading}</h2>
          <p>{data.description}</p>
        </div>

        <div className="glance-grid">
          {data.items.map((item, idx) => (
            <div key={idx} className="glance-card">
              <span className="glance-label">{item.label}</span>
              <span className="glance-val">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
