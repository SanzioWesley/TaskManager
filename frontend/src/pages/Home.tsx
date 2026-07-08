import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
//import { TaskDto } from '../types/TaskDto'; // Ajuste o caminho se necessário
import type { Task as TaskDto } from '../types';

const Home: React.FC = () => {
    const [refreshKey, setRefreshKey] = useState(0);
    const [taskToEdit, setTaskToEdit] = useState<TaskDto | null>(null);

    const handleTaskCreated = () => {
        setRefreshKey(prev => prev + 1);
        setTaskToEdit(null); // Limpa o formulário após criar/editar
    };

    const handleEdit = (task: TaskDto) => {
        setTaskToEdit(task); // Preenche o formulário com os dados da tarefa
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola para o formulário
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <TaskForm 
                onTaskCreated={handleTaskCreated} 
                taskToEdit={taskToEdit} // Passa a tarefa para o formulário
            />
            <TaskList 
                key={refreshKey} 
                onEdit={handleEdit} // Passa a função de editar para a lista
            />
        </div>
    );
};

export default Home;