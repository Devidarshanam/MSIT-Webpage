import React from 'react';
import { 
  ShieldCheckIcon, 
  CalendarIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  ArrowRightIcon, 
  InfoIcon 
} from '../Icons';

export default function EligibilityAndAdmissionsSection({ data }) {
  return (
    <section className="section eligibility-admissions-section" id="eligibility">
      <div className="container">
        <div className="section-heading">
          <span className="kicker">{data.kicker}</span>
          <h2>{data.heading}</h2>
          <p>{data.description}</p>
        </div>

        {/* 1. Official Eligibility Framework Cards */}
        <div className="eligibility-framework-grid">
          {(data?.criteria || []).map((item, idx) => (
            <div key={idx} className="eligibility-spec-card">
              <div className="spec-top">
                <h3>{item.title}</h3>
                <span className="spec-status-pill">{item.status}</span>
              </div>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 2. Admissions Workflow (4 Verified Steps) */}
        <div className="admissions-workflow-container">
          <div className="workflow-title-block">
            <span className="kicker">Evaluation Pathway</span>
            <h3>Admission Process & Progression</h3>
            <p>A structured 4-step selection workflow designed to evaluate technical curiosity, problem-solving mindset, and suitability.</p>
          </div>

          <div className="workflow-steps-grid">
            {(data?.admissionProcess || []).map((step) => (
              <div key={step.step} className="workflow-step-card">
                <div className="step-num-pill">{step.step}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Important Admission Dates */}
        <div className="important-dates-card">
          <div className="dates-card-header">
            <div className="dates-header-icon" aria-hidden="true">
              <CalendarIcon size={22} />
            </div>
            <div>
              <h3>Important Admission Dates (January 2027 Intake)</h3>
              <p>Key milestone schedule. Specific calendar dates will be published with the official admission circular.</p>
            </div>
          </div>

          <div className="dates-table-wrapper">
            <table className="dates-table">
              <thead>
                <tr>
                  <th scope="col">Admissions Activity</th>
                  <th scope="col">Scheduled Timeline</th>
                </tr>
              </thead>
              <tbody>
                {(data?.importantDates || []).map((row, idx) => (
                  <tr key={idx} className={row.activity.includes('Commencement') ? 'commencement-row' : ''}>
                    <td><strong>{row.activity}</strong></td>
                    <td>
                      <span className={`date-badge ${row.date.includes('January') ? 'date-badge-primary' : 'date-badge-tba'}`}>
                        {row.date}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="dates-disclaimer-row">
            <InfoIcon size={16} />
            <span>{data.disclaimer}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
