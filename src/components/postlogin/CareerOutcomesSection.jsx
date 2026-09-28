import React from 'react';
import {
  BriefcaseIcon,
  RocketIcon,
  CompassIcon,
  ShieldCheckIcon,
  GraduationCapIcon,
  AwardIcon,
  CheckCircleIcon,
} from '../Icons';

export default function CareerOutcomesSection({ data }) {
  const getPillarIcon = (badge) => {
    const b = (badge || '').toLowerCase();
    if (b.includes('specialist')) return <BriefcaseIcon size={20} />;
    if (b.includes('builder')) return <RocketIcon size={20} />;
    return <CompassIcon size={20} />;
  };

  return (
    <section className="section career-outcomes-section" id="careers">
      <div className="container">
        {/* Main Section Header */}
        <div className="section-heading">
          <span className="kicker">{data?.kicker || "Career Pathways & Outcomes"}</span>
          <h2>{data?.heading || "Career & Industry Outcomes"}</h2>
          <p>{data?.description}</p>

          {/* In-Section Hierarchy Navigation */}
          <div className="career-subnav-strip" aria-label="Career subsections">
            <a href="#career-pathways" className="career-subnav-chip">
              Career Pathways
            </a>
            <span className="career-subnav-divider" aria-hidden="true">→</span>
            <a href="#placement-outcomes" className="career-subnav-chip">
              Industry / Placement Outcomes
            </a>
            <span className="career-subnav-divider" aria-hidden="true">→</span>
            <a href="#alumni-outcomes" className="career-subnav-chip">
              Alumni Outcomes
            </a>
          </div>
        </div>

        {/* ============================================================
            SUBSECTION 1: CAREER PATHWAYS
            ============================================================ */}
        <div className="career-subsection" id="career-pathways">
          <div className="career-subsection-header">
            <span className="career-subsection-badge">01 • Career Pathways</span>
            <h3 className="career-subsection-title">Specialist, Builder & Research Trajectories</h3>
            <p className="career-subsection-desc">
              Three strategic engineering horizons developed across coursework, foundation tracks, and industry sprints.
            </p>
          </div>

          <div className="career-pathways-grid">
            {(data?.pathways || []).map((pathway, idx) => (
              <div key={idx} className="pathway-card">
                <div className="pathway-card-header">
                  <div className="pathway-icon-wrap" aria-hidden="true">
                    {getPillarIcon(pathway.badge)}
                  </div>
                  <span className="pathway-badge">{pathway.badge}</span>
                </div>

                <h3>{pathway.title}</h3>

                <ul className="pathway-roles-list">
                  {(pathway?.points || []).map((pt, pIdx) => (
                    <li key={pIdx}>
                      <span className="bullet-point" aria-hidden="true">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================
            SUBSECTION 2: INDUSTRY & PLACEMENT OUTCOMES
            ============================================================ */}
        <div className="career-subsection" id="placement-outcomes">
          <div className="career-subsection-header">
            <span className="career-subsection-badge">02 • Industry / Placement Outcomes</span>
            <h3 className="career-subsection-title">Institutional Placement Transparency</h3>
          </div>

          <div className="placement-transparency-card">
            <div className="transparency-icon" aria-hidden="true">
              <ShieldCheckIcon size={24} />
            </div>
            <div className="transparency-text">
              <h4>Placement Integrity & Reporting Standards</h4>
              <p>{data?.transparencyNote}</p>
            </div>
          </div>
        </div>

        {/* ============================================================
            SUBSECTION 3: ALUMNI OUTCOMES
            ============================================================ */}
        <div className="career-subsection alumni-subsection" id="alumni-outcomes">
          <div id="alumni-stories"></div>
          <div className="career-subsection-header">
            <span className="career-subsection-badge">03 • Alumni Outcomes</span>
            <div className="alumni-title-header-group">
              <h3 className="career-subsection-title">Alumni Outcomes</h3>
              <span className="alumni-cohort-badge-header">2021–23 Batch</span>
            </div>
            <p className="career-subsection-desc">
              Placement benchmarks, recorded outcome rates, and verified compensation metrics for the 2021–23 graduating cohort.
            </p>
          </div>

          <div className="alumni-outcomes-container">
            {/* Top 2 Statistics Cards */}
            <div className="alumni-stats-hero-grid dual-grid">
              <div className="alumni-stat-card card-theme-amber">
                <div className="stat-card-top-row">
                  <span className="stat-card-category-pill">Highest Package</span>
                  <div className="stat-icon-wrapper" aria-hidden="true">
                    <AwardIcon size={20} />
                  </div>
                </div>
                <div className="stat-card-main-data">
                  <span className="stat-card-number">₹22 LPA</span>
                  <span className="stat-card-name">Highest Package</span>
                </div>
                <div className="stat-card-bottom-line" aria-hidden="true"></div>
              </div>

              <div className="alumni-stat-card card-theme-indigo">
                <div className="stat-card-top-row">
                  <span className="stat-card-category-pill">Average Package</span>
                  <div className="stat-icon-wrapper" aria-hidden="true">
                    <RocketIcon size={20} />
                  </div>
                </div>
                <div className="stat-card-main-data">
                  <span className="stat-card-number">₹8.27 LPA</span>
                  <span className="stat-card-name">Average Package</span>
                </div>
                <div className="stat-card-bottom-line" aria-hidden="true"></div>
              </div>
            </div>

            {/* Lower Section: Alumni Career Journey Visual */}
            <div className="alumni-journey-card-container">
              <div className="journey-card-header">
                <div className="journey-header-left">
                  <span className="journey-kicker">Alumni Career Journey</span>
                  <h4 className="journey-headline">
                    <span className="journey-node">MSIT</span>
                    <span className="journey-arrow" aria-hidden="true">→</span>
                    <span className="journey-node">Internship</span>
                    <span className="journey-arrow" aria-hidden="true">→</span>
                    <span className="journey-node">Full-Time Opportunity</span>
                  </h4>
                </div>
                <div className="journey-header-right">
                  <span className="journey-batch-pill">2021–23 Batch</span>
                </div>
              </div>

              <div className="journey-stepped-pipeline">
                <div className="pipeline-stage-item stage-foundation">
                  <div className="stage-top-meta">
                    <span className="stage-step-badge">Stage 01</span>
                    <GraduationCapIcon size={18} />
                  </div>
                  <h5>MSIT Studio Pedagogy</h5>
                  <p>100% active studio computing, intensive team projects, and mentor-guided engineering practice with zero passive lectures.</p>
                  <div className="stage-footer-tag">Active Pedagogy</div>
                </div>

                <div className="pipeline-connector-block" aria-hidden="true">
                  <div className="connector-track">
                    <span className="connector-arrow">→</span>
                  </div>
                </div>

                <div className="pipeline-stage-item stage-practicum">
                  <div className="stage-top-meta">
                    <span className="stage-step-badge">Stage 02</span>
                    <BriefcaseIcon size={18} />
                  </div>
                  <h5>Industry Internship</h5>
                  <p>Hands-on corporate practicum embedded directly within leading engineering teams solving production problems.</p>
                  <div className="stage-footer-tag">Industry Practicum</div>
                </div>

                <div className="pipeline-connector-block" aria-hidden="true">
                  <div className="connector-track">
                    <span className="connector-arrow">→</span>
                  </div>
                </div>

                <div className="pipeline-stage-item stage-placement">
                  <div className="stage-top-meta">
                    <span className="stage-step-badge">Stage 03</span>
                    <CheckCircleIcon size={18} />
                  </div>
                  <h5>Full-Time Opportunity</h5>
                  <p>Structured transition and conversion into full-time technology roles, systems engineering, and product teams.</p>
                  <div className="stage-footer-tag">Career Launch</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

