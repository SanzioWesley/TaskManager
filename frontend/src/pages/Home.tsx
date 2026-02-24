import React from 'react';
import TaskList from '../components/TaskList';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <TaskList />
        </div>
    );
};

export default Home;