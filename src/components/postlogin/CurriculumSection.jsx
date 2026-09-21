import React from 'react';
import { 
  CpuIcon, 
  TerminalIcon, 
  SparklesIcon, 
  TargetIcon, 
  BuildingIcon, 
  BookOpenIcon,
  CheckCircleIcon
} from '../Icons';

export default function CurriculumSection({ data }) {
  return (
    <section className="section curriculum-section" id="curriculum">
      <div className="container">
        <div className="section-heading">
          <span className="kicker">{data.kicker}</span>
          <h2>{data.heading}</h2>
          <p>{data.description}</p>
        </div>

        {/* 1. The Three Core Principles */}
        <div className="principles-row">
          {(data?.principles || []).map((principle, idx) => (
            <div key={idx} className="principle-card">
              <div className="principle-number">0{idx + 1}</div>
              <h3>{principle.title}</h3>
              <p>{principle.desc}</p>
            </div>
          ))}
        </div>

        {/* 2. Broad Learning Model: Learn -> Think -> Build -> Apply -> Reflect -> Improve */}
        <div className="learning-cycle-card">
          <div className="cycle-header">
            <span className="cycle-kicker">PEDAGOGICAL FRAMEWORK</span>
            <h3>{data?.learningModel?.title}</h3>
            <p>A continuous loop of conceptual mastery, independent building, and iterative refinement.</p>
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
