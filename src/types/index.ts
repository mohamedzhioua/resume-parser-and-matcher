// Type definitions for the application

export interface FileUpload {
  name: string
  size: number
  type: string
  lastModified: number
}

export interface ApiResponse<T = any> {
  data: T
  requestId: string
  duration: string
  timestamp: string
}

export interface ErrorDetails {
  message: string
  type: string
  requestId: string
  timestamp: string
}

export interface CompatibilityScoreResult {
  score: number
  details?: any
  requestId: string
  duration: string
  timestamp: string
}

export interface JobDescription {
  description: string
  requirements: string
  benefits: string
}

export interface ResumeParseResult {
  parsed_resume: {
    personal_info: {
      name?: string
      email?: string
      phone?: string
      location?: string
    }
    experience: Array<{
      company: string
      position: string
      duration: string
      description: string
    }>
    education: Array<{
      institution: string
      degree: string
      field: string
      year: string
    }>
    skills: string[]
    summary: string
  }
}

export type Language = 'fr' | 'en'
export type Theme = 'light' | 'dark'
export type ActiveTab = 'resume' | 'compatibility'

export interface TranslationKeys {
  // Resume Parser translations
  uploadAnalyze: string
  reset: string
  processing: string
  parsedData: string
  requestId: string
  duration: string
  fileSize: string
  timestamp: string
  selectPdfFirst: string
  requestTimeout: string
  connectionTimeout: string
  networkError: string
  sslError: string
  corsError: string

  // Compatibility Score translations
  uploadResume: string
  jobDescription: string
  jobDescriptionPlaceholder: string
  requirements: string
  requirementsPlaceholder: string
  benefits: string
  benefitsPlaceholder: string
  calculateScore: string
  compatibilityScore: string
  score: string
  excellent: string
  good: string
  fair: string
  poor: string
  excellentDesc: string
  goodDesc: string
  fairDesc: string
  poorDesc: string
  selectResumeFirst: string
  fillJobDescription: string

  // File Upload translations
  chooseFile: string
  clickToBrowse: string
  selectValidPdf: string
  fileTooLarge: string

  // Error Display translations
  error: string
  errorType: string

  // Loading translations
  processingTime: string

  // App translations
  title: string
  resumeTab: string
  compatibilityTab: string
  lightMode: string
  darkMode: string
  language: string
  languageEn: string
  languageFr: string
}

export interface Translations {
  fr: TranslationKeys
  en: TranslationKeys
}

export interface Config {
  API_BASE_URL: string
  PARSE_RESUME_ENDPOINT: string
  COMPATIBILITY_SCORE_ENDPOINT: string
  APP_NAME: string
  APP_VERSION: string
  REQUEST_TIMEOUT: number
  MAX_FILE_SIZE: number
  DEV_MODE: boolean
  ENABLE_LOGGING: boolean
  getMaxFileSizeMB: () => number
  getRequestTimeoutSeconds: () => number
  isDevelopment: () => boolean
  shouldLog: () => boolean
}

export interface Logger {
  log: (...args: any[]) => void
  error: (...args: any[]) => void
  warn: (...args: any[]) => void
  info: (...args: any[]) => void
  debug: (...args: any[]) => void
}

export interface ValidationUtils {
  isValidPdfFile: (file: File | null) => boolean
  isValidFileSize: (file: File | null) => boolean
  isValidScore: (score: number | null) => boolean
  isValidJobDescription: (description: string) => boolean
  generateRequestId: () => string
  formatFileSize: (bytes: number) => string
}

export interface ApiService {
  makeRequest: <T = any>(url: string, options?: RequestInit) => Promise<ApiResponse<T>>
  parseResume: (resumeFile: File) => Promise<ApiResponse<ResumeParseResult>>
  calculateCompatibilityScore: (resumeFile: File, jobData: JobDescription) => Promise<ApiResponse<CompatibilityScoreResult>>
}

export interface ThemeHook {
  isDarkMode: boolean
  toggleTheme: () => void
  theme: Theme
}

export interface LanguageHook {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
}

export interface FileUploadProps {
  onFileSelect: (file: File | null, error: string | null) => void
  selectedFile: File | null
  language: Language
  accept?: string
  maxSize?: number
}

export interface LoadingSpinnerProps {
  message?: string
  size?: number
  language: Language
}

export interface ErrorDisplayProps {
  error: string | null
  requestDetails?: {
    requestId: string
    duration: string
    timestamp: string
    error?: string
  } | null
  language: Language
}

export interface ResumeParserProps {
  language: Language
}

export interface CompatibilityScoreProps {
  language: Language
}

// Vite environment variables interface
declare global {
  interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string
    readonly VITE_PARSE_RESUME_ENDPOINT: string
    readonly VITE_COMPATIBILITY_SCORE_ENDPOINT: string
    readonly VITE_REQUEST_TIMEOUT: string
    readonly VITE_MAX_FILE_SIZE: string
    readonly VITE_APP_NAME?: string
    readonly VITE_APP_VERSION?: string
    readonly VITE_DEV_MODE?: string
    readonly VITE_ENABLE_LOGGING?: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
} 