import React, { useState } from 'react';
import { DownloadIcon, SparklesIcon, CalendarIcon, BuildingIcon, AwardIcon, ShieldCheckIcon, CpuIcon, BookOpenIcon, CheckCircleIcon } from './Icons';

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

      {/* Comprehensive 1-Page Quick Summary Modal (Print & PDF Optimized) */}
      {showSummaryModal && (
        <div className="modal-backdrop" onClick={() => setShowSummaryModal(false)}>
          <div className="modal-dialog modal-dialog-lg" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modalTitle">
            <div className="modal-header">
              <div className="modal-header-branding">
                <span className="kicker">IIIT Hyderabad · Official Academic Executive Summary</span>
                <h3 id="modalTitle">Master of Science in Information Technology (MSIT)</h3>
                <span className="modal-subtitle">January 2027 Cohort Overview & Admissions Guide</span>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setShowSummaryModal(false)}
                aria-label="Close summary modal"
              >
                ✕
              </button>
            </div>

            <div className="modal-body printable-summary-body">
              {/* 4-Quadrant Executive Summary Grid */}
              <div className="summary-quadrant-grid">
                {/* Quadrant 1: Institutional Credentials & Legacy */}
                <div className="summary-card">
                  <div className="summary-card-head">
                    <AwardIcon size={18} />
                    <h4>1. Institutional Credentials & Heritage</h4>
                  </div>
                  <ul className="summary-list compact">
                    <li><strong>Awarding Institution:</strong> International Institute of Information Technology, Hyderabad (IIIT-H).</li>
                    <li><strong>Founding Legacy:</strong> Conceived in 2001 by Turing Award laureate Prof. Raj Reddy; 25+ years of proven computing education.</li>
                    <li><strong>Research Anchor:</strong> Operates as a Living Laboratory for the Centre for Educational Technology & Learning Sciences (CETLS).</li>
                  </ul>
                </div>

                {/* Quadrant 2: Operational Cadence & Architecture */}
                <div className="summary-card">
                  <div className="summary-card-head">
                    <BuildingIcon size={18} />
                    <h4>2. Programme Structure & Cadence</h4>
                  </div>
                  <ul className="summary-list compact">
                    <li><strong>Next Cohort Intake:</strong> January 2027 (Full-Time On-Campus at Gachibowli, Hyderabad).</li>
                    <li><strong>Pedagogical Model:</strong> <em>Learn · Think · Do</em> (Cognitive studio practice; zero passive lecture halls).</li>
                    <li><strong>Industry Co-op:</strong> ~50% of the programme spent in corporate engineering tenure with active code reviews.</li>
                  </ul>
                </div>

                {/* Quadrant 3: Technical Curriculum Scope */}
                <div className="summary-card">
                  <div className="summary-card-head">
                    <CpuIcon size={18} />
                    <h4>3. Core Curriculum Domains</h4>
                  </div>
                  <ul className="summary-list compact">
                    <li><strong>Systems:</strong> Concurrency, cloud computing, distributed systems & software architecture.</li>
                    <li><strong>AI & Modern Data:</strong> Applied ML, neural systems, modern LLMs & generative agents.</li>
                    <li><strong>Applied Engineering:</strong> Automated testing, CI/CD, production reliability & code verification.</li>
                    <li><strong>Product & Venture:</strong> Product discovery, user validation & venture incubation.</li>
                  </ul>
                </div>

                {/* Quadrant 4: Eligibility & Financial Support */}
                <div className="summary-card">
                  <div className="summary-card-head">
                    <ShieldCheckIcon size={18} />
                    <h4>4. Eligibility & Financial Avenues</h4>
                  </div>
                  <ul className="summary-list compact">
                    <li><strong>Degree Criteria:</strong> B.Tech/B.E. (all branches), MCA, M.Sc (CS/IT/Math). Final-year students eligible provisionally.</li>
                    <li><strong>Target Profiles:</strong> Fresh graduates seeking rapid industry readiness + early-career engineers seeking leadership.</li>
                    <li><strong>Education Loans:</strong> Pre-approved loan avenues available through major nationalized and private banks for IIIT-H.</li>
                  </ul>
                </div>
              </div>

              {/* Official Verification & Contact Strip */}
              <div className="summary-official-footer">
                <div className="summary-contact-col">
                  <strong>Admissions Office:</strong> MSIT Division, IIIT Hyderabad, Gachibowli, Hyderabad - 500 032
                </div>
                <div className="summary-contact-col text-right">
                  <strong>Email:</strong> <a href="mailto:query@msit.ac.in">query@msit.ac.in</a> | <strong>Web:</strong> <a href="https://www.msit.ac.in" target="_blank" rel="noopener noreferrer">www.msit.ac.in</a>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => window.print()}>
                <DownloadIcon size={16} />
                Print / Save PDF
              </button>
              <a href="#apply" className="btn btn-primary" onClick={() => setShowSummaryModal(false)}>
                Register for January 2027 Updates
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
