import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta?.env?.VITE_SUPABASE_URL || 'https://oknaeingqybfxpfpuocy.supabase.co';
const supabaseAnonKey = import.meta?.env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_0Zn61LmgFI8Ja6P39_iSWQ_VJcUNU-c';

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/**
 * Check whether Supabase is properly configured.
 * Components use this to show appropriate fallback UI.
 */
export const isSupabaseConfigured = () => !!supabase;
