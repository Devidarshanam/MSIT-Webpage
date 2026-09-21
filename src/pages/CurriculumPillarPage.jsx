import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  BookOpenIcon, 
  CpuIcon, 
  BriefcaseIcon, 
  CheckCircleIcon 
} from '../components/Icons';
import { LEARNING_PILLARS } from '../data/learningPillarsData';

export default function CurriculumPillarPage() {
  const { pillarId } = useParams();
  const navigate = useNavigate();

  // Match pillar or default to learning-to-learn
  const currentPillar = LEARNING_PILLARS[pillarId] || LEARNING_PILLARS['learning-to-learn'];

  // Scroll to top on load or change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pillarId]);

  // Icons map
  const renderIcon = (iconName, size = 28) => {
    switch (iconName) {
      case 'BookOpenIcon':
        return <BookOpenIcon size={size} />;
      case 'CpuIcon':
        return <CpuIcon size={size} />;
      case 'BriefcaseIcon':
      default:
        return <BriefcaseIcon size={size} />;
    }
  };

  const handleBackToCurriculum = () => {
    navigate('/programme#curriculum');
    setTimeout(() => {
      const el = document.getElementById('curriculum');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div className="pillar-detail-page">
      {/* Top Header & Breadcrumbs */}
      <header className="pillar-page-header">
        <div className="container pillar-header-container">
          <div className="pillar-nav-left">
            <button 
              type="button" 
              className="pillar-back-btn"
              onClick={handleBackToCurriculum}
              aria-label="Back to Curriculum & Learning Structure"
            >
              <span className="back-arrow">←</span>
              <span>Back to Curriculum & Learning Structure</span>
            </button>
            <div className="pillar-breadcrumbs" aria-label="Breadcrumb">
              <Link to="/programme" className="crumb-link">Dashboard</Link>
              <span className="crumb-sep">/</span>
              <span className="crumb-item" onClick={handleBackToCurriculum} style={{ cursor: 'pointer' }}>Curriculum</span>
              <span className="crumb-sep">/</span>
              <span className="crumb-current">{currentPillar.title}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner (Showing ONLY the clicked pillar) */}
      <section className="pillar-hero-section" style={{ background: currentPillar.bgGradient }}>
        <div className="container pillar-hero-container">
          <div className="pillar-hero-badge-wrap">
            <span className="pillar-hero-kicker">{currentPillar.kicker}</span>
            <span className="pillar-number-badge">{currentPillar.number}</span>
          </div>

          <div className="pillar-hero-title-group">
            <div className="pillar-hero-icon-shell">
              {renderIcon(currentPillar.icon, 32)}
            </div>
            <h1 className="pillar-hero-heading">{currentPillar.title}</h1>
          </div>

          <p className="pillar-hero-tagline">{currentPillar.tagline}</p>
          <p className="pillar-hero-summary">{currentPillar.summary}</p>

          {/* Quote Banner */}
          {currentPillar.quote && (
            <div className="pillar-quote-box">
              <div className="quote-mark">“</div>
              <blockquote className="quote-text">{currentPillar.quote.text}</blockquote>
              <div className="quote-attribution">
                <strong>{currentPillar.quote.author}</strong> — <span>{currentPillar.quote.role}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Content Area (Focused, simplified, and high-clarity) */}
      <main className="pillar-main-content">
        <div className="container pillar-body-container">
          
          {/* Section 1: What Is It? */}
          <section className="pillar-section-block">
            <div className="pillar-section-header">
              <span className="block-kicker">CORE CONCEPT</span>
              <h2>What is {currentPillar.title}?</h2>
              <p className="block-lead">
                Understanding the core idea behind this pedagogical pillar:
              </p>
            </div>

            <div className="foundations-grid">
              {currentPillar.whatIsIt.map((item, idx) => (
                <div key={idx} className="foundation-card">
                  <div className="foundation-card-num">0{idx + 1}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Why It Matters */}
          <section className="pillar-section-block">
            <div className="pillar-section-header">
              <span className="block-kicker">CAREER IMPACT</span>
              <h2>Why does it matter in software engineering?</h2>
              <p className="block-lead">
                How this active skill sets MSIT graduates apart in the modern tech industry:
              </p>
            </div>

            <div className="foundations-grid">
              {currentPillar.whyItMatters.map((item, idx) => (
                <div key={idx} className="foundation-card">
                  <div className="foundation-card-num">0{idx + 1}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Daily Studio Routine */}
          <section className="pillar-section-block">
            <div className="pillar-section-header">
              <span className="block-kicker">STUDIO WORKFLOW</span>
              <h2>How it is practiced daily at MSIT</h2>
              <p className="block-lead">
                A typical day cultivating this discipline in the MSIT studio:
              </p>
            </div>

            <div className="studio-timeline-grid">
              {currentPillar.dailyPractice.map((step, idx) => (
                <div key={idx} className="timeline-step-card">
                  <div className="timeline-step-marker">
                    <span className="marker-dot"></span>
                    <span className="marker-time">Step 0{step.step}: {step.time}</span>
                  </div>
                  <p className="timeline-step-action">{step.action}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Key Skills Acquired */}
          <section className="pillar-section-block">
            <div className="pillar-section-header">
              <span className="block-kicker">SKILLS YOU GAIN</span>
              <h2>Key Capabilities You Will Master</h2>
              <p className="block-lead">
                Verified hands-on abilities you develop through this pillar:
              </p>
            </div>

            <div className="competencies-detail-grid">
              {currentPillar.keySkills.map((skill, idx) => (
                <div key={idx} className="comp-detail-card">
                  <div className="comp-check-icon">
                    <CheckCircleIcon size={20} />
                  </div>
                  <div className="comp-text">
                    <p style={{ fontWeight: 600, color: 'var(--neutral-800)', margin: 0 }}>{skill}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Real-World Example */}
          <section className="pillar-section-block">
            <div className="case-study-feature-card">
              <div className="case-study-top">
                <span className="case-study-badge">Practical Scenario</span>
                <h3>{currentPillar.realWorldExample.title}</h3>
              </div>

              <div className="case-study-grid">
                <div className="case-study-col">
                  <strong className="case-col-title">The Situation</strong>
                  <p>{currentPillar.realWorldExample.situation}</p>
                </div>

                <div className="case-study-col">
                  <strong className="case-col-title">How It Was Solved</strong>
                  <p>{currentPillar.realWorldExample.solution}</p>
                </div>

                <div className="case-study-col highlight-col">
                  <strong className="case-col-title">The Outcome</strong>
                  <p>{currentPillar.realWorldExample.outcome}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
