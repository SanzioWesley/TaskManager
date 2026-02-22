export interface User {
    id: number;
    name: string;
    email: string;
    createdAt: string;
}

export interface Task {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    dueDate: string | null;
    isCompleted: boolean;
    userId: number;
    user?: User;
}

export interface TaskInput {
    title: string;
    description: string;
    dueDate?: string;
    userId: number;
}