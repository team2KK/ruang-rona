import useAuthStore from '../store/authStore';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function getOverallExerciseProgress() {
  const { token } = useAuthStore.getState();
  try {
    const res = await fetch(`${API_BASE}/exercises/progress/overall`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    return json.data || { total: 0, completed: 0, percent: 0 };
  } catch (err) {
    console.error('getOverallExerciseProgress error:', err);
    return { total: 0, completed: 0, percent: 0 };
  }
}
