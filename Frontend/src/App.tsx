import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { CitizenDashboard } from './pages/CitizenDashboard';
import { GovernmentDashboard } from './pages/GovernmentDashboard';
import { AirQualityIndex } from './pages/AirQualityIndex';
import { TrafficCongestion } from './pages/TrafficCongestion';
import { HealthcareLoad } from './pages/HealthcareLoad';
import { SchoolPerformance } from './pages/SchoolPerformance';
import { UrbanDevelopment } from './pages/UrbanDevelopment';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login/:role" element={<LoginPage />} />
            
            <Route 
              path="/citizen" 
              element={
                <ProtectedRoute requiredRole="citizen">
                  <CitizenDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/air-quality" 
              element={
                <ProtectedRoute requiredRole="citizen">
                  <AirQualityIndex />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/traffic-congestion" 
              element={
                <ProtectedRoute requiredRole="citizen">
                  <TrafficCongestion />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/healthcare-load" 
              element={
                <ProtectedRoute requiredRole="citizen">
                  <HealthcareLoad />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/school-performance" 
              element={
                <ProtectedRoute requiredRole="citizen">
                  <SchoolPerformance />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/urban-development" 
              element={
                <ProtectedRoute requiredRole="citizen">
                  <UrbanDevelopment />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/government" 
              element={
                <ProtectedRoute requiredRole="government">
                  <GovernmentDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;