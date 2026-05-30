import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SmartGenProvider } from './context/SmartGenContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';
import HomePage from './pages/HomePage';
import TemplatesPage from './pages/TemplatesPage';
import EditorPage from './pages/EditorPage';
import SavedDocumentsPage from './pages/SavedDocumentsPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const AppLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col" style={{ background: '#faf9f7' }}>
    <Header />
    <div className="flex-1 flex gap-6 max-w-7xl mx-auto w-full px-4 py-6">
      <Sidebar />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
    <Footer />
  </div>
);

const App = () => (
  <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <SmartGenProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<AppLayout><HomePage /></AppLayout>} />
        <Route path="/templates" element={<AppLayout><TemplatesPage /></AppLayout>} />
        <Route path="/editor/:templateId" element={<AppLayout><EditorPage /></AppLayout>} />
        <Route path="/editor" element={<AppLayout><EditorPage /></AppLayout>} />
        <Route path="/template/:templateId" element={<AppLayout><EditorPage /></AppLayout>} />
        <Route path="/documents" element={<AppLayout><SavedDocumentsPage /></AppLayout>} />
        <Route path="/settings" element={<AppLayout><SettingsPage /></AppLayout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SmartGenProvider>
  </Router>
);

export default App;