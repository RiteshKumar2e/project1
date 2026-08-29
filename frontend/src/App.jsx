import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import Header from './components/Header';
import OfflineIndicator from './components/OfflineIndicator';
import HomePage from './pages/HomePage';
import EmergencyInputPage from './pages/EmergencyInputPage';
import AssessmentPage from './pages/AssessmentPage';
import FirstAidGuidePage from './pages/FirstAidGuidePage';
import HealthcareFinderPage from './pages/HealthcareFinderPage';
import EmergencyServicesPage from './pages/EmergencyServicesPage';
import FirstAidLibraryPage from './pages/FirstAidLibraryPage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  const isOnline = useOnlineStatus();

  return (
    <div className="min-h-screen flex flex-col bg-surface-50 text-surface-800 font-sans selection:bg-emergency-200">
      {/* Top Fixed Header */}
      <Header />

      {/* Real-time offline notice */}
      <OfflineIndicator isOnline={isOnline} />

      {/* Main Page Content */}
      <main className="flex-1 pb-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/emergency-input" element={<EmergencyInputPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/first-aid/:categoryId" element={<FirstAidGuidePage />} />
          <Route path="/finder" element={<HealthcareFinderPage />} />
          <Route path="/emergency-services" element={<EmergencyServicesPage />} />
          <Route path="/library" element={<FirstAidLibraryPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>

      {/* Bottom Minimal Footer */}
      <footer className="border-t border-surface-200 bg-white py-6 text-center text-xs text-surface-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            🚑 <strong className="text-surface-700">Rural Emergency Assistance Platform</strong> — Designed for high reliability in remote areas.
          </div>
          <div className="font-semibold text-surface-600">
            Emergency Toll-Free: <a href="tel:112" className="text-emergency-600 hover:underline">112</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
