import React from 'react';

export default function Hero({ data }) {
  return (
    <section className="hero" id="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="badge">{data.badge}</span>
          <h1>{data.title}</h1>
          <h2>{data.subtitle}</h2>
          
          <p className="hero-tagline">{data.tagline}</p>
          <p className="hero-subtagline">{data.subTagline}</p>

          <div className="hero-meta-chips">
            <span className="meta-chip">{data.institution}</span>
            <span className="meta-chip">{data.nextCohort}</span>
            <span className="meta-chip">{data.orientation}</span>
          </div>

          <div className="status-callout">
            <span>{data.statusLabel}</span>
            <strong>{data.statusValue}</strong>
          </div>

          <div className="cta-group">
            <a href={data.primaryCta.href} className="btn btn-primary">
              {data.primaryCta.label}
            </a>
            <a href={data.secondaryCta.href} className="btn btn-secondary">
              {data.secondaryCta.label}
            </a>
          </div>

          <div className="hero-quick-links">
            {data.quickLinks.map((ql, idx) => (
              <React.Fragment key={idx}>
                <a href={ql.href}>{ql.label}</a>
                {idx < data.quickLinks.length - 1 && <span className="sep">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="hero-panel-wrap">
          <div className="hero-snapshot-card" aria-label="Programme highlights">
            <div className="snapshot-campus-media">
              <img
                src="/assets/iiit-campus.jpg"
                alt="IIIT Hyderabad Campus - Nilgiri Academic Block"
                className="snapshot-campus-img"
                width="400"
                height="180"
                loading="eager"
              />
              <span className="snapshot-campus-badge">IIIT Hyderabad Campus</span>
            </div>
            <p className="snapshot-eyebrow">{data.snapshot.eyebrow}</p>
            <div className="snapshot-stat-grid">
              {data.snapshot.stats.map((stat, idx) => (
                <div key={idx} className="snapshot-stat-box">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>

            {data.snapshot.rows.map((row, idx) => (
              <div key={idx} className="snapshot-row">
                <span>{row.label}</span>
                <strong>{row.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
