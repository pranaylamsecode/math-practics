import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Practice from './pages/Practice';
import TablesDashboard from './pages/TablesDashboard';
import RootsDashboard from './pages/RootsDashboard';
import CubesDashboard from './pages/CubesDashboard';
import './App.css'; // Just for any resets if needed

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tables" element={<TablesDashboard />} />
          <Route path="/roots" element={<RootsDashboard />} />
          <Route path="/cubes" element={<CubesDashboard />} />
          <Route path="/practice/:mode" element={<Practice />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
