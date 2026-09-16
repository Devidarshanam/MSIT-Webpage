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
      image: '/assets/iiit-raj-reddy.png',
      imageCaption: 'Prof. Raj Reddy — Turing Award Laureate & Founding Chair'
    },
    {
      id: 'why-msit',
      number: '02',
      category: 'WHY CHOOSE MSIT',
      themeClass: 'slide-theme-pillars',
      layoutClass: 'slide-layout-pillars',
      title: '5 Defining Pillars That Make MSIT Unique',
      lead: 'MSIT is not a conventional textbook degree. It is a high-intensity master’s programme engineered from the ground up to prepare you for global technology leadership.',
      image: '/assets/iiit-studios.jpg',
      imageCaption: 'Full-Time Hands-on Software Engineering Studios at IIIT Hyderabad'
    },
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
    {
      id: 'backgrounds',
      number: '04',
      category: 'STUDENT BACKGROUNDS',
      themeClass: 'slide-theme-backgrounds',
      layoutClass: 'slide-layout-backgrounds',
      title: 'Student Backgrounds & Real Transformations',
      lead: 'Where you started does not limit where you can go. MSIT’s mastery-based studio methodology transforms students from diverse academic paths into core software engineers.',
      image: '/assets/iiit-ai-lab.jpg',
      imageCaption: 'Advanced AI & Systems Research Laboratories at IIIT Hyderabad'
    },
    {
      id: 'events',
      number: '05',
      category: 'CAMPUS LIFE & EVENTS',
      themeClass: 'slide-theme-events',
      layoutClass: 'slide-layout-events',
      title: 'Events & Life at MSIT: Culture, Code & Community',
      lead: 'Experience a vibrant student journey that blends high-energy hackathons, cultural festivals, Freshers celebrations, and grand project expos.',
      image: '/assets/iiit-campus-life.jpg',
      imageCaption: 'Vibrant Campus Life, Cultural Celebrations & Student Community'
    },
    {
      id: 'practicum',
      number: '06',
      category: 'PAID CORPORATE PRACTICUM',
      themeClass: 'slide-theme-practicum',
      layoutClass: 'slide-layout-practicum',
      title: 'Paid Corporate Practicum: Earn While You Learn',
      lead: 'Spend ~50% of your postgraduate programme embedded directly inside corporate engineering teams in Hyderabad’s tech corridor, earning monthly stipends while you study.',
      image: '/assets/iiit-coop.jpg',
      imageCaption: 'Corporate Co-op Practicum at Premier Tech Offices in Gachibowli'
    },
    {
      id: 'admissions',
      number: '07',
      category: 'BEGIN YOUR JOURNEY',
      themeClass: 'slide-theme-admissions',
      layoutClass: 'slide-layout-admissions',
      title: 'Take the Next Step: Join the MSIT Legacy',
      lead: 'Transparent eligibility criteria, a structured 3-step admissions pathway, and an immediate gateway to high-impact computing careers.',
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

                <div className="origin-quote-box">
                  <span className="quote-mark">“</span>
                  <p>In computing, learning is not a spectator sport. You don't learn by watching; you learn by building, breaking, debugging, and deploying.</p>
                  <span className="quote-author">— Prof. Raj Reddy, Turing Award Laureate & MSIT Founding Chair</span>
                </div>
              </div>

              {/* Right Column: Hero Portrait Spotlight Card */}
              <div className="origin-portrait-spotlight">
                <div className="spotlight-card">
                  <div className="spotlight-img-frame">
                    <img 
                      src="/assets/iiit-raj-reddy.png" 
                      alt="Prof. Raj Reddy" 
                      className="spotlight-portrait-img"
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

      case 'why-msit':
        return (
          <div className="slide-content-layout layout-why-pillars">
            <div className="pillars-showcase-grid">
              {/* 5 Distinct Pillars Cards */}
              <div className="pillar-feature-card card-p1">
                <span className="pillar-num-badge">01</span>
                <h4>Zero Blackboard Lectures</h4>
                <p>100% immersive coding studios. No textbooks or boring lectures. You write real code, commit to GitHub, and build deployable software from day one.</p>
                <span className="pillar-tag">Active Learning</span>
              </div>

              <div className="pillar-feature-card card-p2">
                <span className="pillar-num-badge">02</span>
                <h4>1:10 Mentorship Ratio</h4>
                <p>Never get lost in an auditorium. Dedicated industry mentors work alongside you every single day, reviewing pull requests and conducting daily agile standups.</p>
                <span className="pillar-tag">Daily Code Reviews</span>
              </div>

              <div className="pillar-feature-card card-p3">
                <span className="pillar-num-badge">03</span>
                <h4>~50% Paid Corporate Practicum</h4>
                <p>Spend half your master's embedded directly inside real engineering teams. Earn monthly stipends of ₹25,000–₹60,000 before graduation.</p>
                <span className="pillar-tag">Earn While Learning</span>
              </div>

              <div className="pillar-feature-card card-p4">
                <span className="pillar-num-badge">04</span>
                <h4>Gachibowli Cyber Hub Advantage</h4>
                <p>Located on IIIT-H's 66-acre campus, right beside Microsoft, Google, Amazon, and T-Hub. Recruitment and technical networking happen at your doorstep.</p>
                <span className="pillar-tag">Prime Location</span>
              </div>

              <div className="pillar-feature-card card-p5">
                <span className="pillar-num-badge">05</span>
                <h4>70%+ PPO Conversion Velocity</h4>
                <p>Over 70% of students convert their internships into high-package full-time Pre-Placement Offers (PPOs) well before their final semester concludes.</p>
                <span className="pillar-tag">High Placement Rate</span>
              </div>

              {/* Integrated Visual Studio Card */}
              <div className="pillar-image-card">
                <img 
                  src="/assets/iiit-studios.jpg" 
                  alt="MSIT Studios" 
                  className="pillar-embedded-img"
                />
                <div className="pillar-img-overlay">
                  <strong>Daily 9 AM–6 PM Collaborative Studios</strong>
                  <span>Software engineering practiced like high-performing Silicon Valley teams</span>
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
                  <span className="traj-step">BCA / MCA</span>
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
            <div className="transformations-quad-grid">
              {/* Transformation 1 */}
              <div className="trans-card trans-non-cs">
                <div className="trans-header">
                  <span className="trans-badge">Non-CS Graduates</span>
                  <span className="trans-sub">Mechanical, Civil, Chemical, Electrical</span>
                </div>
                <div className="trans-comparison">
                  <div className="trans-before">
                    <span className="marker-label">Where They Started:</span>
                    <p>Zero prior production coding background; intimidated by abstract algorithmic theory and data structures.</p>
                  </div>
                  <div className="trans-after">
                    <span className="marker-label">What They Achieved:</span>
                    <p>Completed foundational coding sprints; built full-stack distributed web applications; cracked <strong>₹20+ LPA cloud roles</strong>.</p>
                  </div>
                </div>
              </div>

              {/* Transformation 2 */}
              <div className="trans-card trans-bca">
                <div className="trans-header">
                  <span className="trans-badge">3-Year Degree Achievers</span>
                  <span className="trans-sub">BCA, B.Sc Computer Science, IT, Mathematics</span>
                </div>
                <div className="trans-comparison">
                  <div className="trans-before">
                    <span className="marker-label">Where They Started:</span>
                    <p>Barred by traditional M.Tech programs in India that strictly mandate a 4-year B.Tech degree for eligibility.</p>
                  </div>
                  <div className="trans-after">
                    <span className="marker-label">What They Achieved:</span>
                    <p>Gained direct eligibility for an elite postgraduate master’s; earned placement parity with top IIT and NIT engineering packages.</p>
                  </div>
                </div>
              </div>

              {/* Transformation 3 */}
              <div className="trans-card trans-tier3">
                <div className="trans-header">
                  <span className="trans-badge">Tier-2 / Tier-3 Reinventions</span>
                  <span className="trans-sub">Colleges with Limited On-Campus Placements</span>
                </div>
                <div className="trans-comparison">
                  <div className="trans-before">
                    <span className="marker-label">Where They Started:</span>
                    <p>Trapped in textbook-only syllabi with little practical exposure and limited Tier-1 hiring opportunities.</p>
                  </div>
                  <div className="trans-after">
                    <span className="marker-label">What They Achieved:</span>
                    <p>Replaced blackboard tests with 2,000+ hours of hands-on coding, securing top product engineering and FinTech roles.</p>
                  </div>
                </div>
              </div>

              {/* Transformation 4 */}
              <div className="trans-card trans-restarter">
                <div className="trans-header">
                  <span className="trans-badge">Career Restarters & Upskillers</span>
                  <span className="trans-sub">IT Support Transition & Post-Career Breaks</span>
                </div>
                <div className="trans-comparison">
                  <div className="trans-before">
                    <span className="marker-label">Where They Started:</span>
                    <p>Working in repetitive maintenance/support roles or seeking to return to high-growth tech after career breaks.</p>
                  </div>
                  <div className="trans-after">
                    <span className="marker-label">What They Achieved:</span>
                    <p>Upskilled into high-demand Machine Learning, Cloud DevOps, and Microservices engineering through corporate co-op practicums.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Laboratory Accent Card */}
            <div className="transformation-visual-accent">
              <img 
                src="/assets/iiit-ai-lab.jpg" 
                alt="AI Laboratory" 
                className="trans-accent-img"
              />
              <div className="trans-accent-text">
                <strong>Every Background Transformed Through Mastery-Based Learning</strong>
                <span>100% Studio Workflows • Zero Blackboard Lectures • 1:10 Personalized Mentorship</span>
              </div>
            </div>
          </div>
        );

      case 'events':
        return (
          <div className="slide-content-layout layout-events-community">
            <div className="events-quad-grid">
              {/* Event 1: Freshers */}
              <div className="event-feature-card card-freshers">
                <div className="event-icon-pill"><SparklesIcon size={20} /> Freshers' Day</div>
                <h4>Freshers' Welcome & Induction</h4>
                <p>A grand kickoff where seniors welcome the incoming cohort. Features interactive icebreakers, student-led cultural performances, team bonding challenges, and orientation into the MSIT studio culture.</p>
                <div className="event-meta-footer">
                  <span className="event-tag">Welcoming New Batches</span>
                  <span className="event-season">Commencement Week</span>
                </div>
              </div>

              {/* Event 2: Cultural Event */}
              <div className="event-feature-card card-cultural">
                <div className="event-icon-pill"><UsersIcon size={20} /> Cultural Extravaganza</div>
                <h4>Cultural Event & Annual Day</h4>
                <p>A vibrant multi-day celebration of music, dance, theater, and ethnic diversity. Students showcase their artistic talents, organize live band performances, and unwind with festive celebrations across campus.</p>
                <div className="event-meta-footer">
                  <span className="event-tag">Music, Dance & Drama</span>
                  <span className="event-season">Annual Festival</span>
                </div>
              </div>

              {/* Event 3: Hackathons */}
              <div className="event-feature-card card-hackathon">
                <div className="event-icon-pill"><CpuIcon size={20} /> Overnight Hackathons</div>
                <h4>48-Hour Hack-A-Sprint</h4>
                <p>An intense, high-octane 48-hour continuous coding hackathon. Student teams build working prototypes solving challenging real-world problems with direct evaluation by industry tech mentors.</p>
                <div className="event-meta-footer">
                  <span className="event-tag">Overnight Building</span>
                  <span className="event-season">Mid-Semester Sprint</span>
                </div>
              </div>

              {/* Event 4: Capstone Expo */}
              <div className="event-feature-card card-capstone">
                <div className="event-icon-pill"><AwardIcon size={20} /> Project Expo</div>
                <h4>Annual Capstone Demo Day</h4>
                <p>The premier graduation event where students publicly present live software applications to visiting CTOs, venture capitalists, recruiters, and engineering managers from Hyderabad's cyber corridor.</p>
                <div className="event-meta-footer">
                  <span className="event-tag">Live Product Demos</span>
                  <span className="event-season">Final Semester Showcase</span>
                </div>
              </div>
            </div>

            {/* Embedded Campus Life Picture Banner */}
            <div className="events-campus-banner">
              <img 
                src="/assets/iiit-campus-life.jpg" 
                alt="Campus Life at IIIT Hyderabad" 
                className="events-banner-img"
              />
              <div className="events-banner-overlay">
                <strong>A Balanced Student Journey on a 66-Acre Research Campus</strong>
                <span>Hackathons, Cultural Celebrations, Sports Facilities, and Lifelong Peer Friendships</span>
              </div>
            </div>
          </div>
        );

      case 'practicum':
        return (
          <div className="slide-content-layout layout-coop-practicum">
            <div className="practicum-stats-strip">
              <div className="p-stat-box">
                <strong className="p-stat-number">~50%</strong>
                <span className="p-stat-label">Of Programme in Industry</span>
                <span className="p-stat-detail">Corporate Software Practicum</span>
              </div>
              <div className="p-stat-box highlight">
                <strong className="p-stat-number">₹25k–₹60k</strong>
                <span className="p-stat-label">Monthly Corporate Stipend</span>
                <span className="p-stat-detail">Earn While You Learn</span>
              </div>
              <div className="p-stat-box">
                <strong className="p-stat-number">70%+</strong>
                <span className="p-stat-label">PPO Conversion Rate</span>
                <span className="p-stat-detail">Pre-Placement Full-Time Offers</span>
              </div>
              <div className="p-stat-box">
                <strong className="p-stat-number">100+</strong>
                <span className="p-stat-label">Recruiting Partners</span>
                <span className="p-stat-detail">Hyderabad Tech Corridor</span>
              </div>
            </div>

            <div className="practicum-details-grid">
              <div className="practicum-text-card">
                <h4>Why the MSIT Corporate Practicum is Transformative</h4>
                <ul className="practicum-benefits-list">
                  <li>
                    <CheckCircleIcon size={18} />
                    <span><strong>Recover Education Investment Early:</strong> Substantial monthly stipends allow students to offset their living and academic expenses during the master's programme itself.</span>
                  </li>
                  <li>
                    <CheckCircleIcon size={18} />
                    <span><strong>Live Production Codebase Exposure:</strong> Interns work on actual customer-facing microservices, CI/CD pipelines, and cloud systems—not toy toy projects or simulated labs.</span>
                  </li>
                  <li>
                    <CheckCircleIcon size={18} />
                    <span><strong>Direct Absorption into Full-Time Roles:</strong> Because company teams already know your code quality from the practicum, over 70% of students receive full-time PPOs prior to graduation.</span>
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
              {/* Left Column: Eligibility & 3-Step Process */}
              <div className="admissions-process-col">
                <div className="admissions-eligibility-card">
                  <h4>Who Can Apply?</h4>
                  <div className="eligible-degrees-pills">
                    <span className="deg-pill">B.Tech / B.E (Any Branch)</span>
                    <span className="deg-pill">MCA</span>
                    <span className="deg-pill">M.Sc (CS / IT / Maths)</span>
                    <span className="deg-pill">BCA / B.Sc (CS / IT / Maths)</span>
                  </div>
                  <p className="eligibility-note">Candidates from non-CS branches undergo an intensive foundational studio module to build core algorithmic and systems fundamentals.</p>
                </div>

                <div className="admissions-steps-card">
                  <h4>Simple 3-Step Selection Process</h4>
                  <div className="steps-horizontal-list">
                    <div className="step-item">
                      <span className="step-num">01</span>
                      <strong>Online Application</strong>
                      <span>Fill the streamlined online form & upload academic records.</span>
                    </div>
                    <div className="step-item">
                      <span className="step-num">02</span>
                      <strong>Aptitude Evaluation</strong>
                      <span>GAT (Graduate Aptitude Test) or qualifying national exam score.</span>
                    </div>
                    <div className="step-item">
                      <span className="step-num">03</span>
                      <strong>Studio Admission</strong>
                      <span>Counselling session, studio seat allotment & onboarding.</span>
                    </div>
                  </div>
                </div>

                <div className="admissions-cta-banner">
                  <div>
                    <h3>Ready to Transform Your Engineering Career?</h3>
                    <p>Take the next step into India's premier studio-based master's degree in computing.</p>
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-primary admissions-big-cta"
                    onClick={onGoToSignIn}
                  >
                    <span>Student Sign In / Apply Now ➔</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Panoramic Campus Card */}
              <div className="admissions-campus-col">
                <div className="campus-panoramic-card">
                  <img 
                    src="/assets/iiit-campus.jpg" 
                    alt="IIIT Hyderabad Campus" 
                    className="campus-panoramic-img"
                  />
                  <div className="campus-card-content">
                    <span className="campus-badge">Consortium Master's Degree</span>
                    <h3>IIIT Hyderabad & CIHL State Universities</h3>
                    <p>Join an active community of 3,000+ alumni driving computing innovation across the globe.</p>
                    <div className="campus-quick-stats">
                      <div>
                        <strong>25+</strong>
                        <span>Years of Excellence</span>
                      </div>
                      <div>
                        <strong>100%</strong>
                        <span>Studio Learning</span>
                      </div>
                      <div>
                        <strong>1:10</strong>
                        <span>Mentorship Ratio</span>
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
            <span>← Back to Gateway</span>
          </button>

          <div className="top-bar-brand">
            <img
              src="https://www.msit.ac.in/assets/msit-logo.png"
              alt="MSIT Logo"
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
              <span className="pill-num">{s.number}</span>
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
            <span>Student Sign In ➔</span>
          </button>
        </div>
      </header>

      {/* Full-Screen Horizontal Sliding Track */}
      <main className="fullscreen-stage-viewport">
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
              <div className="fullscreen-slide-stage">
                {/* Header Meta Row */}
                <div className="slide-header-meta">
                  <span className="fullscreen-category-badge">{slideItem.category}</span>
                  <h1 className="fullscreen-slide-title">{slideItem.title}</h1>
                  <p className="fullscreen-slide-lead">{slideItem.lead}</p>
                </div>

                {/* Render Bespoke Non-Interactive Slide Content */}
                <div className="slide-body-container">
                  {renderSlideContent(slideItem)}
                </div>

                {/* Integrated Controls Bar at bottom of stage */}
                <div className="fullscreen-controls-bar">
                  <div className="controls-nav-group">
                    <button 
                      type="button" 
                      className="controls-nav-btn prev"
                      onClick={prevSlide}
                      aria-label="Previous Slide"
                    >
                      ❮ Previous
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
