import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import StudentGatewayPage from './components/StudentGatewayPage';
import KnowAboutMSITPage from './components/KnowAboutMSITPage';
import ProgrammePage from './pages/ProgrammePage';
import CurriculumPillarPage from './pages/CurriculumPillarPage';
import FAQPage from './pages/FAQPage';
import ApplicationPortalPage from './pages/ApplicationPortalPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';

function KnowAboutMSITRoute() {
  return <KnowAboutMSITPage />;
}

function AdminIndexRoute() {
  const { adminUser, isAdmin, loading } = useAdminAuth();

  if (typeof window !== 'undefined' && (window.location.hash || window.location.search.includes('code='))) {
    return <Navigate to={`/admin/login${window.location.search}${window.location.hash}`} replace />;
  }

  if (loading) {
    return (
      <div className="admin-loading-screen">
        <div className="admin-spinner"></div>
        <p>Verifying administrative credentials...</p>
      </div>
    );
  }

  if (adminUser && isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/admin/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <div className="app-root">
          <Routes>
            <Route path="/" element={<KnowAboutMSITRoute />} />
            <Route path="/know-about-msit" element={<Navigate to="/" replace />} />
            <Route path="/gateway" element={<StudentGatewayPage />} />
            <Route path="/login" element={<StudentGatewayPage />} />
            <Route path="/register" element={<StudentGatewayPage />} />
            <Route
              path="/programme"
              element={
                <ProtectedRoute>
                  <ProgrammePage />
                </ProtectedRoute>
              }
            />
            {/* Dedicated Core Pedagogy Pillar Pages */}
            <Route path="/curriculum/:pillarId" element={<CurriculumPillarPage />} />
            <Route path="/learning-to-learn" element={<Navigate to="/curriculum/learning-to-learn" replace />} />
            <Route path="/learning-to-think" element={<Navigate to="/curriculum/learning-to-think" replace />} />
            <Route path="/learning-to-do" element={<Navigate to="/curriculum/learning-to-do" replace />} />
            {/* Dedicated FAQ Page */}
            <Route path="/faq" element={<FAQPage />} />
            {/* Student Application Portal */}
            <Route path="/apply" element={<ApplicationPortalPage />} />
            <Route path="/application-template" element={<Navigate to="/apply" replace />} />

            {/* Admin Portal Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminIndexRoute />} />
            <Route
              path="/admin/dashboard"
              element={
                <AdminProtectedRoute>
                  <AdminDashboardPage activeTab="overview" />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/applications"
              element={
                <AdminProtectedRoute>
                  <AdminDashboardPage activeTab="applications" />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/documents"
              element={
                <AdminProtectedRoute>
                  <AdminDashboardPage activeTab="documents" />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/reports"
              element={
                <AdminProtectedRoute>
                  <AdminDashboardPage activeTab="reports" />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <AdminProtectedRoute>
                  <AdminDashboardPage activeTab="settings" />
                </AdminProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AdminAuthProvider>
    </AuthProvider>
  );
}
