import React from 'react';
import { 
  AwardIcon, 
  RocketIcon, 
  BrainIcon, 
  CloudIcon, 
  CodeIcon, 
  ShieldCheckIcon,
  UsersIcon,
  CalendarIcon
} from '../Icons';

export default function ExploreCareerOutcomes() {
  return (
    <section className="explore-section bg-white" id="career-outcomes">
      <div className="explore-container">
        
        {/* Section Header */}
        <div className="explore-section-header">
          <span className="career-kicker-badge">
            <span className="career-kicker-dot"></span>
            Career Pathways
          </span>
          <h2>Where Can MSIT Take You?</h2>
          <p className="section-lead">
            Build practical skills, explore different technology careers, and prepare for opportunities in software development, AI, data science, and cloud computing.
          </p>
        </div>

        {/* Verified Outcome Stats Banner: Refined Deep-Navy Panel */}
        <div className="career-stats-banner">
          <div className="career-stat-col">
            <div className="c-stat-icon-wrap icon-amber" aria-hidden="true">
              <AwardIcon size={18} />
            </div>
            <div className="c-stat-info">
              <span className="c-stat-num">₹22 LPA</span>
              <span className="c-stat-title">Highest Package</span>
              <span className="c-stat-desc">2021–23 batch placement record</span>
            </div>
          </div>

          <div className="career-stat-divider" aria-hidden="true"></div>

          <div className="career-stat-col">
            <div className="c-stat-icon-wrap icon-blue" aria-hidden="true">
              <RocketIcon size={18} />
            </div>
            <div className="c-stat-info">
              <span className="c-stat-num">₹8.27 LPA</span>
              <span className="c-stat-title">Average Package</span>
              <span className="c-stat-desc">2021–23 batch placement report</span>
            </div>
          </div>

          <div className="career-stat-divider" aria-hidden="true"></div>

          <div className="career-stat-col">
            <div className="c-stat-icon-wrap icon-emerald" aria-hidden="true">
              <UsersIcon size={18} />
            </div>
            <div className="c-stat-info">
              <span className="c-stat-num">3,000+</span>
              <span className="c-stat-title">Alumni Network</span>
              <span className="c-stat-desc">Graduates across 25 batches</span>
            </div>
          </div>

          <div className="career-stat-divider" aria-hidden="true"></div>

          <div className="career-stat-col">
            <div className="c-stat-icon-wrap icon-purple" aria-hidden="true">
              <CalendarIcon size={18} />
            </div>
            <div className="c-stat-info">
              <span className="c-stat-num">25+</span>
              <span className="c-stat-title">Years Legacy</span>
              <span className="c-stat-desc">Hands-on learning since 2001</span>
            </div>
          </div>
        </div>

        {/* 3 Career Pathway Cards */}
        <div className="career-pathways-grid">
          
          {/* Card 1: Software Development */}
          <div className="career-pathway-card card-software">
            <div className="pathway-card-header">
              <div className="pathway-title-row">
                <div className="pathway-icon-badge icon-software" aria-hidden="true">
                  <CodeIcon size={18} />
                </div>
                <h3 className="pathway-title">Software Development</h3>
              </div>
              <p className="pathway-desc">
                Learn to build applications, develop software, work with databases, and solve real-world problems.
              </p>
            </div>

            <div className="pathway-skills-block">
              <span className="skills-heading">Key Focus Areas</span>
              <ul className="pathway-skills-list">
                <li>
                  <span className="skill-bullet bullet-software" aria-hidden="true">•</span>
                  <span>Building web and software applications</span>
                </li>
                <li>
                  <span className="skill-bullet bullet-software" aria-hidden="true">•</span>
                  <span>Working with databases, APIs, and modern frameworks</span>
                </li>
                <li>
                  <span className="skill-bullet bullet-software" aria-hidden="true">•</span>
                  <span>Writing clean code and solving practical problems</span>
                </li>
              </ul>
            </div>

            <div className="pathway-roles-footer">
              <span className="roles-label">Example Roles:</span>
              <div className="roles-tags-wrap">
                <span className="role-tag">Software Developer</span>
                <span className="role-tag">Full-Stack Developer</span>
              </div>
              <p className="roles-disclaimer">
                *Illustrative career directions, not guaranteed placement.
              </p>
            </div>
          </div>

          {/* Card 2: Artificial Intelligence & Data Science */}
          <div className="career-pathway-card card-ai">
            <div className="pathway-card-header">
              <div className="pathway-title-row">
                <div className="pathway-icon-badge icon-ai" aria-hidden="true">
                  <BrainIcon size={18} />
                </div>
                <h3 className="pathway-title">Artificial Intelligence &amp; Data Science</h3>
              </div>
              <p className="pathway-desc">
                Learn how to work with data, build machine-learning models, and develop AI-powered solutions.
              </p>
            </div>

            <div className="pathway-skills-block">
              <span className="skills-heading">Key Focus Areas</span>
              <ul className="pathway-skills-list">
                <li>
                  <span className="skill-bullet bullet-ai" aria-hidden="true">•</span>
                  <span>Analyzing and understanding real-world datasets</span>
                </li>
                <li>
                  <span className="skill-bullet bullet-ai" aria-hidden="true">•</span>
                  <span>Building and evaluating machine learning models</span>
                </li>
                <li>
                  <span className="skill-bullet bullet-ai" aria-hidden="true">•</span>
                  <span>Developing practical AI and intelligent features</span>
                </li>
              </ul>
            </div>

            <div className="pathway-roles-footer">
              <span className="roles-label">Example Roles:</span>
              <div className="roles-tags-wrap">
                <span className="role-tag">Data Analyst</span>
                <span className="role-tag">Data Scientist</span>
                <span className="role-tag">AI/ML Engineer</span>
              </div>
              <p className="roles-disclaimer">
                *Illustrative career directions, not guaranteed placement.
              </p>
            </div>
          </div>

          {/* Card 3: Cloud & Modern Applications */}
          <div className="career-pathway-card card-cloud">
            <div className="pathway-card-header">
              <div className="pathway-title-row">
                <div className="pathway-icon-badge icon-cloud" aria-hidden="true">
                  <CloudIcon size={18} />
                </div>
                <h3 className="pathway-title">Cloud &amp; Modern Applications</h3>
              </div>
              <p className="pathway-desc">
                Explore how applications are deployed, connected, and maintained using modern technologies.
              </p>
            </div>

            <div className="pathway-skills-block">
              <span className="skills-heading">Key Focus Areas</span>
              <ul className="pathway-skills-list">
                <li>
                  <span className="skill-bullet bullet-cloud" aria-hidden="true">•</span>
                  <span>Deploying applications to modern cloud platforms</span>
                </li>
                <li>
                  <span className="skill-bullet bullet-cloud" aria-hidden="true">•</span>
                  <span>Building backend services, APIs, and data layers</span>
                </li>
                <li>
                  <span className="skill-bullet bullet-cloud" aria-hidden="true">•</span>
                  <span>Maintaining reliable application workflows</span>
                </li>
              </ul>
            </div>

            <div className="pathway-roles-footer">
              <span className="roles-label">Example Roles:</span>
              <div className="roles-tags-wrap">
                <span className="role-tag">Cloud Engineer</span>
                <span className="role-tag">Backend Developer</span>
              </div>
              <p className="roles-disclaimer">
                *Illustrative career directions, not guaranteed placement.
              </p>
            </div>
          </div>

        </div>

        {/* Industry Recruiter & Employer Partner Card */}
        <div className="career-ecosystem-card">
          <div className="ecosystem-header-row">
            <div>
              <span className="ecosystem-tag">Industry &amp; Alumni Network</span>
              <h4>Organizations Where MSIT Alumni &amp; Interns Work</h4>
            </div>
            <div className="integrity-note-badge">
              <ShieldCheckIcon size={16} />
              <span>Institutional Transparency</span>
            </div>
          </div>

          <p className="ecosystem-desc">
            MSIT graduates and interns have contributed across top technology firms, product companies, 
            and global IT services organizations through campus recruitment and practical industry internships.
          </p>

          <div className="ecosystem-sectors-grid">
            <div className="sector-group">
              <span className="sector-title">Technology &amp; Products</span>
              <div className="sector-tags-row">
                <span className="sector-tag">Amazon</span>
                <span className="sector-tag">ZOHO</span>
                <span className="sector-tag">Teradata</span>
              </div>
            </div>

            <div className="sector-group">
              <span className="sector-title">Enterprise Software</span>
              <div className="sector-tags-row">
                <span className="sector-tag">CA Technologies</span>
                <span className="sector-tag">Cyient</span>
              </div>
            </div>

            <div className="sector-group">
              <span className="sector-title">IT Services &amp; Consulting</span>
              <div className="sector-tags-row">
                <span className="sector-tag">TCS</span>
                <span className="sector-tag">Tech Mahindra</span>
              </div>
            </div>
          </div>

          <div className="ecosystem-notice-box">
            <span className="ecosystem-notice-text">
              <strong>Reporting Notice:</strong> Company names reflect sample organizations where MSIT students and alumni have worked or interned. Formal verified placement reports and recruiter lists for recent cohorts are published in the official admission circular.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
