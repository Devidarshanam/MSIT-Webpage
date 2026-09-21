import React, { useState, useEffect } from 'react';
import { MenuIcon, XIcon, ArrowRightIcon } from '../Icons';

const NAV_ITEMS = [
  { num: '01', label: 'Overview', href: '#overview', desc: 'MSIT charter, consortium & cohort targets' },
  { num: '02', label: 'Programme', href: '#programme-specs', desc: 'Degree specs, learning model & duration' },
  { num: '03', label: 'Curriculum', href: '#curriculum', desc: 'Full syllabus, 6 learning stages & domains' },
  { num: '04', label: 'Eligibility & Admissions', href: '#eligibility', desc: 'Academic criteria, intake timeline & test structure' },
  { num: '05', label: 'Fees & Aid', href: '#fees', desc: 'Verified fee schedule, installment plan & loan banks' },
  { num: '06', label: 'Career Outcomes', href: '#careers', desc: 'Pathways, placement outcomes & alumni stories' },
  { num: '07', label: 'Practicum', href: '#practicum', desc: 'Industry project sprints & production systems' },
  { num: '08', label: 'Campus Life', href: '#campus', desc: 'IIIT-H campus ecosystem, labs & student facilities' },
  { num: '09', label: 'Documents & FAQ', href: '#documents-faq', desc: 'Circular downloads, FAQs & helpdesk channels' },
  { num: '10', label: 'Next Steps', href: '#next-steps', desc: 'Application checklist, key dates & support' },
];

export default function DashboardSubNav() {
  const [activeSection, setActiveSection] = useState('#overview');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.innerWidth <= 640 ? 100 : 130;
      const scrollPosition = window.scrollY + offset;
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

  // Handle body scroll lock & keyboard escape when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setIsDrawerOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isDrawerOpen]);

  const scrollToSection = (href) => {
    const el = document.querySelector(href);
    if (el) {
      const yOffset = window.innerWidth <= 640 ? -90 : -115;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(href);
    }
  };

  const handleClick = (e, href) => {
    e.preventDefault();
    scrollToSection(href);
  };

  const handleDrawerItemClick = (href) => {
    setIsDrawerOpen(false);
    // Slight delay so the drawer closing animation feels smooth before scroll
    setTimeout(() => {
      scrollToSection(href);
    }, 120);
  };

  return (
    <>
      <nav className="dashboard-subnav" aria-label="Post-login page sections">
        <div className="container dashboard-subnav-container">
          <div className="subnav-main-row">
            {/* Horizontal scrollable pills */}
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

            {/* 3-Lines (☰) Hamburger Menu Button */}
            <button
              type="button"
              className="subnav-menu-btn"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open all 10 sections menu"
              title="View all 10 programme sections"
            >
              <MenuIcon size={16} />
              <span className="subnav-menu-btn-label">Sections</span>
              <span className="subnav-menu-count-badge">10</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Slide-Up Bottom Drawer / Modal for All 10 Sections */}
      {isDrawerOpen && (
        <div
          className="subnav-drawer-overlay"
          onClick={() => setIsDrawerOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-heading"
        >
          <div className="subnav-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="drawer-handle" />
              <div className="drawer-header-content">
                <div>
                  <h3 id="drawer-heading" className="drawer-title">Programme Sections</h3>
                  <p className="drawer-subtitle">10 decision areas — tap to jump instantly</p>
                </div>
                <button
                  type="button"
                  className="drawer-close-btn"
                  onClick={() => setIsDrawerOpen(false)}
                  aria-label="Close sections menu"
                >
                  <XIcon size={18} />
                </button>
              </div>
            </div>

            <div className="drawer-list">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <button
                    key={item.href}
                    type="button"
                    className={`drawer-item ${isActive ? 'active' : ''}`}
                    onClick={() => handleDrawerItemClick(item.href)}
                  >
                    <div className="drawer-item-left">
                      <span className="drawer-num-badge">{item.num}</span>
                      <div className="drawer-item-text">
                        <span className="drawer-item-title">{item.label}</span>
                        <span className="drawer-item-desc">{item.desc}</span>
                      </div>
                    </div>
                    <div className="drawer-item-right">
                      {isActive ? (
                        <span className="drawer-active-indicator">Current</span>
                      ) : (
                        <ArrowRightIcon size={15} className="drawer-arrow-icon" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
