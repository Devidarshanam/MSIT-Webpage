import React from 'react';

export default function Fees({ data }) {
  return (
    <section className="section section-alt" id={data.sectionId}>
      <div className="container fees-container">
        <div className="section-heading">
          <span className="kicker">{data.kicker}</span>
          <h2>{data.heading}</h2>
          <p>{data.description}</p>
        </div>

        <div className="fee-table-wrap">
          <table className="fee-table">
            <thead>
              <tr>
                <th>Fee Component</th>
                <th>Amount (INR)</th>
              </tr>
            </thead>
            <tbody>
              {data.table.map((row, idx) => (
                <tr key={idx} className={row.isTotal ? 'total-row' : ''}>
                  <td><strong>{row.component}</strong></td>
                  <td>{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="note-box">
          {data.note}
        </div>

        <div className="financial-support-card">
          <h3>{data.financialSupport.title}</h3>
          <p>{data.financialSupport.text}</p>
        </div>
      </div>
    </section>
  );
}
