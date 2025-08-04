// Custom hook for theme management
import { useState, useEffect } from 'react'
import { APP_CONSTANTS } from '../constants'

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Apply theme to body
    document.body.className = isDarkMode ? 'dark-theme' : 'light-theme'
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return {
    isDarkMode,
    toggleTheme,
    theme: isDarkMode ? 'dark' : 'light'
  }
} 