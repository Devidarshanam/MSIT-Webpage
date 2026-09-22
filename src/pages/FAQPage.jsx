import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowRightIcon, 
  CheckCircleIcon, 
  BookOpenIcon, 
  ClockIcon, 
  UsersIcon, 
  SearchIcon, 
  HelpCircleIcon 
} from '../components/Icons';
import msitData from '../data/msitData.json';

const QUICK_TAGS = [
  { label: 'All (13)', query: '' },
  { label: 'Non-CS Branch', query: 'non-CS' },
  { label: 'Mentorship', query: 'mentor' },
  { label: 'Assessments', query: 'assessment' },
  { label: 'Attendance', query: 'attendance' },
  { label: 'Hardware / Laptop', query: 'laptop' },
  { label: 'Alumni Network', query: 'alumni' },
];

export default function FAQPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allQuestions = msitData?.faq?.questions || [];

  const filteredQuestions = allQuestions.filter((item) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      item.question.toLowerCase().includes(query) ||
      item.answer.toLowerCase().includes(query)
    );
  });

  const handleBack = () => {
    navigate('/programme#documents-faq');
    setTimeout(() => {
      const el = document.getElementById('documents-faq');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const handleTagClick = (tagQuery) => {
    setActiveTag(tagQuery);
    setSearchQuery(tagQuery);
    setOpenIndex(0);
  };

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="faq-page-wrapper">
      {/* 1. Sticky Navigation Header */}
      <header className="faq-page-header">
        <div className="container faq-header-container">
          <div className="faq-nav-left">
            <button
              type="button"
              className="faq-back-btn"
              onClick={handleBack}
              aria-label="Back to Programme"
            >
              <span className="back-arrow">←</span>
              <span>Back to Programme</span>
            </button>

            <nav className="faq-breadcrumbs" aria-label="Breadcrumb">
              <Link to="/programme" className="crumb-link">Programme</Link>
              <span className="crumb-sep">/</span>
              <span className="crumb-link" onClick={handleBack} style={{ cursor: 'pointer' }}>Documents & FAQ</span>
              <span className="crumb-sep">/</span>
              <span className="crumb-current">All FAQs</span>
            </nav>
          </div>

          <div className="faq-nav-right">
            <span className="faq-count-pill">
              <CheckCircleIcon size={14} />
              <span>{allQuestions.length} Verified Questions</span>
            </span>
          </div>
        </div>
      </header>

      {/* 2. Hero Header with Search */}
      <section className="faq-hero-section">
        <div className="container faq-hero-container">
          <div className="faq-hero-badge">
            <HelpCircleIcon size={16} />
            <span>Prospective Student Q&A</span>
          </div>

          <h1 className="faq-hero-title">Frequently Asked Questions</h1>
          <p className="faq-hero-subtitle">
            Direct, practical answers to general doubts and queries prospective students have before deciding to apply to MSIT.
          </p>

          {/* Search Box */}
          <div className="faq-search-wrapper">
            <div className="faq-search-input-box">
              <SearchIcon size={20} className="faq-search-icon" />
              <input
                type="text"
                className="faq-search-input"
                placeholder="Search by keyword (e.g. non-CS, mentor, assessment, attendance, laptop, degrees)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setActiveTag('');
                  setOpenIndex(0);
                }}
                aria-label="Search FAQs"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="faq-search-clear-btn"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveTag('');
                  }}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Topic Chips */}
            <div className="faq-quick-tags">
              <span className="quick-tag-label">Popular topics:</span>
              {QUICK_TAGS.map((tag, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`faq-quick-chip ${activeTag === tag.query && (!tag.query ? !searchQuery : true) ? 'active' : ''}`}
                  onClick={() => handleTagClick(tag.query)}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Accordion Section */}
      <main className="faq-main-content">
        <div className="container faq-body-container">
          
          {/* Results Counter / Filter Status */}
          <div className="faq-results-bar">
            <span>
              Showing <strong>{filteredQuestions.length}</strong> of {allQuestions.length} FAQs
              {searchQuery && (
                <span className="faq-query-indicator"> matching &ldquo;{searchQuery}&rdquo;</span>
              )}
            </span>
            {searchQuery && (
              <button
                type="button"
                className="faq-reset-filter-btn"
                onClick={() => {
                  setSearchQuery('');
                  setActiveTag('');
                }}
              >
                Reset Search
              </button>
            )}
          </div>

          {/* Accordion List */}
          {filteredQuestions.length > 0 ? (
            <div className="faq-dedicated-accordion">
              {filteredQuestions.map((item, idx) => {
                const isOpen = openIndex === idx;
                const panelId = `faq-full-panel-${idx}`;
                const triggerId = `faq-full-trigger-${idx}`;
                const questionNumber = String(idx + 1).padStart(2, '0');

                return (
                  <div 
                    key={item.id || idx} 
                    className={`faq-dedicated-item ${isOpen ? 'open' : ''}`}
                  >
                    <button
                      id={triggerId}
                      className="faq-dedicated-trigger"
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleAccordion(idx)}
                    >
                      <div className="faq-trigger-left">
                        <span className="faq-item-number">{questionNumber}</span>
                        <span className="faq-item-question">{item.question}</span>
                      </div>
                      <span className="faq-toggle-icon" aria-hidden="true">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>

                    <div
                      id={panelId}
                      className="faq-dedicated-panel"
                      role="region"
                      aria-labelledby={triggerId}
                    >
                      <div className="faq-panel-content">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="faq-no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No matching questions found</h3>
              <p>We couldn&apos;t find any FAQs matching &ldquo;{searchQuery}&rdquo;.</p>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setSearchQuery('');
                  setActiveTag('');
                }}
              >
                Clear Search & View All 13 FAQs
              </button>
            </div>
          )}

          {/* 4. Still Have Questions? Help & Contact Card */}
          <div className="faq-help-card">
            <div className="faq-help-info">
              <div className="help-icon-circle">
                <UsersIcon size={24} />
              </div>
              <div>
                <h4>Still have a question not covered here?</h4>
                <p>
                  Reach out directly to the MSIT Admissions Helpdesk or connect with current students and alumni on LinkedIn.
                </p>
              </div>
            </div>
            <div className="faq-help-actions">
              <a
                href="mailto:admissions@msit.ac.in"
                className="btn btn-secondary faq-contact-btn"
              >
                Email Admissions Desk
              </a>
              <button
                type="button"
                className="btn btn-primary faq-return-btn"
                onClick={handleBack}
              >
                <span>Return to Programme</span>
                <ArrowRightIcon size={16} />
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
