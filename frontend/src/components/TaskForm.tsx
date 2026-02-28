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
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc' }}>
            <h3>Nova Tarefa</h3>

            <div style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <textarea
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ width: '100%', padding: '8px', minHeight: '80px' }}
                />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <input
                    type="datetime-local"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: loading ? 'not-allowed' : 'pointer'
                }}
            >
                {loading ? 'Criando...' : 'Criar Tarefa'}
            </button>
        </form>
    );
};

export default TaskForm;