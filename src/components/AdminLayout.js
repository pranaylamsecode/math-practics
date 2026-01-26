import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
    const { signOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut();
        navigate('/');
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-logo">Admin Panel</div>
                <nav>
                    <ul>
                        <li><Link to="/admin">Dashboard</Link></li>
                        <li><Link to="/admin/content">Content Manager</Link></li>
                    </ul>
                </nav>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </aside>
            <main className="admin-content">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
