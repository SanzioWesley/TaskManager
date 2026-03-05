import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, getUser, isAuthenticated } from '../services/authService';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const user = getUser();
    const authenticated = isAuthenticated();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!authenticated) {
        return null; // Não mostra navbar se não estiver autenticado
    }

    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">Sobre</Link>

            <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ color: '#667eea', fontWeight: 600 }}>
                    👤 {user?.name}
                </span>
                <button
                    onClick={handleLogout}
                    style={{
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '0.3rem 1rem',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Sair
                </button>
            </div>
        </nav>
    );
};

export default Navbar;