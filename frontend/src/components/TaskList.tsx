import React, { useEffect, useState } from 'react';
import type { Task } from '../types';
import { getTasks, deleteTask, completeTask } from '../services/taskService';

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async (): Promise<void> => {
        try {
            setLoading(true);
            const data = await getTasks();
            setTasks(data);
            setError(null);
        } catch (err) {
            setError('Erro ao carregar tarefas');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleComplete = async (id: number): Promise<void> => {
        try {
            await completeTask(id);
            await loadTasks(); // Recarrega a lista
        } catch (err) {
            setError('Erro ao completar tarefa');
        }
    };

    const handleDelete = async (id: number): Promise<void> => {
        if (window.confirm('Tem certeza?')) {
            try {
                await deleteTask(id);
                await loadTasks();
            } catch (err) {
                setError('Erro ao deletar tarefa');
            }
        }
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;

    return (
        <div>
            <h2>Lista de Tarefas</h2>
            {tasks.length === 0 ? (
                <p>Nenhuma tarefa encontrada</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id} style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
                            <strong>{task.title}</strong>
                            <p>{task.description}</p>
                            <small>Usuário: {task.user?.name || task.userId}</small>
                            <br />
                            <button onClick={() => handleComplete(task.id)} disabled={task.isCompleted}>
                                {task.isCompleted ? 'Concluída' : 'Concluir'}
                            </button>
                            <button onClick={() => handleDelete(task.id)}>Deletar</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;