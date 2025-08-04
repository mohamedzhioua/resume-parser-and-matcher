import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_BASE_URL || 'https://resume-match-dev.talinty.com',
        changeOrigin: true,
        secure: true,
        headers: {
          'Origin': 'https://astrolab.testbo.talinty.com',
          'Referer': 'https://astrolab.testbo.talinty.com/',
        }
      }
    }
  }
}) 