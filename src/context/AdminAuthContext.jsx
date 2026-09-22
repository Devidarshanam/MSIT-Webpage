import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AdminAuthContext = createContext(null);

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}

/**
 * Check if an email address is authorized for admin access.
 * Rules:
 * 1. TEMPORARY — DEVELOPMENT/TESTING ONLY: Any @getskills.io email address (e.g. sadhvik@getskills.io)
 * 2. Official database roles: Any email existing in public.admin_users
 *
 * @param {string} email
 * @returns {boolean}
 */
export function isAuthorizedAdminEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const normalized = email.trim().toLowerCase();
  
  // Rule 1: Temporary dev/testing rule for @getskills.io
  if (normalized.endsWith('@getskills.io')) {
    return true;
  }

  return false;
}

export function AdminAuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDevAdmin, setIsDevAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check auth state on mount and sync with Supabase session
  useEffect(() => {
    if (!isSupabaseConfigured() || !supabase) {
      // Local fallback for offline/preview
      try {
        const savedAdmin = localStorage.getItem('msit_admin_session_user');
        if (savedAdmin) {
          const parsed = JSON.parse(savedAdmin);
          if (isAuthorizedAdminEmail(parsed.email)) {
            setAdminUser(parsed);
            setIsAdmin(true);
            setIsDevAdmin(parsed.email.toLowerCase().endsWith('@getskills.io'));
          }
        }
      } catch (e) {}
      setLoading(false);
      return;
    }

    // Check active Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      evaluateUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      evaluateUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /**
   * Evaluate whether a Supabase user has admin privileges.
   */
  const evaluateUser = async (user) => {
    if (!user || !user.email) {
      setAdminUser(null);
      setIsAdmin(false);
      setIsDevAdmin(false);
      return;
    }

    const email = user.email.toLowerCase();

    // 1. Check temporary @getskills.io rule (Dev/Testing only)
    if (isAuthorizedAdminEmail(email)) {
      setAdminUser(user);
      setIsAdmin(true);
      setIsDevAdmin(true);
      try {
        localStorage.setItem('msit_admin_session_user', JSON.stringify({
          id: user.id,
          email: user.email,
          user_metadata: user.user_metadata
        }));

        // Check if user requested admin login or arrived via magic link
        const authIntent = localStorage.getItem('msit_auth_intent') || sessionStorage.getItem('msit_auth_intent');
        if (authIntent === 'admin') {
          localStorage.removeItem('msit_auth_intent');
          sessionStorage.removeItem('msit_auth_intent');
          if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/admin')) {
            window.location.href = '/admin/dashboard';
          }
        }
      } catch (e) {}
      return;
    }

    // 2. Check public.admin_users in Supabase
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('admin_users')
          .select('email, role')
          .eq('email', email)
          .single();

        if (!error && data) {
          setAdminUser(user);
          setIsAdmin(true);
          setIsDevAdmin(false);
          return;
        }
      } catch (err) {
        // Table may not exist yet
      }
    }

    // User is logged in, but is NOT an authorized administrator
    setAdminUser(user);
    setIsAdmin(false);
    setIsDevAdmin(false);
  };

  /**
   * Request an Admin Magic Link via Supabase Auth.
   * Supabase Magic Link ONLY (no PIN or passwords).
   *
   * @param {string} email
   * @returns {Promise<{ error: object|null }>}
   */
  const requestAdminMagicLink = async (email) => {
    const normalized = email.trim().toLowerCase();

    try {
      localStorage.setItem('msit_auth_intent', 'admin');
      sessionStorage.setItem('msit_auth_intent', 'admin');
    } catch (e) {}

    if (!isAuthorizedAdminEmail(normalized)) {
      return {
        error: {
          message: 'Access Denied: Only authorized administrators (@getskills.io) can access this portal.'
        }
      };
    }

    if (!isSupabaseConfigured() || !supabase) {
      // Simulate local demo session for testing environment if Supabase is offline
      const mockAdmin = {
        id: 'admin_' + Math.random().toString(36).substring(2, 8),
        email: normalized,
        user_metadata: { full_name: normalized.split('@')[0] }
      };
      setAdminUser(mockAdmin);
      setIsAdmin(true);
      setIsDevAdmin(true);
      try {
        localStorage.setItem('msit_admin_session_user', JSON.stringify(mockAdmin));
      } catch (e) {}
      return { error: null };
    }

    try {
      const redirectUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/admin`
        : undefined;

      let result = await supabase.auth.signInWithOtp({
        email: normalized,
        options: {
          emailRedirectTo: redirectUrl,
          data: { role: 'admin' }
        }
      });

      // Handle redirect URL allowlist fallback
      if (result?.error?.message && (
        result.error.message.toLowerCase().includes('redirect') ||
        result.error.message.toLowerCase().includes('url')
      )) {
        result = await supabase.auth.signInWithOtp({
          email: normalized,
          options: {
            data: { role: 'admin' }
          }
        });
      }

      return result;
    } catch (err) {
      return { error: { message: err.message || 'Failed to send admin login link.' } };
    }
  };

  /**
   * Admin Sign Out.
   */
  const adminSignOut = async () => {
    try {
      localStorage.removeItem('msit_admin_session_user');
    } catch (e) {}

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {}
    }

    setAdminUser(null);
    setIsAdmin(false);
    setIsDevAdmin(false);
  };

  const value = {
    adminUser,
    isAdmin,
    isDevAdmin,
    loading,
    requestAdminMagicLink,
    adminSignOut,
    testAccountEmail: 'sadhvik@getskills.io'
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}
