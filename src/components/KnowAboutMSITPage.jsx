import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  BuildingIcon, DownloadIcon, ArrowRightIcon,
  GraduationCapIcon, CpuIcon, BookOpenIcon, BriefcaseIcon, ShieldCheckIcon, AwardIcon,
  SparklesIcon, UsersIcon, CheckCircleIcon, CalendarIcon
} from './Icons';

export default function KnowAboutMSITPage({ onBack, onGoToSignIn }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timerResetKey, setTimerResetKey] = useState(0);
  const timerRef = useRef(null);

  // 7 Slides Definition with Theme Color Palettes and Bespoke Layouts
  const slides = [
    {
      id: 'origin',
      number: '01',
      category: 'HOW IT STARTED',
      themeClass: 'slide-theme-origin',
      layoutClass: 'slide-layout-origin',
      title: 'The Origin Story: 25 Years of Active Learning',
      lead: 'Founded in 2001 under the visionary direction of Turing Laureate Prof. Raj Reddy, MSIT was created to replace passive classroom lectures with immersive, studio-based software engineering.',
      image: 'https://www.rguktong.ac.in/img/rajreddy.jpg',
      imageCaption: 'Prof. Raj Reddy — Turing Award Laureate & Founding Chair'
    },
    {
      id: 'journey',
      number: '02',
      category: 'JOURNEY & EVOLUTION',
      themeClass: 'slide-theme-journey',
      layoutClass: 'slide-layout-journey',
      title: 'The 25-Year Journey: From Inception in 2001 to the AI Era',
      lead: 'Launched in 2001 under the Consortium of Institutions of Higher Learning (CIHL) with Carnegie Mellon University guidance, MSIT has evolved over a quarter-century into India’s flagship active-learning computing master’s.',
      image: '/assets/iiit-campus.jpg',
      imageCaption: '25 Years of Continuous Computing Pedagogy Evolution at IIIT Hyderabad'
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
      number: '03',
      category: 'MSIT AT 25: AI NATIVE',
      themeClass: 'slide-theme-ainative',
      layoutClass: 'slide-layout-ainative',
      title: 'A quarter-century of learning by doing enters its AI-native era.',
      lead: 'Anchored in Professor Raj Reddy’s three principles: Learning to Learn, Learning to Think, Learning to Do.',
      image: '/assets/msit-25-logo.png',
      imageCaption: '25 Years of MSIT'
    },
    {
      id: 'backgrounds',
      number: '04',
      category: 'B.TECH TRANSFORMATION & AI PEDAGOGY',
      themeClass: 'slide-theme-backgrounds',
      layoutClass: 'slide-layout-backgrounds',
      title: 'How B.Tech Graduates Transform into AI-Native Engineers',
      lead: 'Engineered exclusively for B.Tech engineers. Discover how AI-assisted studio learning, copilot pair programming, and paid corporate co-ops bridge the gap to elite software and AI roles.',
      image: '/assets/iiit-ai-lab.jpg',
      imageCaption: 'The MSIT Studio Learning Environment at IIIT Hyderabad'
    },
    {
      id: 'events',
      number: '05',
      category: 'CAMPUS LIFE',
      themeClass: 'slide-theme-events',
      layoutClass: 'slide-layout-events',
      title: 'Life on Campus at IIIT Hyderabad',
      lead: 'A vibrant 66-acre green research campus offering an enriching student experience with modern sports, technical clubs, and active community life.',
      image: '/assets/iiit-campus-life.jpg',
      imageCaption: 'Life on Campus — 66-Acre Green Research Campus at IIIT Hyderabad'
    },
    {
      id: 'practicum',
      number: '06',
      category: 'REAL-WORLD PRACTICUM',
      themeClass: 'slide-theme-practicum',
      layoutClass: 'slide-layout-practicum',
      title: 'Real-World Practicum: 50% Learning, 50% Projects',
      lead: 'Spend ~50% of your postgraduate programme embedded directly in real-world projects working with CETL and mastering industry-relevant skills.',
      image: '/assets/iiit-coop.jpg',
      imageCaption: 'Corporate Co-op Practicum at Premier Tech Offices in Gachibowli'
    },
    {
      id: 'admissions',
      number: '07',
      category: 'BEGIN YOUR JOURNEY',
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
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [handleUserAction, totalSlides]);

  const prevSlide = useCallback(() => {
    handleUserAction();
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [handleUserAction, totalSlides]);

  const goToSlide = useCallback((index) => {
    handleUserAction();
    setCurrentSlide(index);
  }, [handleUserAction]);

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
          <div className="slide-content-layout layout-origin-story">
            <div className="origin-main-grid">
              {/* Left Column: Narrative Cards */}
              <div className="origin-text-cards">
                <div className="origin-highlight-card">
                  <div className="origin-icon-box"><AwardIcon size={22} /></div>
                  <div>
                    <h4>The 2001 Catalyst</h4>
                    <p>Traditional universities were churning out graduates trained on blackboard memorization who couldn't write 20 lines of production code. Prof. Raj Reddy, then Dean of Computer Science at Carnegie Mellon University (CMU), envisioned a radical experiment: eliminate lectures and teach computing purely through active studio practice.</p>
                  </div>
                </div>

                <div className="origin-highlight-card">
                  <div className="origin-icon-box"><CpuIcon size={22} /></div>
                  <div>
                    <h4>Carnegie Mellon Pedagogy in India</h4>
                    <p>MSIT adopted the active-learning framework of CMU's Software Engineering Institute: students work 9 AM to 6 PM in teams, building production-grade software under dedicated industry mentors.</p>
                  </div>
                </div>

                <div className="origin-highlight-card">
                  <div className="origin-icon-box"><BuildingIcon size={22} /></div>
                  <div>
                    <h4>The CIHL University Consortium</h4>
                    <p>Instituted under the Consortium of Institutions of Higher Learning (CIHL) with IIIT Hyderabad alongside premier state universities: JNTU Hyderabad, JNTU Kakinada, JNTU Anantapur, and Sri Venkateswara University.</p>
                  </div>
                </div>

                <div 
                  className="origin-quote-box"
                  style={{
                    background: 'linear-gradient(135deg, #091a38 0%, #17386d 100%)',
                    border: '1.5px solid rgba(59, 130, 246, 0.45)',
                    borderRadius: '10px',
                    padding: '1rem 1.3rem',
                    color: '#ffffff',
                    boxShadow: '0 4px 16px rgba(9, 26, 56, 0.25)'
                  }}
                >
                  <p 
                    className="origin-quote-text"
                    style={{
                      color: '#ffffff',
                      fontWeight: 600,
                      fontSize: '0.92rem',
                      lineHeight: '1.5',
                      margin: '0 0 0.45rem 0',
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
                      fontSize: '0.78rem',
                      display: 'block'
                    }}
                  >
                    — Prof. Raj Reddy, Turing Award Laureate & MSIT Founding Chair
                  </span>
                </div>
              </div>

              {/* Right Column: Hero Portrait Spotlight Card */}
              <div className="origin-portrait-spotlight">
                <div className="spotlight-card">
                  <div className="spotlight-img-frame">
                    <img 
                      src="https://www.rguktong.ac.in/img/rajreddy.jpg" 
                      alt="" 
                      className="spotlight-img-backdrop"
                      aria-hidden="true"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/rajreddy.jpg';
                      }}
                    />
                    <img 
                      src="https://www.rguktong.ac.in/img/rajreddy.jpg" 
                      alt="Prof. Raj Reddy - Turing Award Laureate & MSIT Founding Chair" 
                      className="spotlight-portrait-img"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/rajreddy.jpg';
                      }}
                    />
                  </div>
                  <div className="spotlight-meta">
                    <span className="spotlight-badge">Academic Visionary</span>
                    <h3 className="spotlight-name">Prof. Raj Reddy</h3>
                    <p className="spotlight-desc">Turing Award Laureate in AI (1994), Former Dean of School of Computer Science at Carnegie Mellon University, and Founding Father of MSIT.</p>
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
                </div>
              </div>
            </div>
          </div>
        );

      case 'journey':
        return (
          <div className="slide-content-layout layout-journey-evolution">
            <div className="journey-milestones-grid">
              {/* Milestone 1: 2001 */}
              <div className="journey-milestone-card card-m2001">
                <div className="journey-card-top">
                  <span className="journey-year-badge">2001</span>
                  <span className="journey-era-label">Consortium Inception</span>
                </div>
                <h4>Launched by CIHL & CMU Collaboration</h4>
                <p>Created under the Consortium of Institutions of Higher Learning (CIHL) at IIIT Hyderabad under the guidance of Turing Laureate Prof. Raj Reddy. Developed with researchers from Carnegie Mellon University (CMU) to replace passive blackboard lectures with project-centered computing.</p>
                <div className="journey-card-footer">
                  <CheckCircleIcon size={14} />
                  <span>CIHL & Carnegie Mellon Course Framework</span>
                </div>
              </div>

              {/* Milestone 2: 2002-2005 */}
              <div className="journey-milestone-card card-m2004">
                <div className="journey-card-top">
                  <span className="journey-year-badge">2002–2005</span>
                  <span className="journey-era-label">Pedagogy Breakthrough</span>
                </div>
                <h4>The "Mastery Learning" Paradigm</h4>
                <p>Pioneered the "Time-Variable, Outcome-Constant" model: students must demonstrate 90%+ mastery ('A' grade) before advancing. Instituted 100% full-time 9 AM to 6 PM collaborative coding studios with a dedicated 1:10 personal mentor ratio.</p>
                <div className="journey-card-footer">
                  <CheckCircleIcon size={14} />
                  <span>90%+ Mastery Threshold & Studio Model</span>
                </div>
              </div>

              {/* Milestone 3: 2008 */}
              <div className="journey-milestone-card card-m2008">
                <div className="journey-card-top">
                  <span className="journey-year-badge">2008</span>
                  <span className="journey-era-label">Industry Integration</span>
                </div>
                <h4>Pioneering the Real-World Practicum</h4>
                <p>Introduced an immersive practicum model where students spend nearly half their master's working directly on real-world engineering sprints and production-grade software projects alongside industry experts and CETL.</p>
                <div className="journey-card-footer">
                  <CheckCircleIcon size={14} />
                  <span>~50% Tenure in Real-World Projects</span>
                </div>
              </div>

              {/* Milestone 4: 2015-2018 */}
              <div className="journey-milestone-card card-m2016">
                <div className="journey-card-top">
                  <span className="journey-year-badge">2015–2018</span>
                  <span className="journey-era-label">Cloud Systems Era</span>
                </div>
                <h4>Cloud & Distributed Systems Modernization</h4>
                <p>Modernized the curriculum into distributed computing, microservices, containerization, and data engineering pipelines. MSIT alumni footprint expanded significantly across Silicon Valley, Europe, and leading global product engineering centers.</p>
                <div className="journey-card-footer">
                  <CheckCircleIcon size={14} />
                  <span>Distributed Systems & Cloud-Native Studios</span>
                </div>
              </div>

              {/* Milestone 5: 2020-2022 */}
              <div className="journey-milestone-card card-m2020">
                <div className="journey-card-top">
                  <span className="journey-year-badge">2020–2022</span>
                  <span className="journey-era-label">Digital Transformation</span>
                </div>
                <h4>Flexible Mastery & Hybrid Restructuring</h4>
                <p>Restructured in response to global remote learning to introduce personalized, hybrid formats alongside staggered rolling admissions. Enabled self-paced progression and individual mentor code reviews without compromising hands-on rigor.</p>
                <div className="journey-card-footer">
                  <CheckCircleIcon size={14} />
                  <span>Hybrid Learning & Rolling Admissions</span>
                </div>
              </div>

              {/* Milestone 6: 2024-2026 */}
              <div className="journey-milestone-card card-m2026">
                <div className="journey-card-top">
                  <span className="journey-year-badge">2024–2026</span>
                  <span className="journey-era-label">AI-Native Era</span>
                </div>
                <h4>Generative AI & 25-Year Excellence Legacy</h4>
                <p>Completing 25 continuous batches with over 3,000 global alumni. Full-scale curriculum expansion into Large Language Models (LLMs), autonomous AI agents, GPU clusters, and high-performance computing architectures.</p>
                <div className="journey-card-footer">
                  <CheckCircleIcon size={14} />
                  <span>GenAI Studios & 3,000+ Global Alumni</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ainative':
        return (
          <div className="slide-content-layout layout-ai-native" style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', minHeight: 'calc(100% + 2.7rem)', margin: '-1.5rem -3.5rem -1.2rem -3.5rem', alignItems: 'stretch', backgroundColor: '#ffffff' }}>
            {/* Left Sidebar */}
            <div style={{ background: 'linear-gradient(145deg, #0b2a6b 0%, #1e3a8a 100%)', color: '#fff', padding: '3rem 2.2rem 3rem 5.7rem', display: 'flex', flexDirection: 'column' }}>
              <img src="/assets/msit-25-logo.png" alt="25 Years of MSIT" style={{ width: '110px', marginBottom: '1.5rem', alignSelf: 'flex-start', background: '#fff', borderRadius: '10px', padding: '0.4rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '0.5rem', lineHeight: 1.15, letterSpacing: '-0.02em', color: '#ffffff' }}>MSIT at 25:<br/><span style={{ color: '#fcd34d' }}>AI Native</span></h2>
              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '2rem', lineHeight: 1.5 }}>
                A quarter-century of learning by doing enters its AI-native era.
              </p>
              
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '7px', top: '20px', width: '1px', height: 'calc(100% - 30px)', backgroundColor: 'rgba(255,255,255,0.15)' }}></div>
                
                <div style={{ position: 'relative', paddingLeft: '2.2rem' }}>
                  <div style={{ position: 'absolute', left: 0, top: '5px', width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#fcd34d' }}></div>
                  <strong style={{ display: 'block', fontSize: '0.85rem', color: '#fcd34d', marginBottom: '0.2rem' }}>2000 &bull; Founded by Professor Raj Reddy</strong>
                  <p style={{ fontSize: '0.8rem', color: '#cbd5e1', margin: 0, lineHeight: 1.4 }}>A two-year master's program for talented students who had no path to the elite universities.</p>
                </div>
                
                <div style={{ position: 'relative', paddingLeft: '2.2rem' }}>
                  <div style={{ position: 'absolute', left: 0, top: '5px', width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#fcd34d' }}></div>
                  <strong style={{ display: 'block', fontSize: '0.85rem', color: '#fcd34d', marginBottom: '0.2rem' }}>Two decades &bull; The bold pivot</strong>
                  <p style={{ fontSize: '0.8rem', color: '#cbd5e1', margin: 0, lineHeight: 1.4 }}>Lecture-based teaching minimized; project-based learning by doing, paired with soft skills, at the core.</p>
                </div>
                
                <div style={{ position: 'relative', paddingLeft: '2.2rem' }}>
                  <div style={{ position: 'absolute', left: 0, top: '5px', width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#ffffff' }}></div>
                  <strong style={{ display: 'block', fontSize: '0.85rem', color: '#ffffff', marginBottom: '0.2rem' }}>Year 25 &bull; AI Native relaunch</strong>
                  <p style={{ fontSize: '0.8rem', color: '#cbd5e1', margin: 0, lineHeight: 1.4 }}>Ready for a modern world where cognitive technologies like AI are ubiquitous.</p>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div style={{ display: 'flex', flexDirection: 'column', padding: '3rem 7rem 3rem 2.2rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '1rem' }}>THE AI-NATIVE PROGRAM</span>
              
              <div style={{ backgroundColor: '#fffbeb', borderRadius: '12px', padding: '1.4rem 1.8rem', marginBottom: '1.5rem' }}>
                <strong style={{ display: 'block', fontSize: '0.95rem', color: '#1e293b', marginBottom: '1rem' }}>Anchored in Professor Raj Reddy's three principles</strong>
                
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: '#1e3a8a', fontSize: '0.95rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#1d4ed8', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BookOpenIcon size={16} /></div>
                    Learning to Learn
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: '#1e3a8a', fontSize: '0.95rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#1d4ed8', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CpuIcon size={16} /></div>
                    Learning to Think
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: '#1e3a8a', fontSize: '0.95rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#1d4ed8', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BriefcaseIcon size={16} /></div>
                    Learning to Do
                  </div>
                </div>
                
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                  Practised with AI tools and technologies, so students stay relevant in the modern world.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '1.4rem 1.4rem', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#1d4ed8', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}><BriefcaseIcon size={18} /></div>
                  <strong style={{ fontSize: '1rem', color: '#1e293b', marginBottom: '0.8rem' }}>Industry Co-op</strong>
                  <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>Half of the program is spent in industry co-ops, solving real problems under the supervision of practitioners and mentors.</p>
                </div>
                
                <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '1.4rem 1.4rem', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#1d4ed8', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}><SparklesIcon size={18} /></div>
                  <strong style={{ fontSize: '1rem', color: '#1e293b', marginBottom: '0.8rem' }}>Venture Studio</strong>
                  <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>Students build to launch a product, working hands-on with early-stage VCs.</p>
                </div>

                <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '1.4rem 1.4rem', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#1d4ed8', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}><UsersIcon size={18} /></div>
                  <strong style={{ fontSize: '1rem', color: '#1e293b', marginBottom: '0.8rem' }}>Partnership with CETLS</strong>
                  <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>Curriculum and methodology co-designed with CETLS. Learning engineering and data-driven evidence continuously improve the program, so it never stays static for long.</p>
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
                  <span className="btech-badge non-cs">Non-CS B.Tech Graduates</span>
                  <h3 className="btech-headline">Bridging the Non-Software Divide with AI</h3>
                  <span className="btech-branch-sub">Mechanical, Civil, Chemical, Electrical & Allied Branches</span>
                </div>

                <div className="btech-transformation-rows">
                  <div className="btech-row past">
                    <span className="phase-pill past-pill">The Past Education:</span>
                    <p>4 years of non-software formulas, blackboard lectures, and exam cramming. Zero production coding experience and anxiety around data structures and algorithms.</p>
                  </div>

                  <div className="btech-row msit">
                    <span className="phase-pill msit-pill">The AI Studio Shift:</span>
                    <p>Immersive 9-to-6 coding studios paired with personalized AI tutoring. AI copilots break down complex algorithmic logic into intuitive first principles, accelerating learning speed 5x.</p>
                  </div>

                  <div className="btech-row outcome">
                    <span className="phase-pill outcome-pill">The Transformation:</span>
                    <p>Completely eliminated the "CS vs Non-CS" divide; built real systems muscle memory across full-stack microservices, modern AI workflows, and production deployments.</p>
                  </div>
                </div>
              </div>

              {/* Panel 2: B.Tech Freshers */}
              <div className="dual-btech-card card-freshers">
                <div className="btech-card-header">
                  <span className="btech-badge freshers">B.Tech Freshers</span>
                  <h3 className="btech-headline">From Classroom Theory to AI-Native Engineering</h3>
                  <span className="btech-branch-sub">Computer Science, IT & All Engineering Streams</span>
                </div>

                <div className="btech-transformation-rows">
                  <div className="btech-row past">
                    <span className="phase-pill past-pill">The Past Education:</span>
                    <p>High GPA earned through rote memorization and semester exams, but zero git commits, production deployment tenure, or practical familiarity with modern AI copilots.</p>
                  </div>

                  <div className="btech-row msit">
                    <span className="phase-pill msit-pill">The AI Studio Shift:</span>
                    <p>Students build with AI copilots, autonomous agent workflows, and LLM microservices. Learning shifts from routine syntax recall to system architecture, prompt engineering, and cloud scalability.</p>
                  </div>

                  <div className="btech-row outcome">
                    <span className="phase-pill outcome-pill">The Transformation:</span>
                    <p>Graduated as production-hardened AI software engineers with a ~50% real-world practicum with CETL, eliminating the "fresher ramp-up gap" and commanding top product roles.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 4-Pillar Pedagogical & AI Shift Strip */}
            {/* Bottom 4-Pillar Pedagogical & AI Shift Strip */}
            <div 
              className="edu-pillars-strip"
              style={{
                background: 'linear-gradient(135deg, #071a38 0%, #153a70 100%)',
                border: '1.5px solid rgba(59, 130, 246, 0.45)',
                borderRadius: '12px',
                padding: '0.85rem 1.15rem',
                boxShadow: '0 6px 20px rgba(7, 26, 56, 0.25)',
                color: '#ffffff'
              }}
            >
              <div className="edu-pillar-item">
                <span 
                  className="pillar-shift-badge"
                  style={{
                    color: '#fde047',
                    fontWeight: 900,
                    fontSize: '0.68rem',
                    letterSpacing: '0.06em',
                    display: 'block',
                    marginBottom: '0.2rem'
                  }}
                >
                  PEDAGOGY SHIFT
                </span>
                <strong 
                  style={{
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.84rem',
                    display: 'block',
                    marginBottom: '0.2rem',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  Zero Lectures ➔ 100% Studio Learning
                </strong>
                <p 
                  style={{
                    color: '#f1f5f9',
                    fontSize: '0.74rem',
                    lineHeight: '1.35',
                    margin: 0,
                    fontWeight: 500
                  }}
                >
                  Students build, debug, and deploy software daily instead of memorizing slides.
                </p>
              </div>

              <div className="edu-pillar-divider" style={{ background: 'rgba(255, 255, 255, 0.15)', height: '44px' }}></div>

              <div className="edu-pillar-item">
                <span 
                  className="pillar-shift-badge"
                  style={{
                    color: '#fde047',
                    fontWeight: 900,
                    fontSize: '0.68rem',
                    letterSpacing: '0.06em',
                    display: 'block',
                    marginBottom: '0.2rem'
                  }}
                >
                  AI-NATIVE LEARNING
                </span>
                <strong 
                  style={{
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.84rem',
                    display: 'block',
                    marginBottom: '0.2rem',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  AI Pair Programming & LLM Studios
                </strong>
                <p 
                  style={{
                    color: '#f1f5f9',
                    fontSize: '0.74rem',
                    lineHeight: '1.35',
                    margin: 0,
                    fontWeight: 500
                  }}
                >
                  Prompt engineering, autonomous agents & AI-assisted rapid prototyping.
                </p>
              </div>

              <div className="edu-pillar-divider" style={{ background: 'rgba(255, 255, 255, 0.15)', height: '44px' }}></div>

              <div className="edu-pillar-item">
                <span 
                  className="pillar-shift-badge"
                  style={{
                    color: '#fde047',
                    fontWeight: 900,
                    fontSize: '0.68rem',
                    letterSpacing: '0.06em',
                    display: 'block',
                    marginBottom: '0.2rem'
                  }}
                >
                  THE STANDARD
                </span>
                <strong 
                  style={{
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.84rem',
                    display: 'block',
                    marginBottom: '0.2rem',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  90%+ Mastery Threshold
                </strong>
                <p 
                  style={{
                    color: '#f1f5f9',
                    fontSize: '0.74rem',
                    lineHeight: '1.35',
                    margin: 0,
                    fontWeight: 500
                  }}
                >
                  No passing with 40%. Time is variable, outcome is constant until production-ready.
                </p>
              </div>

              <div className="edu-pillar-divider" style={{ background: 'rgba(255, 255, 255, 0.15)', height: '44px' }}></div>

              <div className="edu-pillar-item">
                <span 
                  className="pillar-shift-badge"
                  style={{
                    color: '#fde047',
                    fontWeight: 900,
                    fontSize: '0.68rem',
                    letterSpacing: '0.06em',
                    display: 'block',
                    marginBottom: '0.2rem'
                  }}
                >
                  CORPORATE TENURE
                </span>
                <strong 
                  style={{
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.84rem',
                    display: 'block',
                    marginBottom: '0.2rem',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  50% Real-World Practicum
                </strong>
                <p 
                  style={{
                    color: '#f1f5f9',
                    fontSize: '0.74rem',
                    lineHeight: '1.35',
                    margin: 0,
                    fontWeight: 500
                  }}
                >
                  Real production microservices and projects working alongside CETL.
                </p>
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
                <span className="p-stat-detail">Working with CETL</span>
              </div>
              <div className="p-stat-box highlight">
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
                    <span><strong>Live Production Codebase Exposure:</strong> Interns work on actual customer-facing microservices, CI/CD pipelines, and cloud systems in collaboration with CETL.</span>
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
                <div 
                  className="admissions-cta-banner"
                  style={{
                    background: 'linear-gradient(135deg, #071a38 0%, #17386d 100%)',
                    border: '1.5px solid #3b82f6',
                    borderRadius: '12px',
                    color: '#ffffff',
                    boxShadow: '0 6px 20px rgba(7, 26, 56, 0.35)'
                  }}
                >
                  <div className="cta-banner-info">
                    <span 
                      className="cta-status-badge"
                      style={{
                        background: '#fef08a',
                        color: '#78350f',
                        border: '1px solid #fde047',
                        fontWeight: 900,
                        display: 'inline-flex',
                        alignItems: 'center',
                        width: 'fit-content'
                      }}
                    >
                      Admissions Open • Academic Year 2026–27
                    </span>
                    <h3 
                      className="cta-banner-heading"
                      style={{
                        color: '#ffffff',
                        fontWeight: 900,
                        textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
                        margin: '0.2rem 0'
                      }}
                    >
                      Begin Your Master's in Computing
                    </h3>
                    <p 
                      className="cta-banner-desc"
                      style={{
                        color: '#f1f5f9',
                        fontWeight: 500,
                        margin: 0
                      }}
                    >
                      Sign in now to start your application, book your evaluation slot, and reserve your studio seat today.
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

        {/* Quick Jump Category Strip (All 7 Slides) */}
        <nav className="top-bar-category-nav" aria-label="Slideshow Navigation">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              className={`top-category-pill ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(idx)}
            >
              <span className="pill-label">{s.category.split(' & ')[0]}</span>
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
              <div 
                className="fullscreen-slide-stage"
                style={slideItem.id === 'ainative' ? { padding: 0 } : {}}
              >
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
                <div className="fullscreen-controls-bar" style={slideItem.id === 'ainative' ? { padding: '1rem 3.5rem', margin: 0 } : {}}>
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
