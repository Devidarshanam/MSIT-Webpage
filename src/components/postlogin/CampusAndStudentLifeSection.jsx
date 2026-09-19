import React from 'react';
import { BuildingIcon, CpuIcon, UsersIcon, CompassIcon, InfoIcon } from '../Icons';

export default function CampusAndStudentLifeSection({ data }) {
  const getFacilityIcon = (idx) => {
    switch (idx) {
      case 0: return <BuildingIcon size={22} />;
      case 1: return <CpuIcon size={22} />;
      case 2: return <UsersIcon size={22} />;
      default: return <CompassIcon size={22} />;
    }
  };

  return (
    <section className="section campus-life-section" id="campus">
      <div className="container">
        <div className="section-heading">
          <span className="kicker">{data.kicker}</span>
          <h2>{data.heading}</h2>
          <p>{data.description}</p>
        </div>

        {/* 4 Infrastructure & Community Cards */}
        <div className="campus-facilities-grid">
          {(data?.facilities || []).map((fac, idx) => (
            <div key={idx} className="campus-fac-card">
              <div className="campus-fac-icon" aria-hidden="true">
                {getFacilityIcon(idx)}
              </div>
              <div className="campus-fac-content">
                <h4>{fac.title}</h4>
                <p>{fac.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Accommodation Notice Banner */}
        <div className="campus-accommodation-card">
          <div className="accommodation-icon" aria-hidden="true">
            <InfoIcon size={20} />
          </div>
          <div className="accommodation-text">
            <strong>Residential & Accommodation Status:</strong> {data.accommodationNote}
          </div>
        </div>
      </div>
    </section>
  );
}
