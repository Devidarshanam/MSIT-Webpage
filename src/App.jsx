import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import StudentGatewayPage from './components/StudentGatewayPage';
import KnowAboutMSITPage from './components/KnowAboutMSITPage';
import ProgrammePage from './pages/ProgrammePage';
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}
