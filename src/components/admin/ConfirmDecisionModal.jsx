import React, { useState } from 'react';
import { XIcon, CheckCircleIcon, ShieldCheckIcon } from '../Icons';

export default function ConfirmDecisionModal({
  isOpen,
  onClose,
  onConfirm,
  decisionType, // 'Accept' | 'Decline' | 'Review' | 'Pending' | 'ActionRequired'
  applicantName,
  applicationId
}) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const isDecline = decisionType === 'Decline';
  const isAccept = decisionType === 'Accept';
  const isActionRequired = decisionType === 'ActionRequired' || decisionType === 'Pending';

  const handleConfirm = async () => {
    let finalReason = reason.trim();
    if (!finalReason) {
      if (isDecline) finalReason = 'Application declined by Admissions Committee';
      else if (isAccept) finalReason = 'Offer of Admission approved by Admissions Committee';
      else if (isActionRequired) finalReason = 'Please provide required document updates.';
      else finalReason = 'Status moved to Under Review';
    }

    setIsSubmitting(true);
    setError('');
    try {
      await onConfirm(finalReason);
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
      <div className="admin-modal-box confirm-decision-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <h3 className={isDecline ? 'text-danger' : isAccept ? 'text-success' : isActionRequired ? 'text-warning' : ''}>
              {decisionType === 'Accept' && 'Accept Application'}
              {decisionType === 'Decline' && 'Decline Application'}
              {decisionType === 'Review' && 'Move Application to Under Review'}
              {isActionRequired && 'Request Additional Information / Documents'}
            </h3>
            <span className="modal-sub">
              Candidate: <strong>{applicantName}</strong> ({applicationId})
            </span>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <XIcon size={20} />
          </button>
        </div>

        <div className="modal-body">
          {isAccept && (
            <div className="decision-notice-box notice-success">
              <p>
                Are you sure you want to mark this application as <strong>Accepted</strong>?
              </p>
              <span className="notice-clarification">
                Official offer will be reflected on the candidate portal.
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

          {(!isAccept && !isDecline && !isActionRequired) && (
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
            className={`btn ${isDecline ? 'btn-danger' : isActionRequired ? 'btn-primary-accent' : 'btn-primary'}`}
            onClick={handleConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : isActionRequired ? 'Request Updates' : `Confirm ${decisionType}`}
          </button>
        </div>
      </div>
    </div>
  );
}
