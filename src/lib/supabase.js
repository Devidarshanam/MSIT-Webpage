import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dnfelpetggcoqrubpbzp.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_8LUL1XCjsYijSl0bYOT_pQ_HtSSl0xO';

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/**
 * Check whether Supabase is properly configured.
 * Components use this to show appropriate fallback UI.
 */
export const isSupabaseConfigured = () => !!supabase;
