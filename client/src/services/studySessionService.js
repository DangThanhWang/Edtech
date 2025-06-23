// client/src/services/studySessionService.js
import api from './api';

const studySessionService = {
  // Start new study session
  startSession: async (studySetId, options = {}) => {
    const response = await api.post(`/study-sessions/start/${studySetId}`, options);
    return response;
  },

  // Get existing session
  getSession: async (sessionId) => {
    const response = await api.get(`/study-sessions/${sessionId}`);
    return response;
  },

  // Answer a card in session
  answerCard: async (sessionId, cardAnswer) => {
    const response = await api.put(`/study-sessions/${sessionId}/answer`, cardAnswer);
    return response;
  },

  // Complete study session
  completeSession: async (sessionId) => {
    const response = await api.put(`/study-sessions/${sessionId}/complete`);
    return response;
  },

  // Pause or resume session
  pauseSession: async (sessionId, action) => {
    const response = await api.put(`/study-sessions/${sessionId}/pause`, { action });
    return response;
  },

  // Get user's study history
  getStudyHistory: async (params = {}) => {
    const {
      page = 1,
      limit = 10
    } = params;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });

    const response = await api.get(`/study-sessions/history?${queryParams}`);
    return response;
  },

  // Get study statistics
  getStudyStats: async (studySetId, timeRange = '7d') => {
    const response = await api.get(`/study-sessions/stats/${studySetId}?timeRange=${timeRange}`);
    return response;
  },

  // Get recent study sessions
  getRecentSessions: async (limit = 5) => {
    const response = await api.get(`/study-sessions/recent?limit=${limit}`);
    return response;
  }
};

export default studySessionService;