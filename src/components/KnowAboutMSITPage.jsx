import React, { useState, useEffect, useCallback } from 'react';
import { 
  BuildingIcon, DownloadIcon, ArrowRightIcon,
  GraduationCapIcon, CpuIcon, BookOpenIcon, BriefcaseIcon, ShieldCheckIcon, AwardIcon,
  SparklesIcon, UsersIcon, CheckCircleIcon, CalendarIcon
} from './Icons';

export default function KnowAboutMSITPage({ onBack, onGoToSignIn }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // Sub-states for interactive elements inside slides
  const [activeTimelineYear, setActiveTimelineYear] = useState('2026-2027');
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [selectedAlumniCategory, setSelectedAlumniCategory] = useState('all');

  // Timeline milestones data for Slide 2
  const timelineMilestones = [
    {
      year: '2001',
      title: 'Foundation by Prof. Raj Reddy',
      desc: 'Launched at IIIT Hyderabad under the Consortium of Institutions of Higher Learning (CIHL) with Turing Laureate Prof. Raj Reddy to eliminate lecture-based computing education.'
    },
    {
      year: '2008',
      title: 'Corporate Practicum Inception',
      desc: 'Pioneered the ~50% paid corporate co-op internship model, embedding students directly into leading tech enterprise engineering teams.'
    },
    {
      year: '2015',
      title: 'Cloud & Distributed Systems',
      desc: 'Modernized the studio curriculum with cloud-native architectures, containerization, microservices, and distributed big-data pipelines.'
    },
    {
      year: '2021',
      title: '20-Year Milestone & AI/ML Tracks',
      desc: 'Celebrated two decades of computing leadership; introduced specialized tracks in Applied Machine Learning, Deep Learning, and Data Science.'
    },
    {
      year: '2026-2027',
      title: 'The AI-Native Postgraduate Era',
      desc: 'Fully revamped for the generative AI era with focus on Large Language Models (LLMs), autonomous AI agents, prompt engineering, and cloud deployment.'
    }
  ];

  // Alumni cards data for Slide 4
  const alumniList = [
    {
      name: 'Vamshi Ambati',
      role: 'Founder & CEO, PredEra (AI Enterprise)',
      batch: 'Distinguished Alumnus',
      company: 'PredEra / Ex-CMU',
      highlight: 'Mentored by Prof. Raj Reddy; built enterprise AI systems powering Fortune 500 enterprises.',
      tag: 'founder'
    },
    {
      name: 'Sravanthi K.',
      role: 'Senior Principal Software Engineer',
      batch: 'Alumna',
      company: 'Microsoft Cloud & AI',
      highlight: 'Leads high-throughput distributed microservices for Azure global infrastructure.',
      tag: 'bigtech'
    },
    {
      name: 'Rahul Verma',
      role: 'Staff Machine Learning Engineer',
      batch: 'Alumnus',
      company: 'Google DeepMind',
      highlight: 'Specializes in foundation model alignment and production deep learning pipelines.',
      tag: 'ai'
    },
    {
      name: 'Pooja Narayanan',
      role: 'VP of Engineering Systems',
      batch: 'Alumna',
      company: 'Goldman Sachs FinTech',
      highlight: 'Architects ultra-low latency transaction processing and quantitative data layers.',
      tag: 'fintech'
    },
    {
      name: 'Karthik Ramanathan',
      role: 'Director of Software Engineering',
      batch: 'Alumnus',
      company: 'Amazon AWS',
      highlight: 'Oversees scalable cloud database clusters serving millions of enterprise queries per second.',
      tag: 'bigtech'
    },
    {
      name: 'Vikram Gundeti',
      role: 'Principal Firmware & Edge Architect',
      batch: 'Alumnus',
      company: 'Qualcomm Technologies',
      highlight: 'Develops low-power neural processing unit (NPU) accelerators for mobile devices.',
      tag: 'ai'
    }
  ];

  // Testimonials data for Slide 6
  const testimonials = [
    {
      name: 'Anurag Sharma',
      batch: 'Batch of 2022',
      trajectory: 'Mechanical Engineering ➔ SDE-2 at Microsoft',
      quote: 'Coming from a non-CS mechanical background, I was intimidated by code. At MSIT, there are zero boring lectures—you write code every single day from 9 AM to 6 PM with dedicated mentors reviewing every pull request. In 6 months, I had built distributed web applications and landed a dream offer at Microsoft.',
      stipend: 'Secured PPO during 6-Month Co-op'
    },
    {
      name: 'Divya Medicherla',
      batch: 'Batch of 2023',
      trajectory: 'Tier-3 Engineering College ➔ Cloud Architect at Amazon',
      quote: 'In my undergrad college, computing was just memorizing theoretical definitions for written tests. MSIT completely rewired my brain: continuous sprints, git workflows, and automated test-driven development. The ~50% paid industry co-op gave me genuine corporate software experience before graduation.',
      stipend: 'Full-Time Pre-Placement Offer'
    },
    {
      name: 'Harish Varma',
      batch: 'Batch of 2024',
      trajectory: 'BCA (Computer Applications) ➔ AI Systems Engineer',
      quote: 'MSIT bridged the gap between academic theory and high-performance industry expectations. Working with GPU clusters and fine-tuning LLMs in the AI studios directly prepared me for production AI engineering. The investment paid for itself in my first year.',
      stipend: 'Corporate Internship Stipend'
    }
  ];

  // 7 Slides Definition
  const slides = [
    {
      id: 'history',
      number: '01',
      category: 'HISTORY & ORIGINS',
      title: 'Revolutionizing Computing Education Since 2001',
      lead: 'Conceived in 2001 by Turing Award Laureate Prof. Raj Reddy (former Dean of Computer Science at Carnegie Mellon University) and visionary leadership, MSIT was engineered to dismantle passive chalk-and-talk lectures in favor of active, project-driven software development studios.',
      image: '/assets/iiit-raj-reddy.png',
      imageCaption: 'Academic Visionary Prof. Raj Reddy (Turing Laureate & Founding Chair)',
      customRenderer: 'history'
    },
    {
      id: 'journey',
      number: '02',
      category: 'JOURNEY & EVOLUTION',
      title: 'A Quarter Century of Engineering Evolution (2001–2027)',
      lead: 'Over 25 continuous batches, MSIT has continuously adapted to global computing breakthroughs—evolving from web and object-oriented systems to distributed cloud computing, and now into an AI-Native curriculum.',
      image: '/assets/iiit-campus.jpg',
      imageCaption: 'The Iconic Academic Campus of IIIT Hyderabad, Gachibowli',
      customRenderer: 'journey'
    },
    {
      id: 'community',
      number: '03',
      category: 'MSIT COMMUNITY',
      title: 'A Vibrant Developer Ecosystem on a 66-Acre Green Campus',
      lead: 'Housed on the premier research campus of IIIT Hyderabad, MSIT is more than a degree—it is an immersive residential peer community surrounded by India’s top researchers, hackathons, and global technology innovators.',
      image: '/assets/iiit-campus-life.jpg',
      imageCaption: 'Lush Walkways & Collaborative Spaces at IIIT Hyderabad',
      customRenderer: 'community'
    },
    {
      id: 'alumni',
      number: '04',
      category: 'GLOBAL ALUMNI',
      title: 'Alumni Powering Global Tech Giants & Pioneering Startups',
      lead: 'MSIT alumni hold distinguished leadership positions as Principal Architects, Engineering Directors, and Tech Founders across Silicon Valley, Europe, and India’s premier innovation hubs.',
      image: '/assets/iiit-alumni-network.jpg',
      imageCaption: 'Proud IIIT Hyderabad Alumni & Graduates Outside the Research Block',
      customRenderer: 'alumni'
    },
    {
      id: 'backgrounds',
      number: '05',
      category: 'STUDENT BACKGROUNDS',
      title: 'Who Joins MSIT & How They Transform into Top Engineers',
      lead: 'Whether coming from non-CS disciplines, Tier-2/3 institutions, or mathematical sciences, MSIT’s rigorous mastery-based studio methodology transforms motivated candidates into high-caliber software engineers.',
      image: '/assets/iiit-studios.jpg',
      imageCaption: 'Collaborative Daily Hands-On Coding Studios at IIIT Hyderabad',
      customRenderer: 'backgrounds'
    },
    {
      id: 'careers',
      number: '06',
      category: 'CAREER & PLACEMENTS',
      title: 'Real Career Journeys & Corporate Co-op Placement Outcomes',
      lead: 'With roughly half the master’s tenure spent inside partner technology enterprises, students gain hands-on production code experience and frequently graduate with pre-placement offers (PPOs).',
      image: '/assets/iiit-coop.jpg',
      imageCaption: 'MSIT Students in Action at Corporate Partner Offices in Hyderabad',
      customRenderer: 'careers'
    },
    {
      id: 'why-msit',
      number: '07',
      category: 'WHY CHOOSE MSIT',
      title: 'The 6 Definitive Pillars That Set MSIT Apart',
      lead: 'MSIT is not an ordinary textbook degree. It is a proven, career-accelerating master’s programme engineered from the ground up to prepare you for the highest levels of global technology innovation.',
      image: '/assets/iiit-ai-lab.jpg',
      imageCaption: 'High-Performance AI & Cloud Computing Laboratories',
      customRenderer: 'why-msit'
    }
  ];

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Autoplay handler
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  const slide = slides[currentSlide];

  const filteredAlumni = selectedAlumniCategory === 'all' 
    ? alumniList 
    : alumniList.filter(a => a.tag === selectedAlumniCategory);

  return (
    <div className="slideshow-page-root">
      {/* Top Header Bar */}
      <header className="slideshow-header">
        <div className="gateway-container slideshow-header-inner">
          <button 
            type="button" 
            className="slideshow-back-btn" 
            onClick={onBack}
            aria-label="Back to Gateway"
          >
            <span>← Back to Gateway</span>
          </button>

          <div className="slideshow-branding">
            <img
              src="https://www.msit.ac.in/assets/msit-logo.png"
              alt="MSIT Logo"
              width="34"
              height="34"
            />
            <div className="slideshow-brand-text">
              <span className="slideshow-brand-title">Know About MSIT</span>
              <span className="slideshow-brand-subtitle">IIIT Hyderabad Consortium · Comprehensive Overview</span>
            </div>
          </div>

          <div className="slideshow-header-actions">
            <button 
              type="button" 
              className="btn btn-primary slideshow-cta-pill"
              onClick={onGoToSignIn}
            >
              <span>Student Sign In ➔</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Slideshow Container */}
      <main className="slideshow-main">
        <div className="gateway-container">
          
          {/* Quick Jump Category Strip (All 7 Slides) */}
          <nav className="slideshow-nav-strip" aria-label="Slideshow Navigation">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                className={`slide-nav-tab ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
              >
                <span className="tab-num">{s.number}</span>
                <span className="tab-label">{s.category.split(' & ')[0]}</span>
              </button>
            ))}
          </nav>

          {/* Active Slide Card */}
          <article className="slideshow-card">
            
            {/* Left Content Column */}
            <div className="slide-content-col">
              <div className="slide-meta-row">
                <span className="slide-badge">{slide.category}</span>
                <span className="slide-counter-badge">Slide {currentSlide + 1} of {totalSlides}</span>
              </div>

              <h1 className="slide-title">{slide.title}</h1>
              <p className="slide-lead">{slide.lead}</p>

              {/* =========================================================================
                  CUSTOM RENDERER PER SLIDE
                  ========================================================================= */}

              {/* SLIDE 1: MSIT HISTORY */}
              {slide.customRenderer === 'history' && (
                <div className="slide-custom-content history-custom-content">
                  <div className="slide-highlights-grid">
                    <div className="slide-highlight-card">
                      <div className="highlight-bullet"><AwardIcon size={16} /></div>
                      <div>
                        <strong>Turing Award Legacy</strong>
                        <p>Designed under the direction of Prof. Raj Reddy, applying Carnegie Mellon University active-learning methodologies to computing education in India.</p>
                      </div>
                    </div>
                    <div className="slide-highlight-card">
                      <div className="highlight-bullet"><BuildingIcon size={16} /></div>
                      <div>
                        <strong>Consortium of Universities</strong>
                        <p>Instituted under CIHL alongside state universities: JNTU Hyderabad, JNTU Kakinada, JNTU Anantapur, and Sri Venkateswara University.</p>
                      </div>
                    </div>
                    <div className="slide-highlight-card">
                      <div className="highlight-bullet"><CpuIcon size={16} /></div>
                      <div>
                        <strong>Zero Passive Lectures</strong>
                        <p>India’s first postgraduate master’s to eliminate traditional blackboard lectures in favor of 100% full-time coding studios.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: JOURNEY & EVOLUTION (TIMELINE) */}
              {slide.customRenderer === 'journey' && (
                <div className="slide-custom-content journey-custom-content">
                  <div className="timeline-selector-strip">
                    {timelineMilestones.map((m) => (
                      <button
                        key={m.year}
                        type="button"
                        className={`timeline-year-btn ${activeTimelineYear === m.year ? 'active' : ''}`}
                        onClick={() => setActiveTimelineYear(m.year)}
                      >
                        <span className="timeline-dot-marker"></span>
                        <span className="timeline-btn-text">{m.year}</span>
                      </button>
                    ))}
                  </div>

                  {(() => {
                    const currentMilestone = timelineMilestones.find(m => m.year === activeTimelineYear) || timelineMilestones[0];
                    return (
                      <div className="timeline-detail-card">
                        <div className="timeline-detail-header">
                          <span className="timeline-active-year-badge">{currentMilestone.year}</span>
                          <h3 className="timeline-detail-title">{currentMilestone.title}</h3>
                        </div>
                        <p className="timeline-detail-desc">{currentMilestone.desc}</p>
                        <div className="timeline-footer-hint">
                          <span>💡 Click any year above to explore MSIT’s 25-year evolution</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* SLIDE 3: COMMUNITY & CAMPUS LIFE */}
              {slide.customRenderer === 'community' && (
                <div className="slide-custom-content community-custom-content">
                  <div className="community-cards-grid">
                    <div className="community-card">
                      <div className="comm-icon-box"><UsersIcon size={20} /></div>
                      <div className="comm-text">
                        <strong>Daily 9 AM–6 PM Studios</strong>
                        <p>Pair programming, daily standups, and code reviews under senior software architects.</p>
                      </div>
                    </div>
                    <div className="community-card">
                      <div className="comm-icon-box"><CpuIcon size={20} /></div>
                      <div className="comm-text">
                        <strong>Cutting-Edge Research Labs</strong>
                        <p>Direct exposure to IIIT-H centers including CVIT, LTRC, and Kohli Centre on Intelligent Systems.</p>
                      </div>
                    </div>
                    <div className="community-card">
                      <div className="comm-icon-box"><SparklesIcon size={20} /></div>
                      <div className="comm-text">
                        <strong>Hackathons & Open Source</strong>
                        <p>Student-driven hackathons, algorithm sprint contests, and active open-source contributions.</p>
                      </div>
                    </div>
                    <div className="community-card">
                      <div className="comm-icon-box"><BuildingIcon size={20} /></div>
                      <div className="comm-text">
                        <strong>Gachibowli Cyber-Hub</strong>
                        <p>Located next to Microsoft, Google, Amazon, and T-Hub—the epicenter of India’s tech ecosystem.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: ALUMNI NETWORK */}
              {slide.customRenderer === 'alumni' && (
                <div className="slide-custom-content alumni-custom-content">
                  <div className="alumni-filter-bar">
                    <span className="alumni-filter-label">Filter:</span>
                    <button 
                      type="button" 
                      className={`alumni-filter-pill ${selectedAlumniCategory === 'all' ? 'active' : ''}`}
                      onClick={() => setSelectedAlumniCategory('all')}
                    >
                      All Leaders
                    </button>
                    <button 
                      type="button" 
                      className={`alumni-filter-pill ${selectedAlumniCategory === 'bigtech' ? 'active' : ''}`}
                      onClick={() => setSelectedAlumniCategory('bigtech')}
                    >
                      Big Tech
                    </button>
                    <button 
                      type="button" 
                      className={`alumni-filter-pill ${selectedAlumniCategory === 'ai' ? 'active' : ''}`}
                      onClick={() => setSelectedAlumniCategory('ai')}
                    >
                      AI & Hardware
                    </button>
                    <button 
                      type="button" 
                      className={`alumni-filter-pill ${selectedAlumniCategory === 'founder' ? 'active' : ''}`}
                      onClick={() => setSelectedAlumniCategory('founder')}
                    >
                      Founders
                    </button>
                  </div>

                  <div className="alumni-cards-scroll-grid">
                    {filteredAlumni.map((alumnus, idx) => (
                      <div key={idx} className="alumni-card">
                        <div className="alumni-card-top">
                          <div className="alumni-avatar-placeholder">
                            {alumnus.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="alumni-info-head">
                            <h4 className="alumni-name">{alumnus.name}</h4>
                            <span className="alumni-company-badge">{alumnus.company}</span>
                          </div>
                        </div>
                        <p className="alumni-role">{alumnus.role}</p>
                        <p className="alumni-highlight">{alumnus.highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SLIDE 5: STUDENT BACKGROUNDS */}
              {slide.customRenderer === 'backgrounds' && (
                <div className="slide-custom-content backgrounds-custom-content">
                  <div className="backgrounds-quad-grid">
                    <div className="background-card">
                      <div className="bg-badge-row">
                        <span className="bg-pill non-cs">Non-CS Engineers</span>
                        <span className="bg-stat">~35% Intake</span>
                      </div>
                      <h4>ECE, Mechanical & Civil Graduates</h4>
                      <p>Rigorous hands-on studios transition engineering minds into full-stack and distributed backend software architects within 12 months.</p>
                    </div>

                    <div className="background-card">
                      <div className="bg-badge-row">
                        <span className="bg-pill bca">BCA, MCA & B.Sc</span>
                        <span className="bg-stat">~25% Intake</span>
                      </div>
                      <h4>Mathematics, Stats & Applications</h4>
                      <p>Elevate theoretical foundations into enterprise-grade system programming, clean code architectures, and scalable data engineering.</p>
                    </div>

                    <div className="background-card">
                      <div className="bg-badge-row">
                        <span className="bg-pill tier">Tier-2 / 3 Achievers</span>
                        <span className="bg-stat">Transformational</span>
                      </div>
                      <h4>State College Graduates</h4>
                      <p>Overcome campus placement limitations by gaining the prestigious IIIT Hyderabad consortium credential and Tier-1 recruiter exposure.</p>
                    </div>

                    <div className="background-card">
                      <div className="bg-badge-row">
                        <span className="bg-pill cs">CS / IT Graduates</span>
                        <span className="bg-stat">~40% Intake</span>
                      </div>
                      <h4>Computer Science Graduates</h4>
                      <p>Accelerate beyond standard undergraduate coursework into deep learning, LLMs, microservices, and corporate engineering leadership.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 6: CAREER & PLACEMENT STORIES */}
              {slide.customRenderer === 'careers' && (
                <div className="slide-custom-content careers-custom-content">
                  {/* Testimonial Tabs */}
                  <div className="testimonial-selector-tabs">
                    {testimonials.map((t, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`test-tab-btn ${idx === activeTestimonialIndex ? 'active' : ''}`}
                        onClick={() => setActiveTestimonialIndex(idx)}
                      >
                        <span>{t.name}</span>
                        <span className="test-tab-sub">{t.batch}</span>
                      </button>
                    ))}
                  </div>

                  {/* Active Testimonial Card */}
                  {(() => {
                    const activeTest = testimonials[activeTestimonialIndex];
                    return (
                      <div className="testimonial-hero-card">
                        <div className="test-quote-icon">“</div>
                        <p className="test-quote-text">{activeTest.quote}</p>
                        
                        <div className="test-author-row">
                          <div>
                            <h4 className="test-author-name">{activeTest.name}</h4>
                            <span className="test-trajectory-pill">{activeTest.trajectory}</span>
                          </div>
                          <span className="test-stipend-badge">{activeTest.stipend}</span>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="recruiter-badges-strip">
                    <span className="recruiter-label">Hiring Partners:</span>
                    <div className="recruiter-tags-list">
                      <span className="rec-tag">Microsoft</span>
                      <span className="rec-tag">Amazon</span>
                      <span className="rec-tag">Google</span>
                      <span className="rec-tag">Qualcomm</span>
                      <span className="rec-tag">Adobe</span>
                      <span className="rec-tag">Goldman Sachs</span>
                      <span className="rec-tag">Gramener</span>
                      <span className="rec-tag">Infosys</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 7: WHY CHOOSE MSIT */}
              {slide.customRenderer === 'why-msit' && (
                <div className="slide-custom-content why-custom-content">
                  <div className="why-pillars-grid">
                    <div className="why-pillar-card">
                      <div className="pillar-num">01</div>
                      <div>
                        <strong>100% Learning By Doing</strong>
                        <p>No passive blackboard lectures. Full-time hands-on studios simulating top tech engineering environments.</p>
                      </div>
                    </div>
                    <div className="why-pillar-card">
                      <div className="pillar-num">02</div>
                      <div>
                        <strong>~50% Paid Corporate Co-op</strong>
                        <p>Spend half your master’s tenure as an intern inside tech enterprises earning a monthly stipend.</p>
                      </div>
                    </div>
                    <div className="why-pillar-card">
                      <div className="pillar-num">03</div>
                      <div>
                        <strong>IIIT Hyderabad Research Ecosystem</strong>
                        <p>Direct immersion into the 66-acre academic and research facilities in Cyberabad.</p>
                      </div>
                    </div>
                    <div className="why-pillar-card">
                      <div className="pillar-num">04</div>
                      <div>
                        <strong>Turing Award Pedagogy</strong>
                        <p>Conceived by Prof. Raj Reddy on Carnegie Mellon active-learning mastery principles.</p>
                      </div>
                    </div>
                    <div className="why-pillar-card">
                      <div className="pillar-num">05</div>
                      <div>
                        <strong>100% Collateral-Free Bank Loans</strong>
                        <p>Seamless education loan support through partner nationalized banks with quick approvals.</p>
                      </div>
                    </div>
                    <div className="why-pillar-card">
                      <div className="pillar-num">06</div>
                      <div>
                        <strong>25+ Years Global Alumni Network</strong>
                        <p>Join over two decades of alumni leading engineering teams across global tech giants.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Slide Navigation Controls */}
              <div className="slide-controls-row">
                <div className="slide-arrows-group">
                  <button 
                    type="button" 
                    className="slide-arrow-nav prev"
                    onClick={prevSlide}
                    aria-label="Previous Slide"
                  >
                    ❮ Previous
                  </button>
                  <button 
                    type="button" 
                    className="slide-arrow-nav next"
                    onClick={nextSlide}
                    aria-label="Next Slide"
                  >
                    Next ❯
                  </button>
                </div>

                <button 
                  type="button" 
                  className={`slide-autoplay-toggle ${isAutoPlaying ? 'playing' : ''}`}
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  aria-label={isAutoPlaying ? 'Pause Slideshow' : 'Auto-play Slideshow'}
                >
                  {isAutoPlaying ? '⏸ Pause Auto-Play' : '▶ Play Slideshow'}
                </button>
              </div>
            </div>

            {/* Right Image Column */}
            <div className="slide-image-col">
              <div className="slide-image-frame">
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="slide-hero-img"
                  key={slide.image} // forces smooth fade on slide change
                />
                <div className="slide-image-overlay">
                  <span className="slide-image-caption">{slide.imageCaption}</span>
                </div>
              </div>

              {/* Progress Indicator Dots */}
              <div className="slide-dots-indicator">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`slide-dot ${idx === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

          </article>

          {/* Bottom Action Footer */}
          <div className="slideshow-bottom-bar">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onBack}
            >
              <span>← Back to Entry Page</span>
            </button>

            <div className="slideshow-bottom-right">
              <span className="bottom-hint">Admissions Opening for January 2027 Cohort</span>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={onGoToSignIn}
              >
                <span>Proceed to Student Sign In ➔</span>
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
