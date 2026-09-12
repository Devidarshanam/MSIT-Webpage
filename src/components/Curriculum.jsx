import React, { useState } from 'react';
import { CpuIcon, SparklesIcon, TerminalIcon, UsersIcon, ShieldCheckIcon, getSmartIcon } from './Icons';

export default function Curriculum({ data }) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredCategories = activeTab === 'all'
    ? data.categories
    : data.categories.filter((cat, idx) => `cat-${idx}` === activeTab);

  return (
    <section className="section section-curriculum-rich" id={data.sectionId}>
      <div className="container">
        <div className="section-heading text-center-wrap">
          <span className="kicker kicker-light">{data.kicker}</span>
          <h2 className="text-white">{data.heading}</h2>
          <p className="text-muted-light">{data.description}</p>
        </div>

        {/* Interactive Domain Filter Tabs */}
        <div className="curriculum-tabs-nav" role="tablist" aria-label="Curriculum domain filters">
          <button
            className={`curriculum-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
            role="tab"
            aria-selected={activeTab === 'all'}
          >
            All Technical Domains ({data.categories.length})
          </button>
          {data.categories.map((cat, idx) => (
            <button
              key={idx}
              className={`curriculum-tab-btn ${activeTab === `cat-${idx}` ? 'active' : ''}`}
              onClick={() => setActiveTab(`cat-${idx}`)}
              role="tab"
              aria-selected={activeTab === `cat-${idx}`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        <div className="curriculum-grid">
          {filteredCategories.map((cat, idx) => (
            <div key={idx} className="curriculum-category-card dark-card">
              <div className="category-header">
                <div className="category-icon" aria-hidden="true">
                  {getSmartIcon(cat.category, 20)}
                </div>
                <h3>{cat.category}</h3>
              </div>
              <ul className="curriculum-list">
                {cat.items.map((item, i) => (
                  <li key={i}>
                    <span className="bullet-indicator" aria-hidden="true">▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="highlight-banner dark-banner">
          <div className="banner-icon-badge" aria-hidden="true">
            <ShieldCheckIcon size={24} />
          </div>
          <div className="banner-content">
            <h3>{data.criticalJudgementBox.title}</h3>
            <p>{data.criticalJudgementBox.text}</p>
          </div>
        </div>

        <div className="note-box note-box-dark">
          {data.note}
        </div>
      </div>
    </section>
  );
}
