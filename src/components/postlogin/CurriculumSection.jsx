import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CpuIcon, 
  TerminalIcon, 
  SparklesIcon, 
  TargetIcon, 
  BuildingIcon, 
  BookOpenIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '../Icons';

export default function CurriculumSection({ data }) {
  const [expandedPrinciple, setExpandedPrinciple] = useState(null);
  const navigate = useNavigate();

  // Map icons to respective pillar index
  const getPillarIcon = (idx) => {
    switch (idx) {
      case 0:
        return <BookOpenIcon size={24} />;
      case 1:
        return <CpuIcon size={24} />;
      case 2:
      default:
        return <BriefcaseIcon size={24} />;
    }
  };

  const getPillarSlug = (principle, idx) => {
    if (principle.slug) return principle.slug;
    if (idx === 0) return 'learning-to-learn';
    if (idx === 1) return 'learning-to-think';
    return 'learning-to-do';
  };

  return (
    <section className="section curriculum-section" id="curriculum">
      <div className="container">
        <div className="section-heading">
          <span className="kicker">{data.kicker}</span>
          <h2>{data.heading}</h2>
          <p>{data.description}</p>
        </div>

        {/* 1. The Three Core Principles with Rich Interactive Expandable Details */}
        <div className="principles-row">
          {(data?.principles || []).map((principle, idx) => {
            const isExpanded = expandedPrinciple === idx;
            const slug = getPillarSlug(principle, idx);
            const targetPath = principle.path || `/curriculum/${slug}`;

            return (
              <div 
                key={idx} 
                className={`principle-card principle-card-pillar-${idx + 1} ${isExpanded ? 'is-expanded' : ''}`}
              >
                <div className="principle-top-row">
                  <div className="principle-icon-badge">
                    {getPillarIcon(idx)}
                  </div>
                  <div className="principle-number">0{idx + 1}</div>
                </div>

                <h3 className="principle-title">{principle.title}</h3>
                {principle.tagline && (
                  <p className="principle-tagline">{principle.tagline}</p>
                )}
                <p className="principle-main-desc">{principle.desc}</p>

                {/* Primary Action Buttons: Expand Details + Direct Dedicated Page Link */}
                <div className="principle-card-actions">
                  <button
                    type="button"
                    className="principle-toggle-btn"
                    onClick={() => setExpandedPrinciple(isExpanded ? null : idx)}
                    aria-expanded={isExpanded}
                    aria-label={`${isExpanded ? 'Collapse' : 'Expand'} details for ${principle.title}`}
                  >
                    <span>{isExpanded ? 'Collapse Details' : 'Expand Details'}</span>
                    <span className="toggle-arrow">{isExpanded ? '▴' : '▾'}</span>
                  </button>

                  <button
                    type="button"
                    className="principle-deep-dive-link"
                    onClick={() => navigate(targetPath)}
                    aria-label={`Open full guide for ${principle.title}`}
                  >
                    <span>Full Detailed Page</span>
                    <ArrowRightIcon size={14} />
                  </button>
                </div>

                {/* Rich Progressive Disclosure Drawer */}
                {isExpanded && (
                  <div className="principle-drawer-content">
                    <div className="principle-drawer-block">
                      <strong className="drawer-label">Core Meaning & Approach</strong>
                      <p>{principle.meaning}</p>
                    </div>

                    <div className="principle-drawer-block">
                      <strong className="drawer-label">Why It Matters in Industry</strong>
                      <p>{principle.whyItMatters}</p>
                    </div>

                    {principle.studioPractice && (
                      <div className="principle-drawer-block practice-block">
                        <strong className="drawer-label">Daily Studio Practice at IIIT Hyderabad</strong>
                        <p>{principle.studioPractice}</p>
                      </div>
                    )}

                    {principle.competencies && principle.competencies.length > 0 && (
                      <div className="principle-drawer-block competencies-block">
                        <strong className="drawer-label">Verified Competencies Developed</strong>
                        <ul className="drawer-competencies-list">
                          {principle.competencies.map((comp, cIdx) => (
                            <li key={cIdx}>
                              <span className="bullet-check">✓</span>
                              <span>{comp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="principle-drawer-block example-block">
                      <strong className="drawer-label">Real-World Engineering Example</strong>
                      <p>{principle.example}</p>
                    </div>

                    {/* Dedicated Page Callout Bar */}
                    <div className="principle-drawer-cta-banner">
                      <div className="drawer-cta-text">
                        <strong>Want the complete pedagogical deep dive?</strong>
                        <span>Read research foundations, a day in the studio, and evaluation rubrics.</span>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary drawer-open-page-btn"
                        onClick={() => navigate(targetPath)}
                      >
                        <span>Open {principle.title} Page</span>
                        <ArrowRightIcon size={15} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 2. Broad Learning Model: Learn -> Think -> Build -> Apply -> Reflect -> Improve */}
        <div className="learning-cycle-card">
          <div className="cycle-header">
            <span className="cycle-kicker">PEDAGOGICAL FRAMEWORK</span>
            <h3>{data?.learningModel?.title}</h3>
            <p>A continuous cycle: learn core concepts, reason through problem statements, build real systems, and iterate with code reviews.</p>
          </div>

          <div className="cycle-steps-grid">
            {(data?.learningModel?.steps || []).map((step, idx, arr) => (
              <React.Fragment key={idx}>
                <div className="cycle-step-box">
                  <span className="cycle-step-num">{step.num}</span>
                  <strong className="cycle-step-name">{step.name}</strong>
                  <span className="cycle-step-desc">{step.desc}</span>
                </div>
                {idx < arr.length - 1 && (
                  <div className="cycle-connector" aria-hidden="true">→</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 3. Core Competency Domains */}
        <div className="curriculum-core-heading">
          <h3>Core Areas of Study & Competencies</h3>
          <p>Key technical domains engineered for high-impact software, intelligent systems, and scalable infrastructure.</p>
        </div>

        <div className="competencies-grid">
          {(data?.coreAreas || []).map((area, idx) => (
            <div key={idx} className="competency-card">
              <div className="competency-header">
                <span className="competency-tag">{area.tag}</span>
              </div>
              <h4>{area.title}</h4>
              <p>{area.desc}</p>
            </div>
          ))}
        </div>

        {/* 4. Living Lab Anchor (CETLS) */}
        <div className="cetls-feature-box">
          <div className="cetls-icon-wrap" aria-hidden="true">
            <BuildingIcon size={24} />
          </div>
          <div className="cetls-content">
            <h4>{data.cetlsAnchor.title}</h4>
            <p>{data.cetlsAnchor.desc}</p>
          </div>
        </div>

        {/* Official Transparency Disclaimer */}
        <div className="curriculum-official-note">
          <span className="note-badge">Official Note</span>
          <p>{data.note}</p>
        </div>
      </div>
    </section>
  );
}
