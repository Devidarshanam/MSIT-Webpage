import React, { useState, useEffect } from 'react';
import { 
  DownloadIcon, SparklesIcon, CalendarIcon, BuildingIcon, 
  AwardIcon, ShieldCheckIcon, CpuIcon, CheckCircleIcon, 
  ArrowRightIcon, GraduationCapIcon 
} from './Icons';

export default function Hero({ data }) {
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [activeTab, setActiveTab] = useState('screener'); // 'screener' or 'snapshot'
  
  // Screener state
  const [academicStatus, setAcademicStatus] = useState('final-year');
  const [degreeStream, setDegreeStream] = useState('btech-cs');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [submittedStudent, setSubmittedStudent] = useState(null);
  const [formError, setFormError] = useState('');

  // Load saved student on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('msit_prospective_student');
      if (saved) {
        setSubmittedStudent(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading saved student', e);
    }
  }, []);

  const handleScreenerSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setFormError('Please provide your Full Name, Phone Number, and Email Address.');
      return;
    }
    setFormError('');

    // Determine eligibility verdict
    const isEligible = (academicStatus === 'final-year' || academicStatus === 'graduated') &&
                       (degreeStream === 'btech-cs' || degreeStream === 'btech-other' || degreeStream === 'mca-msc');
    
    const studentData = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      college: college.trim(),
      academicStatus,
      degreeStream,
      isEligible,
      submittedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem('msit_prospective_student', JSON.stringify(studentData));
      
      // Also append to local intake leads list
      const existingLeads = JSON.parse(localStorage.getItem('msit_intake_leads') || '[]');
      existingLeads.unshift(studentData);
      localStorage.setItem('msit_intake_leads', JSON.stringify(existingLeads.slice(0, 50)));

      // Notify other components like Navbar
      window.dispatchEvent(new Event('msit_student_updated'));
    } catch (err) {
      console.error('Local storage write error', err);
    }

    setSubmittedStudent(studentData);
  };

  const handleResetStudent = () => {
    localStorage.removeItem('msit_prospective_student');
    window.dispatchEvent(new Event('msit_student_updated'));
    setSubmittedStudent(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setCollege('');
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'final-year': return 'Final Year Undergrad (Passing 2026)';
      case 'graduated': return 'Completed Undergrad (Graduated)';
      case 'working': return 'Working Professional (1–3 yrs exp)';
      default: return 'Pre-Final Year / Other';
    }
  };

  const getStreamLabel = (stream) => {
    switch (stream) {
      case 'btech-cs': return 'B.Tech / B.E. (CSE, IT, AI/DS)';
      case 'btech-other': return 'B.Tech / B.E. (ECE, EEE, Mech, Civil, etc.)';
      case 'mca-msc': return 'MCA / M.Sc (CS, IT, Math)';
      default: return 'BCA / B.Sc / Other';
    }
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-grid-bg" aria-hidden="true"></div>
      
      {/* Target Audience Alert Banner */}
      <div className="container hero-target-banner-wrap">
        <div className="hero-target-banner">
          <span className="target-banner-badge">🎯 TARGET AUDIENCE</span>
          <span className="target-banner-text">
            <strong>Admissions are exclusively open for:</strong> Students in their <strong>Final Year of Undergraduation (2026 passing out)</strong> or who have <strong>completed graduation</strong> (B.Tech/B.E., MCA, M.Sc).
          </span>
        </div>
      </div>

      <div className="container hero-inner">
        {/* Left Column: MSIT Overview & Free Browsing Escape Hatch */}
        <div className="hero-copy">
          <div className="hero-badge-row">
            <span className="badge">
              <SparklesIcon size={14} className="badge-icon" />
              {data.badge}
            </span>
            <span className="hero-intake-badge">
              <CalendarIcon size={14} />
              Cohort Starts Jan 2027
            </span>
          </div>

          <h1>{data.title}</h1>
          <h2>{data.subtitle}</h2>
          
          <p className="hero-tagline">{data.tagline}</p>
          <p className="hero-subtagline">
            Offered by a consortium of <strong>IIIT Hyderabad</strong>, <strong>JNTUH</strong>, <strong>JNTUK</strong>, <strong>JNTUA</strong>, and <strong>SVU</strong>.
          </p>

          <div className="hero-meta-chips">
            <span className="meta-chip">
              <BuildingIcon size={14} />
              IIIT Hyderabad Campus
            </span>
            <span className="meta-chip">
              <SparklesIcon size={14} />
              100% Active Learning by Doing
            </span>
            <span className="meta-chip">
              <AwardIcon size={14} />
              ~50% Corporate Paid Co-op
            </span>
          </div>

          {/* Know About MSIT (No Sign-In Needed) Callout */}
          <div className="know-msit-callout">
            <div className="know-msit-head">
              <div className="know-msit-icon" aria-hidden="true">💡</div>
              <div>
                <strong>Just Exploring? Know About MSIT Without Signing In</strong>
                <p>Read full details on curriculum, faculty legacy, placements, and fees below freely.</p>
              </div>
            </div>
            <div className="know-msit-actions">
              <a href="#glance" className="btn btn-primary know-msit-btn">
                <span>Explore MSIT Programme (7 Sections)</span>
                <span className="btn-arrow" aria-hidden="true">↓</span>
              </a>
              <button
                type="button"
                className="btn btn-outline-ghost"
                onClick={() => setShowSummaryModal(true)}
                aria-label="View 1-Page Summary"
              >
                <DownloadIcon size={16} />
                1-Page Summary
              </button>
            </div>
          </div>

          <div className="hero-quick-links">
            <span className="quick-links-label">Quick Jump:</span>
            {data.quickLinks.map((ql, idx) => (
              <React.Fragment key={idx}>
                <a href={ql.href}>{ql.label}</a>
                {idx < data.quickLinks.length - 1 && <span className="sep">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right Column: Prospective Student Screener & Intake Card */}
        <div className="hero-panel-wrap">
          <div className="gateway-screener-card" aria-label="Prospective Student Intake Screener">
            {/* Screener Tabs */}
            <div className="screener-tabs-header">
              <button
                type="button"
                className={`screener-tab-btn ${activeTab === 'screener' ? 'active' : ''}`}
                onClick={() => setActiveTab('screener')}
              >
                <GraduationCapIcon size={16} />
                <span>Prospective Student Sign-In</span>
              </button>
              <button
                type="button"
                className={`screener-tab-btn ${activeTab === 'snapshot' ? 'active' : ''}`}
                onClick={() => setActiveTab('snapshot')}
              >
                <BuildingIcon size={16} />
                <span>Campus & Stats</span>
              </button>
            </div>

            {/* TAB 1: Prospective Student Screener */}
            {activeTab === 'screener' && (
              <div className="screener-tab-body">
                {!submittedStudent ? (
                  /* Form View */
                  <form onSubmit={handleScreenerSubmit} className="screener-form">
                    <div className="screener-intro">
                      <div className="screener-title-row">
                        <h3>Check Eligibility & Register Interest</h3>
                        <span className="screener-time-badge">30 sec</span>
                      </div>
                      <p>Tell us who you are to verify your admission eligibility for the January 2027 cohort.</p>
                    </div>

                    {formError && (
                      <div className="screener-error-banner" role="alert">
                        {formError}
                      </div>
                    )}

                    {/* Step 1: Academic Status */}
                    <div className="screener-field-block">
                      <label className="screener-label">
                        1. Your Current Academic Standing: <span className="req">*</span>
                      </label>
                      <div className="screener-pill-grid">
                        <button
                          type="button"
                          className={`screener-pill ${academicStatus === 'final-year' ? 'selected' : ''}`}
                          onClick={() => setAcademicStatus('final-year')}
                        >
                          <span className="pill-dot"></span>
                          <span>Final Year UG (2026 Batch)</span>
                        </button>
                        <button
                          type="button"
                          className={`screener-pill ${academicStatus === 'graduated' ? 'selected' : ''}`}
                          onClick={() => setAcademicStatus('graduated')}
                        >
                          <span className="pill-dot"></span>
                          <span>Completed UG (Degree Holder)</span>
                        </button>
                        <button
                          type="button"
                          className={`screener-pill ${academicStatus === 'working' ? 'selected' : ''}`}
                          onClick={() => setAcademicStatus('working')}
                        >
                          <span className="pill-dot"></span>
                          <span>Working Professional</span>
                        </button>
                        <button
                          type="button"
                          className={`screener-pill ${academicStatus === 'other' ? 'selected' : ''}`}
                          onClick={() => setAcademicStatus('other')}
                        >
                          <span className="pill-dot"></span>
                          <span>1st–3rd Year / Other</span>
                        </button>
                      </div>
                    </div>

                    {/* Step 2: Degree Stream */}
                    <div className="screener-field-block">
                      <label className="screener-label">
                        2. Your Undergraduate Degree / Stream: <span className="req">*</span>
                      </label>
                      <div className="screener-pill-grid">
                        <button
                          type="button"
                          className={`screener-pill ${degreeStream === 'btech-cs' ? 'selected' : ''}`}
                          onClick={() => setDegreeStream('btech-cs')}
                        >
                          <span className="pill-dot"></span>
                          <span>B.Tech/BE (CSE, IT, AI/DS)</span>
                        </button>
                        <button
                          type="button"
                          className={`screener-pill ${degreeStream === 'btech-other' ? 'selected' : ''}`}
                          onClick={() => setDegreeStream('btech-other')}
                        >
                          <span className="pill-dot"></span>
                          <span>B.Tech/BE (ECE, EEE, Mech, etc.)</span>
                        </button>
                        <button
                          type="button"
                          className={`screener-pill ${degreeStream === 'mca-msc' ? 'selected' : ''}`}
                          onClick={() => setDegreeStream('mca-msc')}
                        >
                          <span className="pill-dot"></span>
                          <span>MCA / M.Sc (CS/IT/Math)</span>
                        </button>
                        <button
                          type="button"
                          className={`screener-pill ${degreeStream === 'other' ? 'selected' : ''}`}
                          onClick={() => setDegreeStream('other')}
                        >
                          <span className="pill-dot"></span>
                          <span>BCA / B.Sc / Other</span>
                        </button>
                      </div>
                    </div>

                    {/* Step 3: Contact Inputs */}
                    <div className="screener-inputs-row">
                      <div className="screener-input-group">
                        <label htmlFor="studentFullName">Full Name <span className="req">*</span></label>
                        <input
                          id="studentFullName"
                          type="text"
                          className="screener-input"
                          placeholder="e.g. Rahul Sharma"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="screener-input-group">
                        <label htmlFor="studentPhone">WhatsApp / Mobile <span className="req">*</span></label>
                        <input
                          id="studentPhone"
                          type="tel"
                          className="screener-input"
                          placeholder="e.g. +91 98765 43210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="screener-inputs-row">
                      <div className="screener-input-group">
                        <label htmlFor="studentEmail">Email Address <span className="req">*</span></label>
                        <input
                          id="studentEmail"
                          type="email"
                          className="screener-input"
                          placeholder="e.g. rahul@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="screener-input-group">
                        <label htmlFor="studentCollege">College / Institution (Optional)</label>
                        <input
                          id="studentCollege"
                          type="text"
                          className="screener-input"
                          placeholder="e.g. JNTUH / CBIT"
                          value={college}
                          onChange={(e) => setCollege(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary screener-submit-btn">
                      <span>Check Eligibility & Sign In</span>
                      <ArrowRightIcon size={18} />
                    </button>

                    <div className="screener-privacy-notice">
                      <ShieldCheckIcon size={14} />
                      <span>Official MSIT Admissions intake. Information is kept private & used only for admissions counseling.</span>
                    </div>
                  </form>
                ) : (
                  /* Verified Dashboard View (When Already Submitted) */
                  <div className="screener-verified-card">
                    <div className="verified-card-header">
                      <div className="verified-badge-icon">
                        {submittedStudent.isEligible ? '🎉' : 'ℹ️'}
                      </div>
                      <div>
                        <span className="verified-eyebrow">Prospective Student Pass</span>
                        <h3>Welcome, {submittedStudent.fullName}!</h3>
                      </div>
                    </div>

                    {/* Eligibility Verdict Banner */}
                    <div className={`verdict-banner ${submittedStudent.isEligible ? 'eligible' : 'conditional'}`}>
                      <div className="verdict-icon">
                        {submittedStudent.isEligible ? (
                          <CheckCircleIcon size={22} />
                        ) : (
                          <ShieldCheckIcon size={22} />
                        )}
                      </div>
                      <div className="verdict-content">
                        <strong>
                          {submittedStudent.isEligible 
                            ? '✅ Fully Eligible for MSIT January 2027' 
                            : 'ℹ️ Conditional / Pre-Screening Review Required'}
                        </strong>
                        <p>
                          {submittedStudent.isEligible
                            ? 'You meet the academic eligibility criteria (Final-year / Degree holder in Engineering or Computing). Your interest has been logged for priority counseling.'
                            : 'MSIT prioritizes final-year students and graduates in engineering or computing. Our admissions team will review your application provisionally.'}
                        </p>
                      </div>
                    </div>

                    {/* Recorded Profile Snapshot */}
                    <div className="verified-details-grid">
                      <div className="verified-detail-item">
                        <span>Academic Standing:</span>
                        <strong>{getStatusLabel(submittedStudent.academicStatus)}</strong>
                      </div>
                      <div className="verified-detail-item">
                        <span>Discipline:</span>
                        <strong>{getStreamLabel(submittedStudent.degreeStream)}</strong>
                      </div>
                      <div className="verified-detail-item">
                        <span>Contact:</span>
                        <strong>{submittedStudent.phone}</strong>
                      </div>
                      <div className="verified-detail-item">
                        <span>Email:</span>
                        <strong>{submittedStudent.email}</strong>
                      </div>
                    </div>

                    {/* Instant Actions */}
                    <div className="verified-actions-group">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setShowSummaryModal(true)}
                      >
                        <DownloadIcon size={16} />
                        Download 1-Page Summary
                      </button>
                      <a href="#glance" className="btn btn-secondary">
                        Explore MSIT Details Below ↓
                      </a>
                    </div>

                    <div className="verified-footer-links">
                      <button
                        type="button"
                        className="btn-link-subtle"
                        onClick={handleResetStudent}
                      >
                        ✏️ Edit profile or sign in as a different student
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Campus & Stats Snapshot */}
            {activeTab === 'snapshot' && (
              <div className="screener-tab-body">
                <div className="snapshot-campus-media">
                  <img
                    src="/assets/iiit-campus.jpg"
                    alt="IIIT Hyderabad Campus - Nilgiri Academic Block"
                    className="snapshot-campus-img"
                    width="400"
                    height="180"
                    loading="eager"
                  />
                  <span className="snapshot-campus-badge">IIIT Hyderabad Campus</span>
                </div>
                <p className="snapshot-eyebrow">{data.snapshot.eyebrow}</p>
                <div className="snapshot-stat-grid">
                  {data.snapshot.stats.map((stat, idx) => (
                    <div key={idx} className="snapshot-stat-box">
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>

                {data.snapshot.rows.map((row, idx) => (
                  <div key={idx} className="snapshot-row">
                    <span>{row.label}</span>
                    <strong>{row.value}</strong>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comprehensive 1-Page Quick Summary Modal (Print & PDF Optimized) */}
      {showSummaryModal && (
        <div className="modal-backdrop" onClick={() => setShowSummaryModal(false)}>
          <div className="modal-dialog modal-dialog-lg" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modalTitle">
            <div className="modal-header">
              <div className="modal-header-branding">
                <span className="kicker">IIIT Hyderabad · Official Academic Executive Summary</span>
                <h3 id="modalTitle">Master of Science in Information Technology (MSIT)</h3>
                <span className="modal-subtitle">January 2027 Cohort Overview & Admissions Guide</span>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setShowSummaryModal(false)}
                aria-label="Close summary modal"
              >
                ✕
              </button>
            </div>

            <div className="modal-body printable-summary-body">
              {/* 4-Quadrant Executive Summary Grid */}
              <div className="summary-quadrant-grid">
                {/* Quadrant 1: Institutional Credentials & Legacy */}
                <div className="summary-card">
                  <div className="summary-card-head">
                    <AwardIcon size={18} />
                    <h4>1. Institutional Credentials & Heritage</h4>
                  </div>
                  <ul className="summary-list compact">
                    <li><strong>Awarding Institution:</strong> International Institute of Information Technology, Hyderabad (IIIT-H).</li>
                    <li><strong>Founding Legacy:</strong> Conceived in 2001 by Turing Award laureate Prof. Raj Reddy; 25+ years of proven computing education.</li>
                    <li><strong>Research Anchor:</strong> Operates as a Living Laboratory for the Centre for Educational Technology & Learning Sciences (CETLS).</li>
                  </ul>
                </div>

                {/* Quadrant 2: Operational Cadence & Architecture */}
                <div className="summary-card">
                  <div className="summary-card-head">
                    <BuildingIcon size={18} />
                    <h4>2. Programme Structure & Cadence</h4>
                  </div>
                  <ul className="summary-list compact">
                    <li><strong>Next Cohort Intake:</strong> January 2027 (Full-Time On-Campus at Gachibowli, Hyderabad).</li>
                    <li><strong>Pedagogical Model:</strong> <em>Learn · Think · Do</em> (Cognitive studio practice; zero passive lecture halls).</li>
                    <li><strong>Industry Co-op:</strong> ~50% of the programme spent in corporate engineering tenure with active code reviews.</li>
                  </ul>
                </div>

                {/* Quadrant 3: Technical Curriculum Scope */}
                <div className="summary-card">
                  <div className="summary-card-head">
                    <CpuIcon size={18} />
                    <h4>3. Core Curriculum Domains</h4>
                  </div>
                  <ul className="summary-list compact">
                    <li><strong>Systems:</strong> Concurrency, cloud computing, distributed systems & software architecture.</li>
                    <li><strong>AI & Modern Data:</strong> Applied ML, neural systems, modern LLMs & generative agents.</li>
                    <li><strong>Applied Engineering:</strong> Automated testing, CI/CD, production reliability & code verification.</li>
                    <li><strong>Product & Venture:</strong> Product discovery, user validation & venture incubation.</li>
                  </ul>
                </div>

                {/* Quadrant 4: Eligibility & Financial Support */}
                <div className="summary-card">
                  <div className="summary-card-head">
                    <ShieldCheckIcon size={18} />
                    <h4>4. Eligibility & Financial Avenues</h4>
                  </div>
                  <ul className="summary-list compact">
                    <li><strong>Degree Criteria:</strong> B.Tech/B.E. (all branches), MCA, M.Sc (CS/IT/Math). Final-year students eligible provisionally.</li>
                    <li><strong>Target Profiles:</strong> Fresh graduates seeking rapid industry readiness + early-career engineers seeking leadership.</li>
                    <li><strong>Education Loans:</strong> Pre-approved loan avenues available through major nationalized and private banks for IIIT-H.</li>
                  </ul>
                </div>
              </div>

              {/* Official Verification & Contact Strip */}
              <div className="summary-official-footer">
                <div className="summary-contact-col">
                  <strong>Admissions Office:</strong> MSIT Division, IIIT Hyderabad, Gachibowli, Hyderabad - 500 032
                </div>
                <div className="summary-contact-col text-right">
                  <strong>Email:</strong> <a href="mailto:query@msit.ac.in">query@msit.ac.in</a> | <strong>Web:</strong> <a href="https://www.msit.ac.in" target="_blank" rel="noopener noreferrer">www.msit.ac.in</a>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => window.print()}>
                <DownloadIcon size={16} />
                Print / Save PDF
              </button>
              <a href="#apply" className="btn btn-primary" onClick={() => setShowSummaryModal(false)}>
                Register for January 2027 Updates
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
