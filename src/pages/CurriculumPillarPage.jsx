import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  BookOpenIcon, 
  CpuIcon, 
  BriefcaseIcon, 
  ArrowRightIcon, 
  CheckCircleIcon, 
  BuildingIcon,
  SparklesIcon,
  TargetIcon,
  GraduationCapIcon
} from '../components/Icons';
import { LEARNING_PILLARS } from '../data/learningPillarsData';

export default function CurriculumPillarPage() {
  const { pillarId } = useParams();
  const navigate = useNavigate();

  // Match pillar or default to learning-to-learn
  const currentPillar = LEARNING_PILLARS[pillarId] || LEARNING_PILLARS['learning-to-learn'];

  // Scroll to top on pillar change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pillarId]);

  // Icons map
  const renderIcon = (iconName, size = 24) => {
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

  const allPillars = Object.values(LEARNING_PILLARS);
  const otherPillars = allPillars.filter(p => p.id !== currentPillar.id);

  const handleBackToCurriculum = () => {
    navigate('/programme#curriculum');
    // If element exists, scroll to it smoothly
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
              aria-label="Back to Curriculum Section"
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

          <div className="pillar-nav-right">
            <span className="institute-tag">IIIT Hyderabad Consortium &bull; CETLS Living Lab</span>
          </div>
        </div>
      </header>

      {/* Pillar Quick Switcher Strip */}
      <nav className="pillar-switcher-nav" aria-label="Switch learning pillar">
        <div className="container pillar-switcher-container">
          <span className="switcher-label">Explore Core Pillars:</span>
          <div className="switcher-pills-row">
            {allPillars.map((p) => {
              const isActive = p.id === currentPillar.id;
              return (
                <Link
                  key={p.id}
                  to={`/curriculum/${p.id}`}
                  className={`switcher-pill ${isActive ? 'is-active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="switcher-pill-num">{p.number}</span>
                  <span className="switcher-pill-title">{p.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="pillar-hero-section" style={{ background: currentPillar.bgGradient }}>
        <div className="container pillar-hero-container">
          <div className="pillar-hero-badge-wrap">
            <span className="pillar-hero-kicker">{currentPillar.kicker}</span>
            <span className="pillar-number-badge">{currentPillar.number}</span>
          </div>

          <div className="pillar-hero-title-group">
            <div className="pillar-hero-icon-shell">
              {renderIcon(currentPillar.icon, 36)}
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

      {/* Main Content Area */}
      <main className="pillar-main-content">
        <div className="container pillar-body-container">
          
          {/* Section 1: Overview & Theoretical Foundations */}
          <section className="pillar-section-block">
            <div className="pillar-section-header">
              <span className="block-kicker">PEDAGOGICAL ARCHITECTURE</span>
              <h2>Educational Philosophy & CETLS Living Lab Anchor</h2>
              <p className="block-lead">{currentPillar.overview}</p>
            </div>

            <div className="foundations-grid">
              {currentPillar.foundations.map((found, idx) => (
                <div key={idx} className="foundation-card">
                  <div className="foundation-card-num">0{idx + 1}</div>
                  <h3>{found.title}</h3>
                  <p>{found.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Daily Studio Practice */}
          {currentPillar.dailyStudioPractice && (
            <section className="pillar-section-block studio-practice-block">
              <div className="pillar-section-header">
                <span className="block-kicker">A DAY IN THE STUDIO</span>
                <h2>{currentPillar.dailyStudioPractice.title}</h2>
                <p className="block-lead">{currentPillar.dailyStudioPractice.description}</p>
              </div>

              <div className="studio-timeline-grid">
                {currentPillar.dailyStudioPractice.steps.map((step, idx) => (
                  <div key={idx} className="timeline-step-card">
                    <div className="timeline-step-marker">
                      <span className="marker-dot"></span>
                      <span className="marker-time">{step.time}</span>
                    </div>
                    <p className="timeline-step-action">{step.action}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 3: Core Competencies Matrix */}
          <section className="pillar-section-block">
            <div className="pillar-section-header">
              <span className="block-kicker">MEASURABLE LEARNING OUTCOMES</span>
              <h2>Concrete Engineering Competencies Acquired</h2>
              <p className="block-lead">
                Every student mastering <strong>{currentPillar.title}</strong> graduates with verified proficiency across the following technical capability vectors:
              </p>
            </div>

            <div className="competencies-detail-grid">
              {currentPillar.coreCompetencies.map((comp, idx) => (
                <div key={idx} className="comp-detail-card">
                  <div className="comp-check-icon">
                    <CheckCircleIcon size={20} />
                  </div>
                  <div className="comp-text">
                    <h4>{comp.title}</h4>
                    <p>{comp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Traditional vs. MSIT Comparison Table */}
          {currentPillar.comparisonTable && (
            <section className="pillar-section-block">
              <div className="pillar-section-header">
                <span className="block-kicker">THE MSIT ADVANTAGE</span>
                <h2>{currentPillar.comparisonTable.title}</h2>
              </div>

              <div className="pillar-comparison-table-wrapper">
                <table className="pillar-comparison-table">
                  <thead>
                    <tr>
                      <th scope="col" className="col-aspect">Engineering Dimension</th>
                      <th scope="col" className="col-trad">Traditional Lecture Model</th>
                      <th scope="col" className="col-msit">MSIT Active Studio Model</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPillar.comparisonTable.rows.map((row, idx) => (
                      <tr key={idx}>
                        <td className="cell-aspect"><strong>{row.aspect}</strong></td>
                        <td className="cell-trad">{row.traditional}</td>
                        <td className="cell-msit">
                          <span className="msit-badge-accent">MSIT</span>
                          {row.msit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Section 5: Real-World Case Study */}
          {currentPillar.realWorldCaseStudy && (
            <section className="pillar-section-block">
              <div className="case-study-feature-card">
                <div className="case-study-top">
                  <span className="case-study-badge">Practicum Case Study</span>
                  <h3>{currentPillar.realWorldCaseStudy.title}</h3>
                </div>

                <div className="case-study-grid">
                  <div className="case-study-col">
                    <strong className="case-col-title">Industry Context</strong>
                    <p>{currentPillar.realWorldCaseStudy.context}</p>
                  </div>

                  <div className="case-study-col">
                    <strong className="case-col-title">Technical Challenge</strong>
                    <p>{currentPillar.realWorldCaseStudy.challenge}</p>
                  </div>

                  <div className="case-study-col">
                    <strong className="case-col-title">Engineering Execution</strong>
                    <p>{currentPillar.realWorldCaseStudy.execution}</p>
                  </div>

                  <div className="case-study-col highlight-col">
                    <strong className="case-col-title">Verified Outcome</strong>
                    <p>{currentPillar.realWorldCaseStudy.outcome}</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Section 6: Evaluation & Mastery Criteria */}
          {currentPillar.evaluationRubric && (
            <section className="pillar-section-block">
              <div className="pillar-section-header">
                <span className="block-kicker">RIGOROUS ASSESSMENT</span>
                <h2>How Mastery Is Evaluated in Studios</h2>
                <p className="block-lead">
                  Grades at MSIT are not earned through closed-book written exams. Mastery is proven through defensible software, peer code walkthroughs, and mentor vivas:
                </p>
              </div>

              <div className="evaluation-rubric-grid">
                {currentPillar.evaluationRubric.map((item, idx) => (
                  <div key={idx} className="rubric-card">
                    <div className="rubric-number">0{idx + 1}</div>
                    <h4>{item.criterion}</h4>
                    <p>{item.detail}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 7: Explore Other Pillars */}
          <section className="pillar-section-block other-pillars-block">
            <div className="pillar-section-header">
              <span className="block-kicker">INTERCONNECTED PEDAGOGY</span>
              <h2>Explore the Complementary Core Pillars</h2>
              <p className="block-lead">
                MSIT engineers combine all three disciplines daily: <strong>Learning to Learn</strong> provides agility, <strong>Learning to Think</strong> ensures architectural rigor, and <strong>Learning to Do</strong> delivers production craftsmanship.
              </p>
            </div>

            <div className="other-pillars-grid">
              {otherPillars.map((other) => (
                <div key={other.id} className="other-pillar-card">
                  <div className="other-pillar-top">
                    <span className="other-num">{other.number}</span>
                    <div className="other-icon-wrap">
                      {renderIcon(other.icon, 24)}
                    </div>
                  </div>
                  <h3>{other.title}</h3>
                  <p>{other.tagline}</p>
                  <Link to={`/curriculum/${other.id}`} className="other-pillar-link">
                    <span>Explore Detailed Guide</span>
                    <ArrowRightIcon size={16} />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Section 8: Bottom CTA Banner */}
          <section className="pillar-cta-banner">
            <div className="pillar-cta-content">
              <span className="cta-kicker">ADMISSIONS & COHORT ENROLLMENT</span>
              <h2>Ready to Experience Active Studio Learning?</h2>
              <p>
                Join the upcoming January 2027 cohort at IIIT Hyderabad. Review eligibility requirements or return to your student dashboard to plan your application.
              </p>
              <div className="pillar-cta-actions">
                <button
                  type="button"
                  className="btn btn-primary cta-btn-white"
                  onClick={() => {
                    navigate('/programme#eligibility');
                    setTimeout(() => {
                      const el = document.getElementById('eligibility');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 150);
                  }}
                >
                  <span>Check Eligibility Criteria</span>
                  <ArrowRightIcon size={16} />
                </button>
                <button
                  type="button"
                  className="btn btn-secondary cta-btn-translucent"
                  onClick={handleBackToCurriculum}
                >
                  <span>Return to Full Curriculum</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
