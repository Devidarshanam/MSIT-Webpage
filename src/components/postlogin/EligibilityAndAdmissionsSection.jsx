import React from 'react';
import { CalendarIcon, InfoIcon } from '../Icons';

export default function EligibilityAndAdmissionsSection({ data }) {
  const getDateBadgeClass = () => {
    return 'date-badge-confirmed';
  };

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

        {/* 2. Admissions Workflow */}
        <div className="admissions-workflow-container">
          <div className="workflow-title-block">
            <span className="kicker">Evaluation Pathway</span>
            <h3>Admission Process & Progression</h3>
            <p>A simple 4-step selection pathway to join the upcoming MSIT cohort.</p>
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
              <h3>Important Admission Dates & Milestone Schedule</h3>
              <p>Key milestone schedule. Application window and batch commencement dates are confirmed.</p>
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
                      <span className={`date-badge ${getDateBadgeClass(row.date)}`}>
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
