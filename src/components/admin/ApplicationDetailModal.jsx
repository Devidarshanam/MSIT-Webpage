import React, { useState } from 'react';
import { 
  XIcon, 
  MailIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  DownloadIcon, 
  UserIcon, 
  GraduationCapIcon, 
  AwardIcon, 
  BookOpenIcon 
} from '../Icons';
import { StatusBadge, TestDataBadge } from './StatusBadge';
import ConfirmDecisionModal from './ConfirmDecisionModal';
import DocumentReviewModal from './DocumentReviewModal';
import { 
  addApplicationNote, 
  getApplicationNotes, 
  getStatusHistory, 
  updateDocumentStatus, 
  updateApplicationStatus 
} from '../../services/adminService';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function ApplicationDetailModal({
  isOpen,
  onClose,
  application,
  onApplicationUpdated
}) {
  const { adminUser } = useAdminAuth();

  // Active section tab in modal: 'details' | 'documents' | 'notes' | 'history'
  const [activeSection, setActiveSection] = useState('details');

  // Notes state
  const [notes, setNotes] = useState(() => application ? getApplicationNotes(application.application_id) : []);
  const [newNoteText, setNewNoteText] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  // Status History state
  const [history, setHistory] = useState(() => application ? getStatusHistory(application.application_id) : []);

  // Decision Modal state
  const [decisionModalOpen, setDecisionModalOpen] = useState(false);
  const [decisionType, setDecisionType] = useState(null); // 'Accept' | 'Decline' | 'Review' | 'Pending'

  // Document Review Modal state
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [docReviewModalOpen, setDocReviewModalOpen] = useState(false);

  if (!isOpen || !application) return null;

  const adminEmail = adminUser?.email || 'admin@getskills.io';

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    setIsAddingNote(true);
    try {
      const added = await addApplicationNote(application.application_id, newNoteText.trim(), adminEmail);
      setNotes(prev => [added, ...prev]);
      setNewNoteText('');
    } catch (err) {
      console.error('Failed to add note:', err);
    } finally {
      setIsAddingNote(false);
    }
  };

  const handleOpenDecision = (type) => {
    setDecisionType(type);
    setDecisionModalOpen(true);
  };

  const handleExecuteDecision = async (reason) => {
    let targetStatus = 'Under Review';
    if (decisionType === 'Accept') targetStatus = 'Accepted';
    else if (decisionType === 'Decline') targetStatus = 'Declined';
    else if (decisionType === 'Pending' || decisionType === 'ActionRequired') targetStatus = 'Additional Information Required';

    const res = await updateApplicationStatus(application.application_id, targetStatus, reason, adminEmail);
    if (res.updatedApp) {
      onApplicationUpdated(res.updatedApp);
      setHistory(getStatusHistory(application.application_id));
    }
  };

  const handleOpenDocReview = (doc) => {
    setSelectedDoc(doc);
    setDocReviewModalOpen(true);
  };

  const handleUpdateDocStatus = async (docId, newStatus, rejectionReason) => {
    const res = await updateDocumentStatus(application.application_id, docId, newStatus, rejectionReason, adminEmail);
    if (res.updatedApp) {
      onApplicationUpdated(res.updatedApp);
    }
  };

  const docsList = application.documents || [
    { id: 'doc_1', doc_type: 'Marksheets / Transcripts', file_name: 'Consolidated_Transcripts.pdf', status: 'Pending', file_size: '2.4 MB' },
    { id: 'doc_2', doc_type: 'Degree / Provisional Certificate', file_name: 'Degree_Certificate.pdf', status: 'Pending', file_size: '1.2 MB' },
    { id: 'doc_3', doc_type: 'Photo ID Proof', file_name: 'Government_Photo_ID.pdf', status: 'Pending', file_size: '800 KB' }
  ];

  return (
    <>
      <div className="admin-modal-backdrop" onClick={onClose}>
        <div className="admin-modal-box app-detail-modal" onClick={e => e.stopPropagation()}>
          
          {/* Modal Header */}
          <div className="detail-modal-header">
            <div className="detail-header-left">
              <div className="detail-title-row">
                <h2>{application.full_name}</h2>
                {application.isMock && <TestDataBadge />}
                <StatusBadge status={application.status} type="application" />
                <StatusBadge status={application.document_status} type="document" />
              </div>
              <div className="detail-meta-row">
                <span className="meta-item">
                  <strong>Application ID:</strong> <code>{application.application_id}</code>
                </span>
                <span className="meta-sep">•</span>
                <span className="meta-item">
                  <MailIcon size={14} />
                  <a href={`mailto:${application.email}`} className="email-link">{application.email}</a>
                </span>
                <span className="meta-sep">•</span>
                <span className="meta-item">
                  <ClockIcon size={14} />
                  <span>Submitted: {new Date(application.submitted_at).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </span>
              </div>
            </div>

            <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
              <XIcon size={22} />
            </button>
          </div>

          {/* Quick Decision Banner */}
          <div className="detail-decision-bar">
            <div className="decision-bar-label">
              <span>Decision Actions:</span>
            </div>
            <div className="decision-bar-btns">
              <button
                type="button"
                className="btn btn-sm btn-primary-accent"
                onClick={() => handleOpenDecision('Accept')}
                disabled={application.status === 'Accepted'}
              >
                Accept Application
              </button>
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={() => handleOpenDecision('Decline')}
                disabled={application.status === 'Declined'}
              >
                Decline Application
              </button>
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={() => handleOpenDecision('Review')}
                disabled={application.status === 'Under Review'}
              >
                Move to Review
              </button>
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={() => handleOpenDecision('ActionRequired')}
                disabled={application.status === 'Additional Information Required'}
                style={{ background: '#fff7ed', color: '#9a3412', borderColor: '#fed7aa', fontWeight: '600' }}
              >
                Request Additional Info
              </button>
            </div>
          </div>

          {/* Nav Tabs within Modal */}
          <div className="detail-modal-tabs">
            <button
              type="button"
              className={`detail-tab-btn ${activeSection === 'details' ? 'active' : ''}`}
              onClick={() => setActiveSection('details')}
            >
              Candidate Profile & Academics
            </button>
            <button
              type="button"
              className={`detail-tab-btn ${activeSection === 'documents' ? 'active' : ''}`}
              onClick={() => setActiveSection('documents')}
            >
              Document Verification ({docsList.length})
            </button>
            <button
              type="button"
              className={`detail-tab-btn ${activeSection === 'notes' ? 'active' : ''}`}
              onClick={() => setActiveSection('notes')}
            >
              Internal Notes ({notes.length})
            </button>
            <button
              type="button"
              className={`detail-tab-btn ${activeSection === 'history' ? 'active' : ''}`}
              onClick={() => setActiveSection('history')}
            >
              Audit History
            </button>
          </div>

          {/* Modal Body with Tab Views */}
          <div className="detail-modal-body">
            
            {/* TAB 1: DETAILS */}
            {activeSection === 'details' && (
              <div className="detail-tab-content">
                
                {/* Decision alert if already accepted/declined */}
                {application.decision_reason && (
                  <div className={`decision-summary-card ${application.status === 'Accepted' ? 'accepted' : 'declined'}`}>
                    <div className="summary-card-header">
                      <strong>Committee Decision ({application.status}):</strong>
                      <span>By {application.decided_by || 'Admissions Team'} on {application.decided_at ? new Date(application.decided_at).toLocaleString() : 'N/A'}</span>
                    </div>
                    <p className="summary-reason-text">{application.decision_reason}</p>
                  </div>
                )}

                {/* Section 1: Personal & Contact */}
                <div className="applicant-info-card">
                  <h4 className="info-card-title">
                    <UserIcon size={18} />
                    <span>Personal & Contact Information</span>
                  </h4>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="label">Full Name:</span>
                      <strong className="value">{application.full_name}</strong>
                    </div>
                    <div className="info-item">
                      <span className="label">Mail ID:</span>
                      <span className="value">{application.email}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Mobile Phone:</span>
                      <span className="value">{application.phone || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Date of Birth:</span>
                      <span className="value">{application.dob || 'N/A'}</span>
                    </div>
                    <div className="info-item full">
                      <span className="label">Residential Address:</span>
                      <span className="value">{application.address || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">{application.parent_relationship || 'Parent'} Name:</span>
                      <span className="value">{application.parent_name || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">{application.parent_relationship || 'Parent'} Mobile Number:</span>
                      <span className="value">{application.alt_phone || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Section 2: Academics & Experience */}
                <div className="applicant-info-card">
                  <h4 className="info-card-title">
                    <GraduationCapIcon size={18} />
                    <span>Undergraduate Academic Qualifications</span>
                  </h4>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="label">Qualifying Degree:</span>
                      <strong className="value">{application.ug_degree || 'B.Tech / B.E.'}</strong>
                    </div>
                    <div className="info-item">
                      <span className="label">University / Institution:</span>
                      <span className="value">{application.university || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Department / Branch:</span>
                      <span className="value">{application.department || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Aggregate Score:</span>
                      <strong className="value text-primary">{application.cgpa || 'N/A'} {application.grading_scale ? `(${application.grading_scale})` : ''}</strong>
                    </div>
                    <div className="info-item">
                      <span className="label">Graduation Year:</span>
                      <span className="value">{application.passing_year || 'N/A'}</span>
                    </div>
                    {application.score_eligibility_note && (
                      <div className="info-item full" style={{ background: '#fffbeb', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #fde68a' }}>
                        <span className="label" style={{ color: '#92400e' }}>Eligibility Threshold Advisory:</span>
                        <span className="value" style={{ color: '#92400e', fontSize: '0.85rem' }}>{application.score_eligibility_note}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Section 3: Entrance Exam Scores & CV */}
                <div className="applicant-info-card">
                  <h4 className="info-card-title">
                    <AwardIcon size={18} />
                    <span>Entrance Examination &amp; CV / Resume</span>
                  </h4>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="label">GRE Score:</span>
                      <span className="value">{application.gre_score || 'Not provided'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">GATE Score:</span>
                      <span className="value">{application.gate_score || 'Not provided'}</span>
                    </div>
                    <div className="info-item full">
                      <span className="label">Curriculum Vitae (CV) / Resume:</span>
                      <span className="value">
                        {application.cv_url ? (
                          <a 
                            href={application.cv_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn btn-sm btn-secondary" 
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.25rem' }}
                          >
                            <DownloadIcon size={14} />
                            <span>Download CV ({application.cv_filename || 'Candidate_CV.pdf'})</span>
                          </a>
                        ) : (
                          application.cv_filename || 'Uploaded with application'
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Section 4: Statement about MSIT */}
                {(application.statement_text || application.purpose_to_join) && (
                  <div className="applicant-info-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <h4 className="info-card-title" style={{ margin: 0 }}>
                        <BookOpenIcon size={18} />
                        <span>Statement about MSIT</span>
                      </h4>
                      <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#0b2a6b', background: '#eff6ff', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                        {application.statement_word_count || (application.statement_text ? application.statement_text.trim().split(/\s+/).length : 0)} / 200 words
                      </span>
                    </div>
                    <p className="sop-text" style={{ fontStyle: 'italic', background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      "{application.statement_text || application.purpose_to_join}"
                    </p>
                  </div>
                )}

                {/* Section 5: Referral Source */}
                {application.referral_source && (
                  <div className="applicant-info-card">
                    <h4 className="info-card-title">
                      <UsersIcon size={18} />
                      <span>How Candidate Heard About MSIT</span>
                    </h4>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="label">Source:</span>
                        <strong className="value">{application.referral_source}</strong>
                      </div>
                      {application.referral_explanation && (
                        <div className="info-item">
                          <span className="label">Explanation:</span>
                          <span className="value">{application.referral_explanation}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* TAB 2: DOCUMENTS */}
            {activeSection === 'documents' && (
              <div className="detail-tab-content">
                <div className="doc-review-guidance">
                  <p>
                    Review each candidate document below. Admins can mark documents as <strong>Accepted / Verified</strong> or <strong>Rejected</strong> with a mandatory reason note.
                  </p>
                  <span className="doc-note-pill">
                    Note: Submitted documents are never permanently deleted as part of the review workflow.
                  </span>
                </div>

                <div className="docs-table-wrapper">
                  <table className="admin-table docs-table">
                    <thead>
                      <tr>
                        <th>Document Type</th>
                        <th>File Name</th>
                        <th>Size</th>
                        <th>Status</th>
                        <th>Rejection Comment</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {docsList.map((doc) => (
                        <tr key={doc.id}>
                          <td><strong>{doc.doc_type}</strong></td>
                          <td className="code-font">{doc.file_name}</td>
                          <td>{doc.file_size || '1.2 MB'}</td>
                          <td>
                            <StatusBadge status={doc.status} type="document" />
                          </td>
                          <td className="rejection-col">
                            {doc.rejection_reason ? (
                              <span className="rejection-text">{doc.rejection_reason}</span>
                            ) : (
                              <span className="text-muted">—</span>
                            )}
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                              <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                onClick={() => handleOpenDocReview(doc)}
                              >
                                Review / Update
                              </button>
                              {doc.file_url && (
                                <a
                                  href={doc.file_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-sm"
                                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.25rem 0.5rem', fontSize: '0.78rem', textDecoration: 'none', color: '#0f172a' }}
                                  title="Open document securely in new tab"
                                >
                                  View File
                                </a>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: INTERNAL NOTES */}
            {activeSection === 'notes' && (
              <div className="detail-tab-content">
                <div className="internal-notes-banner">
                  <span className="private-badge">Internal Committee Only</span>
                  <p>Internal notes are only visible to authorized administrators and will never be shown to the candidate.</p>
                </div>

                {/* Add note form */}
                <form onSubmit={handleAddNote} className="add-note-form">
                  <div className="form-field-group">
                    <label htmlFor="newNote">Add Internal Admin Note</label>
                    <textarea
                      id="newNote"
                      rows={3}
                      className="form-textarea-control"
                      placeholder="Enter internal evaluation comments, phone screening notes, interview impressions..."
                      value={newNoteText}
                      onChange={e => setNewNoteText(e.target.value)}
                    />
                  </div>
                  <div className="note-submit-row">
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm"
                      disabled={isAddingNote || !newNoteText.trim()}
                    >
                      {isAddingNote ? 'Saving...' : 'Add Note'}
                    </button>
                  </div>
                </form>

                {/* Notes Stream */}
                <div className="notes-stream">
                  {notes.length === 0 ? (
                    <div className="empty-notes-box">
                      <p>No internal notes recorded yet for this applicant.</p>
                    </div>
                  ) : (
                    notes.map(n => (
                      <div key={n.id} className="admin-note-item">
                        <div className="note-header">
                          <strong className="note-author">{n.admin_email}</strong>
                          <span className="note-time">
                            {new Date(n.created_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                          </span>
                        </div>
                        <p className="note-body">{n.note}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 4: AUDIT HISTORY */}
            {activeSection === 'history' && (
              <div className="detail-tab-content">
                <div className="history-timeline">
                  {history.length === 0 ? (
                    <div className="empty-history-box">
                      <p>No status changes recorded yet for this application.</p>
                    </div>
                  ) : (
                    history.map(item => (
                      <div key={item.id} className="timeline-entry">
                        <div className="timeline-dot" />
                        <div className="timeline-content">
                          <div className="timeline-title-row">
                            <span className="timeline-status-change">
                              {item.previous_status ? (
                                <>
                                  <span className="prev-st">{item.previous_status}</span>
                                  <span className="arrow">→</span>
                                </>
                              ) : null}
                              <StatusBadge status={item.new_status} type="application" />
                            </span>
                            <span className="timeline-time">
                              {new Date(item.created_at).toLocaleString()}
                            </span>
                          </div>
                          <p className="timeline-meta">
                            Updated by: <strong>{item.changed_by}</strong>
                          </p>
                          {item.reason && (
                            <p className="timeline-reason">
                              Reason / Note: {item.reason}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Modal Footer */}
          <div className="detail-modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close Window
            </button>
          </div>

        </div>
      </div>

      {/* Decision Confirmation Modal */}
      <ConfirmDecisionModal
        isOpen={decisionModalOpen}
        onClose={() => setDecisionModalOpen(false)}
        onConfirm={handleExecuteDecision}
        decisionType={decisionType}
        applicantName={application.full_name}
        applicationId={application.application_id}
      />

      {/* Document Review Modal */}
      <DocumentReviewModal
        isOpen={docReviewModalOpen}
        onClose={() => setDocReviewModalOpen(false)}
        document={selectedDoc}
        applicantName={application.full_name}
        applicationId={application.application_id}
        onUpdateStatus={handleUpdateDocStatus}
      />
    </>
  );
}
