import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { MailIcon, LoaderIcon, ArrowRightIcon, ShieldCheckIcon, GraduationCapIcon } from './Icons';

const RESEND_COOLDOWN_SECONDS = 60;

/**
 * 100% Pure Magic Link Authentication Flow:
 * Email Entry ➔ "Check Your Inbox" (Magic Link Sent) ➔ Verification purely via link click ➔ Redirect.
 * Completely removes OTP code inputs.
 */
export default function AuthFlow() {
  const { user, signInWithOtp } = useAuth();
  const navigate = useNavigate();

  // Step management: 'email' | 'sent' | 'success'
  const [step, setStep] = useState('email');

  // Email step state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Auto-detect when user is authenticated via magic link
  useEffect(() => {
    if (user) {
      setStep('success');

      // Store lead in database
      const savedName = fullName.trim() || sessionStorage.getItem('msit_auth_fullname') || user.user_metadata?.full_name || '';
      if (supabase && user.email) {
        supabase.from('prospective_leads').upsert(
          {
            email: user.email.toLowerCase(),
            full_name: savedName,
            auth_user_id: user.id,
            email_verified: true,
            source: 'Landing',
            status: 'New',
            verified_at: new Date().toISOString(),
          },
          { onConflict: 'email' }
        ).catch((err) => console.error('[MSIT] Lead upsert error:', err));
      }

      const timer = setTimeout(() => {
        navigate('/programme');
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [user, fullName, navigate]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Form validation
  const validateForm = () => {
    if (!fullName.trim()) return 'Please enter your full name.';
    if (!email.trim()) return 'Please enter your email address.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) return 'Please enter a valid email address.';
    return '';
  };

  // Step 1: Submit email → send Magic Link
  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setEmailError(validationError);
      return;
    }

    setEmailError('');
    setEmailLoading(true);

    try {
      sessionStorage.setItem('msit_auth_fullname', fullName.trim());
    } catch (e) {
      // ignore
    }

    const { error } = await signInWithOtp(email.trim(), fullName.trim());

    setEmailLoading(false);

    if (error) {
      const msg = error.message?.toLowerCase() || '';
      if (msg.includes('rate') || error.status === 429) {
        setEmailError('Too many requests. Please wait a moment before trying again.');
      } else if (msg.includes('failed to fetch') || msg.includes('network') || msg.includes('unable to connect')) {
        setEmailError('Connection error. Please check your internet connection, turn off ad-blockers (or Brave Shields), and try again.');
      } else {
        setEmailError(error.message || 'Something went wrong. Please try again.');
      }
      return;
    }

    // Move to "Check Your Inbox" screen
    setResendCooldown(RESEND_COOLDOWN_SECONDS);
    setStep('sent');
  };

  // Resend Magic Link
  const handleResend = async () => {
    if (resendCooldown > 0) return;

    setEmailError('');
    setResendCooldown(RESEND_COOLDOWN_SECONDS);

    const { error } = await signInWithOtp(email.trim(), fullName.trim());
    if (error) {
      setEmailError(error.message || 'Failed to resend link. Please try again.');
      setResendCooldown(0);
    }
  };

  // Back to email entry
  const handleBackToEmail = () => {
    setStep('email');
    setEmailError('');
    setResendCooldown(0);
  };

  return (
    <div className="auth-flow-container">
      {/* ============================================================
          STEP 1: EMAIL ENTRY
          ============================================================ */}
      {step === 'email' && (
        <form onSubmit={handleEmailSubmit} className="auth-step" key="email-step">
          <div className="simple-card-top">
            <span className="simple-mini-badge">ADMISSION PORTAL</span>
            <div className="simple-card-icon student-portal-icon">
              <GraduationCapIcon size={26} />
            </div>
          </div>

          <div className="simple-card-content">
            <h2 className="simple-card-title">Apply & Register Interest</h2>
            <p className="simple-card-desc">
              Enter your email to receive an instant sign-in link to access detailed programme
              curriculum, admissions roadmap, and application details.
            </p>

            {emailError && (
              <div className="auth-error-banner" role="alert">
                {emailError}
              </div>
            )}

            <div className="simple-fields-stack">
              <div className="simple-field-group">
                <label htmlFor="authName">Full Name</label>
                <input
                  id="authName"
                  type="text"
                  className="simple-text-input"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  required
                  autoComplete="name"
                  disabled={emailLoading}
                />
              </div>

              <div className="simple-field-group">
                <label htmlFor="authEmail">Email Address</label>
                <input
                  id="authEmail"
                  type="email"
                  className="simple-text-input"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  required
                  autoComplete="email"
                  disabled={emailLoading}
                />
              </div>
            </div>
          </div>

          <div className="simple-card-footer">
            <button
              type="submit"
              className="btn btn-primary card-arrow-btn full-width"
              disabled={emailLoading}
            >
              {emailLoading ? (
                <>
                  <LoaderIcon size={18} />
                  <span>Sending Magic Link...</span>
                </>
              ) : (
                <>
                  <span>Send Magic Link</span>
                  <ArrowRightIcon size={18} />
                </>
              )}
            </button>
          </div>

          <div className="auth-privacy-notice">
            <ShieldCheckIcon size={14} />
            <span>
              We'll email you a secure sign-in link. No password or OTP code required.
            </span>
          </div>
        </form>
      )}

      {/* ============================================================
          STEP 2: CHECK YOUR INBOX (MAGIC LINK SENT)
          ============================================================ */}
      {step === 'sent' && (
        <div className="auth-step" key="sent-step">
          <div className="simple-card-top">
            <span className="auth-magic-pill">MAGIC LINK SENT</span>
            <div className="simple-card-icon student-icon">
              <MailIcon size={26} />
            </div>
          </div>

          <div className="simple-card-content">
            <h2 className="simple-card-title">Check Your Inbox</h2>
            <p className="simple-card-desc">
              We've sent a magic sign-in link to:
            </p>
            <p className="auth-email-display">{email}</p>

            {emailError && (
              <div className="auth-error-banner" role="alert">
                {emailError}
              </div>
            )}

            <div className="magic-link-instructions-box">
              <div className="magic-instruction-item">
                <span className="magic-instruction-dot">1</span>
                <span>Open the email sent to your inbox.</span>
              </div>
              <div className="magic-instruction-item">
                <span className="magic-instruction-dot">2</span>
                <span>Click the <strong>"Sign In to MSIT"</strong> button in the email.</span>
              </div>
              <div className="magic-instruction-item">
                <span className="magic-instruction-dot">3</span>
                <span>You will be instantly verified and signed in to MSIT.</span>
              </div>
            </div>
          </div>

          <div className="simple-card-footer">
            <div className="auth-resend-row" style={{ marginTop: 0 }}>
              {resendCooldown > 0 ? (
                <span className="auth-cooldown-text">
                  Resend link in {resendCooldown}s
                </span>
              ) : (
                <button
                  type="button"
                  className="auth-resend-link"
                  onClick={handleResend}
                >
                  Resend Magic Link
                </button>
              )}
              <span className="auth-separator">·</span>
              <button
                type="button"
                className="auth-back-link"
                onClick={handleBackToEmail}
              >
                Change Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          STEP 3: SUCCESS & REDIRECT
          ============================================================ */}
      {step === 'success' && (
        <div className="auth-step auth-success-step" key="success-step">
          <div className="auth-success-icon">✓</div>
          <h2 className="simple-card-title">Signed In Successfully!</h2>
          <p className="simple-card-desc">
            Redirecting to programme information...
          </p>
          <div className="auth-loading-spinner" />
        </div>
      )}
    </div>
  );
}
