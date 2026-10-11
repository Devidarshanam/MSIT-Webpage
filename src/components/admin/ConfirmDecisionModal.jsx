import React, { useState, useEffect } from 'react';
import { XIcon, CheckCircleIcon, ShieldCheckIcon } from '../Icons';

export default function ConfirmDecisionModal({
  isOpen,
  onClose,
  onConfirm,
  decisionType, // 'Accept' | 'Decline' | 'Review' | 'Pending' | 'ActionRequired' | 'Interview' | 'PGEE'
  applicantName,
  applicationId,
  applicationData = null
}) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Interview state
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('10:30 AM IST');
  const [interviewMode, setInterviewMode] = useState('Online Video Meeting (Google Meet)');
  const [interviewLocation, setInterviewLocation] = useState('');

  // PGEE Exam state
  const [gatDate, setGatDate] = useState('2026-12-15');
  const [gatSlot, setGatSlot] = useState('10:00 AM - 12:00 PM IST');
  const [gatMode, setGatMode] = useState('Online Proctored');

  useEffect(() => {
    if (isOpen) {
      setError('');
      setReason('');
      if (applicationData) {
        if (applicationData.interview_date) setInterviewDate(applicationData.interview_date);
        if (applicationData.interview_time) setInterviewTime(applicationData.interview_time);
        if (applicationData.interview_mode) setInterviewMode(applicationData.interview_mode);
        if (applicationData.interview_location) setInterviewLocation(applicationData.interview_location);

        if (applicationData.gat_exam_date) setGatDate(applicationData.gat_exam_date);
        if (applicationData.gat_slot) setGatSlot(applicationData.gat_slot);
        if (applicationData.gat_mode) setGatMode(applicationData.gat_mode);
      }
    }
  }, [isOpen, applicationData, decisionType]);

  if (!isOpen) return null;

  const isDecline = decisionType === 'Decline';
  const isAccept = decisionType === 'Accept';
  const isActionRequired = decisionType === 'ActionRequired' || decisionType === 'Pending';
  const isInterview = decisionType === 'Interview';
  const isPgee = decisionType === 'PGEE';

  const handleConfirm = async () => {
    let finalReason = reason.trim();
    const extraPayload = {};

    if (isDecline) {
      if (!finalReason) {
        setError('Please specify a mandatory reason for declining this application.');
        return;
      }
      extraPayload.status = 'Declined';
    } else if (isActionRequired) {
      if (!finalReason) {
        setError('Please specify the instructions/documents needed from the candidate.');
        return;
      }
      extraPayload.status = 'Additional Information Required';
    } else if (isInterview) {
      if (!interviewDate) {
        setError('Please select an interview date.');
        return;
      }
      if (!finalReason) {
        finalReason = `Shortlisted for faculty interview round on ${interviewDate} at ${interviewTime} (${interviewMode}).`;
      }
      extraPayload.status = 'Interview Scheduled';
      extraPayload.interview_date = interviewDate;
      extraPayload.interview_time = interviewTime;
      extraPayload.interview_mode = interviewMode;
      extraPayload.interview_location = interviewLocation.trim();
      extraPayload.interview_status = 'Scheduled';
    } else if (isPgee) {
      if (!gatDate) {
        setError('Please specify the MSIT PGEE exam date.');
        return;
      }
      if (!finalReason) {
        finalReason = `Scheduled for MSIT PGEE Entrance Examination on ${gatDate} (${gatSlot}).`;
      }
      extraPayload.status = 'Scheduled for MSIT PGEE Exam';
      extraPayload.gat_exam_date = gatDate;
      extraPayload.gat_slot = gatSlot;
      extraPayload.gat_mode = gatMode;
      extraPayload.gat_status = 'Scheduled';
    } else if (isAccept) {
      if (!finalReason) {
        finalReason = 'Offer of Admission approved by Admissions Committee';
      }
      extraPayload.status = 'Accepted';
      extraPayload.admission_offer = 'Issued';
    } else {
      if (!finalReason) {
        finalReason = 'Status moved to Under Review';
      }
      extraPayload.status = 'Under Review';
    }

    setIsSubmitting(true);
    setError('');
    try {
      await onConfirm(finalReason, extraPayload);
      setReason('');
      setError('');
      onClose();
    } catch (err) {
      console.error('Failed to confirm decision:', err);
      setError('Failed to update application decision.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div 
        className="admin-modal-box confirm-decision-modal" 
        style={{ maxWidth: (isInterview || isPgee) ? '580px' : '520px' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title-wrap">
            <h3 className={isDecline ? 'text-danger' : isAccept ? 'text-success' : isActionRequired ? 'text-warning' : (isInterview ? 'text-primary' : '')}>
              {isInterview && '🎙️ Move to Interview Round'}
              {isPgee && '📝 Schedule MSIT PGEE Exam'}
              {isAccept && 'Accept Application (Admission Offer)'}
              {isDecline && 'Decline Application'}
              {decisionType === 'Review' && 'Move Application to Under Review'}
              {isActionRequired && 'Request Additional Information / Documents'}
            </h3>
            <span className="modal-sub">
              Candidate: <strong>{applicantName}</strong> ({applicationId})
            </span>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close">
            <XIcon size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Pathway A: INTERVIEW */}
          {isInterview && (
            <>
              <div className="decision-notice-box" style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e40af', padding: '0.85rem 1rem', borderRadius: '8px', marginBottom: '1.25rem' }}>
                <p style={{ margin: 0, fontWeight: '600', fontSize: '0.9rem' }}>
                  Candidate Qualified for Faculty Interview
                </p>
                <span style={{ fontSize: '0.82rem', color: '#3b82f6', display: 'block', marginTop: '0.25rem' }}>
                  Applicant holds verified entrance scores and documents. Set the interview schedule below to notify the candidate on their portal.
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1rem' }}>
                <div className="form-field-group">
                  <label htmlFor="interviewDateInput" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                    Interview Date <span className="req">*</span>
                  </label>
                  <input
                    id="interviewDateInput"
                    type="date"
                    className="form-control"
                    value={interviewDate}
                    onChange={e => {
                      setInterviewDate(e.target.value);
                      if (error) setError('');
                    }}
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="interviewTimeSelect" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                    Interview Time Slot
                  </label>
                  <select
                    id="interviewTimeSelect"
                    className="form-control"
                    value={interviewTime}
                    onChange={e => setInterviewTime(e.target.value)}
                  >
                    <option value="10:00 AM IST">10:00 AM IST</option>
                    <option value="10:30 AM IST">10:30 AM IST</option>
                    <option value="11:30 AM IST">11:30 AM IST</option>
                    <option value="02:00 PM IST">02:00 PM IST</option>
                    <option value="03:00 PM IST">03:00 PM IST</option>
                    <option value="04:00 PM IST">04:00 PM IST</option>
                    <option value="05:00 PM IST">05:00 PM IST</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1rem' }}>
                <div className="form-field-group">
                  <label htmlFor="interviewModeSelect" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                    Interview Mode
                  </label>
                  <select
                    id="interviewModeSelect"
                    className="form-control"
                    value={interviewMode}
                    onChange={e => setInterviewMode(e.target.value)}
                  >
                    <option value="Online Video Meeting (Google Meet)">Online Video Meeting (Google Meet)</option>
                    <option value="In-Person (IIIT Hyderabad Campus)">In-Person (IIIT Hyderabad)</option>
                    <option value="In-Person (JNTU Hyderabad Campus)">In-Person (JNTU Hyderabad)</option>
                  </select>
                </div>

                <div className="form-field-group">
                  <label htmlFor="interviewLocInput" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                    Meeting Link or Room (Optional)
                  </label>
                  <input
                    id="interviewLocInput"
                    type="text"
                    className="form-control"
                    placeholder="e.g. https://meet.google.com/xyz-abc or Room 204"
                    value={interviewLocation}
                    onChange={e => setInterviewLocation(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/* Pathway B: PGEE ENTRANCE EXAM */}
          {isPgee && (
            <>
              <div className="decision-notice-box" style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#92400e', padding: '0.85rem 1rem', borderRadius: '8px', marginBottom: '1.25rem' }}>
                <p style={{ margin: 0, fontWeight: '600', fontSize: '0.9rem' }}>
                  Assign MSIT Postgraduate Entrance Examination (PGEE)
                </p>
                <span style={{ fontSize: '0.82rem', color: '#b45309', display: 'block', marginTop: '0.25rem' }}>
                  Candidate does not have a GRE or GATE score on file. Assign them to sit for the MSIT PGEE entrance test to qualify for interview.
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1rem' }}>
                <div className="form-field-group">
                  <label htmlFor="gatDateInput" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                    PGEE Exam Date <span className="req">*</span>
                  </label>
                  <input
                    id="gatDateInput"
                    type="date"
                    className="form-control"
                    value={gatDate}
                    onChange={e => {
                      setGatDate(e.target.value);
                      if (error) setError('');
                    }}
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="gatSlotSelect" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                    Examination Slot
                  </label>
                  <select
                    id="gatSlotSelect"
                    className="form-control"
                    value={gatSlot}
                    onChange={e => setGatSlot(e.target.value)}
                  >
                    <option value="10:00 AM - 12:00 PM IST">10:00 AM - 12:00 PM IST (Morning)</option>
                    <option value="02:00 PM - 04:00 PM IST">02:00 PM - 04:00 PM IST (Afternoon)</option>
                  </select>
                </div>
              </div>

              <div className="form-field-group" style={{ marginBottom: '1rem' }}>
                <label htmlFor="gatModeSelect" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                  Assessment Delivery Mode
                </label>
                <select
                  id="gatModeSelect"
                  className="form-control"
                  value={gatMode}
                  onChange={e => setGatMode(e.target.value)}
                >
                  <option value="Online Proctored">Online Proctored (National Web-based Assessment)</option>
                  <option value="IIIT Hyderabad Campus Center">IIIT Hyderabad Campus Examination Center</option>
                  <option value="JNTU Hyderabad Campus Center">JNTU Hyderabad Campus Examination Center</option>
                </select>
              </div>
            </>
          )}

          {isAccept && (
            <div className="decision-notice-box notice-success">
              <p>
                Are you sure you want to mark this application as <strong>Accepted</strong>?
              </p>
              <span className="notice-clarification">
                Official offer of admission will be reflected immediately on the candidate portal.
              </span>
            </div>
          )}

          {isDecline && (
            <div className="decision-notice-box notice-danger">
              <p>
                Declining an application requires documenting an official reason for the admissions committee audit log.
              </p>
            </div>
          )}

          {isActionRequired && (
            <div className="decision-notice-box notice-warning" style={{ background: '#fff7ed', borderColor: '#fed7aa', color: '#9a3412', padding: '0.85rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>
                This status notifies the candidate on their dashboard and enables the <strong>Update Application</strong> button so they can upload revised documents or provide missing information.
              </p>
            </div>
          )}

          {(!isAccept && !isDecline && !isActionRequired && !isInterview && !isPgee) && (
            <p className="modal-description-text">
              Update status for this candidate to <strong>Under Review</strong>.
            </p>
          )}

          {/* Reason / Comment text area */}
          <div className="form-field-group">
            <label htmlFor="decisionReason">
              {isDecline ? (
                <>Official Decline Reason <span className="req">*</span></>
              ) : isActionRequired ? (
                <>Instructions / Requested Information for Candidate <span className="req">*</span></>
              ) : isInterview ? (
                <>Interview Instructions / Discussion Topics for Candidate (Optional)</>
              ) : isPgee ? (
                <>PGEE Exam Syllabus &amp; Instructions for Candidate (Optional)</>
              ) : (
                <>Internal Note / Committee Remark (Optional)</>
              )}
            </label>
            <textarea
              id="decisionReason"
              rows={3}
              className={`form-textarea-control ${error ? 'has-error' : ''}`}
              placeholder={
                isDecline
                  ? 'Specify why this application is being declined (e.g. Ineligible CGPA, Incomplete transcripts, etc.)...'
                  : isActionRequired
                  ? 'e.g. Please upload a clearer scan of Class 10 marksheet or provide updated degree certificate...'
                  : isInterview
                  ? 'e.g. Technical interaction covering programming logic, data structures, and computational thinking...'
                  : isPgee
                  ? 'e.g. Computer-based test covering Quantitative Aptitude, Logical Reasoning, and Basic Programming...'
                  : 'Add any optional admissions committee comments...'
              }
              value={reason}
              onChange={e => {
                setReason(e.target.value);
                if (error) setError('');
              }}
            />
            {error && <span className="field-err-msg">{error}</span>}
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`btn ${
              isDecline 
                ? 'btn-danger' 
                : isActionRequired 
                ? 'btn-primary-accent' 
                : isInterview
                ? 'btn-primary'
                : isPgee
                ? 'btn-primary-accent'
                : 'btn-primary'
            }`}
            onClick={handleConfirm}
            disabled={isSubmitting}
            style={
              isPgee ? { background: '#d97706', borderColor: '#d97706', color: '#fff' } :
              isInterview ? { background: '#1d4ed8', borderColor: '#1d4ed8', color: '#fff' } : {}
            }
          >
            {isSubmitting 
              ? 'Updating...' 
              : isActionRequired 
              ? 'Request Updates' 
              : isInterview
              ? 'Confirm & Schedule Interview'
              : isPgee
              ? 'Confirm & Schedule PGEE Exam'
              : `Confirm ${decisionType}`}
          </button>
        </div>
      </div>
    </div>
  );
}
