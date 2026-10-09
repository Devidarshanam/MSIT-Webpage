import React from 'react';
import { 
  BookOpenIcon, 
  CodeIcon, 
  UsersIcon, 
  TrendingUpIcon 
} from '../Icons';

export default function ExplorePedagogy() {
  const steps = [
    {
      step: '01',
      tag: '01 — LEARN',
      title: 'Understand the Basics',
      description: 'Learn the concepts you need, step by step.',
      icon: BookOpenIcon,
      colorClass: 'learn-stage-1'
    },
    {
      step: '02',
      tag: '02 — BUILD',
      title: 'Work on Projects',
      description: 'Use what you learn to build practical projects.',
      icon: CodeIcon,
      colorClass: 'learn-stage-2'
    },
    {
      step: '03',
      tag: '03 — GET GUIDANCE',
      title: 'Learn with Mentors',
      description: 'Get support and feedback from mentors as you work.',
      icon: UsersIcon,
      colorClass: 'learn-stage-3'
    },
    {
      step: '04',
      tag: '04 — IMPROVE',
      title: 'Practice & Grow',
      description: 'Use feedback to improve your work and build stronger skills.',
      icon: TrendingUpIcon,
      colorClass: 'learn-stage-4'
    }
  ];

  return (
    <section className="explore-section bg-light" id="pedagogy-foundations">
      <div id="how-students-learn" style={{ position: 'relative', top: '-80px', height: 0 }} aria-hidden="true"></div>
      <div className="explore-container">
        
        {/* Section Header */}
        <div className="explore-section-header">
          <h2>How Students Learn</h2>
          <p className="section-lead">
            You learn by understanding concepts, working on projects, getting guidance from mentors, and putting your knowledge into practice.
          </p>
        </div>

        {/* 4-Step Learning Journey Cards */}
        <div className="learn-journey-grid">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className={`learn-journey-card ${item.colorClass}`}>
                <div className="learn-journey-accent"></div>
                
                <div className="learn-journey-card-top">
                  <span className="learn-journey-step-num">{item.step}</span>
                  <div className="learn-journey-icon-box" title={item.title}>
                    <Icon size={22} />
                  </div>
                </div>

                <span className="learn-journey-stage-badge">{item.tag}</span>
                <h3 className="learn-journey-title">{item.title}</h3>
                <p className="learn-journey-desc">{item.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
