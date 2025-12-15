import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css'; // We'll create this for specific layout styles if needed, or use inline/global

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="layout-container">
      <nav className="glass-panel navbar">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <h1 className="app-title title-gradient">Math Practice</h1>
          </Link>
        </div>
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/practice/root" 
            className={`nav-item ${location.pathname.includes('root') ? 'active' : ''}`}
          >
            Square Root
          </Link>
          <Link 
            to="/practice/cube" 
            className={`nav-item ${location.pathname.includes('cube') ? 'active' : ''}`}
          >
            Cube Root
          </Link>
        </div>
      </nav>

      <main className="main-content">
        {children}
      </main>
      
      <footer className="footer-glass">
        <p>© 2025 Math Practice. Build your skills.</p>
      </footer>
    </div>
  );
};

export default Layout;
