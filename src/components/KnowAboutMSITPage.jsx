import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BuildingIcon, DownloadIcon, ArrowRightIcon,
  GraduationCapIcon, CpuIcon, BookOpenIcon, BriefcaseIcon, ShieldCheckIcon, AwardIcon,
  SparklesIcon, UsersIcon, CheckCircleIcon, CalendarIcon
} from './Icons';

export default function KnowAboutMSITPage({ onBack, onGoToSignIn }) {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timerResetKey, setTimerResetKey] = useState(0);
  const timerRef = useRef(null);

  // 6 Slides Definition with Theme Color Palettes and Bespoke Layouts
  const slides = [
    {
      id: 'origin',
      number: '01',
      category: 'HERITAGE & 25-YEAR EVOLUTION',
      shortCategory: 'HERITAGE & EVOLUTION',
      themeClass: 'slide-theme-origin',
      layoutClass: 'slide-layout-origin',
      title: 'Heritage & Evolution: A Quarter-Century of Active Learning',
      lead: 'Founded in 2001 by Turing Laureate Prof. Raj Reddy with Carnegie Mellon University guidance, MSIT eliminated passive lectures to pioneer India’s premier studio-based computing master’s.',
      image: '/assets/rajreddy.jpg',
      imageCaption: 'Prof. Raj Reddy — Turing Award Laureate & Founding Chair'
    },
    /*
    {
      id: 'placements',
      number: '03',
      category: 'TOP PLACEMENTS',
      themeClass: 'slide-theme-placements',
      layoutClass: 'slide-layout-placements',
      title: 'Top Placements & Career Packages',
      lead: 'Graduates consistently secure high-growth engineering roles across artificial intelligence, enterprise cloud, and high-performance computing.',
      image: '/assets/iiit-alumni-network.jpg',
      imageCaption: 'Distinguished MSIT Alumni Leading Global Technology Teams'
    },
    */
    {
      id: 'ainative',
      number: '02',
      category: 'MSIT AT 25: AI NATIVE',
      shortCategory: 'AI NATIVE',
      themeClass: 'slide-theme-ainative',
      layoutClass: 'slide-layout-ainative',
      title: 'A quarter-century of learning by doing enters its AI-native era.',
      lead: 'Anchored in Professor Raj Reddy’s three principles: Learning to Learn, Learning to Think, Learning to Do.',
      image: '/assets/msit-25-logo.png',
      imageCaption: '25 Years of MSIT'
    },
    {
      id: 'backgrounds',
      number: '03',
      category: 'B.TECH TRANSFORMATION',
      shortCategory: 'TRANSFORMATION',
      themeClass: 'slide-theme-backgrounds',
      layoutClass: 'slide-layout-backgrounds',
      title: 'B.Tech Transformation Into AI-Native Engineers',
      lead: 'Bridging the gap from college theory to production engineering through hands-on AI studios.',
      image: '/assets/iiit-ai-lab.jpg',
      imageCaption: 'The MSIT Studio Learning Environment at IIIT Hyderabad'
    },
    {
      id: 'events',
      number: '04',
      category: 'CAMPUS LIFE',
      shortCategory: 'CAMPUS LIFE',
      themeClass: 'slide-theme-events',
      layoutClass: 'slide-layout-events',
      title: 'Life on Campus at IIIT Hyderabad',
      lead: 'A vibrant 66-acre green research campus offering an enriching student experience with modern sports, technical clubs, and active community life.',
      image: '/assets/iiit-campus-life.jpg',
      imageCaption: 'Life on Campus — 66-Acre Green Research campus at IIIT Hyderabad'
    },
    {
      id: 'practicum',
      number: '05',
      category: 'REAL-WORLD PRACTICUM',
      shortCategory: 'PRACTICUM',
      themeClass: 'slide-theme-practicum',
      layoutClass: 'slide-layout-practicum',
      title: 'Real-World Practicum: 50% Learning, 50% Projects',
      lead: 'Spend ~50% of your postgraduate programme embedded directly in real-world projects working with CETLS and mastering industry-relevant skills.',
      image: '/assets/iiit-coop.jpg',
      imageCaption: 'Corporate Co-op Practicum at Premier Tech Offices in Gachibowli'
    },
    {
      id: 'admissions',
      number: '06',
      category: 'BEGIN YOUR JOURNEY',
      shortCategory: 'ADMISSIONS',
      themeClass: 'slide-theme-admissions',
      layoutClass: 'slide-layout-admissions',
      title: 'Begin Your Journey: Admissions & Eligibility',
      lead: 'Clear eligibility criteria, a structured 3-step selection pathway, and direct enrollment into India’s flagship studio computing programme.',
      image: '/assets/iiit-campus.jpg',
      imageCaption: 'The Academic Campus of IIIT Hyderabad, Gachibowli'
    }
  ];

  const totalSlides = slides.length;

  // Schedules the 10-second auto-advance timeout
  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 10000);
  }, [totalSlides]);

  // Handler for ANY user action or click in the slide:
  // Pauses current timer and continues after 10 seconds if no action is rendered after that click
  const handleUserAction = useCallback(() => {
    setTimerResetKey((prev) => prev + 1);
    startTimer();
  }, [startTimer]);

  const nextSlide = useCallback(() => {
    handleUserAction();
    if (document.activeElement && document.activeElement.blur) {
      document.activeElement.blur();
    }
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [handleUserAction, totalSlides]);

  const prevSlide = useCallback(() => {
    handleUserAction();
    if (document.activeElement && document.activeElement.blur) {
      document.activeElement.blur();
    }
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [handleUserAction, totalSlides]);

  const goToSlide = useCallback((index) => {
    handleUserAction();
    if (document.activeElement && document.activeElement.blur) {
      document.activeElement.blur();
    }
    setCurrentSlide(index);
  }, [handleUserAction]);

  // Ensure active slide stage always starts scrolled to the top
  useEffect(() => {
    const stages = document.querySelectorAll('.fullscreen-slide-stage');
    stages.forEach((stage) => {
      stage.scrollTop = 0;
    });
  }, [currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      }
      if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch swipe support for mobile devices
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const handleTouchStart = (e) => {
    handleUserAction();
    if (e.touches && e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e) => {
    handleUserAction();
    if (touchStartX.current === null || touchStartY.current === null) return;
    if (!e.changedTouches || e.changedTouches.length === 0) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Detect horizontal swipe (horizontal distance > vertical distance and threshold > 45px)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 45) {
      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Slideshow timer lifecycle: on slide change, start the 10-second timer
  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentSlide, startTimer]);

  // Helper to render static, rich, non-interactive content for each slide
  const renderSlideContent = (slide) => {
    switch (slide.id) {
      case 'origin':
        return (
          <div className="slide-content-layout layout-origin-story layout-origin-merged">
            <div className="origin-merged-grid">
              {/* Left Column: Visionary Anchor (Portrait, Credentials, Metrics & Signature Quote) */}
              <div className="origin-anchor-col">
                <div className="spotlight-card origin-merged-spotlight">
                  <div className="spotlight-profile-layout">
                    <div className="spotlight-img-frame">
                      <img 
                        src="/assets/rajreddy.jpg" 
                        alt="Prof. Raj Reddy - Turing Award Laureate & MSIT Founding Chair" 
                        className="spotlight-portrait-img"
                      />
                    </div>
                    <div className="spotlight-meta-info">
                      <div className="spotlight-badge-row">
                        <span className="spotlight-badge">Academic Visionary</span>
                        <span className="spotlight-award-tag">Turing Laureate 1994</span>
                      </div>
                      <h3 className="spotlight-name">Prof. Raj Reddy</h3>
                      <p className="spotlight-role-title">Founding Chair, MSIT • Former Dean, School of Computer Science, Carnegie Mellon University</p>
                      <p className="spotlight-desc">Conceived MSIT in 2001 to replace passive lecture classrooms with 100% active, studio-based software engineering.</p>
                    </div>
                  </div>

                  {/* 3 Vital Stats Row */}
                  <div className="spotlight-stats-row">
                    <div className="spot-stat">
                      <strong>25+</strong>
                      <span>Years Legacy</span>
                    </div>
                    <div className="spot-stat">
                      <strong>3,000+</strong>
                      <span>Global Alumni</span>
                    </div>
                    <div className="spot-stat">
                      <strong>0%</strong>
                      <span>Lectures</span>
                    </div>
                  </div>
                </div>

                {/* Signature Quote Box */}
                <div 
                  className="origin-quote-box origin-quote-merged"
                  style={{
                    background: 'linear-gradient(135deg, #091a38 0%, #17386d 100%)',
                    border: '1.5px solid rgba(59, 130, 246, 0.45)',
                    borderRadius: '10px',
                    padding: '0.75rem 1.15rem',
                    color: '#ffffff',
                    boxShadow: '0 4px 16px rgba(9, 26, 56, 0.25)'
                  }}
                >
                  <p 
                    className="origin-quote-text"
                    style={{
                      color: '#ffffff',
                      fontWeight: 600,
                      fontSize: '0.86rem',
                      lineHeight: '1.45',
                      margin: '0 0 0.35rem 0',
                      fontStyle: 'italic',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)'
                    }}
                  >
                    “In computing, learning is not a spectator sport. You don't learn by watching; you learn by building, breaking, debugging, and deploying.”
                  </p>
                  <span 
                    className="quote-author"
                    style={{
                      color: '#fde047',
                      fontWeight: 700,
                      fontSize: '0.74rem',
                      display: 'block'
                    }}
                  >
                    — Prof. Raj Reddy, Turing Award Laureate & MSIT Founding Chair
                  </span>
                </div>
              </div>

              {/* Right Column: 4-Era Evolution Milestones Rail */}
              <div className="journey-rail-col">
                <div className="journey-rail-header">
                  <div className="rail-header-tag-group">
                    <span className="journey-rail-pill">Quarter-Century Evolution</span>
                    <span className="journey-rail-sub">2001 Foundation to 2026 AI Era</span>
                  </div>
                  <span className="journey-rail-note">Active Learning Model</span>
                </div>

                <div className="journey-eras-grid">
                  {/* Era 1: 2001-2005 */}
                  <div className="journey-era-card card-m2001">
                    <div className="journey-card-top">
                      <span className="journey-year-badge">2001–2005</span>
                      <span className="journey-era-label">Inception & Pedagogy</span>
                    </div>
                    <h4>CIHL & CMU Mastery Model</h4>
                    <p>Founded at IIIT Hyderabad under CIHL with Carnegie Mellon guidance. Pioneered 90%+ mastery thresholds and collaborative coding studios under dedicated 1:10 mentors.</p>
                    <div className="journey-card-footer">
                      <CheckCircleIcon size={14} />
                      <span>CIHL & Carnegie Mellon Framework</span>
                    </div>
                  </div>

                  {/* Era 2: 2008-2014 */}
                  <div className="journey-era-card card-m2008">
                    <div className="journey-card-top">
                      <span className="journey-year-badge">2008–2014</span>
                      <span className="journey-era-label">Industry Integration</span>
                    </div>
                    <h4>Pioneering the Practicum</h4>
                    <p>Introduced ~50% programme tenure dedicated to live engineering sprints and production software microservices alongside CETLS and top tech industry partners.</p>
                    <div className="journey-card-footer">
                      <CheckCircleIcon size={14} />
                      <span>~50% Tenure in Real Projects</span>
                    </div>
                  </div>

                  {/* Era 3: 2015-2022 */}
                  <div className="journey-era-card card-m2016">
                    <div className="journey-card-top">
                      <span className="journey-year-badge">2015–2022</span>
                      <span className="journey-era-label">Curriculum & Scale</span>
                    </div>
                    <h4>Domain Tracks & Flexible Rigor</h4>
                    <p>Expanded into Data Science, Machine Learning, and Cloud Full Stack engineering. Adapted sequential online-guided and professional tracks without sacrificing rigor.</p>
                    <div className="journey-card-footer">
                      <CheckCircleIcon size={14} />
                      <span>Data Science, ML & Flexible Pathways</span>
                    </div>
                  </div>

                  {/* Era 4: 2024-2026 */}
                  <div className="journey-era-card card-m2026">
                    <div className="journey-card-top">
                      <span className="journey-year-badge">2024–2026</span>
                      <span className="journey-era-label">AI-Native Frontier</span>
                    </div>
                    <h4>GenAI Studios & 25-Year Legacy</h4>
                    <p>25 graduating cohorts and 3,000+ global alumni, entering the AI-native era with LLMs, autonomous software agents, and enterprise GPU architectures.</p>
                    <div className="journey-card-footer">
                      <CheckCircleIcon size={14} />
                      <span>GenAI Studios & 3,000+ Alumni</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ainative':
        return (
          <div className="slide-content-layout layout-ai-native">
            {/* Left Sidebar */}
            <div className="ai-native-sidebar">
              <img src="/assets/msit-25-logo.png" alt="25 Years of MSIT" className="ai-native-logo" />
              <h2 className="ai-native-title">MSIT at 25:<br/><span className="ai-native-highlight">AI Native</span></h2>
              <p className="ai-native-lead">
                A quarter-century of learning by doing enters its AI-native era.
              </p>
              
              <div className="ai-native-timeline">
                <div className="ai-native-timeline-line"></div>
                
                <div className="ai-native-timeline-item">
                  <div className="ai-native-dot gold"></div>
                  <strong className="ai-native-timeline-heading gold">2000 &bull; Founded by Prof. Raj Reddy</strong>
                  <p className="ai-native-timeline-text">A rigorous master's opening pathways for ambitious engineering graduates.</p>
                </div>
                
                <div className="ai-native-timeline-item">
                  <div className="ai-native-dot gold"></div>
                  <strong className="ai-native-timeline-heading gold">Two decades &bull; The bold pivot</strong>
                  <p className="ai-native-timeline-text">Eliminated passive lectures in favor of collaborative learning by doing.</p>
                </div>
                
                <div className="ai-native-timeline-item">
                  <div className="ai-native-dot white"></div>
                  <strong className="ai-native-timeline-heading white">Year 25 &bull; AI Native relaunch</strong>
                  <p className="ai-native-timeline-text">Re-engineered for an AI-native era of intelligent software and LLMs.</p>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="ai-native-content">
              <span className="ai-native-kicker">THE AI-NATIVE PROGRAM</span>
              
              <div className="ai-native-principles-box">
                <strong className="ai-native-principles-title">Anchored in Professor Raj Reddy's three principles</strong>
                
                <div className="ai-native-principles-pills">
                  <div 
                    className="ai-native-pill"
                    onClick={() => navigate('/curriculum/learning-to-learn')}
                    style={{ cursor: 'pointer' }}
                    title="Click to explore detailed Learning to Learn guide"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') navigate('/curriculum/learning-to-learn'); }}
                  >
                    <div className="ai-native-pill-icon"><BookOpenIcon size={16} /></div>
                    Learning to Learn ↗
                  </div>
                  <div 
                    className="ai-native-pill"
                    onClick={() => navigate('/curriculum/learning-to-think')}
                    style={{ cursor: 'pointer' }}
                    title="Click to explore detailed Learning to Think guide"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') navigate('/curriculum/learning-to-think'); }}
                  >
                    <div className="ai-native-pill-icon"><CpuIcon size={16} /></div>
                    Learning to Think ↗
                  </div>
                  <div 
                    className="ai-native-pill"
                    onClick={() => navigate('/curriculum/learning-to-do')}
                    style={{ cursor: 'pointer' }}
                    title="Click to explore detailed Learning to Do guide"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') navigate('/curriculum/learning-to-do'); }}
                  >
                    <div className="ai-native-pill-icon"><BriefcaseIcon size={16} /></div>
                    Learning to Do ↗
                  </div>
                </div>
                
                <p className="ai-native-principles-desc">
                  Practised with AI tools and technologies, so students stay relevant in the modern world.
                </p>
              </div>

              <div className="ai-native-pillars-grid">
                <div className="ai-native-pillar-card">
                  <div className="ai-native-card-icon"><BriefcaseIcon size={18} /></div>
                  <strong className="ai-native-card-title">Industry Co-op</strong>
                  <p className="ai-native-card-desc">~50% tenure solving real corporate engineering problems under the guidance of tech leaders.</p>
                </div>
                
                <div className="ai-native-pillar-card">
                  <div className="ai-native-card-icon"><SparklesIcon size={18} /></div>
                  <strong className="ai-native-card-title">Venture Studio</strong>
                  <p className="ai-native-card-desc">Hands-on product building and system prototyping alongside early-stage venture mentors.</p>
                </div>

                <div className="ai-native-pillar-card">
                  <div className="ai-native-card-icon"><UsersIcon size={18} /></div>
                  <strong className="ai-native-card-title">Partnership with CETLS</strong>
                  <p className="ai-native-card-desc">Curriculum co-designed with CETLS at IIIT-H using learning science to continuously optimize studios.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'placements':
        return (
          <div className="slide-content-layout layout-top-placements">
            <div className="placements-header-banner">
              <span className="banner-stat-pill">Verified Alumni Placements</span>
              <span className="banner-subtext">Packages shown represent actual compensation brackets achieved by MSIT graduates</span>
            </div>

            <div className="placements-grid-showcase">
              {/* Card 1: 40 LPA+ */}
              <div className="placement-package-card card-tier-highest">
                <div className="package-top-row">
                  <span className="package-tag highest">Highest Offer Bracket</span>
                  <span className="package-amount">₹40 LPA+</span>
                </div>
                <h4 className="placement-role-title">Full-Stack AI Systems Architect</h4>
                <p className="placement-desc">Designing multi-region enterprise AI pipelines, autonomous LLM agent clusters, and fault-tolerant cloud backends.</p>
                <div className="placement-trajectory-bar">
                  <span className="traj-label">Trajectory:</span>
                  <span className="traj-step">Tier-3 Undergrad</span>
                  <span className="traj-arrow">➔</span>
                  <span className="traj-step">MSIT Studio Track</span>
                  <span className="traj-arrow">➔</span>
                  <span className="traj-step dest">Principal Tier-1 Role</span>
                </div>
              </div>

              {/* Card 2: 32 LPA+ */}
              <div className="placement-package-card card-tier-high">
                <div className="package-top-row">
                  <span className="package-tag fintech">FinTech & Quantitative Systems</span>
                  <span className="package-amount">₹32 LPA+</span>
                </div>
                <h4 className="placement-role-title">Algorithmic Trading & Low-Latency Engineer</h4>
                <p className="placement-desc">Building ultra-low-latency order matching engines, high-frequency data streams, and quantitative financial computing layers.</p>
                <div className="placement-trajectory-bar">
                  <span className="traj-label">Trajectory:</span>
                  <span className="traj-step">B.Tech (ECE / EEE)</span>
                  <span className="traj-arrow">➔</span>
                  <span className="traj-step">Distributed Systems Studio</span>
                  <span className="traj-arrow">➔</span>
                  <span className="traj-step dest">Global FinTech</span>
                </div>
              </div>

              {/* Card 3: 28 LPA+ */}
              <div className="placement-package-card card-tier-ai">
                <div className="package-top-row">
                  <span className="package-tag ai">Applied AI & Machine Learning</span>
                  <span className="package-amount">₹28 LPA+</span>
                </div>
                <h4 className="placement-role-title">Machine Learning Systems Engineer</h4>
                <p className="placement-desc">Fine-tuning domain-specific foundation models, RAG vector architectures, and deploying real-time inference microservices.</p>
                <div className="placement-trajectory-bar">
                  <span className="traj-label">Trajectory:</span>
                  <span className="traj-step">Non-CS (Mechanical)</span>
                  <span className="traj-arrow">➔</span>
                  <span className="traj-step">MSIT AI/ML Labs</span>
                  <span className="traj-arrow">➔</span>
                  <span className="traj-step dest">Lead AI Engineer</span>
                </div>
              </div>

              {/* Card 4: 24 LPA+ */}
              <div className="placement-package-card card-tier-cloud">
                <div className="package-top-row">
                  <span className="package-tag cloud">Global Cloud & Infrastructure</span>
                  <span className="package-amount">₹24 LPA+</span>
                </div>
                <h4 className="placement-role-title">Senior Distributed Systems Engineer</h4>
                <p className="placement-desc">Managing high-throughput Kubernetes microservices, distributed caching clusters, and zero-downtime database layers.</p>
                <div className="placement-trajectory-bar">
                  <span className="traj-label">Trajectory:</span>
                  <span className="traj-step">B.Tech CS / IT</span>
                  <span className="traj-arrow">➔</span>
                  <span className="traj-step">Cloud Practicum</span>
                  <span className="traj-arrow">➔</span>
                  <span className="traj-step dest">Cloud Platform Lead</span>
                </div>
              </div>

              {/* Card 5: 20 LPA+ */}
              <div className="placement-package-card card-tier-edge">
                <div className="package-top-row">
                  <span className="package-tag edge">Hardware & Edge AI Systems</span>
                  <span className="package-amount">₹20 LPA+</span>
                </div>
                <h4 className="placement-role-title">Principal Firmware & Accelerator Architect</h4>
                <p className="placement-desc">Optimizing low-power neural processing units (NPUs), embedded Linux kernels, and real-time edge computing modules.</p>
                <div className="placement-trajectory-bar">
                  <span className="traj-label">Trajectory:</span>
                  <span className="traj-step">ECE / EEE Undergrad</span>
                  <span className="traj-arrow">➔</span>
                  <span className="traj-step">Hardware Studio</span>
                  <span className="traj-arrow">➔</span>
                  <span className="traj-step dest">Edge AI Systems</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'backgrounds':
        return (
          <div className="slide-content-layout layout-student-transformations">
            <div className="dual-btech-grid">
              {/* Panel 1: Non-CS B.Tech Graduates */}
              <div className="dual-btech-card card-non-cs">
                <div className="btech-card-header">
                  <span className="btech-badge non-cs">Non-CS Graduates</span>
                  <h3 className="btech-headline">ECE, EEE, Mechanical & Allied Branches</h3>
                </div>

                <div className="btech-transformation-rows">
                  <div className="btech-row past">
                    <span className="phase-pill past-pill">Before MSIT</span>
                    <p>Theory-heavy curriculum with zero production coding or systems experience.</p>
                  </div>

                  <div className="btech-row msit">
                    <span className="phase-pill msit-pill">At MSIT</span>
                    <p>Foundational immersion in programming, data structures, and AI tutoring.</p>
                  </div>

                  <div className="btech-row outcome">
                    <span className="phase-pill outcome-pill">Outcome</span>
                    <p>Production full-stack capability, completely erasing the non-CS divide.</p>
                  </div>
                </div>
              </div>

              {/* Panel 2: CS & IT Freshers */}
              <div className="dual-btech-card card-freshers">
                <div className="btech-card-header">
                  <span className="btech-badge freshers">CS & IT Freshers</span>
                  <h3 className="btech-headline">Computer Science & IT Graduates</h3>
                </div>

                <div className="btech-transformation-rows">
                  <div className="btech-row past">
                    <span className="phase-pill past-pill">Before MSIT</span>
                    <p>Classroom exams without real-world deployments or team git workflows.</p>
                  </div>

                  <div className="btech-row msit">
                    <span className="phase-pill msit-pill">At MSIT</span>
                    <p>Daily studio sprints building microservices alongside AI copilots.</p>
                  </div>

                  <div className="btech-row outcome">
                    <span className="phase-pill outcome-pill">Outcome</span>
                    <p>Job-ready AI software engineers commanding top-tier product roles.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 3 Core Shifts */}
            <div className="edu-pillars-strip">
              <div className="edu-pillar-item">
                <span className="pillar-shift-badge">PEDAGOGY</span>
                <strong>Zero Lectures</strong>
                <p>100% active studio software development</p>
              </div>

              <div className="edu-pillar-divider"></div>

              <div className="edu-pillar-item">
                <span className="pillar-shift-badge">AI NATIVE</span>
                <strong>Copilot Studios</strong>
                <p>Real-world LLM & agent pair programming</p>
              </div>

              <div className="edu-pillar-divider"></div>

              <div className="edu-pillar-item">
                <span className="pillar-shift-badge">EXPERIENCE</span>
                <strong>50% Practicum</strong>
                <p>Extended corporate tenure with industry mentors</p>
              </div>
            </div>
          </div>
        );

      case 'events':
        return (
          <div className="slide-content-layout layout-events-community">
            <div className="campus-editorial-container">
              {/* Left Column: Pure Clean Typography & Flow (No Boxes) */}
              <div className="campus-text-column">
                <div className="campus-intro-block">
                  <span className="campus-kicker">66-Acre Research Campus · Gachibowli</span>
                  <h3 className="campus-lead-heading">A Balanced Ecosystem for Growth, Recreation & Community</h3>
                  <p className="campus-lead-narrative">
                    Life at IIIT Hyderabad blends high-rigour computing studios with an open, green residential atmosphere designed for well-being and collaboration.
                  </p>
                </div>

                {/* Minimal Highlights (Clean, Unboxed, Dot Accents) */}
                <div className="campus-feature-list">
                  <div className="campus-feature-row">
                    <span className="feature-indicator green"></span>
                    <div className="feature-text">
                      <strong>Green Residential Campus</strong>
                      <span>Pedestrian-friendly pathways, vast central library, and 24/7 collaborative computing labs.</span>
                    </div>
                  </div>

                  <div className="campus-feature-row">
                    <span className="feature-indicator blue"></span>
                    <div className="feature-text">
                      <strong>Sports & Fitness Amenities</strong>
                      <span>Football and cricket grounds, tennis & basketball courts, badminton, indoor games, gym, and yoga.</span>
                    </div>
                  </div>

                  <div className="campus-feature-row">
                    <span className="feature-indicator amber"></span>
                    <div className="feature-text">
                      <strong>Student Clubs & Creative Arts</strong>
                      <span>Active student societies across robotics, coding, music, dance, dramatics, literature, and visual arts.</span>
                    </div>
                  </div>

                  <div className="campus-feature-row">
                    <span className="feature-indicator purple"></span>
                    <div className="feature-text">
                      <strong>Collaborative Peer Community</strong>
                      <span>A close-knit, supportive campus culture building lasting camaraderie, peer learning, and lifelong networks.</span>
                    </div>
                  </div>
                </div>

                {/* Minimalist Official Link Button */}
                <div className="campus-action-area">
                  <a
                    href="https://www.iiit.ac.in/life-on-campus/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="campus-clean-portal-link"
                    aria-label="Visit IIIT Hyderabad Life on Campus Official Website"
                  >
                    <span>Explore Life on Campus at IIIT Hyderabad</span>
                    <ArrowRightIcon size={16} />
                  </a>
                  <span className="campus-link-caption">Official portal with campus details & photos ↗</span>
                </div>
              </div>

              {/* Right Column: Framed Campus Life Photo Montage */}
              <div className="campus-visual-column">
                <div className="campus-visual-frame">
                  <img 
                    src="/assets/iiit-campus-life.jpg" 
                    alt="Life on Campus IIIT Hyderabad" 
                    className="campus-visual-img"
                  />
                  <div className="campus-visual-floating-tag">
                    <span>IIIT Hyderabad · Life on Campus</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'practicum':
        return (
          <div className="slide-content-layout layout-coop-practicum">
            <div className="practicum-stats-strip">
              <div className="p-stat-box">
                <strong className="p-stat-number">50 / 50</strong>
                <span className="p-stat-label">Learning & Projects</span>
                <span className="p-stat-detail">Working with CETLS</span>
              </div>
              <div className="p-stat-box">
                <strong className="p-stat-number">100%</strong>
                <span className="p-stat-label">Industry Aligned</span>
                <span className="p-stat-detail">Real-world Problem Solving</span>
              </div>
            </div>

            <div className="practicum-details-grid">
              <div className="practicum-text-card">
                <h4>Why the MSIT Real-World Practicum is Transformative</h4>
                <ul className="practicum-benefits-list">
                  <li>
                    <CheckCircleIcon size={18} />
                    <span><strong>Industry-Integrated Learning:</strong> Master cutting-edge technologies by working on real-world problems, directly aligning your skills with industry requirements.</span>
                  </li>
                  <li>
                    <CheckCircleIcon size={18} />
                    <span><strong>Live Production Codebase Exposure:</strong> Interns work on actual customer-facing microservices, CI/CD pipelines, and cloud systems in collaboration with CETLS.</span>
                  </li>
                  <li>
                    <CheckCircleIcon size={18} />
                    <span><strong>Prime Gachibowli Location:</strong> Companies are located right around the campus in HITEC City and the Financial District, providing effortless connectivity.</span>
                  </li>
                </ul>
              </div>

              <div className="practicum-image-card">
                <img 
                  src="/assets/iiit-coop.jpg" 
                  alt="Corporate Practicum" 
                  className="practicum-coop-img"
                />
                <div className="practicum-img-caption">
                  <strong>Embedded in Premier Engineering Divisions</strong>
                  <span>MSIT students working alongside senior software architects and technology leaders</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'admissions':
        return (
          <div className="slide-content-layout layout-admissions-gateway">
            <div className="admissions-split-grid">
              {/* Left Column: Eligibility Criteria & 3-Step Pathway */}
              <div className="admissions-process-col">
                {/* 1. Eligibility Criteria */}
                <div className="admissions-eligibility-card">
                  <div className="admissions-card-header">
                    <span className="admissions-section-tag">CRITERIA</span>
                    <h4>Eligibility Requirements</h4>
                  </div>
                  <div className="eligibility-points-list">
                    <div className="eligibility-item">
                      <span className="eligibility-check-badge">✓</span>
                      <div className="eligibility-text">
                        <strong>B.Tech / B.E (All Engineering Disciplines)</strong>
                        <span>Open to graduates from CSE, ECE, EEE, Mechanical, Civil, IT & all allied engineering streams.</span>
                      </div>
                    </div>
                    <div className="eligibility-item">
                      <span className="eligibility-check-badge">✓</span>
                      <div className="eligibility-text">
                        <strong>Final-Year Engineering Students</strong>
                        <span>Students graduating in 2026 or 2027 can apply and secure advance admission prior to final semester results.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. 3-Step Selection Process */}
                <div className="admissions-steps-card">
                  <div className="admissions-card-header">
                    <span className="admissions-section-tag">PROCESS</span>
                    <h4>3-Step Admission Pathway</h4>
                  </div>
                  <div className="steps-horizontal-list">
                    <div className="step-item">
                      <span className="step-num">01</span>
                      <strong>Online Registration</strong>
                      <span>Fill the quick online form and upload academic records.</span>
                    </div>
                    <div className="step-item">
                      <span className="step-num">02</span>
                      <strong>Aptitude Evaluation</strong>
                      <span>Qualify via GAT (Graduate Aptitude Test) or national GATE score.</span>
                    </div>
                    <div className="step-item">
                      <span className="step-num">03</span>
                      <strong>Studio Allotment</strong>
                      <span>Interactive interview, domain seat allocation & cohort onboarding.</span>
                    </div>
                  </div>
                </div>

                {/* 3. Action CTA Banner */}
                <div className="admissions-cta-banner">
                  <div className="cta-banner-info">
                    <span className="cta-status-badge">
                      Admissions Opening Soon • Academic Year 2027
                    </span>
                    <h3 className="cta-banner-heading">
                      Begin Your Master's in Computing
                    </h3>
                    <p className="cta-banner-desc">
                      Sign in now to register your interest, prepare your application, and reserve your studio seat early.
                    </p>
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-primary admissions-big-cta"
                    onClick={onGoToSignIn}
                  >
                    <span>Student Portal / Apply Now ➔</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Full Campus Image Showcase & Consortium Facts */}
              <div className="admissions-campus-col">
                <div className="campus-showcase-card">
                  {/* Full Campus Photo Container - No Cropping */}
                  <div className="campus-full-photo-frame">
                    <img 
                      src="/assets/iiit-campus.jpg" 
                      alt="IIIT Hyderabad Campus - Academic Block" 
                      className="campus-full-img"
                    />
                    <div className="campus-photo-overlay-tag">
                      <span className="photo-pin-icon">📍</span>
                      <span>IIIT Hyderabad • Academic Block</span>
                    </div>
                  </div>

                  {/* Program Context & Metrics */}
                  <div className="campus-showcase-content">
                    <div className="consortium-header-group">
                      <span className="consortium-pill">Master's Degree</span>
                      <span className="consortium-sub">Offered by IIITH</span>
                    </div>
                    <h3>Offered Exclusively by IIIT Hyderabad</h3>
                    <p className="campus-desc">
                      Offered exclusively by IIIT Hyderabad (IIITH) with a 25+ year legacy of computing innovation and academic excellence.
                    </p>

                    <div className="campus-metrics-grid">
                      <div className="campus-metric-box">
                        <strong>25+</strong>
                        <span>Years Legacy</span>
                      </div>
                      <div className="campus-metric-box">
                        <strong>100%</strong>
                        <span>Active Studios</span>
                      </div>
                      <div className="campus-metric-box">
                        <strong>~50%</strong>
                        <span>Corporate Co-op</span>
                      </div>
                      <div className="campus-metric-box">
                        <strong>3,000+</strong>
                        <span>Alumni Network</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className="fullscreen-slideshow-root"
      onClickCapture={handleUserAction}
      onTouchStartCapture={handleUserAction}
      onScrollCapture={handleUserAction}
    >
      {/* Top Full-Width Navigation Bar */}
      <header className="fullscreen-top-bar">
        <div className="top-bar-left">
          <button 
            type="button" 
            className="top-bar-back-btn" 
            onClick={onBack}
            aria-label="Back to Gateway"
          >
            <span className="back-btn-text-full">← Back to Gateway</span>
            <span className="back-btn-text-short">← Gateway</span>
          </button>

          <div className="top-bar-brand">
            <img
              src="/assets/msit-25-logo.png"
              alt="25 Years of MSIT"
              style={{ objectFit: 'contain', borderRadius: '6px' }}

              width="32"
              height="32"
            />
            <span className="top-bar-title">Know About MSIT</span>
          </div>
        </div>

        {/* Quick Jump Category Strip (All 6 Slides) */}
        <nav className="top-bar-category-nav" aria-label="Slideshow Navigation">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              className={`top-category-pill ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(idx)}
            >
              <span className="pill-label">{s.shortCategory || s.category.split(' & ')[0]}</span>
            </button>
          ))}
        </nav>

        <div className="top-bar-right">
          <button 
            type="button" 
            className="btn btn-primary top-bar-signin-btn"
            onClick={onGoToSignIn}
          >
            <span>Sign In ➔</span>
          </button>
        </div>
      </header>

      {/* Full-Screen Horizontal Sliding Track */}
      <main 
        className="fullscreen-stage-viewport"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Visual 10-Second Auto-Advance Progress Bar */}
        <div className="fullscreen-timer-bar" key={`${currentSlide}-${timerResetKey}`}>
          <div className="fullscreen-timer-fill"></div>
        </div>

        <div 
          className="fullscreen-slides-track"
          style={{ transform: `translate3d(-${currentSlide * 100}vw, 0, 0)` }}
        >
          {slides.map((slideItem, idx) => (
            <article 
              key={slideItem.id}
              className={`fullscreen-slide-item ${slideItem.themeClass} ${idx === currentSlide ? 'is-active-slide' : ''}`}
            >
              {/* Dynamic Slide Stage Container */}
              <div className={`fullscreen-slide-stage stage-${slideItem.id}`}>
                {/* Header Meta Row */}
                {slideItem.id !== 'ainative' && (
                  <div className="slide-header-meta">
                  <div className="slide-meta-top-row">
                    <span className="fullscreen-category-badge">{slideItem.category}</span>
                    <span className="mobile-desktop-hint-pill">💻 For detailed view & full info, use desktop</span>
                  </div>
                  <h1 className="fullscreen-slide-title">{slideItem.title}</h1>
                  <p className="fullscreen-slide-lead">{slideItem.lead}</p>
                </div>
                )}

                {/* Render Bespoke Non-Interactive Slide Content */}
                <div className="slide-body-container">
                  {renderSlideContent(slideItem)}
                </div>

                {/* Integrated Controls Bar at bottom of stage */}
                <div className={`fullscreen-controls-bar controls-${slideItem.id}`}>
                  <div className="controls-nav-group">
                    <button 
                      type="button" 
                      className="controls-nav-btn prev"
                      onClick={prevSlide}
                      aria-label="Previous Slide"
                    >
                      ❮ Prev
                    </button>
                    <button 
                      type="button" 
                      className="controls-nav-btn next"
                      onClick={nextSlide}
                      aria-label="Next Slide"
                    >
                      Next ❯
                    </button>
                  </div>

                  <div className="controls-center-group">
                    <span className="slide-counter-badge">{idx + 1} / {totalSlides}</span>
                    <span className="controls-keyboard-hint">Keyboard: ← / →</span>
                  </div>

                  <button 
                    type="button" 
                    className="btn btn-primary controls-cta-btn"
                    onClick={onGoToSignIn}
                  >
                    <span>Student Sign In ➔</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
