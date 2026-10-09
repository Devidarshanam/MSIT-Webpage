import React from 'react';

/**
 * Clean, accessible Status Badge for Applications and Documents.
 */
export function StatusBadge({ status, type = 'application' }) {
  if (!status) return null;

  const normalized = status.toLowerCase();

  let badgeClass = 'status-badge-neutral';

  if (type === 'document') {
    if (normalized.includes('verif') || normalized === 'accepted') {
      badgeClass = 'status-badge-success';
    } else if (normalized.includes('reject')) {
      badgeClass = 'status-badge-danger';
    } else {
      badgeClass = 'status-badge-warning';
    }
  } else {
    // Application status
    switch (normalized) {
      case 'new':
      case 'submitted':
        badgeClass = 'status-badge-info';
        break;
      case 'under review':
        badgeClass = 'status-badge-warning';
        break;
      case 'documents pending':
      case 'additional information required':
        badgeClass = 'status-badge-purple';
        break;
      case 'documents verified':
        badgeClass = 'status-badge-teal';
        break;
      case 'accepted':
        badgeClass = 'status-badge-success';
        break;
      case 'declined':
        badgeClass = 'status-badge-danger';
        break;
      default:
        badgeClass = 'status-badge-neutral';
    }
  }

  return (
    <span className={`status-badge ${badgeClass}`}>
      <span className="status-badge-dot" aria-hidden="true" />
      <span>{status}</span>
    </span>
  );
}

/**
 * Clearly displays whether an application is test/mock data.
 */
export function TestDataBadge() {
  return (
    <span className="test-data-badge" title="Demo test data for UI evaluation">
      Test Data
    </span>
  );
}
