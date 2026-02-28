import React, { useState } from 'react';
import { createTask } from '../services/taskService';

interface TaskFormProps {
    userId: number;
    onTaskCreated: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ userId, onTaskCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await createTask({
                title,
                description,
                dueDate: dueDate || undefined,
                userId
            });

            // Limpar formulário
            setTitle('');
            setDescription('');
            setDueDate('');

            // Recarregar lista
            onTaskCreated();
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
            alert('Erro ao criar tarefa');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <h3>➕ Nova Tarefa</h3>

            <div className="form-group">
                <input
                    type="text"
                    placeholder="Título da tarefa"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <textarea
                    placeholder="Descrição (opcional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="form-group">
                <input
                    type="datetime-local"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </div>

            <button type="submit" disabled={loading} className="btn-submit">
                {loading ? 'Criando...' : 'Criar Tarefa'}
            </button>
        </form>
    );
};

export default TaskForm;