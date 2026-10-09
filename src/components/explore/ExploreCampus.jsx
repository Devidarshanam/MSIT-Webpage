import React from 'react';
import { 
  ServerIcon,
  CodeIcon,
  RocketIcon, 
  HomeIcon,
  UsersIcon,
  CompassIcon
} from '../Icons';

export default function ExploreCampus() {
  return (
    <section className="explore-section bg-light" id="campus-life">
      <div id="campus-experience" style={{ position: 'relative', top: '-80px', height: 0 }} aria-hidden="true"></div>
      <div className="explore-container">
        
        {/* Section Header */}
        <div className="explore-section-header">
          <span className="campus-kicker-badge">
            <span className="campus-kicker-dot"></span>
            Campus Life
          </span>
          <h2>Life at IIIT Hyderabad</h2>
          <p className="section-lead">
            Discover the campus, meet other students, explore new ideas, and experience life at IIIT Hyderabad.
          </p>
        </div>

        {/* Authentic Visual Showcase (Balanced Duo Grid) */}
        <div className="campus-duo-grid">
          
          {/* Card 1: A Campus for Learning */}
          <div className="campus-duo-card">
            <img 
              src="/assets/iiit-campus-4k.jpg" 
              alt="IIIT Hyderabad Campus" 
              className="campus-duo-img"
              loading="lazy" 
            />
            <div className="campus-duo-overlay"></div>
            <div className="campus-duo-badge">
              <CompassIcon size={15} />
              <span>66-Acre Green Campus</span>
            </div>
            <div className="campus-duo-content">
              <h3>A Campus for Learning</h3>
              <p>A welcoming residential campus with modern computing facilities, tree-lined walkways, and dedicated spaces to study and collaborate.</p>
            </div>
          </div>

          {/* Card 2: Student Life & Community */}
          <div className="campus-duo-card">
            <img 
              src="/assets/iiit-campus-life.jpg" 
              alt="Student Life and Community at IIIT Hyderabad" 
              className="campus-duo-img"
              loading="lazy" 
            />
            <div className="campus-duo-overlay"></div>
            <div className="campus-duo-badge badge-culture">
              <UsersIcon size={15} />
              <span>Student Community</span>
            </div>
            <div className="campus-duo-content">
              <h3>Student Life &amp; Community</h3>
              <p>An active and supportive community where students take part in clubs, hackathons, sports, and cultural activities.</p>
            </div>
          </div>

        </div>

        {/* 4 Pillars of the IIIT-H Ecosystem */}
        <div className="campus-pillars-grid">
          
          {/* Card 3: Labs & Research */}
          <div className="campus-pillar-card">
            <div className="campus-pillar-icon icon-research">
              <ServerIcon size={24} />
            </div>
            <span className="campus-pillar-tag">Research &amp; Facilities</span>
            <h4>Labs &amp; Research</h4>
            <p>Access to advanced computing facilities, modern labs, and research centers in AI and emerging technologies.</p>
          </div>

          {/* Card 4: Spaces to Learn & Build */}
          <div className="campus-pillar-card">
            <div className="campus-pillar-icon icon-maker">
              <CodeIcon size={24} />
            </div>
            <span className="campus-pillar-tag">Collaborative Spaces</span>
            <h4>Spaces to Learn &amp; Build</h4>
            <p>Comfortable studio environments designed for teamwork, coding, and building practical projects together.</p>
          </div>

          {/* Card 5: Innovation & Startups */}
          <div className="campus-pillar-card">
            <div className="campus-pillar-icon icon-startup">
              <RocketIcon size={24} />
            </div>
            <span className="campus-pillar-tag">Innovation Hub</span>
            <h4>Innovation &amp; Startups</h4>
            <p>Learn about startups, explore new ideas, and discover how technology can solve real-world problems.</p>
          </div>

          {/* Card 6: Campus Life & Facilities */}
          <div className="campus-pillar-card">
            <div className="campus-pillar-icon icon-wellbeing">
              <HomeIcon size={24} />
            </div>
            <span className="campus-pillar-tag">Living &amp; Recreation</span>
            <h4>Campus Life &amp; Facilities</h4>
            <p>Student dining facilities, sports courts, gymnasium, green areas, and everyday conveniences for campus life.</p>
          </div>

        </div>

        {/* Campus Quick Numbers Strip */}
        <div className="campus-stats-strip">
          <div className="campus-stat-item">
            <span className="c-stat-val">66</span>
            <span className="c-stat-unit">Acres</span>
            <span className="c-stat-desc">Green residential campus in Gachibowli</span>
          </div>

          <div className="campus-stat-divider"></div>

          <div className="campus-stat-item">
            <span className="c-stat-val">20+</span>
            <span className="c-stat-unit">Research Centers</span>
            <span className="c-stat-desc">Specialized labs across computing and AI</span>
          </div>

          <div className="campus-stat-divider"></div>

          <div className="campus-stat-item">
            <span className="c-stat-val">25+</span>
            <span className="c-stat-unit">Years Legacy</span>
            <span className="c-stat-desc">Hands-on learning tradition since 2001</span>
          </div>

          <div className="campus-stat-divider"></div>

          <div className="campus-stat-item">
            <span className="c-stat-val">Active</span>
            <span className="c-stat-unit">Student Life</span>
            <span className="c-stat-desc">Technical clubs, hackathons, and cultural events</span>
          </div>
        </div>

      </div>
    </section>
  );
}
