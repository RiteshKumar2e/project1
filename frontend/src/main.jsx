import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import './styles/base.css';
import './styles/components.css';
import './styles/theme-brutal.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <LanguageProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
