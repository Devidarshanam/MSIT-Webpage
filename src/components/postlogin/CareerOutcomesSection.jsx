import React from 'react';
import { BriefcaseIcon, RocketIcon, CompassIcon, ShieldCheckIcon } from '../Icons';

export default function CareerOutcomesSection({ data }) {
  const getPillarIcon = (badge) => {
    const b = badge.toLowerCase();
    if (b.includes('specialist')) return <BriefcaseIcon size={20} />;
    if (b.includes('builder')) return <RocketIcon size={20} />;
    return <CompassIcon size={20} />;
  };

  return (
    <section className="section career-outcomes-section" id="careers">
      <div className="container">
        <div className="section-heading">
          <span className="kicker">{data.kicker}</span>
          <h2>{data.heading}</h2>
          <p>{data.description}</p>
        </div>

        {/* 3 Strategic Career Pathways */}
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

        {/* Placement Transparency Disclaimer */}
        <div className="placement-transparency-card">
          <div className="transparency-icon" aria-hidden="true">
            <ShieldCheckIcon size={24} />
          </div>
          <div className="transparency-text">
            <h4>Institutional Placement Transparency</h4>
            <p>{data.transparencyNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
