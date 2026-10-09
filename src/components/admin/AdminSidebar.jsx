import React from 'react';
import { 
  BuildingIcon, 
  UsersIcon, 
  AwardIcon, 
  TerminalIcon, 
  ClockIcon, 
  BookOpenIcon, 
  XIcon 
} from '../Icons';

export default function AdminSidebar({ 
  activeTab, 
  onSelectTab, 
  metrics, 
  isOpen, 
  onClose,
  onSignOut 
}) {
  const navItems = [
    {
      id: 'overview',
      label: 'Dashboard',
      icon: BuildingIcon,
      badge: null
    },
    {
      id: 'applications',
      label: 'Applications',
      icon: UsersIcon,
      badge: metrics?.total > 0 ? metrics.total : null
    },
    {
      id: 'documents',
      label: 'Documents Review',
      icon: BookOpenIcon,
      badge: metrics?.documentsPending > 0 ? metrics.documentsPending : null,
      badgeType: 'warning'
    },
    {
      id: 'reports',
      label: 'Reports / Overview',
      icon: AwardIcon,
      badge: null
    },
    {
      id: 'settings',
      label: 'Settings & Schema',
      icon: TerminalIcon,
      badge: null
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="admin-sidebar-backdrop" 
          onClick={onClose} 
          aria-hidden="true" 
        />
      )}

      <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Top brand header so sidebar starts from the very top */}
        <div className="admin-sidebar-top-brand">
          <div className="admin-brand">
            <img src="/assets/msit-logo.png" alt="MSIT Logo" className="admin-logo" />
            <div className="admin-brand-text">
              <span className="admin-portal-title">Admissions Portal</span>
              <span className="admin-portal-sub">Admin Console</span>
            </div>
          </div>
          <button 
            type="button" 
            className="sidebar-close-btn" 
            onClick={onClose}
            aria-label="Close menu"
          >
            <XIcon size={18} />
          </button>
        </div>

        <div className="admin-sidebar-body">
          <div className="admin-sidebar-header">
            <span className="sidebar-section-title">NAVIGATION</span>
          </div>

          <nav className="admin-nav-list">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`admin-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  onSelectTab(item.id);
                  if (onClose) onClose();
                }}
              >
                <div className="nav-item-left">
                  <Icon size={18} />
                  <span className="nav-item-label">{item.label}</span>
                </div>
                {item.badge !== null && item.badge !== undefined && (
                  <span className={`nav-item-badge ${item.badgeType || ''}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="admin-sidebar-footer">
          <div className="sidebar-cohort-card">
            <span className="cohort-sub">ACTIVE CYCLE</span>
            <strong>January 2027 Intake</strong>
            <p className="cohort-status">Admissions Live</p>
          </div>

          <button
            type="button"
            className="sidebar-signout-btn"
            onClick={onSignOut}
          >
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
