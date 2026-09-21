import React from 'react';
import {
  BriefcaseIcon,
  RocketIcon,
  CompassIcon,
  ShieldCheckIcon,
  GraduationCapIcon,
  LinkedinIcon,
  ExternalLinkIcon,
  UsersIcon,
} from '../Icons';

export default function CareerOutcomesSection({ data }) {
  const getPillarIcon = (badge) => {
    const b = (badge || '').toLowerCase();
    if (b.includes('specialist')) return <BriefcaseIcon size={20} />;
    if (b.includes('builder')) return <RocketIcon size={20} />;
    return <CompassIcon size={20} />;
  };

  const alumni = data?.alumni;
  const profiles = alumni?.profiles || [];

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
            <a href="#alumni-stories" className="career-subnav-chip">
              Alumni Stories
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
            SUBSECTION 3: ALUMNI STORIES & NETWORK
            ============================================================ */}
        <div className="career-subsection alumni-subsection" id="alumni-stories">
          <div className="career-subsection-header">
            <span className="career-subsection-badge">03 • Alumni Stories</span>
            <h3 className="career-subsection-title">{alumni?.heading || "Alumni Network & Stories"}</h3>
            <p className="career-subsection-desc">
              {alumni?.description || "A distinguished community of over 3,000+ MSIT graduates leading technology, AI engineering, and venture teams worldwide."}
            </p>
          </div>

          {/* Conditional Rendering: Real Profiles or Clean Pending State */}
          {profiles.length > 0 ? (
            <div className="alumni-stories-grid">
              {profiles.map((profile, idx) => (
                <div key={idx} className="alumni-story-card">
                  <div className="alumni-card-header">
                    {profile.avatarUrl ? (
                      <img
                        src={profile.avatarUrl}
                        alt={profile.name}
                        className="alumni-avatar-img"
                        loading="lazy"
                      />
                    ) : (
                      <div className="alumni-avatar-initial" aria-hidden="true">
                        {profile.name ? profile.name.charAt(0).toUpperCase() : 'A'}
                      </div>
                    )}
                    <div className="alumni-header-details">
                      <h4 className="alumni-name">{profile.name}</h4>
                      <p className="alumni-role-company">
                        {profile.role} • <strong>{profile.organization}</strong>
                      </p>
                      {profile.cohort && (
                        <span className="alumni-cohort-badge">Cohort of {profile.cohort}</span>
                      )}
                    </div>
                  </div>

                  {profile.journey && (
                    <p className="alumni-journey-text">{profile.journey}</p>
                  )}

                  {profile.quote && (
                    <blockquote className="alumni-quote-box">
                      <p>"{profile.quote}"</p>
                    </blockquote>
                  )}

                  {profile.linkedinUrl && (
                    <div className="alumni-card-footer">
                      <a
                        href={profile.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="alumni-linkedin-btn"
                        aria-label={`View ${profile.name}'s official LinkedIn profile`}
                      >
                        <LinkedinIcon size={16} />
                        <span>Official Profile</span>
                        <ExternalLinkIcon size={13} />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* Clean, Factual Pending State — No Placeholder or Fake Data */
            <div className="alumni-empty-state-card">
              <div className="alumni-empty-icon-box" aria-hidden="true">
                <GraduationCapIcon size={30} />
              </div>
              <span className="alumni-empty-badge">
                {alumni?.updateNotice?.badge || "Official Compilation in Progress"}
              </span>
              <h4 className="alumni-empty-title">
                {alumni?.updateNotice?.title || "Alumni information will be updated soon"}
              </h4>
              <p className="alumni-empty-message">
                {alumni?.updateNotice?.message || "Official alumni career profiles, cohort journey highlights, and verified testimonials for the upcoming admissions cycle are currently being compiled with institutional verification and candidate consent."}
              </p>

              {alumni?.networkHighlights && (
                <div className="alumni-network-highlights-grid">
                  {alumni.networkHighlights.map((hl, hIdx) => (
                    <div key={hIdx} className="alumni-highlight-pill">
                      <div className="highlight-pill-icon" aria-hidden="true">
                        <UsersIcon size={16} />
                      </div>
                      <div className="highlight-pill-text">
                        <span className="highlight-pill-label">{hl.label}</span>
                        <span className="highlight-pill-detail">{hl.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
