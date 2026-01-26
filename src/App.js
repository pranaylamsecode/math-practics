import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Practice from './pages/Practice';
import TablesDashboard from './pages/TablesDashboard';
import RootsDashboard from './pages/RootsDashboard';
import CubesDashboard from './pages/CubesDashboard';
import Auth from './pages/Auth';
import Formulas from './pages/Formulas';
import Reasoning from './pages/Reasoning';
import English from './pages/English';
import ReasoningPractice from './pages/ReasoningPractice';
import EnglishPractice from './pages/EnglishPractice';
import './App.css';

import RequireAdmin from './components/RequireAdmin';
import AdminDashboard from './pages/AdminDashboard';
import ContentManager from './pages/ContentManager';
import './pages/AdminDashboard.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />

            {/* Public Routes */}
            <Route path="/tables" element={<TablesDashboard />} />
            <Route path="/roots" element={<RootsDashboard />} />
            <Route path="/cubes" element={<CubesDashboard />} />
            <Route path="/formulas" element={<Formulas />} />
            <Route path="/reasoning" element={<Reasoning />} />
            <Route path="/reasoning/practice/:topic" element={<ReasoningPractice />} />
            <Route path="/english" element={<English />} />
            <Route path="/english/practice/:topic" element={<EnglishPractice />} />
            <Route path="/practice/:mode" element={<Practice />} />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <AdminDashboard />
                </RequireAdmin>
              }
            />
            <Route
              path="/admin/content"
              element={
                <RequireAdmin>
                  <ContentManager />
                </RequireAdmin>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
