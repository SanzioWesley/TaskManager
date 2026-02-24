import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav style={{
            padding: '1rem',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            gap: '1rem',
            marginBottom: '1rem'
        }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>Home</Link>
            <Link to="/about" style={{ textDecoration: 'none', color: '#333' }}>Sobre</Link>
        </nav>
    );
};

export default Navbar;