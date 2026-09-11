import React, { useState, useEffect } from 'react';
import msitData from './data/msitData.json';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProgrammeAtGlance from './components/ProgrammeAtGlance';
import ProgrammeOverview from './components/ProgrammeOverview';
import WhyChooseMSIT from './components/WhyChooseMSIT';
import WhatMakesMSITDifferent from './components/WhatMakesMSITDifferent';
import MSITExperience from './components/MSITExperience';
import Curriculum from './components/Curriculum';
import CareerOutcomes from './components/CareerOutcomes';
import WhoShouldApply from './components/WhoShouldApply';
import Eligibility from './components/Eligibility';
import Admissions from './components/Admissions';
import Fees from './components/Fees';
import ImportantDates from './components/ImportantDates';
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
        <Hero data={msitData.hero} />
        <ProgrammeAtGlance data={msitData.glance} />
        <ProgrammeOverview data={msitData.overview} />
        <WhyChooseMSIT data={msitData.whyChoose} />
        <WhatMakesMSITDifferent data={msitData.differentiation} />
        <MSITExperience data={msitData.experience} />
        <Curriculum data={msitData.curriculum} />
        <CareerOutcomes data={msitData.careerOutcomes} />
        <WhoShouldApply data={msitData.whoShouldApply} />
        <Eligibility data={msitData.eligibility} />
        <Admissions data={msitData.admissions} />
        <Fees data={msitData.fees} />
        <ImportantDates data={msitData.importantDates} />
        <FAQ data={msitData.faq} />
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
