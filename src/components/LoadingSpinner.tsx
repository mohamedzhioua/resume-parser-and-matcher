import React from 'react'
import { UI_CONSTANTS } from '@/constants'
import type { LoadingSpinnerProps, Language } from '@/types'

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = '', 
  size = UI_CONSTANTS.SPINNER_SIZE,
  language = 'fr' 
}) => {
  const translations: Record<Language, Record<string, string>> = {
    fr: {
      processing: 'Traitement en cours...',
      processingTime: 'Cela peut prendre quelques secondes'
    },
    en: {
      processing: 'Processing...',
      processingTime: 'This may take a few seconds'
    }
  }

  const t = translations[language]

  return (
    <div className="loading">
      <div 
        className="spinner" 
        style={{ 
          width: `${size}px`, 
          height: `${size}px` 
        }}
      ></div>
      {message && <p>{message}</p>}
      <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
        {t.processingTime}
      </p>
    </div>
  )
}

export default LoadingSpinner 