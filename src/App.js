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
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/tables" element={<TablesDashboard />} />
            <Route path="/roots" element={<RootsDashboard />} />
            <Route path="/cubes" element={<CubesDashboard />} />
            <Route path="/formulas" element={<Formulas />} />
            <Route path="/practice/:mode" element={<Practice />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
