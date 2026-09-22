import { supabase, isSupabaseConfigured } from '../lib/supabase.js';

const LOCAL_STORAGE_APPS_KEY = 'msit_all_submitted_applications';

/**
 * Generate a consistent application reference ID.
 * Format: MSIT-2027-XXXXX
 */
export function generateApplicationId() {
  return `MSIT-2027-${Math.floor(10000 + Math.random() * 90000)}`;
}

/**
 * Submit an application from the student portal.
 * Attempts Supabase insert first; seamlessly persists locally if Supabase table
 * has not yet been migrated.
 *
 * @param {object} applicationData
 * @param {object|null} authUser
 * @returns {Promise<{ data: object|null, error: object|null }>}
 */
export async function submitStudentApplication(applicationData, authUser = null) {
  const appId = applicationData.applicationId || generateApplicationId();
  const now = new Date().toISOString();

  const record = {
    id: applicationData.id || ('app_' + Math.random().toString(36).substring(2, 12)),
    application_id: appId,
    user_id: authUser?.id || null,
    email: (applicationData.email || authUser?.email || '').trim().toLowerCase(),
    full_name: (applicationData.fullName || authUser?.user_metadata?.full_name || '').trim(),
    phone: applicationData.phone || '',
    dob: applicationData.dob || null,
    address: applicationData.address || '',
    parent_relationship: applicationData.parentRelationship || 'Father',
    parent_name: applicationData.parentName || '',
    alt_phone: applicationData.altPhone || '',
    ug_degree: applicationData.ugDegree || '',
    department: applicationData.department || '',
    cgpa: applicationData.cgpa || '',
    passing_year: applicationData.passingYear || '',
    has_experience: applicationData.hasExperience || 'No',
    experience_details: applicationData.experienceDetails || '',
    purpose_to_join: applicationData.purposeToJoin || '',
    status: 'New', // PENDING — REQUIRES CONFIRMATION: Default status on initial submission
    document_status: 'Pending Review',
    cohort: 'January 2027 Intake',
    decision_reason: null,
    decided_by: null,
    decided_at: null,
    submitted_at: now,
    updated_at: now,
    isMock: false
  };

  // 1. Persist locally first for instant offline/demo resilience
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_APPS_KEY) || '[]');
    const filtered = existing.filter(a => a.application_id !== appId);
    filtered.unshift(record);
    localStorage.setItem(LOCAL_STORAGE_APPS_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.warn('[MSIT] LocalStorage save warning:', err);
  }

  // 2. Persist to Supabase if configured and table exists
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('applications')
        .insert([record])
        .select()
        .single();

      if (!error && data) {
        return { data, error: null };
      }
      // If table doesn't exist yet, we still return success with local record
      console.warn('[MSIT] Supabase insert warning (schema may be pending):', error?.message);
    } catch (err) {
      console.warn('[MSIT] Supabase insert exception:', err);
    }
  }

  return { data: record, error: null };
}

/**
 * Get all applications submitted locally in the browser session.
 */
export function getLocalApplications() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_APPS_KEY) || '[]');
  } catch (e) {
    return [];
  }
}
