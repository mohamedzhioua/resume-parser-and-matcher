// config.js

// Logger utility
export const logger = {
  log: (...args) => {
    if (import.meta.env.VITE_ENABLE_LOGGING === 'true') {
      console.log(...args)
    }
  },
  error: (...args) => {
    if (import.meta.env.VITE_ENABLE_LOGGING === 'true') {
      console.error(...args)
    }
  }
}

// Validate required environment variables
const requiredEnvVars = {
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  VITE_PARSE_RESUME_ENDPOINT: import.meta.env.VITE_PARSE_RESUME_ENDPOINT,
  VITE_COMPATIBILITY_SCORE_ENDPOINT: import.meta.env.VITE_COMPATIBILITY_SCORE_ENDPOINT,
  VITE_REQUEST_TIMEOUT: import.meta.env.VITE_REQUEST_TIMEOUT,
  VITE_MAX_FILE_SIZE: import.meta.env.VITE_MAX_FILE_SIZE
}

const missingVars = Object.entries(requiredEnvVars)
  .filter(([key, value]) => !value)
  .map(([key]) => key)

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:')
  missingVars.forEach(varName => {
    console.error(`   - ${varName}`)
  })
  console.error('\n📝 Please create a .env file with these variables:')
  console.error('VITE_API_BASE_URL=https://resume-match-dev.talinty.com')
  console.error('VITE_PARSE_RESUME_ENDPOINT=/api/parse_resume')
  console.error('VITE_COMPATIBILITY_SCORE_ENDPOINT=/api/get_compatibility_score')
  console.error('VITE_REQUEST_TIMEOUT=30000')
  console.error('VITE_MAX_FILE_SIZE=10485760')
  console.error('\n💡 Optional variables:')
  console.error('VITE_APP_NAME=Resume Parser App')
  console.error('VITE_APP_VERSION=1.0.0')
  console.error('VITE_DEV_MODE=true')
  console.error('VITE_ENABLE_LOGGING=true')
  
  throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`)
}

export const config = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  PARSE_RESUME_ENDPOINT: import.meta.env.VITE_PARSE_RESUME_ENDPOINT,
  COMPATIBILITY_SCORE_ENDPOINT: import.meta.env.VITE_COMPATIBILITY_SCORE_ENDPOINT,
  
  // Application Configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Resume Parser App',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  // Request Configuration
  REQUEST_TIMEOUT: parseInt(import.meta.env.VITE_REQUEST_TIMEOUT),
  MAX_FILE_SIZE: parseInt(import.meta.env.VITE_MAX_FILE_SIZE),
  
  // Development Configuration
  DEV_MODE: import.meta.env.VITE_DEV_MODE === 'true',
  ENABLE_LOGGING: import.meta.env.VITE_ENABLE_LOGGING === 'true',
  
  // Utility functions
  getMaxFileSizeMB: () => Math.round(config.MAX_FILE_SIZE / 1024 / 1024),
  getRequestTimeoutSeconds: () => Math.round(config.REQUEST_TIMEOUT / 1000),
  isDevelopment: () => config.DEV_MODE,
  shouldLog: () => config.ENABLE_LOGGING
}
  
  