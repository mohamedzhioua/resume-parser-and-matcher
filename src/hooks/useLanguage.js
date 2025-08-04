// Custom hook for language management
import { useState } from 'react'
import { APP_CONSTANTS } from '../constants'

export const useLanguage = () => {
  const [language, setLanguage] = useState(APP_CONSTANTS.DEFAULT_LANGUAGE)

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr')
  }

  return {
    language,
    setLanguage,
    toggleLanguage
  }
} 