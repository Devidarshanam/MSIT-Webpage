import React from 'react';

export default function Footer({ data }) {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <h3>{data.institute}</h3>
          <div className="footer-programme-name">{data.programme}</div>
          <p>{data.description}</p>
        </div>

        <div className="footer-nav-col">
          <h4>Navigation</h4>
          <div className="footer-nav-grid">
            {data.quickLinks.map((link, idx) => (
              <a key={idx} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-contact-col" id="contact">
          <h4>Contact Admissions</h4>
          <p>
            <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
          </p>
          <p>
            <a href={`tel:${data.contact.phone.replace(/[^0-9+]/g, '')}`}>{data.contact.phone}</a>
          </p>
          <p>{data.contact.address}</p>
        </div>
      </div>

      <div className="container footer-bottom">
        {data.copyright}
      </div>
    </footer>
  );
}
