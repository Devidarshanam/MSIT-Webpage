import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth, isAuthorizedAdminEmail } from '../../context/AdminAuthContext';
import { MailIcon, LoaderIcon, ArrowRightIcon, ShieldCheckIcon, LockIcon } from '../../components/Icons';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { adminUser, isAdmin, requestAdminMagicLink, testAccountEmail } = useAdminAuth();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // If already authorized, automatically route to /admin/dashboard
  useEffect(() => {
    if (adminUser && isAdmin) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [adminUser, isAdmin, navigate]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError('Please enter your administrator email address.');
      return;
    }

    if (!isAuthorizedAdminEmail(cleanEmail)) {
      setError('Access Restricted: Only authorized accounts (@getskills.io) have access to the Admin Dashboard during development.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      localStorage.setItem('msit_auth_intent', 'admin');
      sessionStorage.setItem('msit_auth_intent', 'admin');
    } catch (e) {}

    try {
      const { error: reqError } = await requestAdminMagicLink(cleanEmail);
      if (reqError) {
        setError(reqError.message || 'Failed to dispatch magic link. Please check your connection and retry.');
      } else {
        setIsSent(true);
        setResendCooldown(60);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUseTestAccount = () => {
    setEmail(testAccountEmail);
    setError('');
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        
        {/* Brand Header */}
        <div className="admin-login-header">
          <img 
            src="/assets/msit-logo.png" 
            alt="MSIT Logo" 
            className="admin-login-logo" 
          />
          <div className="admin-login-title-wrap">
            <h2>MSIT Admin Portal</h2>
            <p className="admin-login-sub">Admissions Management System</p>
          </div>
        </div>

        {/* Temporary Dev Notice Banner */}
        <div className="admin-dev-notice-banner">
          <div className="notice-header">
            <ShieldCheckIcon size={16} />
            <strong>TEMPORARY — DEVELOPMENT / TESTING ACCESS</strong>
          </div>
          <p>
            For testing, authorized administrators with an <code>@getskills.io</code> email can access this dashboard via Supabase Magic Link.
          </p>
        </div>

        {isSent ? (
          <div className="admin-login-sent-state">
            <div className="sent-icon-badge">
              <MailIcon size={32} />
            </div>
            <h3>Check Your Inbox</h3>
            <p className="sent-desc">
              We dispatched an authorized Magic Link directly to:
            </p>
            <div className="sent-email-box">
              <code>{email}</code>
            </div>
            <p className="sent-hint">
              Click the verification link inside your email to enter the MSIT Admissions Admin Console.
            </p>

            <div className="sent-actions">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleSubmit}
                disabled={loading || resendCooldown > 0}
              >
                {resendCooldown > 0 ? `Resend Link (${resendCooldown}s)` : 'Resend Magic Link'}
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setIsSent(false);
                  setEmail('');
                }}
              >
                Use Different Email
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="admin-login-form" noValidate>
            
            {/* Fast fill shortcut for dev test account */}
            <div className="test-account-shortcut">
              <span>Primary Test Account:</span>
              <button
                type="button"
                className="test-account-chip"
                onClick={handleUseTestAccount}
                title="Click to fill test email"
              >
                {testAccountEmail}
              </button>
            </div>

            <div className="form-field-group">
              <label htmlFor="adminEmail">Administrator Email Address <span className="req">*</span></label>
              <div className="input-with-icon">
                <MailIcon size={18} className="field-icon" />
                <input
                  id="adminEmail"
                  type="email"
                  className={`form-input-control ${error ? 'has-error' : ''}`}
                  placeholder="name@getskills.io"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  autoFocus
                  required
                />
              </div>
              {error && <span className="field-err-msg">{error}</span>}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block admin-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoaderIcon size={18} />
                  <span>Sending Magic Link...</span>
                </>
              ) : (
                <>
                  <span>Send Admin Magic Link</span>
                  <ArrowRightIcon size={18} />
                </>
              )}
            </button>

            <div className="admin-login-footer-info">
              <LockIcon size={14} />
              <span>Protected portal. Unauthorized access attempts are monitored and logged.</span>
            </div>

          </form>
        )}

        <div className="admin-login-links">
          <button 
            type="button" 
            className="back-to-site-link"
            onClick={() => navigate('/')}
          >
            ← Return to MSIT Public Website
          </button>
        </div>

      </div>
    </div>
  );
}
