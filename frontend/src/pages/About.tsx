import React from 'react';

const About: React.FC = () => {
    return (
        <div className="about-content">
            <h1>Sobre o TaskManager</h1>
            <p>Aplicação full stack para gerenciamento de tarefas</p>

            <ul className="tech-list">
                <li>.NET 8</li>
                <li>React</li>
                <li>TypeScript</li>
                <li>SQL Server</li>
                <li>Docker</li>
            </ul>

            <p>Backend: API REST com Entity Framework</p>
            <p>Frontend: React com Vite e React Router</p>
            <p>Banco de dados: SQL Server em container Docker</p>
        </div>
    );
};

export default About;