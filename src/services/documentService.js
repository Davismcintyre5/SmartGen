import api from './api.js';

export const documentService = {
  getAll: () => api.get('/smartgen/api/documents'),
  getById: (id) => api.get(`/smartgen/api/documents/${id}`),
  save: (data) => api.post('/smartgen/api/documents', data),
  update: (id, data) => api.put(`/smartgen/api/documents/${id}`, data),
  remove: (id) => api.delete(`/smartgen/api/documents/${id}`),
};