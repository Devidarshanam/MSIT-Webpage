import React from 'react';

export default function MSITExperience({ data }) {
  return (
    <section className="section section-alt" id={data.sectionId}>
      <div className="container">
        <div className="section-heading">
          <span className="kicker">{data.kicker}</span>
          <h2>{data.heading}</h2>
          <p>{data.description}</p>
        </div>

        <div className="timeline-track">
          {data.steps.map((step, idx) => (
            <div key={idx} className="timeline-step-card">
              <div className="step-circle">{step.step}</div>
              <span className="step-phase">{step.phase}</span>
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
