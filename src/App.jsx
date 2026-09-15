import React, { useState, useEffect } from 'react';
import msitData from './data/msitData.json';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProgrammeAtGlance from './components/ProgrammeAtGlance';
import WhyChooseMSIT from './components/WhyChooseMSIT';
import Curriculum from './components/Curriculum';
import CareerOutcomes from './components/CareerOutcomes';
import AdmissionsCenter from './components/AdmissionsCenter';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-root">
      <Navbar data={msitData.navigation} />
      <main>
        {/* 1. Hero with Snapshot & 1-Page Summary */}
        <Hero data={msitData.hero} />

        {/* 2. Programme at a Glance (Compact operational facts) */}
        <ProgrammeAtGlance data={msitData.glance} />

        {/* 3. Why Choose MSIT (4 Pillars + Prof. Raj Reddy Legacy) */}
        <WhyChooseMSIT data={msitData.whyChoose} />

        {/* 4. Curriculum & Academic Cadence (Timeline + Interactive Domains) */}
        <Curriculum data={msitData.curriculum} />

        {/* 5. Career Pathways & Post-Graduation Outcomes */}
        <CareerOutcomes data={msitData.careerOutcomes} />

        {/* 6. Admissions, Eligibility & Finances Action Hub */}
        <AdmissionsCenter data={msitData.admissionsCenter} />

        {/* 7. Frequently Asked Questions */}
        <FAQ data={msitData.faq} />

        {/* Final CTA / Registration */}
        <FinalCTA data={msitData.finalCta} />
      </main>
      <Footer data={msitData.footer} />

      {/* Floating Scroll to Top button */}
      <button
        className={`back-to-top-btn ${showTopBtn ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll back to top of page"
        title="Scroll to top"
      >
        ↑
      </button>

      {/* Persistent floating mobile register bar */}
      <aside className="mobile-sticky-bar" aria-label="Mobile quick registration">
        <div className="bar-text">
          <span className="bar-label">Admissions 2027</span>
          <span className="bar-title">Next Cohort Jan 2027</span>
        </div>
        <a href="#apply" className="btn btn-primary">
          Register Interest
        </a>
      </aside>
    </div>
  );
}
