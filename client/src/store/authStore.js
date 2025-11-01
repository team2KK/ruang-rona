// src/store/authStore.js
import { create } from 'zustand';
import { authAPI } from '../api/axios';

const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,
    error: null,

    // Register
    register: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
            const response = await authAPI.register(credentials);
            const { user, token } = response.data.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            set({
                user,
                token,
                isAuthenticated: true,
                isLoading: false,
            });

            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Registrasi gagal';
            set({ error: errorMessage, isLoading: false });
            return { success: false, error: errorMessage };
        }
    },

    // Login
    login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
            const response = await authAPI.login(credentials);
            console.log(response);
            const { user, token } = response.data.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            set({
                user,
                token,
                isAuthenticated: true,
                isLoading: false,
            });

            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Login gagal';
            set({ error: errorMessage, isLoading: false });
            return { success: false, error: errorMessage };
        }
    },

    // Logout
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
        });
    },

    // Check Auth
    checkAuth: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            set({ isAuthenticated: false, user: null });
            return;
        }

        try {
            const response = await authAPI.getCurrentUser();
            const { user } = response.data.data;

            localStorage.setItem('user', JSON.stringify(user));
            set({ user, isAuthenticated: true });
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            set({ user: null, token: null, isAuthenticated: false });
        }
    },

    // Clear Error
    clearError: () => set({ error: null }),
}));

export default useAuthStore;