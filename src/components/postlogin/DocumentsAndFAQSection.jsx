import React, { useState } from 'react';
import { DownloadIcon, BookOpenIcon, ClockIcon, CheckCircleIcon, ArrowRightIcon } from '../Icons';

export default function DocumentsAndFAQSection({ documentsData, faqData, onOpenSummaryModal }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(0);

  const filteredQuestions = activeCategory === 'All'
    ? faqData.questions
    : faqData.questions.filter(q => q.category === activeCategory);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="section documents-faq-section" id="documents-faq">
      <div className="container">
        <div className="section-heading">
          <span className="kicker">{documentsData.kicker}</span>
          <h2>{documentsData.heading}</h2>
          <p>{documentsData.description}</p>
        </div>

        {/* 1. Official Documents Repository */}
        <div className="documents-repository-grid">
          {(documentsData?.resources || []).map((res, idx) => (
            <div key={idx} className="document-resource-card">
              <div className="doc-card-top">
                <span className="doc-type-badge">{res.type}</span>
                <span className={`doc-status-pill ${res.action === 'view-summary' ? 'available' : 'pending'}`}>
                  {res.status}
                </span>
              </div>

              <h4>{res.title}</h4>
              <p>{res.desc}</p>

              <div className="doc-card-action">
                {res.action === 'view-summary' ? (
                  <button
                    type="button"
                    className="btn btn-secondary doc-action-btn"
                    onClick={onOpenSummaryModal}
                  >
                    <BookOpenIcon size={16} />
                    <span>View Academic Summary</span>
                  </button>
                ) : (
                  <span className="doc-pending-text">
                    <ClockIcon size={14} />
                    <span>Releasing with official circular</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 2. Categorized FAQ Accordion */}
        <div className="faq-wrapper-card">
          <div className="faq-inner-header">
            <h3>Frequently Asked Questions</h3>
            <p>Direct, verified answers to common questions about MSIT, pedagogy, admissions, and financial support.</p>
          </div>

          {/* Category Filter Chips */}
          <div className="faq-filter-chips" role="tablist" aria-label="FAQ categories">
            {(faqData?.categories || []).map((cat, idx) => (
              <button
                key={idx}
                type="button"
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

          {/* Collapsible Accordion List */}
          <div className="accordion-list">
            {(filteredQuestions || []).map((item, idx) => {
              const isOpen = openIndex === idx;
              const panelId = `postlogin-faq-panel-${idx}`;
              const triggerId = `postlogin-faq-trigger-${idx}`;

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
                    <span className="accordion-icon" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
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
      </div>
    </section>
  );
}
