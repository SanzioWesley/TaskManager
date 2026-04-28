import React, { useEffect, useState } from 'react';
import type { Task } from '../types';
import { getTasks, deleteTask, completeTask } from '../services/taskService';


const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

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

    const filteredTasks = tasks.filter(task => {
        if (filter === 'pending') return !task.isCompleted;
        if (filter === 'completed') return task.isCompleted;
        return true;
    });

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;

    return (
        <div>
            <div className="filter-buttons">
                <button onClick={() => setFilter('all')}>Todas</button>
                <button onClick={() => setFilter('pending')}>Pendentes</button>
                <button onClick={() => setFilter('completed')}>Concluídas</button>
            </div>

            <h2>Lista de Tarefas</h2>
            {filteredTasks.length === 0 ? (
                <p>Nenhuma tarefa encontrada</p>
            ) : (
                <div className="task-list">
                    {filteredTasks.map((task) => (
                        <div key={task.id} className={`task-card ${task.isCompleted ? 'completed' : ''}`}>
                            <div className="task-title">{task.title}</div>
                            <div className="task-description">{task.description}</div>
                            <div className="task-meta">
                                <span className="task-user">{task.user?.name || `User ${task.userId}`}</span>
                                <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Sem data'}</span>
                            </div>
                            <div className="task-actions">
                                <button
                                    className="btn-complete"
                                    onClick={() => handleToggleComplete(task.id, task.isCompleted)}
                                    disabled={task.isCompleted}
                                >
                                    {task.isCompleted ? 'Concluída' : 'Concluir'}
                                </button>
                                <button
                                    className="btn-delete"
                                    onClick={() => handleDelete(task.id)}
                                >
                                    Deletar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};



export default TaskList;