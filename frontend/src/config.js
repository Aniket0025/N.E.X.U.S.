// Base URL for API requests - using relative path with Vite proxy
const API_BASE_URL = '/api';

export const API_ENDPOINTS = {
  TEACHER: {
    LOGIN: `${API_BASE_URL}/admin/teacher/login`,
    GOOGLE_LOGIN: `${API_BASE_URL}/teacher/google-login`
  },
  // Add other endpoints here as needed
};

export default {
  API_BASE_URL,
  ...API_ENDPOINTS
};
