import React, { useState } from 'react'
import { config } from '@/config'
import { useTheme } from '@/hooks/useTheme'
import { useLanguage } from '@/hooks/useLanguage'
import ResumeParser from '@/components/ResumeParser'
import CompatibilityScore from '@/components/CompatibilityScore'
import '@/styles/App.css'
import type { Language, ActiveTab } from '@/types'

const App: React.FC = () => {
  const { isDarkMode, toggleTheme, theme } = useTheme()
  const { language, toggleLanguage } = useLanguage()
  const [activeTab, setActiveTab] = useState<ActiveTab>('resume')

  const translations: Record<Language, Record<string, string>> = {
    fr: {
      title: config.APP_NAME || 'Analyseur de CV & Évaluateur de Compatibilité',
      resumeTab: 'Analyser CV',
      compatibilityTab: 'Score de Compatibilité',
      lightMode: 'Mode Clair',
      darkMode: 'Mode Sombre',
      language: 'FR Français',
      languageEn: 'EN English'
    },
    en: {
      title: config.APP_NAME || 'CV Analyzer & Compatibility Evaluator',
      resumeTab: 'Analyze CV',
      compatibilityTab: 'Compatibility Score',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      language: 'EN English',
      languageFr: 'FR Français'
    }
  }

  const t = translations[language]

  return (
    <div className={`app ${theme}`}>
      <div className="header">
        <h1 className="title">{t.title}</h1>
        <div className="controls">
          <button 
            className="control-btn"
            onClick={toggleTheme}
            title={isDarkMode ? t.lightMode : t.darkMode}
          >
            {isDarkMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
          <button 
            className="control-btn"
            onClick={toggleLanguage}
          >
            {language === 'fr' ? t.languageEn : t.languageFr}
          </button>
        </div>
      </div>

      <div className="main-card">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'resume' ? 'active' : ''}`}
            onClick={() => setActiveTab('resume')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6"/>
              <line x1="8" y1="12" x2="21" y2="12"/>
              <line x1="8" y1="18" x2="21" y2="18"/>
              <line x1="3" y1="6" x2="3.01" y2="6"/>
              <line x1="3" y1="12" x2="3.01" y2="12"/>
              <line x1="3" y1="18" x2="3.01" y2="18"/>
            </svg>
            {t.resumeTab}
          </button>
          <button 
            className={`tab ${activeTab === 'compatibility' ? 'active' : ''}`}
            onClick={() => setActiveTab('compatibility')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            {t.compatibilityTab}
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'resume' ? (
            <ResumeParser language={language} />
          ) : (
            <CompatibilityScore language={language} />
          )}
        </div>
      </div>
    </div>
  )
}

export default App 