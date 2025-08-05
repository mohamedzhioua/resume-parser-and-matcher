import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  console.log('🔍 Vite Config Environment Variables:')
  console.log('VITE_PARSE_RESUME_ENDPOINT:', env.VITE_PARSE_RESUME_ENDPOINT)
  console.log('VITE_API_BASE_URL:', env.VITE_API_BASE_URL)

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@/components': path.resolve(__dirname, './src/components'),
        '@/services': path.resolve(__dirname, './src/services'),
        '@/hooks': path.resolve(__dirname, './src/hooks'),
        '@/utils': path.resolve(__dirname, './src/utils'),
        '@/constants': path.resolve(__dirname, './src/constants'),
        '@/types': path.resolve(__dirname, './src/types'),
        '@/styles': path.resolve(__dirname, './src/styles')
      }
    },
    server: {
      proxy: {
        // Proxy both endpoints to avoid CORS issues
        '/api/parse_resume': {
          target: env.VITE_API_BASE_URL || 'https://resume-match-dev.talinty.com',
          changeOrigin: true,
          secure: true,
          headers: {
            'Origin': 'https://astrolab.testbo.talinty.com',
            'Referer': 'https://astrolab.testbo.talinty.com/',
          }
        },
        '/api/get_compatibility_score': {
          target: env.VITE_API_BASE_URL || 'https://resume-match-dev.talinty.com',
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