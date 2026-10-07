import React from 'react';

export default function ExplorePracticum() {
  return (
    <section className="explore-section" id="real-world-practicum">
      <div className="explore-container">
        <div className="explore-section-header">
          <span className="section-kicker">Industry Integration</span>
          <h2>Real-World Practicum</h2>
          <p className="section-lead">
            The final phase of MSIT is entirely experiential. Students transition from academic studios 
            into full-time corporate environments, venture builders, or research labs.
          </p>
        </div>

        <div className="practicum-grid">
          <div className="practicum-card">
            <div className="practicum-visual">
              <img src="/assets/iiit-hyderabad-lab.jpg" alt="Industry Co-op" className="img-responsive" />
            </div>
            <div className="practicum-info">
              <h3>Corporate Co-op</h3>
              <p>
                A rigorous, full-time industry apprenticeship where you integrate directly into professional 
                engineering teams, contributing to production code and scaling enterprise architectures.
              </p>
            </div>
          </div>
          
          <div className="practicum-card">
            <div className="practicum-visual">
              <img src="/assets/iiit-campus-2.jpg" alt="Venture Studio" className="img-responsive" />
            </div>
            <div className="practicum-info">
              <h3>Venture Studio & Research</h3>
              <p>
                For those inclined towards deep tech or entrepreneurship, the practicum can be completed 
                within IIIT-H research centers or by building zero-to-one products in the venture incubator.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
