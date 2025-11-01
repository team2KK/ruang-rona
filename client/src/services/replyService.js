import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const token = localStorage.getItem('token');

const replyService = {
    getReplies: async (storyId, sortBy = 'newest') => {
        const response = await axios.get(`${API_URL}/replies/story/${storyId}`, {
            params: { sortBy }
        });
        return response.data;
    },

    createReply: async (storyId, data) => {
        const response = await axios.post(`${API_URL}/replies/story/${storyId}`, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    toggleVote: async (replyId, voteType) => {
        const response = await axios.post(`${API_URL}/replies/${replyId}/vote`, { voteType }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    deleteReply: async (replyId) => {
        const response = await axios.delete(`${API_URL}/replies/${replyId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }
};

export default replyService;
