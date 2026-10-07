import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon, HelpCircleIcon } from '../Icons';

export default function DocumentsAndFAQSection({ documentsData, faqData, onOpenSummaryModal }) {
  const navigate = useNavigate();

  return (
    <section className="section documents-faq-section" id="documents-faq">
      <div className="container">
        {/* FAQ Gateway Card */}
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
