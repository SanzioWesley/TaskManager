import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>404</h1>
            <p>Página não encontrada</p>
            <Link to="/">Voltar para Home</Link>
        </div>
    );
};

export default NotFound;