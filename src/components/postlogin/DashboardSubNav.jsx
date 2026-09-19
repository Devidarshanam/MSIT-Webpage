import React, { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Programme', href: '#programme-specs' },
  { label: 'Curriculum', href: '#curriculum' },
  { label: 'Eligibility & Admissions', href: '#eligibility' },
  { label: 'Fees & Aid', href: '#fees' },
  { label: 'Career Outcomes', href: '#careers' },
  { label: 'Practicum', href: '#practicum' },
  { label: 'Campus Life', href: '#campus' },
  { label: 'Documents & FAQ', href: '#documents-faq' },
  { label: 'Next Steps', href: '#next-steps' },
];

export default function DashboardSubNav() {
  const [activeSection, setActiveSection] = useState('#overview');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const el = document.querySelector(item.href);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.href);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const yOffset = -120; // Offset for sticky headers
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(href);
    }
  };

  return (
    <nav className="dashboard-subnav" aria-label="Post-login page sections">
      <div className="container dashboard-subnav-container">
        <div className="subnav-scroll-wrapper">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`subnav-pill ${activeSection === item.href ? 'active' : ''}`}
              onClick={(e) => handleClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
