import React from 'react';
import { BuildingIcon, ShieldCheckIcon, InfoIcon, AwardIcon } from '../Icons';

export default function FeesAndFinancialSupportSection({ data }) {
  return (
    <section className="section fees-financial-section" id="fees">
      <div className="container">
        <div className="section-heading">
          <span className="kicker">{data.kicker}</span>
          <h2>{data.heading}</h2>
          <p>{data.description}</p>
        </div>

        {/* 1. Transparent Fee Component Breakdown */}
        <div className="fee-breakdown-card">
          <div className="fee-card-header">
            <h3>Programme Fee Components</h3>
            <span className="fee-status-tag">January 2027 Cohort</span>
          </div>

          <div className="fee-table-responsive">
            <table className="fee-structure-table">
              <thead>
                <tr>
                  <th scope="col">Fee Component</th>
                  <th scope="col">Applicable Period</th>
                  <th scope="col">Amount (INR)</th>
                </tr>
              </thead>
              <tbody>
                {(data?.table || []).map((row, idx) => (
                  <tr key={idx}>
                    <td>
                      <strong>{row.component}</strong>
                    </td>
                    <td>
                      <span className="fee-period-text">{row.period}</span>
                    </td>
                    <td>
                      <span className="fee-tba-pill">{row.amount}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="fee-card-footer-notice">
            <InfoIcon size={16} />
            <p>{data?.note}</p>
          </div>
        </div>

        {/* 2. Education Loan & Financial Support Guidance */}
        <div className="financial-guidance-card">
          <div className="guidance-header">
            <div className="guidance-icon-wrap" aria-hidden="true">
              <BuildingIcon size={24} />
            </div>
            <div>
              <h3>{data?.loanGuidance?.title}</h3>
              <p>Objective information regarding educational loans and institutional facilitation.</p>
            </div>
          </div>

          <div className="guidance-points-grid">
            {(data?.loanGuidance?.points || []).map((point, idx) => (
              <div key={idx} className="guidance-point-box">
                <h4>{point.title}</h4>
                <p>{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
