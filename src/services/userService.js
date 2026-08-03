import api from './api';

export const getCurrentUser = () => api.get('/users/me');

export const updateProfile = (data) => api.put('/users/profile', data);

export const changePassword = (data) => api.put('/users/change-password', data);