/**
 * API service for communicating with the Python Flask backend
 * Backend: D:\UOK\6th Sem\AI\Project\faculty_science_chatbot\University-Helpdesk-Chatbot
 * Port: 8081
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081';

export const chatAPI = {
  /**
   * Send a chat message to the backend
   * @param {string} message - The user's message
   * @returns {Promise<Object>} - The backend response
   */
  async sendMessage(message) {
    try {
      const response = await fetch(`${API_BASE_URL}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Map 'answer' from backend to 'response' for frontend
      return {
        response: data.answer,
        success: true
      };
    } catch (error) {
      console.error('Error sending message: - chatAPI.js:36', error);
      throw error;
    }
  },

  /**
   * Check if the backend is healthy
   * @returns {Promise<Object>} - Health check response
   */
  async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Health check failed: - chatAPI.js:53', error);
      throw error;
    }
  },
};
