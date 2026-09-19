import React from 'react';
import { 
  GraduationCapIcon, 
  BuildingIcon, 
  CalendarIcon, 
  CpuIcon, 
  CompassIcon, 
  TargetIcon, 
  AwardIcon, 
  BriefcaseIcon 
} from '../Icons';

export default function ProgrammeOverviewSection({ data }) {
  // Helper to match an appropriate SVG icon to parameter labels
  const getParamIcon = (label) => {
    const l = label.toLowerCase();
    if (l.includes('degree')) return <GraduationCapIcon size={22} />;
    if (l.includes('awarding') || l.includes('institute')) return <BuildingIcon size={22} />;
    if (l.includes('intake') || l.includes('cohort') || l.includes('date')) return <CalendarIcon size={22} />;
    if (l.includes('format') || l.includes('campus') || l.includes('location')) return <CompassIcon size={22} />;
    if (l.includes('focus') || l.includes('technology')) return <CpuIcon size={22} />;
    if (l.includes('principles') || l.includes('pedagogy') || l.includes('model')) return <TargetIcon size={22} />;
    if (l.includes('anchor') || l.includes('cetls') || l.includes('lab')) return <AwardIcon size={22} />;
    return <BriefcaseIcon size={22} />;
  };

  return (
    <section className="section programme-specs-section" id="programme-specs">
      <div className="container">
        <div className="section-heading">
          <span className="kicker">{data.kicker}</span>
          <h2>{data.heading}</h2>
          <p>{data.description}</p>
        </div>

        <div className="specs-cards-grid">
          {(data?.items || []).map((item, idx) => (
            <div key={idx} className="spec-card">
              <div className="spec-card-icon" aria-hidden="true">
                {getParamIcon(item.label)}
              </div>
              <div className="spec-card-body">
                <span className="spec-label">{item.label}</span>
                <strong className="spec-value">{item.value}</strong>
              </div>
            </div>
          ))}
        </div>

        {/* Concise Academic Anchor Strip */}
        <div className="specs-anchor-banner">
          <div className="anchor-banner-icon" aria-hidden="true">
            <AwardIcon size={28} />
          </div>
          <div className="anchor-banner-text">
            <h4>An AI-Native Master's Built for Independent Execution</h4>
            <p>
              Rather than traditional lecture-centric memorization, MSIT pairs rigorous academic computer science foundations with mentored studios, practical systems engineering, and active problem-solving.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
