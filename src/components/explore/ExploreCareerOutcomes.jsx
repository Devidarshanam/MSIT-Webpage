import React from 'react';
import { 
  AwardIcon, 
  RocketIcon, 
  BriefcaseIcon, 
  BrainIcon, 
  TrendingUpIcon, 
  CloudIcon, 
  ShieldCheckIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '../Icons';

export default function ExploreCareerOutcomes() {
  return (
    <section className="explore-section bg-white" id="career-outcomes">
      <div className="explore-container">
        
        {/* Section Header */}
        <div className="explore-section-header">
          <span className="career-kicker-badge">
            <span className="career-kicker-dot"></span>
            Career Pathways &amp; Outcomes
          </span>
          <h2>High-Growth Engineering Pathways</h2>
          <p className="section-lead">
            MSIT graduates transition from conventional undergraduate engineering backgrounds directly into high-growth 
            software roles—accelerated by 100% active studio development and substantive corporate practicum exposure.
          </p>
        </div>

        {/* Verified Outcome Stats Banner */}
        <div className="career-stats-banner">
          <div className="career-stat-col">
            <div className="c-stat-icon-wrap icon-amber">
              <AwardIcon size={22} />
            </div>
            <div className="c-stat-info">
              <span className="c-stat-num">₹22 LPA</span>
              <span className="c-stat-title">Highest Package</span>
              <span className="c-stat-desc">Top tier engineering placement</span>
            </div>
          </div>

          <div className="career-stat-divider"></div>

          <div className="career-stat-col">
            <div className="c-stat-icon-wrap icon-blue">
              <RocketIcon size={22} />
            </div>
            <div className="c-stat-info">
              <span className="c-stat-num">₹8.27 LPA</span>
              <span className="c-stat-title">Average Package</span>
              <span className="c-stat-desc">Verified cohort compensation baseline</span>
            </div>
          </div>

          <div className="career-stat-divider"></div>

          <div className="career-stat-col">
            <div className="c-stat-icon-wrap icon-emerald">
              <BriefcaseIcon size={22} />
            </div>
            <div className="c-stat-info">
              <span className="c-stat-num">100%</span>
              <span className="c-stat-title">Practicum Transition</span>
              <span className="c-stat-desc">Direct corporate co-op immersion</span>
            </div>
          </div>

          <div className="career-stat-divider"></div>

          <div className="career-stat-col">
            <div className="c-stat-icon-wrap icon-purple">
              <CheckCircleIcon size={22} />
            </div>
            <div className="c-stat-info">
              <span className="c-stat-num">3x+</span>
              <span className="c-stat-title">Career Acceleration</span>
              <span className="c-stat-desc">Rapid trajectory into tech leadership</span>
            </div>
          </div>
        </div>

        {/* 3 High-Growth Engineering Pathway Cards */}
        <div className="career-pathways-grid">
          
          {/* Card 1: AI & Intelligent Systems */}
          <div className="career-pathway-card card-ai">
            <div className="pathway-top-bar">
              <span className="pathway-domain-pill pill-ai">Artificial Intelligence</span>
              <div className="pathway-card-icon icon-ai">
                <BrainIcon size={20} />
              </div>
            </div>

            <h3 className="pathway-role-title">Full-Stack AI Systems Architect</h3>
            <p className="pathway-role-desc">
              Designing multi-region enterprise AI pipelines, autonomous LLM agent clusters, RAG architectures, and fault-tolerant inference backends.
            </p>

            <div className="pathway-competencies">
              <div className="pathway-comp-item">
                <span className="comp-check check-ai">✓</span>
                <span>Fine-tuning domain-specific LLMs &amp; RAG vector stores</span>
              </div>
              <div className="pathway-comp-item">
                <span className="comp-check check-ai">✓</span>
                <span>Distributed model serving &amp; real-time streaming APIs</span>
              </div>
              <div className="pathway-comp-item">
                <span className="comp-check check-ai">✓</span>
                <span>Autonomous agent workflows &amp; production guardrails</span>
              </div>
            </div>

            <div className="pathway-stepper-box">
              <span className="stepper-label">Career Progression:</span>
              <div className="stepper-track">
                <span className="step-pill">B.Tech Graduate</span>
                <span className="step-arr">→</span>
                <span className="step-pill active">MSIT AI Studio</span>
                <span className="step-arr">→</span>
                <span className="step-pill target">AI Architect</span>
              </div>
            </div>
          </div>

          {/* Card 2: FinTech & High-Performance Systems */}
          <div className="career-pathway-card card-fintech">
            <div className="pathway-top-bar">
              <span className="pathway-domain-pill pill-fintech">FinTech &amp; Systems</span>
              <div className="pathway-card-icon icon-fintech">
                <TrendingUpIcon size={20} />
              </div>
            </div>

            <h3 className="pathway-role-title">Algorithmic Trading &amp; Systems Engineer</h3>
            <p className="pathway-role-desc">
              Building ultra-low-latency order matching engines, high-frequency data pipelines, and quantitative financial computing architectures.
            </p>

            <div className="pathway-competencies">
              <div className="pathway-comp-item">
                <span className="comp-check check-fintech">✓</span>
                <span>Low-latency memory management &amp; concurrency</span>
              </div>
              <div className="pathway-comp-item">
                <span className="comp-check check-fintech">✓</span>
                <span>Event-driven messaging &amp; distributed cache layers</span>
              </div>
              <div className="pathway-comp-item">
                <span className="comp-check check-fintech">✓</span>
                <span>High-throughput quantitative execution algorithms</span>
              </div>
            </div>

            <div className="pathway-stepper-box">
              <span className="stepper-label">Career Progression:</span>
              <div className="stepper-track">
                <span className="step-pill">Core Engineering</span>
                <span className="step-arr">→</span>
                <span className="step-pill active">Systems Studio</span>
                <span className="step-arr">→</span>
                <span className="step-pill target">FinTech Lead</span>
              </div>
            </div>
          </div>

          {/* Card 3: Cloud & Enterprise Infrastructure */}
          <div className="career-pathway-card card-cloud">
            <div className="pathway-top-bar">
              <span className="pathway-domain-pill pill-cloud">Cloud &amp; Distributed</span>
              <div className="pathway-card-icon icon-cloud">
                <CloudIcon size={20} />
              </div>
            </div>

            <h3 className="pathway-role-title">Cloud Infrastructure Architect</h3>
            <p className="pathway-role-desc">
              Architecting resilient cloud-native platforms, container orchestration at massive scale, and automated continuous delivery pipelines.
            </p>

            <div className="pathway-competencies">
              <div className="pathway-comp-item">
                <span className="comp-check check-cloud">✓</span>
                <span>Kubernetes orchestration &amp; scalable microservices</span>
              </div>
              <div className="pathway-comp-item">
                <span className="comp-check check-cloud">✓</span>
                <span>Infrastructure as Code &amp; multi-region networking</span>
              </div>
              <div className="pathway-comp-item">
                <span className="comp-check check-cloud">✓</span>
                <span>Zero-downtime deployment pipelines &amp; observability</span>
              </div>
            </div>

            <div className="pathway-stepper-box">
              <span className="stepper-label">Career Progression:</span>
              <div className="stepper-track">
                <span className="step-pill">IT / Software Dev</span>
                <span className="step-arr">→</span>
                <span className="step-pill active">Cloud Studio</span>
                <span className="step-arr">→</span>
                <span className="step-pill target">Cloud Architect</span>
              </div>
            </div>
          </div>

        </div>

        {/* Verified Recruiter & Industry Partner Card */}
        <div className="career-ecosystem-card">
          <div className="ecosystem-header-row">
            <div>
              <span className="ecosystem-tag">Corporate Recruitment &amp; Practicum Partners</span>
              <h4>Verified Industry Recruiters &amp; Employers</h4>
            </div>
            <div className="integrity-note-badge">
              <ShieldCheckIcon size={16} />
              <span>Institutional Transparency</span>
            </div>
          </div>

          <p className="ecosystem-desc">
            MSIT graduates and corporate interns are placed across product engineering, data analytics, 
            and enterprise technology organizations through verified campus recruitment and corporate practicums.
          </p>

          <div className="ecosystem-sectors-grid">
            <div className="sector-group">
              <span className="sector-title">Tech &amp; AI Systems</span>
              <div className="sector-tags-row">
                <span className="sector-tag">Amazon</span>
                <span className="sector-tag">NVIDIA</span>
                <span className="sector-tag">Gramener</span>
              </div>
            </div>

            <div className="sector-group">
              <span className="sector-title">FinTech &amp; Payments</span>
              <div className="sector-tags-row">
                <span className="sector-tag">American Express</span>
                <span className="sector-tag">Finmkt</span>
              </div>
            </div>

            <div className="sector-group">
              <span className="sector-title">Enterprise Software &amp; SaaS</span>
              <div className="sector-tags-row">
                <span className="sector-tag">ZOHO</span>
                <span className="sector-tag">Teradata</span>
                <span className="sector-tag">CA Technologies</span>
                <span className="sector-tag">Cyient</span>
              </div>
            </div>

            <div className="sector-group">
              <span className="sector-title">Digital &amp; Engineering IT</span>
              <div className="sector-tags-row">
                <span className="sector-tag">TCS</span>
                <span className="sector-tag">Tech Mahindra</span>
                <span className="sector-tag">Nendrasys</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
