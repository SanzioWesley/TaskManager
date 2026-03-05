import api from './api';

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    token: string;
    email: string;
    name: string;
    userId: number;
    expiration: string;
}

export const login = async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
};

export const logout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tokenExpiration');
};

export const saveAuthData = (data: AuthResponse): void => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify({
        id: data.userId,
        name: data.name,
        email: data.email
    }));
    localStorage.setItem('tokenExpiration', data.expiration);
};

export const getToken = (): string | null => {
    return localStorage.getItem('token');
};

export const getUser = (): any => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const isAuthenticated = (): boolean => {
    const token = getToken();
    const expiration = localStorage.getItem('tokenExpiration');

    if (!token || !expiration) return false;

    const now = new Date();
    const expDate = new Date(expiration);

    return now < expDate;
};