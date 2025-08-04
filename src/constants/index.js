// Application constants
export const APP_CONSTANTS = {
  SUPPORTED_LANGUAGES: ['fr', 'en'],
  DEFAULT_LANGUAGE: 'fr',
  DEFAULT_THEME: 'light',
  FILE_TYPES: {
    PDF: 'application/pdf'
  },
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  REQUEST_TIMEOUT: 60000, // 60 seconds
  SCORE_THRESHOLDS: {
    EXCELLENT: 80,
    GOOD: 60,
    FAIR: 40
  }
}

// API endpoints
export const API_ENDPOINTS = {
  PARSE_RESUME: '/api/parse_resume',
  COMPATIBILITY_SCORE: '/api/get_compatibility_score'
}

// UI constants
export const UI_CONSTANTS = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 300,
  SPINNER_SIZE: 40
} 