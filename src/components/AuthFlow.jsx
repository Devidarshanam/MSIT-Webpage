import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { MailIcon, LockIcon, LoaderIcon, ArrowRightIcon, ShieldCheckIcon } from './Icons';

const OTP_LENGTH = 8;
const RESEND_COOLDOWN_SECONDS = 60;

/**
 * Multi-step authentication flow: Email → OTP → Success → redirect.
 * Renders inside the "Interested in MSIT" card on the landing page.
 */
export default function AuthFlow() {
  const { signInWithOtp, verifyOtp, isConfigured } = useAuth();
  const navigate = useNavigate();

  // Step management
  const [step, setStep] = useState('email'); // 'email' | 'otp' | 'success'

  // Email step state
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);

  // OTP step state
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [otpError, setOtpError] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const otpInputRefs = useRef([]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // ------------------------------------------------------------------
  // Supabase not configured — show graceful fallback
  // ------------------------------------------------------------------
  if (!isConfigured) {
    return (
      <div className="auth-flow-container">
        <div className="simple-card-top">
          <span className="simple-mini-badge">GET STARTED</span>
          <div className="simple-card-icon student-icon">
            <MailIcon size={26} />
          </div>
        </div>
        <div className="simple-card-content">
          <h2 className="simple-card-title">Interested in MSIT?</h2>
          <div className="auth-unconfigured-notice">
            <ShieldCheckIcon size={20} />
            <div>
              <strong>Coming Soon</strong>
              <p>
                Email verification is currently being set up. Please check back shortly
                or contact{' '}
                <a href="mailto:query@msit.ac.in">query@msit.ac.in</a> for programme
                information.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------
  // Email validation
  // ------------------------------------------------------------------
  const validateEmail = (value) => {
    if (!value.trim()) return 'Please enter your email address.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value.trim())) return 'Please enter a valid email address.';
    return '';
  };

  // ------------------------------------------------------------------
  // Step 1: Submit email → send OTP
  // ------------------------------------------------------------------
  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateEmail(email);
    if (validationError) {
      setEmailError(validationError);
      return;
    }

    setEmailError('');
    setEmailLoading(true);

    const { error } = await signInWithOtp(email.trim());

    setEmailLoading(false);

    if (error) {
      if (error.message?.toLowerCase().includes('rate') || error.status === 429) {
        setEmailError('Too many requests. Please wait a moment before trying again.');
      } else {
        setEmailError(error.message || 'Something went wrong. Please try again.');
      }
      return;
    }

    // Move to OTP step
    setOtp(Array(OTP_LENGTH).fill(''));
    setOtpError('');
    setResendCooldown(RESEND_COOLDOWN_SECONDS);
    setStep('otp');
  };

  // ------------------------------------------------------------------
  // OTP input handlers
  // ------------------------------------------------------------------
  const handleOtpChange = (index, value) => {
    // Allow only digits
    const digit = value.replace(/\D/g, '').slice(-1);

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    setOtpError('');

    // Auto-advance to next input
    if (digit && index < OTP_LENGTH - 1) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Backspace: clear current or move to previous
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        otpInputRefs.current[index - 1]?.focus();
      }
    }
    // Left arrow
    if (e.key === 'ArrowLeft' && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
    // Right arrow
    if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;

    const newOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtp(newOtp);
    setOtpError('');

    // Focus last filled or last box
    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    otpInputRefs.current[focusIndex]?.focus();
  };

  // ------------------------------------------------------------------
  // Step 2: Verify OTP
  // ------------------------------------------------------------------
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    const otpString = otp.join('');
    if (otpString.length < OTP_LENGTH) {
      setOtpError('Please enter the complete 6-digit code.');
      return;
    }

    setOtpError('');
    setOtpLoading(true);

    const { data, error } = await verifyOtp(email.trim(), otpString);

    setOtpLoading(false);

    if (error) {
      const msg = error.message?.toLowerCase() || '';
      if (msg.includes('expired') || msg.includes('expire')) {
        setOtpError('Code has expired. Please request a new one.');
      } else if (msg.includes('invalid') || msg.includes('incorrect')) {
        setOtpError('Incorrect verification code. Please check and try again.');
      } else if (msg.includes('rate') || msg.includes('too many')) {
        setOtpError('Too many attempts. Please request a new code.');
      } else {
        setOtpError(error.message || 'Verification failed. Please try again.');
      }
      return;
    }

    // Success — store lead in database
    try {
      if (supabase && data?.user) {
        await supabase.from('prospective_leads').upsert(
          {
            email: email.trim().toLowerCase(),
            auth_user_id: data.user.id,
            email_verified: true,
            source: 'Landing',
            status: 'New',
            verified_at: new Date().toISOString(),
          },
          { onConflict: 'email' }
        );
      }
    } catch (dbErr) {
      // Lead storage failure should not block the user — log and continue
      console.error('[MSIT] Failed to store lead:', dbErr);
    }

    // Show success briefly, then redirect
    setStep('success');
    setTimeout(() => {
      navigate('/programme');
    }, 1500);
  };

  // ------------------------------------------------------------------
  // Resend OTP
  // ------------------------------------------------------------------
  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;

    setOtpError('');
    setResendCooldown(RESEND_COOLDOWN_SECONDS);

    const { error } = await signInWithOtp(email.trim());
    if (error) {
      setOtpError(error.message || 'Failed to resend code. Please try again.');
      setResendCooldown(0);
    }
  };

  // ------------------------------------------------------------------
  // Go back to email step
  // ------------------------------------------------------------------
  const handleBackToEmail = () => {
    setStep('email');
    setOtp(Array(OTP_LENGTH).fill(''));
    setOtpError('');
    setResendCooldown(0);
  };

  // ------------------------------------------------------------------
  // RENDER
  // ------------------------------------------------------------------
  return (
    <div className="auth-flow-container">
      {/* ============================================================
          STEP 1: EMAIL ENTRY
          ============================================================ */}
      {step === 'email' && (
        <form onSubmit={handleEmailSubmit} className="auth-step" key="email-step">
          <div className="simple-card-top">
            <span className="simple-mini-badge">GET STARTED</span>
            <div className="simple-card-icon student-icon">
              <MailIcon size={26} />
            </div>
          </div>

          <div className="simple-card-content">
            <h2 className="simple-card-title">Interested in MSIT?</h2>
            <p className="simple-card-desc">
              Enter your email to access detailed programme information, curriculum,
              admissions roadmap, and application details.
            </p>

            {emailError && (
              <div className="auth-error-banner" role="alert">
                {emailError}
              </div>
            )}

            <div className="simple-fields-stack">
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
                  <span>Sending Code...</span>
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRightIcon size={18} />
                </>
              )}
            </button>
          </div>

          <div className="auth-privacy-notice">
            <ShieldCheckIcon size={14} />
            <span>
              We'll send a verification code to your email. No password needed.
            </span>
          </div>
        </form>
      )}

      {/* ============================================================
          STEP 2: OTP VERIFICATION
          ============================================================ */}
      {step === 'otp' && (
        <form onSubmit={handleOtpSubmit} className="auth-step" key="otp-step">
          <div className="simple-card-top">
            <span className="simple-mini-badge">VERIFY</span>
            <div className="simple-card-icon student-icon">
              <LockIcon size={26} />
            </div>
          </div>

          <div className="simple-card-content">
            <h2 className="simple-card-title">Verify Your Email</h2>
            <p className="simple-card-desc">
              We've sent an 8-digit verification code to
            </p>
            <p className="auth-email-display">{email}</p>

            {otpError && (
              <div className="auth-error-banner" role="alert">
                {otpError}
              </div>
            )}

            <div className="otp-input-group" onPaste={handleOtpPaste}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (otpInputRefs.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  className="otp-digit-input"
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  disabled={otpLoading}
                  autoFocus={idx === 0}
                  aria-label={`Digit ${idx + 1} of ${OTP_LENGTH}`}
                />
              ))}
            </div>
          </div>

          <div className="simple-card-footer">
            <button
              type="submit"
              className="btn btn-primary card-arrow-btn full-width"
              disabled={otpLoading}
            >
              {otpLoading ? (
                <>
                  <LoaderIcon size={18} />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Verify</span>
                  <ArrowRightIcon size={18} />
                </>
              )}
            </button>

            <div className="auth-resend-row">
              {resendCooldown > 0 ? (
                <span className="auth-cooldown-text">
                  Resend code in {resendCooldown}s
                </span>
              ) : (
                <button
                  type="button"
                  className="auth-resend-link"
                  onClick={handleResendOtp}
                >
                  Resend Code
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
        </form>
      )}

      {/* ============================================================
          STEP 3: SUCCESS
          ============================================================ */}
      {step === 'success' && (
        <div className="auth-step auth-success-step" key="success-step">
          <div className="auth-success-icon">✓</div>
          <h2 className="simple-card-title">Email Verified!</h2>
          <p className="simple-card-desc">
            Redirecting to programme information...
          </p>
          <div className="auth-loading-spinner" />
        </div>
      )}
    </div>
  );
}
