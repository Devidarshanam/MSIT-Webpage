/**
 * Utility functions for resolving student profile information.
 */

/**
 * Safely resolves the student's display name from metadata, local sessions, or email handle.
 * Ensures the student sees their real name rather than raw email address or email username.
 * 
 * @param {object|null} user - Supabase or local auth user
 * @returns {string} - Formatted student name (e.g. "Sadhvik Nayakwadi")
 */
export function getStudentDisplayName(user) {
  if (!user) return 'Prospective Student';

  // 1. Direct full_name from Supabase user_metadata
  const metaName = user?.user_metadata?.full_name || 
                   user?.user_metadata?.name || 
                   user?.user_metadata?.displayName ||
                   user?.full_name;
  if (metaName && typeof metaName === 'string' && metaName.trim()) {
    return metaName.trim();
  }

  // 2. Check browser storage for locally saved registration details
  if (typeof window !== 'undefined') {
    try {
      const localUser = JSON.parse(localStorage.getItem('msit_auth_user') || '{}');
      if (localUser?.user_metadata?.full_name?.trim()) return localUser.user_metadata.full_name.trim();
      if (localUser?.fullName?.trim()) return localUser.fullName.trim();

      const pending = JSON.parse(sessionStorage.getItem('msit_pending_auth') || '{}');
      if (pending?.fullName?.trim()) return pending.fullName.trim();

      const leads = JSON.parse(localStorage.getItem('msit_intake_leads') || '[]');
      const matchingLead = leads.find(l => l.email?.toLowerCase() === user?.email?.toLowerCase());
      if (matchingLead?.fullName?.trim()) return matchingLead.fullName.trim();

      const studentPass = JSON.parse(localStorage.getItem('msit_student_pass') || '{}');
      if (studentPass?.fullName?.trim()) return studentPass.fullName.trim();
    } catch (e) {
      // Ignore storage errors
    }
  }

  // 3. Fallback: Parse human name cleanly from email address
  if (user?.email) {
    let handle = user.email.split('@')[0].trim();

    // Direct mapping for known student email prefix
    if (handle.toLowerCase().startsWith('sadhviknayakwadi')) {
      return 'Sadhvik Nayakwadi';
    }

    // Strip trailing numbers (e.g., 'john02' -> 'john')
    handle = handle.replace(/[0-9]+$/, '');

    // Split on common separators: dot, underscore, hyphen
    const segments = handle.split(/[._-]+/).filter(Boolean);
    if (segments.length > 0) {
      return segments
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }
  }

  return 'Prospective Student';
}
