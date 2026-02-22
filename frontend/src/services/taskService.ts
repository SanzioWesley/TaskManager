import api from './api';
import type { Task, TaskInput } from '../types';

export const getTasks = async (): Promise<Task[]> => {
    const response = await api.get<Task[]>('/tasks');
    return response.data;
};

export const getTask = async (id: number): Promise<Task> => {
    const response = await api.get<Task>(`/tasks/${id}`);
    return response.data;
};

export const createTask = async (task: TaskInput): Promise<Task> => {
    const response = await api.post<Task>('/tasks', task);
    return response.data;
};

export const updateTask = async (id: number, task: TaskInput): Promise<Task> => {
    const response = await api.put<Task>(`/tasks/${id}`, { ...task, id });
    return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
};

export const completeTask = async (id: number): Promise<void> => {
    await api.patch(`/tasks/${id}/complete`);
};