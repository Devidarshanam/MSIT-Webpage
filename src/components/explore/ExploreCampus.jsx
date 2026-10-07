import React from 'react';
import { 
  BuildingIcon, 
  TerminalIcon, 
  CpuIcon, 
  RocketIcon, 
  SparklesIcon,
  CompassIcon
} from '../Icons';

export default function ExploreCampus() {
  return (
    <section className="explore-section bg-light" id="campus-experience">
      <div className="explore-container">
        
        {/* Section Header */}
        <div className="explore-section-header">
          <span className="campus-kicker-badge">
            <span className="campus-kicker-dot"></span>
            Campus Ecosystem &amp; Student Life
          </span>
          <h2>Life &amp; Building at IIIT Hyderabad</h2>
          <p className="section-lead">
            Thrive within one of India's foremost computing and AI research institutions—a vibrant, 66-acre 
            tech ecosystem situated at the heart of Hyderabad's premier technology and innovation corridor.
          </p>
        </div>

        {/* Authentic Visual Showcase (Balanced Duo Grid) */}
        <div className="campus-duo-grid">
          
          {/* Card 1: Campus Infrastructure & Environment */}
          <div className="campus-duo-card">
            <img 
              src="/assets/iiit-campus-4k.jpg" 
              alt="IIIT Hyderabad Academic and Research Campus" 
              className="campus-duo-img"
              loading="lazy"
            />
            <div className="campus-duo-overlay"></div>
            <div className="campus-duo-badge">
              <CompassIcon size={15} />
              <span>66-Acre Green Campus • Gachibowli Hub</span>
            </div>
            <div className="campus-duo-content">
              <h3>The IIIT Hyderabad Computing Environment</h3>
              <p>An immersive residential campus blending high-performance computing labs, lush green walkways, and premier research centers.</p>
            </div>
          </div>

          {/* Card 2: Student Life, Hackathons & Community */}
          <div className="campus-duo-card">
            <img 
              src="/assets/iiit-campus-life.jpg" 
              alt="Life on Campus and Vibrant Student Community at IIIT Hyderabad" 
              className="campus-duo-img"
              loading="lazy"
            />
            <div className="campus-duo-overlay"></div>
            <div className="campus-duo-badge badge-culture">
              <SparklesIcon size={15} />
              <span>Student Community &amp; Culture</span>
            </div>
            <div className="campus-duo-content">
              <h3>Campus Culture, Hackathons &amp; Peer Life</h3>
              <p>A vibrant, energetic developer atmosphere with active technical clubs, hackathons, sports complexes, and cultural symposiums.</p>
            </div>
          </div>

        </div>

        {/* 4 Pillars of the IIIT-H Ecosystem */}
        <div className="campus-pillars-grid">
          
          <div className="campus-pillar-card">
            <div className="campus-pillar-icon icon-research">
              <CpuIcon size={24} />
            </div>
            <span className="campus-pillar-tag">Research Proximity</span>
            <h4>World-Class Computing Labs</h4>
            <p>Immediate access to premier research centers, including the Kohli Centre on Intelligent Systems (KCIS), CVIT, and LTRC.</p>
          </div>

          <div className="campus-pillar-card">
            <div className="campus-pillar-icon icon-maker">
              <TerminalIcon size={24} />
            </div>
            <span className="campus-pillar-tag">Studio Culture</span>
            <h4>24/7 Collaborative Maker Spaces</h4>
            <p>Dedicated studio pods with high-throughput network infrastructure, built for continuous teamwork, debugging, and software design.</p>
          </div>

          <div className="campus-pillar-card">
            <div className="campus-pillar-icon icon-startup">
              <RocketIcon size={24} />
            </div>
            <span className="campus-pillar-tag">Innovation Corridor</span>
            <h4>CIE &amp; T-Hub Startup Proximity</h4>
            <p>Direct exposure to India's largest innovation ecosystem—surrounded by global tech headquarters and venture incubators.</p>
          </div>

          <div className="campus-pillar-card">
            <div className="campus-pillar-icon icon-wellbeing">
              <BuildingIcon size={24} />
            </div>
            <span className="campus-pillar-tag">Residential Life</span>
            <h4>Holistic Wellbeing &amp; Living</h4>
            <p>On-campus student accommodation, modern cafeterias, multi-sport complexes, gyms, and quiet green reflection zones.</p>
          </div>

        </div>

        {/* Campus Quick Numbers Strip */}
        <div className="campus-stats-strip">
          <div className="campus-stat-item">
            <span className="c-stat-val">66</span>
            <span className="c-stat-unit">Acres</span>
            <span className="c-stat-desc">Green residential tech campus in Gachibowli</span>
          </div>

          <div className="campus-stat-divider"></div>

          <div className="campus-stat-item">
            <span className="c-stat-val">24/7</span>
            <span className="c-stat-unit">Access</span>
            <span className="c-stat-desc">Unrestricted studio and computing lab availability</span>
          </div>

          <div className="campus-stat-divider"></div>

          <div className="campus-stat-item">
            <span className="c-stat-val">Top Tier</span>
            <span className="c-stat-unit">Rankings</span>
            <span className="c-stat-desc">Consistently among India's elite computer science institutions</span>
          </div>

          <div className="campus-stat-divider"></div>

          <div className="campus-stat-item">
            <span className="c-stat-val">100+</span>
            <span className="c-stat-unit">Events</span>
            <span className="c-stat-desc">Hackathons, tech symposiums &amp; cultural activities annually</span>
          </div>
        </div>

      </div>
    </section>
  );
}
