import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Warn during development if env vars are missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[MSIT] Supabase environment variables are not configured. ' +
    'Authentication features will be unavailable. ' +
    'See .env.example for required variables.'
  );
}

/**
 * Supabase client singleton.
 * Returns null if environment variables are not configured,
 * allowing the app to degrade gracefully.
 */
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/**
 * Check whether Supabase is properly configured.
 * Components use this to show appropriate fallback UI.
 */
export const isSupabaseConfigured = () => !!supabase;
