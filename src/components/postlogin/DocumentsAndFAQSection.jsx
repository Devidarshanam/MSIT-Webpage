import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DownloadIcon, BookOpenIcon, ClockIcon, CheckCircleIcon, ArrowRightIcon, HelpCircleIcon } from '../Icons';

export default function DocumentsAndFAQSection({ documentsData, faqData, onOpenSummaryModal }) {
  const navigate = useNavigate();

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

        {/* 2. FAQ Gateway Card (Replaces heavy in-page accordion) */}
        <div className="faq-gateway-card">
          <div className="faq-gateway-content">
            <div className="faq-gateway-badge">
              <HelpCircleIcon size={16} />
              <span>Prospective Student Q&A</span>
            </div>
            <h3>Frequently Asked Questions</h3>
            <p>
              Curious about life and learning at MSIT? We have compiled direct, practical answers to help guide your journey — covering non-CS branch transition, daily mentorship in studios, assessments and scoring criteria, laptop requirements, and connecting with alumni.
            </p>
            <div className="faq-gateway-tags">
              <span className="faq-tag-chip">Non-CS Background</span>
              <span className="faq-tag-chip">Daily Mentorship</span>
              <span className="faq-tag-chip">Assessments & Pass Criteria</span>
              <span className="faq-tag-chip">Studio vs Lectures</span>
              <span className="faq-tag-chip">Alumni & LinkedIn</span>
              <span className="faq-tag-chip">Degree Recognition</span>
            </div>
          </div>
          <div className="faq-gateway-action-col">
            <button
              type="button"
              className="btn btn-primary faq-explore-cta-btn"
              onClick={() => navigate('/faq')}
              id="view-faqs-page-btn"
            >
              <span>Explore All FAQs</span>
              <ArrowRightIcon size={18} />
            </button>
            <span className="faq-gateway-hint">Opens dedicated FAQ page with instant search</span>
          </div>
        </div>
      </div>
    </section>
  );
}
