import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import Header from './components/Header';
import OfflineIndicator from './components/OfflineIndicator';
import ChatbotWidget from './components/ChatbotWidget';
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
    <div className="app">
      <Header />
      <OfflineIndicator isOnline={isOnline} />

      <main className="app__main">
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

      <footer className="site-footer no-print">
        <div className="site-footer__inner">
          <span>
            Rural Emergency Assistance &middot;{' '}
            <Link to="/about">About &amp; safety</Link>
          </span>
          <a href="tel:112" className="site-footer__call">Emergency: 112</a>
        </div>
      </footer>

      {/* Floating AI Chatbot in the bottom-right corner */}
      <ChatbotWidget />
    </div>
  );
}
