import React, { useState } from 'react';

export default function FinalCTA({ data }) {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="section cta-section" id={data.sectionId}>
      <div className="container">
        <div className="cta-box">
          <span className="kicker light">{data.badge}</span>
          <h2>{data.heading}</h2>
          <p>{data.tagline}</p>

          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ maxWidth: '480px', margin: '0 auto 1.8rem' }}>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  aria-label="Email address for admission updates"
                  style={{
                    flex: '1 1 260px',
                    padding: '0.85rem 1.2rem',
                    borderRadius: '999px',
                    border: '1px solid rgba(255,255,255,0.4)',
                    background: 'rgba(255,255,255,0.95)',
                    color: '#0f172a',
                    fontSize: '0.98rem'
                  }}
                />
                <button type="submit" className="btn btn-secondary light">
                  {data.primaryBtn.label}
                </button>
              </div>
            </form>
          ) : (
            <div style={{
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '14px',
              padding: '1.2rem',
              maxWidth: '480px',
              margin: '0 auto 1.8rem',
              color: '#ffffff'
            }}>
              <strong>Thank you for registering!</strong>
              <p style={{ margin: '0.3rem 0 0', fontSize: '0.94rem' }}>
                We will notify you at {email} as soon as the January 2027 admissions open.
              </p>
            </div>
          )}

          <div className="cta-quick-links">
            {data.quickLinks.map((link, idx) => (
              <React.Fragment key={idx}>
                <a href={link.href}>{link.label}</a>
                {idx < data.quickLinks.length - 1 && <span className="sep">·</span>}
              </React.Fragment>
            ))}
          </div>

          <p className="contact-query-line">
            {data.contactText}{' '}
            <a href={`mailto:${data.contactEmail}`}>{data.contactEmail}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
