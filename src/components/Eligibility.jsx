import React, { useState } from 'react';
import { ShieldCheckIcon, CheckCircleIcon, ArrowRightIcon } from './Icons';

export default function Eligibility({ data }) {
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

        {/* Interactive Eligibility Quick-Checker Widget */}
        <div className="eligibility-checker-widget">
          <div className="widget-header">
            <div className="widget-icon">
              <ShieldCheckIcon size={24} />
            </div>
            <div>
              <h3>Interactive Profile Fit & Eligibility Checker</h3>
              <p>Select your background to view your prospective fit for the January 2027 intake.</p>
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

        {/* Official Criteria Cards */}
        <div className="eligibility-grid">
          {data.criteriaCards.map((card, idx) => (
            <div key={idx} className="eligibility-card">
              <div className="eligibility-card-header">
                <h3>{card.title}</h3>
                <span className="status-badge-tba">{card.status}</span>
              </div>
              <p>{card.description}</p>
            </div>
          ))}
        </div>

        <div className="note-box">
          {data.note}
        </div>

        <div className="eligibility-action">
          <a href="#apply" className="btn btn-primary">
            Register for Eligibility Updates
            <ArrowRightIcon size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
