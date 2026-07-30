import api from './api';

export const getMyMatches = () => api.get('/matches');

// ✅ New: Get match details with skills
export const getMatchDetails = (matchId) => api.get(`/matches/${matchId}`);