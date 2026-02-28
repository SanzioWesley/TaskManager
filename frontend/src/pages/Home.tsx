import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const Home: React.FC = () => {
    const [refreshKey, setRefreshKey] = useState(0);
    const userId = 1; // Depois virá do login

    const handleTaskCreated = () => {
        setRefreshKey(prev => prev + 1); // Força recarregar TaskList
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <TaskForm userId={userId} onTaskCreated={handleTaskCreated} />
            <TaskList key={refreshKey} />
        </div>
    );
};

export default Home;