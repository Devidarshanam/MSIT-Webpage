import React, { useState } from 'react';
import { XIcon, CheckCircleIcon, ShieldCheckIcon } from '../Icons';

export default function ConfirmDecisionModal({
  isOpen,
  onClose,
  onConfirm,
  decisionType, // 'Accept' | 'Decline' | 'Review' | 'Pending'
  applicantName,
  applicationId
}) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const isDecline = decisionType === 'Decline';
  const isAccept = decisionType === 'Accept';

  const handleConfirm = async () => {
    if (isDecline && !reason.trim()) {
      setError('A decline reason / comment is required before declining an application.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onConfirm(reason.trim());
      setReason('');
      setError('');
      onClose();
    } catch (err) {
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
            <h3 className={isDecline ? 'text-danger' : isAccept ? 'text-success' : ''}>
              {decisionType === 'Accept' && 'Accept Application'}
              {decisionType === 'Decline' && 'Decline Application'}
              {decisionType === 'Review' && 'Move Application to Under Review'}
              {decisionType === 'Pending' && 'Move Application to Documents Pending'}
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
                PENDING — REQUIRES CONFIRMATION: Automated acceptance emails are not sent automatically.
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

          {(!isAccept && !isDecline) && (
            <p className="modal-description-text">
              Update status for this candidate to <strong>{decisionType === 'Review' ? 'Under Review' : 'Documents Pending'}</strong>.
            </p>
          )}

          {/* Reason / Comment text area */}
          <div className="form-field-group">
            <label htmlFor="decisionReason">
              {isDecline ? (
                <>Official Decline Reason <span className="req">*</span></>
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
            className={`btn ${isDecline ? 'btn-danger' : 'btn-primary'}`}
            onClick={handleConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : `Confirm ${decisionType}`}
          </button>
        </div>
      </div>
    </div>
  );
}
