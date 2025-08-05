import React, { useState } from 'react'
import { apiService } from '@/services/api'
import { validationUtils } from '@/utils/validation'
import { config } from '@/config'
import FileUpload from './FileUpload'
import LoadingSpinner from './LoadingSpinner'
import ErrorDisplay from './ErrorDisplay'
import type { ResumeParserProps, Language, ResumeParseResult } from '@/types'

const ResumeParser: React.FC<ResumeParserProps> = ({ language = 'fr' }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<ResumeParseResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [requestDetails, setRequestDetails] = useState<{
    requestId: string
    duration: string
    fileSize?: number
    timestamp: string
    error?: string
  } | null>(null)

  const translations: Record<Language, Record<string, string>> = {
    fr: {
      uploadAnalyze: 'Télécharger & Analyser',
      reset: 'Réinitialiser',
      processing: 'Traitement de votre CV...',
      processingTime: `Cela peut prendre jusqu'à ${config.getRequestTimeoutSeconds()} secondes (temps de réponse API: ~7 secondes)`,
      parsedData: 'Données CV Analysées',
      requestId: 'ID de Demande',
      duration: 'Durée',
      fileSize: 'Taille du Fichier',
      timestamp: 'Horodatage',
      selectPdfFirst: 'Veuillez sélectionner un fichier PDF d\'abord',
      requestTimeout: `La demande a expiré après ${config.getRequestTimeoutSeconds()} secondes. Le serveur peut être lent ou indisponible.`,
      connectionTimeout: 'Connexion expirée. Veuillez vérifier votre connexion internet et réessayer. Le serveur peut être arrêté ou inaccessible.',
      networkError: 'Erreur réseau. Veuillez vérifier votre connexion internet et réessayer.',
      sslError: 'Erreur SSL/TLS. Il peut y avoir un problème de certificat avec le serveur.',
      corsError: 'Erreur CORS. Le serveur peut ne pas autoriser les demandes de cette origine.'
    },
    en: {
      uploadAnalyze: 'Upload & Analyze',
      reset: 'Reset',
      processing: 'Processing your resume...',
      processingTime: `This may take up to ${config.getRequestTimeoutSeconds()} seconds (API response time: ~7 seconds)`,
      parsedData: 'Parsed Resume Data',
      requestId: 'Request ID',
      duration: 'Duration',
      fileSize: 'File Size',
      timestamp: 'Timestamp',
      selectPdfFirst: 'Please select a PDF file first',
      requestTimeout: `Request timed out after ${config.getRequestTimeoutSeconds()} seconds. The server may be slow or unavailable.`,
      connectionTimeout: 'Connection timed out. Please check your internet connection and try again. The server may be down or unreachable.',
      networkError: 'Network error. Please check your internet connection and try again.',
      sslError: 'SSL/TLS error. There may be a certificate issue with the server.',
      corsError: 'CORS error. The server may not allow requests from this origin.'
    }
  }

  const t = translations[language]

  const handleFileSelect = (file: File | null, error: string | null): void => {
    setSelectedFile(file)
    setError(error)
    setResponse(null)
    setRequestDetails(null)
  }

  const handleUpload = async (): Promise<void> => {
    if (!selectedFile) {
      setError(t.selectPdfFirst)
      return
    }

    setIsLoading(true)
    setError(null)
    setResponse(null)
    setRequestDetails(null)

    try {
      const result = await apiService.parseResume(selectedFile)
      
      setResponse(result.data)
      setRequestDetails({
        ...result,
        fileSize: selectedFile.size
      })

    } catch (err: any) {
      let errorMessage = err.message
      
      if (err.name === 'AbortError') {
        errorMessage = t.requestTimeout
      } else if (err.message.includes('ERR_CONNECTION_TIMED_OUT')) {
        errorMessage = t.connectionTimeout
      } else if (err.message.includes('ERR_NETWORK')) {
        errorMessage = t.networkError
      } else if (err.message.includes('ERR_SSL')) {
        errorMessage = t.sslError
      } else if (err.message.includes('CORS')) {
        errorMessage = t.corsError
      }

      setError(errorMessage)
      setRequestDetails({
        requestId: validationUtils.generateRequestId(),
        duration: 'N/A',
        error: err.name,
        timestamp: new Date().toISOString()
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = (): void => {
    setSelectedFile(null)
    setError(null)
    setResponse(null)
    setRequestDetails(null)
  }

  return (
    <div className="fade-in">
      <FileUpload
        onFileSelect={handleFileSelect}
        selectedFile={selectedFile}
        language={language}
      />
      
      <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
        <button
          onClick={handleUpload}
          disabled={!selectedFile || isLoading}
          className="btn btn-primary"
        >
          {isLoading ? '...' : t.uploadAnalyze}
        </button>
        
        <button
          onClick={handleReset}
          className="btn btn-secondary"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
            <path d="M21 3v5h-5"/>
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
            <path d="M3 21v-5h5"/>
          </svg>
          {t.reset}
        </button>
      </div>

      {isLoading && (
        <LoadingSpinner 
          message={t.processing}
          language={language}
        />
      )}

      <ErrorDisplay
        error={error}
        requestDetails={requestDetails}
        language={language}
      />

      {response && (
        <div className="results">
          <h3>{t.parsedData}</h3>
          {requestDetails && (
            <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '12px' }}>
              <p><strong>{t.requestId}:</strong> {requestDetails.requestId}</p>
              <p><strong>{t.duration}:</strong> {requestDetails.duration}</p>
              <p><strong>{t.fileSize}:</strong> {requestDetails.fileSize} bytes</p>
              <p><strong>{t.timestamp}:</strong> {requestDetails.timestamp}</p>
            </div>
          )}
          <pre style={{ backgroundColor: 'var(--bg-primary)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'auto', maxHeight: '400px', fontSize: '14px', lineHeight: '1.5', color: 'var(--text-primary)' }}>
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

export default ResumeParser 