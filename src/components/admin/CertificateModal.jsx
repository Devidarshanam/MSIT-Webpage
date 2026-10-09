import React from 'react';
import { XIcon, DownloadIcon, ExternalLinkIcon, CheckCircleIcon, AwardIcon, FileTextIcon } from '../Icons';

/**
 * Generate a standalone, print-ready HTML certificate for opening in a new browser tab.
 */
export function openCertificateInNewTab(cert) {
  if (!cert) return;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${cert.title} - ${cert.applicantName}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #0f172a;
      font-family: 'Inter', -apple-system, sans-serif;
      color: #1e293b;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2.5rem 1rem;
    }
    .print-bar {
      position: fixed;
      top: 1rem;
      right: 1.5rem;
      z-index: 100;
      display: flex;
      gap: 0.75rem;
    }
    .print-btn {
      background: #1e40af;
      color: #fff;
      border: none;
      padding: 0.6rem 1.2rem;
      font-size: 0.88rem;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      transition: background 0.15s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
    }
    .print-btn:hover { background: #1d4ed8; }
    .cert-container {
      width: 100%;
      max-width: 960px;
      background: #ffffff;
      border-radius: 8px;
      padding: 3rem;
      box-shadow: 0 20px 40px rgba(0,0,0,0.4);
      position: relative;
      margin: auto;
    }
    .cert-frame {
      border: 8px solid #1e3a8a;
      outline: 2px solid #d97706;
      outline-offset: -14px;
      padding: 3rem 2.5rem;
      position: relative;
      background: radial-gradient(circle at center, #ffffff 60%, #f8fafc 100%);
    }
    .cert-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    .cert-issuer {
      font-family: 'Cinzel', serif;
      font-size: 1.25rem;
      font-weight: 800;
      letter-spacing: 0.12em;
      color: #1e3a8a;
      text-transform: uppercase;
      margin-bottom: 0.35rem;
    }
    .cert-board {
      font-size: 0.85rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #64748b;
      margin-bottom: 1.25rem;
    }
    .cert-title {
      font-family: 'Cinzel', serif;
      font-size: 1.85rem;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      border-bottom: 2px solid #d97706;
      display: inline-block;
      padding-bottom: 0.4rem;
      margin-bottom: 1.5rem;
    }
    .cert-body {
      text-align: center;
      margin: 1.5rem 0;
      line-height: 1.7;
    }
    .cert-intro {
      font-size: 0.95rem;
      color: #64748b;
      font-style: italic;
      margin-bottom: 0.75rem;
    }
    .candidate-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 2.2rem;
      font-weight: 700;
      color: #1e3a8a;
      letter-spacing: 0.03em;
      margin: 0.5rem 0 1rem;
      text-decoration: underline;
      text-decoration-color: #d97706;
      text-underline-offset: 6px;
    }
    .cert-details-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 1.5rem;
      margin: 2rem auto;
      max-width: 680px;
      text-align: left;
    }
    .detail-item { display: flex; flex-direction: column; gap: 0.2rem; }
    .detail-label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; }
    .detail-val { font-size: 0.95rem; font-weight: 600; color: #0f172a; }
    .score-badge {
      font-size: 1.15rem;
      font-weight: 800;
      color: #1e40af;
      background: #dbeafe;
      padding: 0.25rem 0.6rem;
      border-radius: 4px;
      display: inline-block;
      width: fit-content;
    }
    .cert-footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 3rem;
      padding-top: 1.5rem;
    }
    .seal-wrap {
      text-align: center;
    }
    .seal-circle {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 3px double #d97706;
      background: radial-gradient(circle, #fef3c7 40%, #fde68a 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 10px rgba(217, 119, 6, 0.25);
      margin: 0 auto 0.4rem;
      color: #92400e;
      font-size: 0.65rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 0.4rem;
      text-align: center;
    }
    .sig-block {
      text-align: center;
      width: 180px;
    }
    .sig-line {
      border-bottom: 1.5px solid #0f172a;
      height: 35px;
      margin-bottom: 0.35rem;
    }
    .sig-title {
      font-size: 0.75rem;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .verified-banner {
      margin-top: 2rem;
      text-align: center;
      font-size: 0.72rem;
      color: #059669;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      background: #ecfdf5;
      padding: 0.4rem 1rem;
      border-radius: 4px;
      border: 1px solid #a7f3d0;
    }
    @media print {
      body { background: #ffffff; padding: 0; }
      .print-bar { display: none !important; }
      .cert-container { box-shadow: none; max-width: 100%; border-radius: 0; padding: 0; }
      .cert-frame { border: 6px solid #1e3a8a; }
    }
  </style>
</head>
<body>
  <div class="print-bar">
    <button class="print-btn" onclick="window.print()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
      Print / Save as PDF
    </button>
  </div>

  <div class="cert-container">
    <div class="cert-frame">
      <div class="cert-header">
        <div class="cert-issuer">${cert.institution || 'ACCREDITED ACADEMIC INSTITUTION'}</div>
        <div class="cert-board">${cert.subtitle || 'OFFICIAL VERIFIED RECORD'}</div>
        <h1 class="cert-title">${cert.title}</h1>
      </div>

      <div class="cert-body">
        <p class="cert-intro">This is to officially certify the academic credentials of</p>
        <div class="candidate-name">${cert.applicantName}</div>
        <p style="font-size: 0.95rem; color: #475569; max-width: 600px; margin: 0 auto;">
          having met all prerequisites and evaluation thresholds with verified submission under Reference ID <strong>${cert.applicationId}</strong>.
        </p>

        <div class="cert-details-grid">
          <div class="detail-item">
            <span class="detail-label">Application ID</span>
            <span class="detail-val">${cert.applicationId}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Verified Score / Grade</span>
            <span class="score-badge">${cert.score || '7.5 CGPA'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Qualification / Stream</span>
            <span class="detail-val">${cert.qualification || cert.department || 'Computer Science & Engineering'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Academic Year / Cycle</span>
            <span class="detail-val">${cert.passingYear || '2026'} (January 2027 Intake)</span>
          </div>
          <div class="detail-item" style="grid-column: span 2;">
            <span class="detail-label">Awarding Institution / Board</span>
            <span class="detail-val">${cert.institution || 'Recognized University / Examination Board'}</span>
          </div>
        </div>
      </div>

      <div class="cert-footer">
        <div class="sig-block">
          <div class="sig-line"></div>
          <div class="sig-title">Registrar</div>
        </div>
        <div class="seal-wrap">
          <div class="seal-circle">
            ★ VERIFIED ★<br>OFFICIAL<br>SEAL
          </div>
          <span style="font-size: 0.65rem; color: #78716c; font-weight: 600;">AUTHENTICATED</span>
        </div>
        <div class="sig-block">
          <div class="sig-line"></div>
          <div class="sig-title">Controller of Exams</div>
        </div>
      </div>

      <div class="verified-banner">
        ✓ Digital Credential Authenticated for MSIT January 2027 Admissions
      </div>
    </div>
  </div>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
}

/**
 * Interactive Certificate Viewer Modal component.
 */
export default function CertificateModal({
  isOpen,
  onClose,
  certificate
}) {
  if (!isOpen || !certificate) return null;

  const handleOpenExternal = () => {
    openCertificateInNewTab(certificate);
  };

  return (
    <div className="admin-modal-backdrop" onClick={onClose} style={{ zIndex: 1200 }}>
      <div 
        className="admin-modal-box cert-viewer-modal" 
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '820px', width: '92%', maxHeight: '90vh', overflowY: 'auto' }}
      >
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AwardIcon size={22} className="text-primary" />
              <h3 style={{ margin: 0 }}>{certificate.title}</h3>
            </div>
            <span className="modal-sub">
              Candidate: <strong>{certificate.applicantName}</strong> • Application ID: <strong>{certificate.applicationId}</strong>
            </span>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <XIcon size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: '1.25rem' }}>
          {/* Top Info Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            padding: '0.75rem 1rem',
            marginBottom: '1.25rem',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'block' }}>FILE RECORD</span>
              <strong style={{ fontSize: '0.88rem', color: '#0f172a' }}>{certificate.fileName || 'Verified_Academic_Memo.pdf'}</strong>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleOpenExternal}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <ExternalLinkIcon size={15} />
                <span>Open in New Tab</span>
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleOpenExternal}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <DownloadIcon size={15} />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>

          {/* Certificate Frame Preview */}
          <div style={{
            border: '4px solid #1e3a8a',
            outline: '1.5px solid #d97706',
            outlineOffset: '-7px',
            padding: '2rem 1.75rem',
            borderRadius: '6px',
            background: 'radial-gradient(circle at center, #ffffff 60%, #f8fafc 100%)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <div style={{
                fontFamily: 'serif',
                fontSize: '1rem',
                fontWeight: 800,
                color: '#1e3a8a',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}>
                {certificate.institution || 'ACCREDITED EXAMINATION BOARD / UNIVERSITY'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {certificate.subtitle || 'OFFICIAL VERIFIED ACADEMIC CREDENTIAL'}
              </div>
              <h2 style={{
                fontSize: '1.35rem',
                fontWeight: 800,
                color: '#0f172a',
                margin: '0.75rem 0 0.5rem',
                borderBottom: '2px solid #d97706',
                display: 'inline-block',
                paddingBottom: '0.25rem'
              }}>
                {certificate.title}
              </h2>
            </div>

            <div style={{ textAlign: 'center', margin: '1rem 0' }}>
              <p style={{ fontSize: '0.85rem', color: '#64748b', fontStyle: 'italic', margin: 0 }}>
                This credential certifies the academic achievements of
              </p>
              <h3 style={{
                fontSize: '1.65rem',
                color: '#1e3a8a',
                margin: '0.4rem 0 0.8rem',
                fontWeight: 700,
                textDecoration: 'underline',
                textDecorationColor: '#d97706',
                textUnderlineOffset: '4px'
              }}>
                {certificate.applicantName}
              </h3>

              {/* Data Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.85rem',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                padding: '1rem',
                maxWidth: '560px',
                margin: '1rem auto',
                textAlign: 'left'
              }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Application ID</span>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>{certificate.applicationId}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Verified Score</span>
                  <div>
                    <span style={{
                      fontSize: '0.95rem',
                      fontWeight: 800,
                      color: '#1e40af',
                      background: '#dbeafe',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '4px',
                      display: 'inline-block'
                    }}>
                      {certificate.score || '7.5 CGPA'}
                    </span>
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Branch / Stream</span>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>{certificate.qualification || certificate.department || 'Computer Science & Engineering'}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Passing Year / Cycle</span>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>{certificate.passingYear || '2026'}</div>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Institution / Board</span>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>{certificate.institution}</div>
                </div>
              </div>
            </div>

            {/* Bottom Stamps */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '1.5rem',
              paddingTop: '1rem',
              borderTop: '1px dashed #cbd5e1'
            }}>
              <div style={{ textAlign: 'center', width: '130px' }}>
                <div style={{ borderBottom: '1px solid #0f172a', height: '25px', marginBottom: '0.2rem' }}></div>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Registrar</span>
              </div>
              <div style={{
                border: '2px double #d97706',
                borderRadius: '50%',
                width: '65px',
                height: '65px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#fef3c7',
                color: '#92400e',
                fontSize: '0.55rem',
                fontWeight: 800,
                textAlign: 'center'
              }}>
                ★ SEAL ★<br />VERIFIED
              </div>
              <div style={{ textAlign: 'center', width: '130px' }}>
                <div style={{ borderBottom: '1px solid #0f172a', height: '25px', marginBottom: '0.2rem' }}></div>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Controller of Exams</span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer" style={{ padding: '0.85rem 1.25rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close Window
          </button>
          <button type="button" className="btn btn-primary" onClick={handleOpenExternal}>
            Open Full Certificate in New Tab
          </button>
        </div>
      </div>
    </div>
  );
}
