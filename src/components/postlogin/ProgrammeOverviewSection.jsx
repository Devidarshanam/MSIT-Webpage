import React from 'react';
import { 
  GraduationCapIcon, 
  BuildingIcon, 
  CalendarIcon, 
  CpuIcon, 
  CompassIcon, 
  TargetIcon, 
  AwardIcon, 
  BriefcaseIcon,
  SparklesIcon,
  BookOpenIcon
} from '../Icons';

export default function ProgrammeOverviewSection({ data }) {
  // Helper to match an appropriate SVG icon to parameter labels
  const getParamIcon = (label) => {
    const l = (label || '').toLowerCase();
    if (l.includes('degree')) return <GraduationCapIcon size={22} />;
    if (l.includes('awarding') || l.includes('institute')) return <BuildingIcon size={22} />;
    if (l.includes('intake') || l.includes('cohort') || l.includes('date') || l.includes('starts')) return <CalendarIcon size={22} />;
    if (l.includes('format') || l.includes('campus') || l.includes('location')) return <CompassIcon size={22} />;
    if (l.includes('tuition') || l.includes('fee')) return <AwardIcon size={22} />;
    if (l.includes('focus') || l.includes('technology')) return <CpuIcon size={22} />;
    if (l.includes('programme') || l.includes('semesters')) return <BookOpenIcon size={22} />;
    return <BriefcaseIcon size={22} />;
  };

  const getSemesterIcon = (idx) => {
    switch (idx) {
      case 0:
        return <CpuIcon size={22} />;
      case 1:
        return <AwardIcon size={22} />;
      case 2:
        return <SparklesIcon size={22} />;
      case 3:
      default:
        return <BriefcaseIcon size={22} />;
    }
  };

  const specsList = data?.quickSpecs || data?.items || [];
  const semestersList = data?.semesters || [];

  return (
    <section className="section programme-specs-section" id="programme-specs">
      <div className="container">
        <div className="section-heading">
          <span className="kicker">{data?.kicker || 'Programme Structure'}</span>
          <h2>{data?.heading || 'Programme Structure & Academic Framework'}</h2>
          <p>{data?.description}</p>
        </div>

        {/* 1. Quick Programme Specifications Strip (From Attached PDF) */}
        <div className="specs-cards-grid">
          {specsList.map((item, idx) => (
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

        {/* 2. Four-Semester Programme Structure (Original details from attached PDF) */}
        {semestersList.length > 0 && (
          <div className="programme-structure-block">
            <div className="programme-structure-grid">
              {semestersList.map((sem, idx) => (
                <div key={idx} className={`semester-card semester-card-${idx + 1}`}>
                  <div className="semester-card-header">
                    <div className="semester-icon-badge" aria-hidden="true">
                      {getSemesterIcon(idx)}
                    </div>
                    <div className="semester-meta">
                      <span className="semester-num-badge">{sem.semNumber}</span>
                      {sem.tag && <span className="semester-tag-pill">{sem.tag}</span>}
                    </div>
                  </div>

                  <h3 className="semester-title">{sem.title}</h3>

                  {sem.courses && sem.courses.length > 0 && (
                    <ul className="semester-courses-list">
                      {sem.courses.map((course, cIdx) => (
                        <li key={cIdx} className="semester-course-item">
                          <span className="course-bullet" aria-hidden="true">•</span>
                          <span>{course}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <p className="semester-desc">{sem.emphasis}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Academic Collaboration Anchor Strip */}
        <div className="specs-anchor-banner">
          <div className="anchor-banner-icon" aria-hidden="true">
            <AwardIcon size={28} />
          </div>
          <div className="anchor-banner-text">
            <h4>{data?.anchor?.title || "Redesigned in Collaboration with CETLS, IIIT Hyderabad"}</h4>
            <p>
              {data?.anchor?.desc || "Offered by the Consortium of Institutions of Higher Learning (CIHL) with degree awarded by IIIT Hyderabad. By the end of the first year, students are expected to be capable of designing and building substantial software systems using modern AI-enabled development workflows."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
