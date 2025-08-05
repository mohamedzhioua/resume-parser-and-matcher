import { useState } from 'react'
import { APP_CONSTANTS } from '@/constants'
import type { LanguageHook, Language } from '@/types'

export const useLanguage = (): LanguageHook => {
  const [language, setLanguage] = useState<Language>(APP_CONSTANTS.DEFAULT_LANGUAGE)

  const toggleLanguage = (): void => {
    setLanguage(language === 'fr' ? 'en' : 'fr')
  }

  return {
    language,
    setLanguage,
    toggleLanguage
  }
} 