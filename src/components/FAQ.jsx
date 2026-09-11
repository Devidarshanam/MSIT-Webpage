import React, { useState } from 'react';

export default function FAQ({ data }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(0);

  const filteredQuestions = activeCategory === 'All'
    ? data.questions
    : data.questions.filter(q => q.category === activeCategory);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="section section-alt" id={data.sectionId}>
      <div className="container faq-container">
        <div className="section-heading">
          <span className="kicker">{data.kicker}</span>
          <h2>{data.heading}</h2>
          <p>{data.description}</p>
        </div>

        <div className="faq-filter-chips" role="tablist" aria-label="FAQ categories">
          {data.categories.map((cat, idx) => (
            <button
              key={idx}
              className={`faq-chip ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(0);
              }}
              role="tab"
              aria-selected={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="accordion-list">
          {filteredQuestions.map((item, idx) => {
            const isOpen = openIndex === idx;
            const panelId = `faq-panel-${idx}`;
            const triggerId = `faq-trigger-${idx}`;

            return (
              <div key={idx} className={`accordion-item ${isOpen ? 'open' : ''}`}>
                <button
                  id={triggerId}
                  className="accordion-trigger"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleAccordion(idx)}
                >
                  <span>{item.question}</span>
                  <span className="accordion-icon" aria-hidden="true">+</span>
                </button>
                <div
                  id={panelId}
                  className="accordion-panel"
                  role="region"
                  aria-labelledby={triggerId}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
