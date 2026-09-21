import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CpuIcon, 
  BuildingIcon, 
  BookOpenIcon, 
  BriefcaseIcon,
  ArrowRightIcon
} from '../Icons';

export default function CurriculumSection({ data }) {
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

        {/* 1. The Three Core Principles Cards */}
        <div className="principles-row">
          {(data?.principles || []).map((principle, idx) => {
            const slug = getPillarSlug(principle, idx);
            const targetPath = principle.path || `/curriculum/${slug}`;

            return (
              <div 
                key={idx} 
                className={`principle-card principle-card-pillar-${idx + 1}`}
                onClick={() => navigate(targetPath)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') navigate(targetPath); }}
                style={{ cursor: 'pointer' }}
                aria-label={`View detailed guide for ${principle.title}`}
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

                <div className="principle-card-actions">
                  <button
                    type="button"
                    className="principle-deep-dive-link"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(targetPath);
                    }}
                    aria-label={`Open detailed page for ${principle.title}`}
                  >
                    <span>Explore {principle.title}</span>
                    <ArrowRightIcon size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. Living Lab Anchor (CETLS) */}
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
