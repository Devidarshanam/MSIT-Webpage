import React from 'react';
import { CpuIcon, BookOpenIcon, SparklesIcon, UsersIcon } from '../Icons';

export default function ExploreCurriculum() {
  return (
    <section className="explore-section" id="t-shaped-curriculum">
      <div className="explore-container">
        <div className="explore-section-header">
          <span className="section-kicker">Academic Structure</span>
          <h2>The T-Shaped Curriculum</h2>
          <p className="section-lead">
            We build T-shaped engineers. This means deep expertise in core software engineering, 
            capped with a broad understanding of adjacent fields, AI tools, and essential management skills.
          </p>
        </div>

        <div className="t-shape-visual-container">
          <div className="t-shape-horizontal">
            <div className="t-horizontal-segment">
              <SparklesIcon size={24} />
              <h4>AI & AI-Tool Usage</h4>
              <p>LLM Agents, Copilots, Prompting</p>
            </div>
            <div className="t-horizontal-segment">
              <BookOpenIcon size={24} />
              <h4>Adjacent Engineering</h4>
              <p>Data Science, Cloud, DevSecOps</p>
            </div>
            <div className="t-horizontal-segment">
              <UsersIcon size={24} />
              <h4>Professional Skills</h4>
              <p>Communication, Management, Ethics</p>
            </div>
          </div>
          
          <div className="t-shape-vertical-stem">
            <div className="t-vertical-core">
              <CpuIcon size={32} />
              <h3>Core Software Engineering</h3>
              <ul className="t-vertical-list">
                <li>System Architecture</li>
                <li>Algorithms & Data Structures</li>
                <li>Backend & Microservices</li>
                <li>Systems Programming</li>
                <li>Performance Optimization</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
