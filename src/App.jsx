import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import StudentGatewayPage from './components/StudentGatewayPage';
import KnowAboutMSITPage from './components/KnowAboutMSITPage';
import ProgrammePage from './pages/ProgrammePage';
import CurriculumPillarPage from './pages/CurriculumPillarPage';
import FAQPage from './pages/FAQPage';
import ApplicationPortalPage from './pages/ApplicationPortalPage';
import ProtectedRoute from './components/ProtectedRoute';

function KnowAboutMSITRoute() {
  const navigate = useNavigate();
  return (
    <KnowAboutMSITPage 
      onBack={() => navigate('/')}
      onGoToSignIn={() => navigate('/')}
    />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <div className="app-root">
        <Routes>
          <Route path="/" element={<StudentGatewayPage />} />
          <Route path="/know-about-msit" element={<KnowAboutMSITRoute />} />
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
          {/* Standby Application Portal Template */}
          <Route path="/apply" element={<ApplicationPortalPage />} />
          <Route path="/application-template" element={<Navigate to="/apply" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}
