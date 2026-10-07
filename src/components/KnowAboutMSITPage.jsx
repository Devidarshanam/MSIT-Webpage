import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from './Icons';

// Import New Vertical Sections
import ExploreHero from './explore/ExploreHero';
import ExploreWhatIsMSIT from './explore/ExploreWhatIsMSIT';
import ExploreWhyMSIT from './explore/ExploreWhyMSIT';
import ExploreWhoIsFor from './explore/ExploreWhoIsFor';
import ExplorePedagogy from './explore/ExplorePedagogy';
import ExploreCurriculum from './explore/ExploreCurriculum';
import ExploreResearch from './explore/ExploreResearch';
import ExplorePracticum from './explore/ExplorePracticum';
import ExploreCampus from './explore/ExploreCampus';
import ExploreCareerOutcomes from './explore/ExploreCareerOutcomes';
import ExploreAdmissions from './explore/ExploreAdmissions';
import ExploreFinalCTA from './explore/ExploreFinalCTA';

export default function KnowAboutMSITPage({ onBack, onGoToSignIn }) {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    if (onGoToSignIn) {
      onGoToSignIn();
    } else {
      navigate('/gateway');
    }
  };

  return (
    <div className="explore-page-root">
      {/* Optional Top Navigation Bar if needed */}
      <div className="explore-top-nav">
        <button className="btn btn-icon-only explore-back-btn" onClick={onBack} aria-label="Go Back">
          <span style={{ display: 'inline-flex', transform: 'rotate(180deg)' }}>
            <ArrowRightIcon size={20} />
          </span>
          <span className="back-text">Back</span>
        </button>
        
        <nav className="explore-inpage-nav">
          <a href="#what-is-msit">Overview</a>
          <a href="#t-shaped-curriculum">Curriculum</a>
          <a href="#real-world-practicum">Practicum</a>
          <a href="#admission-journey">Admissions</a>
        </nav>

        <div className="explore-brand">
          <img src="/assets/msit-logo.png" alt="MSIT Logo" className="explore-header-logo" />
        </div>
      </div>

      <main className="explore-main-content">
        <ExploreHero onGoToSignIn={handleApplyClick} />
        <ExploreWhatIsMSIT />
        <ExploreWhyMSIT />
        <ExploreWhoIsFor />
        <ExplorePedagogy />
        <ExploreCurriculum />
        <ExploreResearch />
        <ExplorePracticum />
        <ExploreCampus />
        <ExploreCareerOutcomes />
        <ExploreAdmissions />
        <ExploreFinalCTA onGoToSignIn={handleApplyClick} />
      </main>
    </div>
  );
}
