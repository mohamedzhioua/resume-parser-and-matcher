// Configuration utility for environment variables
export const config = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://resume-match-dev.talinty.com',
  PARSE_RESUME_ENDPOINT: import.meta.env.VITE_PARSE_RESUME_ENDPOINT || '/api/parse_resume',
  COMPATIBILITY_SCORE_ENDPOINT: import.meta.env.VITE_COMPATIBILITY_SCORE_ENDPOINT || '/api/get_compatibility_score',
  
  // Application Configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Resume Parser & Compatibility Analyzer',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  // Request Configuration
  REQUEST_TIMEOUT: parseInt(import.meta.env.VITE_REQUEST_TIMEOUT) || 60000,
  MAX_FILE_SIZE: parseInt(import.meta.env.VITE_MAX_FILE_SIZE) || 10485760, // 10MB
  
  // Development Configuration
  DEV_MODE: import.meta.env.VITE_DEV_MODE === 'true',
  ENABLE_LOGGING: import.meta.env.VITE_ENABLE_LOGGING === 'true',
  
  // Utility functions
  getMaxFileSizeMB: () => Math.round(config.MAX_FILE_SIZE / 1024 / 1024),
  getRequestTimeoutSeconds: () => Math.round(config.REQUEST_TIMEOUT / 1000),
  isDevelopment: () => config.DEV_MODE,
  shouldLog: () => config.ENABLE_LOGGING
}

// Logging utility
export const logger = {
  log: (message, data = null) => {
    if (config.ENABLE_LOGGING) {
      if (data) {
        console.log(message, data)
      } else {
        console.log(message)
      }
    }
  },
  
  error: (message, error = null) => {
    if (config.ENABLE_LOGGING) {
      if (error) {
        console.error(message, error)
      } else {
        console.error(message)
      }
    }
  },
  
  warn: (message, data = null) => {
    if (config.ENABLE_LOGGING) {
      if (data) {
        console.warn(message, data)
      } else {
        console.warn(message)
      }
    }
  }
}

export default config 