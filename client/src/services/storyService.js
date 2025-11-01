import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const storyService = {
    getAllStories: async (category = 'all', page = 1) => {
        const response = await axios.get(`${API_URL}/stories`, {
            params: { category, page, limit: 10 }
        });
        return response.data;
    },

    getStory: async (id) => {
        const response = await axios.get(`${API_URL}/stories/${id}`);
        return response.data;
    },

    createStory: async (storyData) => {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/stories`, storyData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    toggleSupport: async (id) => {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/stories/${id}/support`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    getMyStories: async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/stories/my/stories`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    deleteStory: async (id) => {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${API_URL}/stories/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }
};

export default storyService;
