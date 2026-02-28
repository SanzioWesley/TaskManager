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

    // ✅ Função para completar tarefa
    const handleToggleComplete = async (id: number, currentStatus: boolean) => {
        try {
            if (!currentStatus) {
                await completeTask(id);
            }
            await loadTasks();
        } catch (error) {
            setError('Erro ao atualizar tarefa');
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Tem certeza que deseja deletar esta tarefa?')) {
            return;
        }

        try {
            await deleteTask(id);
            await loadTasks(); // Recarrega a lista
        } catch (error) {
            setError('Erro ao deletar tarefa');
            console.error(error);
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
                        <li key={task.id} style={{
                            marginBottom: '15px',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            textDecoration: task.isCompleted ? 'line-through' : 'none',
                            opacity: task.isCompleted ? 0.7 : 1
                        }}>
                            <strong>{task.title}</strong>
                            <p>{task.description}</p>
                            <small>Vencimento: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Sem data'}</small>
                            <br />
                            <small>Usuário: {task.user?.name || task.userId}</small>

                            <div style={{ marginTop: '10px' }}>
                                <button
                                    onClick={() => handleToggleComplete(task.id, task.isCompleted)}
                                    disabled={task.isCompleted}
                                    style={{
                                        padding: '5px 10px',
                                        marginRight: '5px',
                                        backgroundColor: task.isCompleted ? '#6c757d' : '#28a745',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: task.isCompleted ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    {task.isCompleted ? 'Concluída' : 'Concluir'}
                                </button>

                                <button
                                    onClick={() => handleDelete(task.id)}
                                    style={{
                                        padding: '5px 10px',
                                        backgroundColor: '#dc3545',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Deletar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};



export default TaskList;