// Application constants
export const APP_CONSTANTS = {
  SUPPORTED_LANGUAGES: ['fr', 'en'] as const,
  DEFAULT_LANGUAGE: 'fr' as const,
  DEFAULT_THEME: 'light' as const,
  FILE_TYPES: {
    PDF: 'application/pdf'
  } as const,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  REQUEST_TIMEOUT: 60000, // 60 seconds
  SCORE_THRESHOLDS: {
    EXCELLENT: 80,
    GOOD: 60,
    FAIR: 40
  } as const
} as const

// API endpoints
export const API_ENDPOINTS = {
  PARSE_RESUME: '/api/parse_resume',
  COMPATIBILITY_SCORE: '/api/get_compatibility_score',
  COMPATIBILITY_SCORE_WITH_RESUME: '/api/get_compatibility_score_with_resume'
} as const

// UI constants
export const UI_CONSTANTS = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 300,
  SPINNER_SIZE: 40
} as const 