import React from 'react';

export default function Admissions({ data }) {
  return (
    <section className="section" id={data.sectionId}>
      <div className="container">
        <div className="section-heading">
          <span className="kicker">{data.kicker}</span>
          <h2>{data.heading}</h2>
          <p>{data.description}</p>
        </div>

        <div className="admissions-steps-grid">
          {data.steps.map((step, idx) => (
            <div key={idx} className="admission-card">
              <span className="admission-step-num">{step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>

        <div className="note-box">
          {data.note}
        </div>
      </div>
    </section>
  );
}
