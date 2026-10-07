import React from 'react';

export default function ExploreCareerOutcomes() {
  return (
    <section className="explore-section" id="career-outcomes">
      <div className="explore-container">
        <div className="explore-section-header">
          <span className="section-kicker">Career Outcomes</span>
          <h2>Top Engineering Pathways</h2>
          <p className="section-lead">
            Our graduates are recruited for high-growth engineering roles across artificial intelligence, 
            enterprise cloud, and high-performance computing, transitioning from conventional roles to 
            architectural leadership.
          </p>
        </div>

        <div className="placements-grid-showcase">
          <div className="placement-package-card card-tier-highest">
            <div className="package-top-row">
              <span className="package-tag highest">Artificial Intelligence</span>
            </div>
            <h4 className="placement-role-title">Full-Stack AI Systems Architect</h4>
            <p className="placement-desc">Designing multi-region enterprise AI pipelines, autonomous LLM agent clusters, and fault-tolerant cloud backends.</p>
            <div className="placement-trajectory-bar">
              <span className="traj-label">Trajectory:</span>
              <span className="traj-step">Conventional Undergrad</span>
              <span className="traj-arrow">➔</span>
              <span className="traj-step">MSIT Studio Track</span>
              <span className="traj-arrow">➔</span>
              <span className="traj-step dest">Principal AI Role</span>
            </div>
          </div>

          <div className="placement-package-card card-tier-high">
            <div className="package-top-row">
              <span className="package-tag fintech">FinTech & Systems</span>
            </div>
            <h4 className="placement-role-title">Algorithmic Trading & Low-Latency Engineer</h4>
            <p className="placement-desc">Building ultra-low-latency order matching engines, high-frequency data streams, and quantitative financial computing layers.</p>
            <div className="placement-trajectory-bar">
              <span className="traj-label">Trajectory:</span>
              <span className="traj-step">Core Engineering Background</span>
              <span className="traj-arrow">➔</span>
              <span className="traj-step">Distributed Systems Studio</span>
              <span className="traj-arrow">➔</span>
              <span className="traj-step dest">FinTech Engineer</span>
            </div>
          </div>
          
          <div className="placement-package-card card-tier-high">
            <div className="package-top-row">
              <span className="package-tag highest">Cloud & Enterprise</span>
            </div>
            <h4 className="placement-role-title">Cloud Infrastructure Architect</h4>
            <p className="placement-desc">Architecting robust, scalable, and secure microservices architectures for massive-scale consumer applications.</p>
            <div className="placement-trajectory-bar">
              <span className="traj-label">Trajectory:</span>
              <span className="traj-step">IT / Software Maintenance</span>
              <span className="traj-arrow">➔</span>
              <span className="traj-step">Cloud Native Studio</span>
              <span className="traj-arrow">➔</span>
              <span className="traj-step dest">Cloud Architect</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
