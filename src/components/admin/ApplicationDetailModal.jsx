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
  BookOpenIcon,
  UsersIcon
} from '../Icons';
import { StatusBadge, TestDataBadge } from './StatusBadge';
import ConfirmDecisionModal from './ConfirmDecisionModal';
import DocumentReviewModal from './DocumentReviewModal';
import { 
  addApplicationNote, 
  getApplicationNotes, 
  getStatusHistory, 
  updateDocumentStatus, 
  updateApplicationStatus,
  updateApplicationRecord
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

  // Workflow evaluation state
  const [workflowGatDate, setWorkflowGatDate] = useState(application?.gat_exam_date || '');
  const [workflowGatScore, setWorkflowGatScore] = useState(application?.gat_score || '');
  const [workflowGatResult, setWorkflowGatResult] = useState(application?.gat_result || 'Pending');
  const [workflowGatStatus, setWorkflowGatStatus] = useState(application?.gat_status || 'Pending');

  const [workflowInterviewDate, setWorkflowInterviewDate] = useState(application?.interview_date || '');
  const [workflowInterviewTime, setWorkflowInterviewTime] = useState(application?.interview_time || '');
  const [workflowInterviewOutcome, setWorkflowInterviewOutcome] = useState(application?.interview_outcome || 'Pending');
  const [workflowInterviewStatus, setWorkflowInterviewStatus] = useState(application?.interview_status || 'Pending');

  const [workflowOnboardingDate, setWorkflowOnboardingDate] = useState(application?.onboarding_date || '');
  const [workflowOnboardingStatus, setWorkflowOnboardingStatus] = useState(application?.onboarding_status || 'Pending');
  const [isSavingWorkflow, setIsSavingWorkflow] = useState(false);
  const [workflowSaveMessage, setWorkflowSaveMessage] = useState('');

  if (!isOpen || !application) return null;

  const handleSaveWorkflow = async (e) => {
    e.preventDefault();
    setIsSavingWorkflow(true);
    setWorkflowSaveMessage('');
    try {
      const patch = {
        gat_exam_date: workflowGatDate || null,
        gat_score: workflowGatScore || null,
        gat_result: workflowGatResult,
        gat_status: workflowGatStatus,
        interview_date: workflowInterviewDate || null,
        interview_time: workflowInterviewTime || null,
        interview_outcome: workflowInterviewOutcome,
        interview_status: workflowInterviewStatus,
        onboarding_date: workflowOnboardingDate || null,
        onboarding_status: workflowOnboardingStatus
      };
      const res = await updateApplicationRecord(application.application_id, patch, adminEmail);
      if (res.updatedApp) {
        onApplicationUpdated(res.updatedApp);
        setWorkflowSaveMessage('Workflow updates saved & synced successfully!');
        setTimeout(() => setWorkflowSaveMessage(''), 3000);
      }
    } catch (err) {
      console.error('Failed to save workflow:', err);
    } finally {
      setIsSavingWorkflow(false);
    }
  };

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
              className={`detail-tab-btn ${activeSection === 'workflow' ? 'active' : ''}`}
              onClick={() => setActiveSection('workflow')}
            >
              Admission Workflow & Evaluation
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
                    <span>1. Personal & Contact Information</span>
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
                  </div>
                </div>

                {/* Section 2: Parent / Guardian Information */}
                <div className="applicant-info-card">
                  <h4 className="info-card-title">
                    <UsersIcon size={18} />
                    <span>2. Parent / Guardian Information</span>
                  </h4>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="label">Relationship:</span>
                      <strong className="value">{application.parent_relationship || 'Father'}</strong>
                    </div>
                    <div className="info-item">
                      <span className="label">{application.parent_relationship || 'Parent'}'s Name:</span>
                      <span className="value">{application.parent_name || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">{application.parent_relationship || 'Parent'}'s Mobile:</span>
                      <span className="value">{application.alt_phone || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Section 3: Academic Qualifications */}
                <div className="applicant-info-card">
                  <h4 className="info-card-title">
                    <GraduationCapIcon size={18} />
                    <span>3. Academic Qualifications</span>
                  </h4>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="label">Class 10 / SSC:</span>
                      <span className="value">{application.class10_score ? `${application.class10_score} (${application.class10_score_type || 'Percentage'})` : 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Class 12 / Intermediate:</span>
                      <span className="value">{application.inter_score ? `${application.inter_score} (${application.inter_score_type || 'Percentage'}) [${application.inter_pathway || 'Class 12'}]` : 'N/A'}</span>
                    </div>
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
                      <span className="label">Graduation Year:</span>
                      <span className="value">{application.passing_year || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Degree Aggregate Score:</span>
                      <strong className="value text-primary">{application.cgpa || 'N/A'} {application.grading_scale ? `(${application.grading_scale})` : ''}</strong>
                    </div>
                    {application.score_eligibility_note && (
                      <div className="info-item full" style={{ background: '#fffbeb', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #fde68a' }}>
                        <span className="label" style={{ color: '#92400e' }}>Eligibility Threshold Advisory:</span>
                        <span className="value" style={{ color: '#92400e', fontSize: '0.85rem' }}>{application.score_eligibility_note}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Section 4: Work Experience */}
                <div className="applicant-info-card">
                  <h4 className="info-card-title">
                    <BriefcaseIcon size={18} />
                    <span>4. Work Experience</span>
                  </h4>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="label">Experience Status:</span>
                      <strong className="value">{application.has_experience === 'Yes' ? 'Experienced' : 'Fresher'}</strong>
                    </div>
                    {application.has_experience === 'Yes' && (
                      <>
                        <div className="info-item">
                          <span className="label">Duration:</span>
                          <span className="value">{application.experience_years || '0'} Years, {application.experience_months || '0'} Months</span>
                        </div>
                        <div className="info-item">
                          <span className="label">Company Name:</span>
                          <span className="value">{application.company_name || 'N/A'}</span>
                        </div>
                        <div className="info-item">
                          <span className="label">Job Title / Role:</span>
                          <span className="value">{application.job_role || 'N/A'}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Section 5: Purpose of Joining MSIT */}
                {(application.statement_text || application.purpose_to_join) && (
                  <div className="applicant-info-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <h4 className="info-card-title" style={{ margin: 0 }}>
                        <BookOpenIcon size={18} />
                        <span>5. Purpose of Joining MSIT</span>
                      </h4>
                      <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#0b2a6b', background: '#eff6ff', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                        {application.statement_word_count || (application.statement_text ? application.statement_text.trim().split(/\s+/).length : 0)} / 200 words
                      </span>
                    </div>
                    <p className="sop-text" style={{ fontStyle: 'italic', background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0', margin: 0 }}>
                      "{application.statement_text || application.purpose_to_join}"
                    </p>
                  </div>
                )}

                {/* Section 6: Referral Source */}
                {application.referral_source && (
                  <div className="applicant-info-card">
                    <h4 className="info-card-title">
                      <UsersIcon size={18} />
                      <span>6. How Candidate Heard About MSIT</span>
                    </h4>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="label">Source:</span>
                        <strong className="value">{application.referral_source}</strong>
                      </div>
                      {application.referral_explanation && (
                        <div className="info-item">
                          <span className="label">Specification:</span>
                          <span className="value">{application.referral_explanation}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Section 7: Entrance Examination Details & CV */}
                <div className="applicant-info-card">
                  <h4 className="info-card-title">
                    <AwardIcon size={18} />
                    <span>7. Entrance Examination Details &amp; CV</span>
                  </h4>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="label">Entrance Exam Status:</span>
                      <strong className="value">{application.entrance_exam_status || 'Neither'}</strong>
                    </div>
                    {application.gre_score && (
                      <div className="info-item">
                        <span className="label">GRE Score:</span>
                        <span className="value">{application.gre_score} {application.gre_year ? `(${application.gre_year})` : ''}</span>
                      </div>
                    )}
                    {application.gate_score && (
                      <div className="info-item">
                        <span className="label">GATE Score:</span>
                        <span className="value">{application.gate_score} {application.gate_year ? `(${application.gate_year})` : ''}</span>
                      </div>
                    )}
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

            {/* TAB: WORKFLOW & EVALUATION */}
            {activeSection === 'workflow' && (
              <div className="detail-tab-content">
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem', marginBottom: '1.25rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem', color: '#0f172a' }}>
                    Candidate Evaluation Pathway &amp; Progress
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569' }}>
                    Evaluation Mode: <strong>{application.entrance_exam_status || 'Neither'}</strong>
                    {application.gre_score ? ` · GRE Score: ${application.gre_score}` : ''}
                    {application.gate_score ? ` · GATE Score: ${application.gate_score}` : ''}
                    {(application.entrance_exam_status === 'GRE' || application.entrance_exam_status === 'GATE' || application.entrance_exam_status === 'Both')
                      ? ' — Qualifies via GATE/GRE Pathway (GAT Exam Exempt)'
                      : ' — Qualifies via GAT Examination Pathway'}
                  </p>
                </div>

                <form onSubmit={handleSaveWorkflow} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Section A: GAT Examination */}
                  <div className="applicant-info-card">
                    <h4 className="info-card-title">
                      <span>1. GAT Examination Evaluation (For Non-GATE/GRE Candidates)</span>
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '0.75rem' }}>
                      <div className="form-field-group">
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>GAT Exam Status</label>
                        <select 
                          className="form-control"
                          value={workflowGatStatus}
                          onChange={e => setWorkflowGatStatus(e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Scheduled">Scheduled</option>
                          <option value="Completed">Completed</option>
                          <option value="Exempt">Exempt (GATE/GRE)</option>
                        </select>
                      </div>

                      <div className="form-field-group">
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>GAT Exam Date</label>
                        <input 
                          type="text"
                          className="form-control"
                          placeholder="e.g. Dec 15, 2026"
                          value={workflowGatDate}
                          onChange={e => setWorkflowGatDate(e.target.value)}
                        />
                      </div>

                      <div className="form-field-group">
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>GAT Score</label>
                        <input 
                          type="text"
                          className="form-control"
                          placeholder="e.g. 82 / 100"
                          value={workflowGatScore}
                          onChange={e => setWorkflowGatScore(e.target.value)}
                        />
                      </div>

                      <div className="form-field-group">
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>GAT Result</label>
                        <select 
                          className="form-control"
                          value={workflowGatResult}
                          onChange={e => setWorkflowGatResult(e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Not Qualified">Not Qualified</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section B: Technical Interview & Counselling */}
                  <div className="applicant-info-card">
                    <h4 className="info-card-title">
                      <span>2. Technical Interview &amp; Counselling Scheduling</span>
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '0.75rem' }}>
                      <div className="form-field-group">
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Interview Status</label>
                        <select 
                          className="form-control"
                          value={workflowInterviewStatus}
                          onChange={e => setWorkflowInterviewStatus(e.target.value)}
                        >
                          <option value="Pending">Pending Scheduling</option>
                          <option value="Scheduled">Scheduled</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>

                      <div className="form-field-group">
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Interview Scheduled Date</label>
                        <input 
                          type="text"
                          className="form-control"
                          placeholder="e.g. Dec 22, 2026"
                          value={workflowInterviewDate}
                          onChange={e => setWorkflowInterviewDate(e.target.value)}
                        />
                      </div>

                      <div className="form-field-group">
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Interview Scheduled Time</label>
                        <input 
                          type="text"
                          className="form-control"
                          placeholder="e.g. 10:30 AM IST"
                          value={workflowInterviewTime}
                          onChange={e => setWorkflowInterviewTime(e.target.value)}
                        />
                      </div>

                      <div className="form-field-group">
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Interview Outcome</label>
                        <select 
                          className="form-control"
                          value={workflowInterviewOutcome}
                          onChange={e => setWorkflowInterviewOutcome(e.target.value)}
                        >
                          <option value="Pending">Pending Evaluation</option>
                          <option value="Cleared">Cleared / Recommended</option>
                          <option value="Not Cleared">Not Cleared</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section C: Final Decision & Onboarding */}
                  <div className="applicant-info-card">
                    <h4 className="info-card-title">
                      <span>3. Batch Onboarding Details</span>
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '0.75rem' }}>
                      <div className="form-field-group">
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Onboarding Status</label>
                        <select 
                          className="form-control"
                          value={workflowOnboardingStatus}
                          onChange={e => setWorkflowOnboardingStatus(e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Scheduled">Scheduled</option>
                          <option value="Completed">Completed / Onboarded</option>
                        </select>
                      </div>

                      <div className="form-field-group">
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Onboarding Date</label>
                        <input 
                          type="text"
                          className="form-control"
                          placeholder="e.g. January 2, 2027"
                          value={workflowOnboardingDate}
                          onChange={e => setWorkflowOnboardingDate(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {workflowSaveMessage && (
                    <div style={{ padding: '0.6rem 0.75rem', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '6px', color: '#065f46', fontSize: '0.85rem' }}>
                      {workflowSaveMessage}
                    </div>
                  )}

                  <div>
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-sm"
                      disabled={isSavingWorkflow}
                    >
                      {isSavingWorkflow ? 'Saving Workflow...' : 'Save Workflow & Sync to Student'}
                    </button>
                  </div>
                </form>
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
