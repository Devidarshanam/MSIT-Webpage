import React, { useState } from 'react';

function renderFaqAnswer(answer) {
  if (!answer) return null;
  const targetText = 'MSIT Student Laptop Specification 2027';
  if (answer.includes(targetText)) {
    const cleaned = answer.replace(/\*\*MSIT Student Laptop Specification 2027\*\*/g, targetText);
    const parts = cleaned.split(targetText);
    return (
      <>
        {parts[0]}
        <a
          href="/documents/MSIT_Student_Laptop_Specification_2027_updated.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="faq-pdf-link"
          style={{ fontWeight: 600, color: '#0284c7', textDecoration: 'underline' }}
        >
          {targetText}
        </a>
        {parts.slice(1).join(targetText)}
      </>
    );
  }
  return answer;
}

export default function FAQ({ data }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(0);

  const hasCategories = Boolean(data?.categories && data.categories.length > 1);
  const filteredQuestions = (!hasCategories || activeCategory === 'All')
    ? (data?.questions || [])
    : (data?.questions || []).filter(q => q.category === activeCategory);

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

        {hasCategories && (
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
        )}

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
                  <p>{renderFaqAnswer(item.answer)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
