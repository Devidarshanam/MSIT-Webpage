import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    // Check for existing session on mount
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /**
   * Send OTP to the given email address via Supabase Auth.
   * @param {string} email
   * @returns {{ data: object|null, error: object|null }}
   */
  const signInWithOtp = async (email) => {
    if (!isSupabaseConfigured()) {
      return { data: null, error: { message: 'Authentication is not configured.' } };
    }
    try {
      const result = await supabase.auth.signInWithOtp({ 
        email,
        options: {
          emailRedirectTo: window.location.origin
        }
      });
      return result;
    } catch (err) {
      return { data: null, error: { message: err.message || 'An unexpected error occurred.' } };
    }
  };

  /**
   * Verify the OTP code for the given email.
   * @param {string} email
   * @param {string} token - The 6-digit OTP code
   * @returns {{ data: object|null, error: object|null }}
   */
  const verifyOtp = async (email, token) => {
    if (!isSupabaseConfigured()) {
      return { data: null, error: { message: 'Authentication is not configured.' } };
    }
    try {
      const result = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email',
      });
      return result;
    } catch (err) {
      return { data: null, error: { message: err.message || 'An unexpected error occurred.' } };
    }
  };

  /**
   * Sign out the current user and clear session.
   */
  const signOut = async () => {
    if (!isSupabaseConfigured()) {
      setUser(null);
      setSession(null);
      return;
    }
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const value = {
    user,
    session,
    loading,
    signInWithOtp,
    verifyOtp,
    signOut,
    isConfigured: isSupabaseConfigured(),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
