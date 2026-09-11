import React from 'react';

export default function Curriculum({ data }) {
  return (
    <section className="section" id={data.sectionId}>
      <div className="container">
        <div className="section-heading">
          <span className="kicker">{data.kicker}</span>
          <h2>{data.heading}</h2>
          <p>{data.description}</p>
        </div>

        <div className="curriculum-grid">
          {data.categories.map((cat, idx) => (
            <div key={idx} className="curriculum-category-card">
              <div className="category-header">
                <div className="category-icon" aria-hidden="true">
                  {cat.icon}
                </div>
                <h3>{cat.category}</h3>
              </div>
              <ul className="curriculum-list">
                {cat.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="highlight-banner">
          <h3>{data.criticalJudgementBox.title}</h3>
          <p>{data.criticalJudgementBox.text}</p>
        </div>

        <div className="note-box">
          {data.note}
        </div>
      </div>
    </section>
  );
}
