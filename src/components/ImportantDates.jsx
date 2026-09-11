import React from 'react';

export default function ImportantDates({ data }) {
  return (
    <section className="section" id={data.sectionId}>
      <div className="container">
        <div className="section-heading">
          <span className="kicker">{data.kicker}</span>
          <h2>{data.heading}</h2>
          <p>{data.description}</p>
        </div>

        <div className="dates-layout">
          <div className="dates-hero-card">
            <span className="label">{data.highlight.label}</span>
            <strong>{data.highlight.date}</strong>
            <p>{data.highlight.subtext}</p>
          </div>

          <div className="dates-table-card">
            <table className="dates-table">
              <tbody>
                {data.events.map((ev, idx) => (
                  <tr key={idx} className={ev.isHighlight ? 'highlight-event' : ''}>
                    <td><strong>{ev.event}</strong></td>
                    <td>{ev.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
