import React from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { ShieldCheckIcon, UserIcon, MenuIcon, LockIcon } from '../Icons';

export default function AdminTopNav({ isSupabaseLive, onToggleSidebar }) {
  const { adminUser, isDevAdmin, adminSignOut } = useAdminAuth();

  return (
    <header className="admin-topnav">
      <div className="admin-topnav-left">
        <button
          type="button"
          className="admin-menu-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <MenuIcon size={22} />
        </button>

        <div className="admin-brand">
          <img src="/assets/msit-logo.png" alt="MSIT Logo" className="admin-logo" />
          <div className="admin-brand-text">
            <span className="admin-portal-title">Admissions Portal</span>
            <span className="admin-portal-sub">Admin Console</span>
          </div>
        </div>

        {isDevAdmin && (
          <div className="admin-dev-pill" title="This authorization rule is temporary for development and testing">
            <span className="dev-pill-dot" />
            <span>TEMPORARY — DEV / TESTING ONLY (@getskills.io)</span>
          </div>
        )}
      </div>

      <div className="admin-topnav-right">
        {/* Database connectivity badge */}
        <div className={`db-status-chip ${isSupabaseLive ? 'online' : 'demo'}`}>
          <span className="db-dot" />
          <span>{isSupabaseLive ? 'Supabase Live' : 'Local / Test DB'}</span>
        </div>

        {/* Admin user pill */}
        <div className="admin-user-chip">
          <div className="admin-avatar">
            <UserIcon size={16} />
          </div>
          <div className="admin-user-details">
            <span className="admin-email">{adminUser?.email || 'admin'}</span>
            <span className="admin-role-tag">Administrator</span>
          </div>
        </div>

        {/* Sign Out button */}
        <button
          type="button"
          className="btn btn-secondary btn-sm admin-signout-btn"
          onClick={adminSignOut}
          title="Sign Out of Admin Console"
        >
          <span>Sign Out</span>
        </button>
      </div>
    </header>
  );
}
