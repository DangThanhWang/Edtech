// client/src/services/studySetService.js (Updated with browse method)
import api from './api';

const studySetService = {
  // Create new study set
  createStudySet: async (studySetData) => {
    const response = await api.post('/study-sets', studySetData);
    return response;
  },

  // Get user's study sets with sorting and filtering
  getUserStudySets: async (params = {}) => {
    const {
      page = 1,
      limit = 12,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search = '',
      category = '',
      privacy = ''
    } = params;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortBy,
      sortOrder,
      ...(search && { search }),
      ...(category && { category }),
      ...(privacy && { privacy })
    });

    const response = await api.get(`/study-sets/my-sets?${queryParams}`);
    return response;
  },

  // Get public study sets for browse page (NEW METHOD)
  getBrowseStudySets: async (params = {}) => {
    const {
      page = 1,
      limit = 12,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search = '',
      category = '',
      creator = ''
    } = params;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortBy,
      sortOrder,
      ...(search && { search }),
      ...(category && { category }),
      ...(creator && { creator })
    });

    const response = await api.get(`/study-sets/browse?${queryParams}`);
    return response;
  },

  // Get study set by ID
  getStudySetById: async (id) => {
    const response = await api.get(`/study-sets/${id}`);
    return response;
  },

  // Update study set
  updateStudySet: async (id, studySetData) => {
    const response = await api.put(`/study-sets/${id}`, studySetData);
    return response;
  },

  // Delete study set
  deleteStudySet: async (id) => {
    const response = await api.delete(`/study-sets/${id}`);
    return response;
  },

  // Duplicate study set
  duplicateStudySet: async (id) => {
    const response = await api.post(`/study-sets/${id}/duplicate`);
    return response;
  },

  // Get user stats
  getStudySetStats: async () => {
    const response = await api.get('/study-sets/stats');
    return response;
  },

  // Upload file
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/study-sets/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  }
};

export default studySetService;