import useAuthStore from '../store/authStore';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const getRecentActivities = async () => {
    const { token } = useAuthStore.getState();
    
    const res = await fetch(`${API_BASE}/activity/recent`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!res.ok) {
        throw new Error('Gagal mengambil pertanyaan');
    }

    const data = await res.json();
    return data.data || [];
};
