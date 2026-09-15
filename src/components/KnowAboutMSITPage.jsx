import React, { useState, useEffect, useCallback } from 'react';
import { 
  BuildingIcon, DownloadIcon, ArrowRightIcon,
  GraduationCapIcon, CpuIcon, BookOpenIcon, BriefcaseIcon, ShieldCheckIcon, AwardIcon
} from './Icons';

export default function KnowAboutMSITPage({ onBack, onGoToSignIn }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const slides = [
    {
      id: 'campus',
      category: 'CAMPUS & INSTITUTION',
      title: 'Excellence in Computing at IIIT Hyderabad',
      lead: 'Housed on the 66-acre premier research campus of IIIT Hyderabad in Gachibowli, MSIT offers an immersive postgraduate computing education surrounded by India’s top tech innovators.',
      highlights: [
        { title: 'Top Computing Hub', desc: 'World-renowned AI, software engineering, and language tech research centers.' },
        { title: 'University Consortium', desc: 'Jointly instituted by IIIT-H, JNTUH, JNTUK, JNTUA, and SVU.' },
        { title: 'Cyberabad Epicenter', desc: 'Located within walking distance of Microsoft, Google, Amazon, and T-Hub.' }
      ],
      image: '/assets/iiit-campus.jpg',
      imageCaption: 'Iconic Academic Campus of IIIT Hyderabad, Gachibowli'
    },
    {
      id: 'legacy',
      category: 'FOUNDING LEGACY',
      title: 'Pioneered by Turing Laureate Prof. Raj Reddy',
      lead: 'Conceived in 2001 by Prof. Raj Reddy, former Dean of Computer Science at Carnegie Mellon University (CMU) and Turing Award winner, to redefine how computing should be taught in India.',
      highlights: [
        { title: '25 Years of Impact', desc: 'Over two decades of producing distinguished tech leaders and software architects.' },
        { title: 'CMU Pedagogical Roots', desc: 'Inspired by global active-learning and project-driven master’s methodologies.' },
        { title: 'Industry-Aligned Focus', desc: 'Continuous curriculum governance by senior computer science academicians.' }
      ],
      image: '/assets/iiit-raj-reddy.png',
      imageCaption: 'Academic Visionary Prof. Raj Reddy (Turing Award Laureate & Founding Chair)'
    },
    {
      id: 'studios',
      category: 'LEARNING MODEL',
      title: '100% Practical Studios — Zero Passive Lectures',
      lead: 'Forget traditional lecture halls. MSIT students work in high-tech development studios 9 AM to 6 PM daily, writing production-grade code with continuous mentorship and automated test suites.',
      highlights: [
        { title: 'Mentor Code Reviews', desc: 'Every commit is reviewed by dedicated industry mentors and faculty.' },
        { title: 'Daily Hands-on Sprints', desc: 'Master data structures, cloud architectures, and distributed systems by building them.' },
        { title: 'Soft Skills & Leadership', desc: 'Daily standups, sprint retrospectives, and technical communication.' }
      ],
      image: '/assets/iiit-studios.jpg',
      imageCaption: 'Collaborative Software Engineering Studios at IIIT Hyderabad'
    },
    {
      id: 'ailab',
      category: 'CUTTING-EDGE INFRASTRUCTURE',
      title: 'State-of-the-Art AI & High-Performance Computing',
      lead: 'Direct access to high-compute GPU clusters, distributed database nodes, and cloud sandbox environments powering research in Generative AI, LLMs, Computer Vision, and Cloud Native systems.',
      highlights: [
        { title: 'NVIDIA GPU Clusters', desc: 'Train deep learning models and finetune LLMs on dedicated computing hardware.' },
        { title: 'Microservices & DevOps', desc: 'Deploy on Kubernetes, Docker, and enterprise cloud infrastructure.' },
        { title: 'Applied Research', desc: 'Collaborate with research labs at IIIT Hyderabad on cutting-edge software.' }
      ],
      image: '/assets/iiit-ai-lab.jpg',
      imageCaption: 'High-Performance AI & Cloud Computing Facilities'
    },
    {
      id: 'coop',
      category: 'CAREER & INDUSTRY',
      title: '~50% Paid Corporate Software Engineering Co-op',
      lead: 'Nearly half the entire master’s tenure is spent working as a full-time software engineering intern at leading tech enterprises, earning a corporate monthly stipend before graduation.',
      highlights: [
        { title: 'Corporate Stipend', desc: 'Earn competitive monthly stipends during your industry tenure.' },
        { title: 'Real-World Production', desc: 'Contribute to production codebases alongside senior software engineers.' },
        { title: 'High Placement Conversion', desc: 'Most co-op students receive pre-placement offers (PPOs) before graduating.' }
      ],
      image: '/assets/iiit-coop.jpg',
      imageCaption: 'Students in Action at Tech Enterprise Partner Offices in Hyderabad'
    },
    {
      id: 'campuslife',
      category: 'STUDENT CULTURE',
      title: 'Life on the 66-Acre IIIT-H Green Campus',
      lead: 'Beyond the terminal, immerse yourself in a vibrant residential university culture featuring 24/7 library research spaces, student hackathons, outdoor sports, and a close-knit peer network.',
      highlights: [
        { title: '24/7 Research Library', desc: 'Comprehensive technical repositories, IEEE journals, and quiet study pods.' },
        { title: 'Hackathons & Clubs', desc: 'Regular coding contests, open-source sprints, and cultural festivals.' },
        { title: 'Residential Amenities', desc: 'Hostels, sports grounds, modern dining, and tree-lined walkways.' }
      ],
      image: '/assets/iiit-campus-life.jpg',
      imageCaption: 'The Nilgiri Block and Tree-Lined Walkways at IIIT Hyderabad'
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
    }, 5500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  const slide = slides[currentSlide];

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
            <span>← Back to Home</span>
          </button>

          <div className="slideshow-branding">
            <img
              src="https://www.msit.ac.in/assets/msit-logo.png"
              alt="MSIT Logo"
              width="32"
              height="32"
            />
            <span className="slideshow-brand-title">Know About MSIT</span>
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
          
          {/* Quick Jump Category Strip */}
          <nav className="slideshow-nav-strip" aria-label="Slideshow Navigation">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                className={`slide-nav-tab ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
              >
                <span className="tab-num">0{idx + 1}</span>
                <span className="tab-label">{s.category.split(' & ')[0]}</span>
              </button>
            ))}
          </nav>

          {/* Active Slide Card */}
          <article className="slideshow-card">
            
            {/* Left/Top Content Column */}
            <div className="slide-content-col">
              <div className="slide-meta-row">
                <span className="slide-badge">{slide.category}</span>
                <span className="slide-counter-badge">Slide {currentSlide + 1} of {totalSlides}</span>
              </div>

              <h1 className="slide-title">{slide.title}</h1>
              <p className="slide-lead">{slide.lead}</p>

              {/* 3 Key Highlights */}
              <div className="slide-highlights-grid">
                {slide.highlights.map((h, i) => (
                  <div key={i} className="slide-highlight-card">
                    <div className="highlight-bullet"></div>
                    <div>
                      <strong>{h.title}</strong>
                      <p>{h.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

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

            {/* Right/Bottom Image Column */}
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

              {/* Progress Indicator Bar */}
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
              <span className="bottom-hint">Interested in the January 2027 batch?</span>
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
