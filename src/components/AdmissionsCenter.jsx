import React, { useState } from 'react';
import { ShieldCheckIcon, CheckCircleIcon, CalendarIcon, BriefcaseIcon, BuildingIcon, ArrowRightIcon } from './Icons';

export default function AdmissionsCenter({ data }) {
  const [selectedDegree, setSelectedDegree] = useState('btech-cs');

  const guidanceMap = {
    'btech-cs': {
      status: 'Directly Eligible',
      badgeClass: 'badge-success',
      advice: 'Strong match for direct admission. Your undergraduate background in algorithms and systems provides solid preparation for our advanced AI and distributed computing studios.'
    },
    'btech-noncs': {
      status: 'Eligible with Foundations Track',
      badgeClass: 'badge-info',
      advice: 'Eligible. Candidates from non-CS engineering branches (ECE, EEE, Mechanical, etc.) undergo Phase 01 foundational immersion to build algorithmic thinking, data structures, and Unix fundamentals.'
    },
    'mca-msc': {
      status: 'Eligible',
      badgeClass: 'badge-success',
      advice: 'Eligible. MCA or M.Sc in Computer Science / IT / Mathematics graduates meet standard qualification thresholds for master’s level admission at IIIT Hyderabad.'
    },
    'final-year': {
      status: 'Eligible (Provisional)',
      badgeClass: 'badge-warning',
      advice: 'Eligible to apply provisionally. Final year students completing degree requirements prior to January 2027 commencement can apply pending submission of final transcripts.'
    },
    'working-pro': {
      status: 'Eligible with Experience Advantage',
      badgeClass: 'badge-success',
      advice: 'Strong match. Early-career software engineers seeking to transition from maintenance roles into high-impact engineering leadership or startup venture incubation will benefit heavily from the practitioner-led co-op.'
    }
  };

  const currentGuidance = guidanceMap[selectedDegree];

  return (
    <section className="section section-alt" id={data.sectionId}>
      <div className="container">
        <div className="section-heading">
          <span className="kicker">{data.kicker}</span>
          <h2>{data.heading}</h2>
          <p>{data.description}</p>
        </div>

        {/* 1. Interactive Profile Fit Checker */}
        <div className="eligibility-checker-widget">
          <div className="widget-header">
            <div className="widget-icon">
              <ShieldCheckIcon size={24} />
            </div>
            <div>
              <h3>{data.checker.title}</h3>
              <p>{data.checker.subtitle}</p>
            </div>
          </div>

          <div className="widget-selector-row">
            <label htmlFor="degreeSelector" className="sr-only">Select your current degree background</label>
            <select
              id="degreeSelector"
              value={selectedDegree}
              onChange={(e) => setSelectedDegree(e.target.value)}
              className="widget-select-input"
            >
              <option value="btech-cs">B.Tech / B.E. in Computer Science or IT</option>
              <option value="btech-noncs">B.Tech / B.E. in Other Engineering Disciplines (ECE, EEE, Mech)</option>
              <option value="mca-msc">MCA or M.Sc (Computer Science / IT / Mathematics)</option>
              <option value="final-year">Final Year Undergraduate Student (Graduating 2026/2027)</option>
              <option value="working-pro">Working Software Engineer / Technical Professional</option>
            </select>
          </div>

          <div className="widget-result-box">
            <div className="widget-result-top">
              <span className={`widget-fit-pill ${currentGuidance.badgeClass}`}>
                <CheckCircleIcon size={16} />
                {currentGuidance.status}
              </span>
              <span className="widget-cohort-tag">January 2027 Intake</span>
            </div>
            <p className="widget-advice-text">{currentGuidance.advice}</p>
          </div>
        </div>

        {/* 2. Admissions Roadmap & Milestone Dates */}
        <div className="admissions-roadmap-card">
          <div className="roadmap-title-row">
            <h3>Admissions Roadmap & Milestones (January 2027 Cohort)</h3>
          </div>
          <div className="admissions-steps-grid">
            {data.roadmap.map((item, idx) => (
              <div key={idx} className="roadmap-step-box">
                <div className="roadmap-step-top">
                  <span className="step-num">{item.step}</span>
                  <span className="step-subtext">{item.subtext}</span>
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Fees & Pre-Approved Bank Loan Assistance */}
        <div className="financials-support-card">
          <div className="financials-header">
            <h3>{data.financials.title}</h3>
            <p className="fee-notice">{data.financials.feeNotice}</p>
          </div>
          <div className="loan-pillars-grid">
            {data.financials.loanPillars.map((pillar, idx) => (
              <div key={idx} className="loan-pillar-box">
                <div className="loan-pillar-icon" aria-hidden="true">
                  {idx === 0 ? <BuildingIcon size={20} /> : <BriefcaseIcon size={20} />}
                </div>
                <div>
                  <h4>{pillar.title}</h4>
                  <p>{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="admissions-cta-center">
          <a href="#apply" className="btn btn-primary">
            Register for Admissions & Syllabus Alerts
            <ArrowRightIcon size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
