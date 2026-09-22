import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { ShieldCheckIcon, LockIcon } from '../Icons';

export default function AdminProtectedRoute({ children }) {
  const { adminUser, isAdmin, loading, adminSignOut } = useAdminAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="admin-loading-screen">
        <div className="admin-spinner"></div>
        <p>Verifying administrative credentials...</p>
      </div>
    );
  }

  // Not signed in at all -> redirect to admin login
  if (!adminUser) {
    return <Navigate to="/admin/login" replace />;
  }

  // Signed in, but not an authorized admin (e.g., regular student logged in)
  if (!isAdmin) {
    return (
      <div className="admin-access-denied-wrapper">
        <div className="admin-access-denied-card">
          <div className="access-denied-icon">
            <LockIcon size={40} />
          </div>
          <h2>Access Restricted</h2>
          <span className="unauthorized-pill">Administrator Authorization Required</span>
          
          <p>
            You are currently signed in as <strong>{adminUser.email}</strong>, which does not have administrative privileges for the MSIT Admissions Portal.
          </p>

          <div className="denied-notice-box">
            <strong>Development Notice:</strong>
            <p>
              In development mode, only accounts with the <code>@getskills.io</code> domain (e.g. <code>sadhvik@getskills.io</code>) are granted administrative access.
            </p>
          </div>

          <div className="denied-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={async () => {
                await adminSignOut();
                navigate('/admin/login');
              }}
            >
              Sign In with Authorized Admin Account
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/programme')}
            >
              Return to Student Portal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
