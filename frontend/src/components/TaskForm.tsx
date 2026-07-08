import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../services/taskService'; // Adiciona updateTask
import { getUser } from '../services/authService';

interface TaskDto {
    id?: number;
    title: string;
    description?: string;
    dueDate?: string;
}

interface TaskFormProps {
    onTaskCreated: () => void;
    taskToEdit?: TaskDto | null; // Nova prop opcional
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated, taskToEdit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [loading, setLoading] = useState(false);

    // Quando receber uma tarefa para editar, preenche o formulário
    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description || '');
            setDueDate(taskToEdit.dueDate || '');
        } else {
            setTitle('');
            setDescription('');
            setDueDate('');
        }
    }, [taskToEdit]); // Executa sempre que taskToEdit mudar

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (taskToEdit?.id) {
                // Se tem tarefa para editar, faz PUT
                await updateTask(taskToEdit.id, { title, description, dueDate: dueDate || undefined });
            } else {
                // Se não tem, faz POST
                await createTask({ title, description, dueDate: dueDate || undefined });
            }

            setTitle('');
            setDescription('');
            setDueDate('');
            onTaskCreated();
        } catch (error) {
            console.error('Erro ao salvar tarefa:', error);
            alert('Erro ao salvar tarefa');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            {/* Título muda dependendo se está criando ou editando */}
            <h3>{taskToEdit ? '✏️ Editar Tarefa' : '➕ Nova Tarefa'}</h3>

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
                {loading ? 'Salvando...' : taskToEdit ? 'Salvar Alterações' : 'Criar Tarefa'}
            </button>
        </form>
    );
};

export default TaskForm;