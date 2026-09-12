import React, { useState, useEffect } from 'react';

export default function Navbar({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      const sectionIds = data.links.map(l => l.href.substring(1));
      
      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            current = `#${id}`;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data.links]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Main navigation">
        <div className="brand-group">
          <a href="#hero" className="brand" aria-label="IIIT Hyderabad MSIT home">
            <img
              src={data.brand.logo}
              alt="MSIT logo"
              className="brand-logo"
              width="44"
              height="44"
            />
            <div className="brand-text">
              <span className="brand-name">{data.brand.title}</span>
              <span className="brand-sub">{data.brand.subtitle}</span>
            </div>
          </a>
          <span className="nav-cohort-pill" title="Next Cohort: January 2027">
            <span className="live-beacon" aria-hidden="true"></span>
            Jan 2027 Cohort
          </span>
        </div>

        <button
          className={`menu-toggle ${isOpen ? 'open' : ''}`}
          id="menuToggle"
          aria-expanded={isOpen}
          aria-controls="navMenu"
          aria-label="Toggle navigation menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${isOpen ? 'open' : ''}`} id="navMenu">
          {data.links.map((link, idx) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={idx}
                href={link.href}
                className={isActive ? 'active' : ''}
                onClick={handleLinkClick}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href={data.cta.href}
            className="btn btn-primary nav-cta-btn"
            onClick={handleLinkClick}
          >
            {data.cta.label}
          </a>
        </div>
      </nav>
    </header>
  );
}
