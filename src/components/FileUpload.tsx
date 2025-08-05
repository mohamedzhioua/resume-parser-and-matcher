import React from 'react'
import { validationUtils } from '@/utils/validation'
import { logger } from '@/utils/logger'
import type { FileUploadProps, Language } from '@/types'

const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileSelect, 
  selectedFile, 
  language = 'fr',
  accept = '.pdf',
  maxSize = 10 * 1024 * 1024 // 10MB
}) => {
  const translations: Record<Language, Record<string, string>> = {
    fr: {
      chooseFile: 'Choisir un fichier PDF',
      clickToBrowse: 'Cliquez pour parcourir ou glisser-déposer',
      selectValidPdf: 'Veuillez sélectionner un fichier PDF valide',
      fileTooLarge: `Le fichier est trop volumineux. Taille maximale: ${validationUtils.formatFileSize(maxSize)}`
    },
    en: {
      chooseFile: 'Choose a PDF file',
      clickToBrowse: 'Click to browse or drag-and-drop',
      selectValidPdf: 'Please select a valid PDF file',
      fileTooLarge: `File is too large. Maximum size: ${validationUtils.formatFileSize(maxSize)}`
    }
  }

  const t = translations[language]

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0] || null
    
    if (!file) return

    if (!validationUtils.isValidPdfFile(file)) {
      onFileSelect(null, t.selectValidPdf)
      return
    }

    if (!validationUtils.isValidFileSize(file)) {
      onFileSelect(null, t.fileTooLarge)
      return
    }

    logger.log('File selected:', {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: new Date(file.lastModified).toISOString()
    })

    onFileSelect(file, null)
  }

  return (
    <div className="upload-area" onClick={() => document.getElementById('file-input')?.click()}>
      <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10,9 9,9 8,9"/>
      </svg>
      <div className="upload-text">{selectedFile ? selectedFile.name : t.chooseFile}</div>
      <div className="upload-subtext">{t.clickToBrowse}</div>
      
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="file-input"
      />
    </div>
  )
}

export default FileUpload 