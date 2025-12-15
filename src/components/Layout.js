import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <div className="layout-container">
      <nav className="glass-panel navbar">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <h1 className="app-title title-gradient">📚 Math Practice</h1>
          </Link>
        </div>
        <div className="nav-links">
          <Link
            to="/"
            className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
          >
            Dashboard
          </Link>

          {user ? (
            <>
              <span className="user-email">{user.email}</span>
              <button onClick={signOut} className="nav-item btn-link">
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className={`nav-item auth-link ${location.pathname === '/auth' ? 'active' : ''}`}
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      <main className="main-content">
        {children}
      </main>

      <footer className="footer-glass">
        <p>© 2024 Math Practice </p>
      </footer>
    </div>
  );
};

export default Layout;
