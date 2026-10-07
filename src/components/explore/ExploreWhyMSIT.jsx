import React from 'react';
import { BookOpenIcon, CpuIcon, BriefcaseIcon } from '../Icons';

export default function ExploreWhyMSIT() {
  return (
    <section className="explore-section" id="why-msit">
      <div className="explore-container">
        <div className="explore-section-header">
          <span className="section-kicker">MSIT at 25: The AI Era</span>
          <h2>Why MSIT? Why Now?</h2>
          <p className="section-lead">
            As the technology landscape rapidly shifts toward AI-native environments, traditional coding 
            is becoming automated. MSIT bridges this gap by connecting technical skills with critical thinking, 
            communication, adaptability, and continuous learning.
          </p>
        </div>

        <div className="ai-native-principles-container">
          <h3 className="text-center mb-4">Anchored in Three Core Principles</h3>
          
          <div className="pillars-triad-grid">
            <div className="pillar-card">
              <div className="pillar-top-row">
                <span className="pillar-step-badge">Pillar 1</span>
                <div className="pillar-icon"><BookOpenIcon size={22} /></div>
              </div>
              <h3>Learning to Learn</h3>
              <p>In a world where frameworks change constantly, the most critical skill is adaptability. We teach you how to rapidly acquire new paradigms on your own.</p>
            </div>
            
            <div className="pillar-card">
              <div className="pillar-top-row">
                <span className="pillar-step-badge">Pillar 2</span>
                <div className="pillar-icon"><CpuIcon size={22} /></div>
              </div>
              <h3>Learning to Think</h3>
              <p>Beyond syntax, we focus on system architecture, logical reasoning, and AI-assisted workflows to solve complex engineering challenges.</p>
            </div>
            
            <div className="pillar-card">
              <div className="pillar-top-row">
                <span className="pillar-step-badge">Pillar 3</span>
                <div className="pillar-icon"><BriefcaseIcon size={22} /></div>
              </div>
              <h3>Learning to Do</h3>
              <p>Knowledge is solidified through action. Our studio methodology ensures you are building, testing, and deploying real systems daily.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
