/// <reference types="vite/client" />

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