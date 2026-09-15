import React from 'react';
import { getSmartIcon, ArrowRightIcon } from './Icons';

export default function Curriculum({ data }) {
  return (
    <section className="section section-curriculum-rich" id={data.sectionId}>
      <div className="container">
        <div className="section-heading text-center-wrap">
          <span className="kicker kicker-light">{data.kicker}</span>
          <h2 className="text-white">{data.heading}</h2>
          <p className="text-muted-light">{data.description}</p>
        </div>

        {/* 4 Core Competency Cards */}
        <div className="curriculum-four-grid">
          {data.tracks.map((track, idx) => (
            <div key={idx} className="curriculum-focus-card dark-card">
              <div className="focus-card-top">
                <div className="focus-icon" aria-hidden="true">
                  {getSmartIcon(track.icon || track.title, 22)}
                </div>
                <span className="focus-tag">{track.tag}</span>
              </div>
              <h3>{track.title}</h3>
              <p>{track.description}</p>
            </div>
          ))}
        </div>

        {/* Simple 1-Line Progression Strip */}
        {data.progression && (
          <div className="cadence-simple-strip">
            <span className="strip-label">Academic Cadence:</span>
            <div className="strip-steps">
              {data.progression.map((p, idx) => (
                <React.Fragment key={idx}>
                  <div className="strip-step">
                    <span className="strip-num">{p.step}</span>
                    <span className="strip-name">{p.name}</span>
                  </div>
                  {idx < data.progression.length - 1 && (
                    <span className="strip-arrow" aria-hidden="true">➔</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
