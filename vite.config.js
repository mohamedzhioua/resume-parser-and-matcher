// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  console.log('🔍 Vite Config Environment Variables:')
  console.log('VITE_PARSE_RESUME_ENDPOINT:', env.VITE_PARSE_RESUME_ENDPOINT)
  console.log('VITE_API_BASE_URL:', env.VITE_API_BASE_URL)

  return {
    plugins: [react()],
    server: {
      proxy: {
        // Proxy both endpoints to avoid CORS issues
        '/api/parse_resume': {
          target: env.VITE_API_BASE_URL  ,
          changeOrigin: true,
          secure: true,
          headers: {
            'Origin': 'https://astrolab.testbo.talinty.com',
            'Referer': 'https://astrolab.testbo.talinty.com/',
          }
        },
        '/api/get_compatibility_score': {
          target: env.VITE_API_BASE_URL  ,
          changeOrigin: true,
          secure: true,
          headers: {
            'Origin': 'https://astrolab.testbo.talinty.com',
            'Referer': 'https://astrolab.testbo.talinty.com/',
          }
        }
      }
    }
  }
})
