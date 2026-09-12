import React, { useState } from 'react';
import { DownloadIcon, SparklesIcon, CalendarIcon, BuildingIcon, CheckCircleIcon } from './Icons';

export default function Hero({ data }) {
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  return (
    <section className="hero" id="hero">
      <div className="hero-grid-bg" aria-hidden="true"></div>
      <div className="container hero-inner">
        <div className="hero-copy">
          <div className="hero-badge-row">
            <span className="badge">
              <SparklesIcon size={14} className="badge-icon" />
              {data.badge}
            </span>
            <span className="hero-intake-badge">
              <CalendarIcon size={14} />
              Cohort Starts Jan 2027
            </span>
          </div>

          <h1>{data.title}</h1>
          <h2>{data.subtitle}</h2>
          
          <p className="hero-tagline">{data.tagline}</p>
          <p className="hero-subtagline">{data.subTagline}</p>

          <div className="hero-meta-chips">
            <span className="meta-chip">
              <BuildingIcon size={14} />
              {data.institution}
            </span>
            <span className="meta-chip">
              <CalendarIcon size={14} />
              {data.nextCohort}
            </span>
            <span className="meta-chip">
              <SparklesIcon size={14} />
              {data.orientation}
            </span>
          </div>

          <div className="status-callout">
            <span className="status-dot"></span>
            <span>{data.statusLabel}:</span>
            <strong>{data.statusValue}</strong>
          </div>

          <div className="cta-group">
            <a href={data.primaryCta.href} className="btn btn-primary">
              {data.primaryCta.label}
            </a>
            <a href={data.secondaryCta.href} className="btn btn-secondary">
              {data.secondaryCta.label}
            </a>
            <button
              type="button"
              className="btn btn-outline-ghost"
              onClick={() => setShowSummaryModal(true)}
              aria-label="View 1-Page Summary"
            >
              <DownloadIcon size={16} />
              1-Page Summary
            </button>
          </div>

          <div className="hero-quick-links">
            {data.quickLinks.map((ql, idx) => (
              <React.Fragment key={idx}>
                <a href={ql.href}>{ql.label}</a>
                {idx < data.quickLinks.length - 1 && <span className="sep">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="hero-panel-wrap">
          <div className="hero-snapshot-card" aria-label="Programme highlights">
            <div className="snapshot-campus-media">
              <img
                src="/assets/iiit-campus.jpg"
                alt="IIIT Hyderabad Campus - Nilgiri Academic Block"
                className="snapshot-campus-img"
                width="400"
                height="180"
                loading="eager"
              />
              <span className="snapshot-campus-badge">IIIT Hyderabad Campus</span>
            </div>
            <p className="snapshot-eyebrow">{data.snapshot.eyebrow}</p>
            <div className="snapshot-stat-grid">
              {data.snapshot.stats.map((stat, idx) => (
                <div key={idx} className="snapshot-stat-box">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>

            {data.snapshot.rows.map((row, idx) => (
              <div key={idx} className="snapshot-row">
                <span>{row.label}</span>
                <strong>{row.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 1-Page Quick Summary Modal */}
      {showSummaryModal && (
        <div className="modal-backdrop" onClick={() => setShowSummaryModal(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modalTitle">
            <div className="modal-header">
              <div>
                <span className="kicker">IIIT Hyderabad · Academic Overview</span>
                <h3 id="modalTitle">MSIT — Programme Summary at a Glance</h3>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setShowSummaryModal(false)}
                aria-label="Close summary modal"
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="summary-quick-card">
                <h4>Core Programme Architecture</h4>
                <ul className="summary-list">
                  <li><strong>Degree:</strong> Master of Science in Information Technology (MSIT) awarded by IIIT Hyderabad</li>
                  <li><strong>Next Cohort:</strong> January 2027 (Full-Time On-Campus)</li>
                  <li><strong>Learning Philosophy:</strong> Learn · Think · Do (Active cognitive studio practice, zero rote lecture models)</li>
                  <li><strong>Industry Co-op:</strong> Demonstrable ~50% immersion in corporate software engineering environments</li>
                  <li><strong>Living Lab:</strong> Continual pedagogical analysis by Centre for Educational Technology & Learning Sciences (CETLS)</li>
                </ul>
              </div>

              <div className="summary-quick-card">
                <h4>Admissions & Eligibility Preview</h4>
                <p>Applications for the January 2027 intake will open in late 2026. Recognised undergraduate degree required (formal credit counts and cutoffs will be published in the official prospectus).</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => window.print()}>
                Print / Save PDF
              </button>
              <a href="#apply" className="btn btn-primary" onClick={() => setShowSummaryModal(false)}>
                Register for Cohort Updates
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
