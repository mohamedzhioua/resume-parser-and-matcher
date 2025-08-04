import { useState } from 'react'

const ResumeParser = ({ language = 'fr' }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [requestDetails, setRequestDetails] = useState(null)

  const translations = {
    fr: {
      chooseFile: 'Choisir un fichier PDF',
      clickToBrowse: 'Cliquez pour parcourir ou glisser-déposer',
      uploadAnalyze: 'Télécharger & Analyser',
      reset: 'Réinitialiser',
      processing: 'Traitement de votre CV...',
      processingTime: 'Cela peut prendre jusqu\'à 60 secondes (temps de réponse API: ~7 secondes)',
      error: 'Erreur',
      parsedData: 'Données CV Analysées',
      requestId: 'ID de Demande',
      duration: 'Durée',
      fileSize: 'Taille du Fichier',
      timestamp: 'Horodatage',
      errorType: 'Type d\'Erreur',
      selectPdfFirst: 'Veuillez sélectionner un fichier PDF d\'abord',
      selectValidPdf: 'Veuillez sélectionner un fichier PDF valide',
      requestTimeout: 'La demande a expiré après 60 secondes. Le serveur peut être lent ou indisponible.',
      connectionTimeout: 'Connexion expirée. Veuillez vérifier votre connexion internet et réessayer. Le serveur peut être arrêté ou inaccessible.',
      networkError: 'Erreur réseau. Veuillez vérifier votre connexion internet et réessayer.',
      sslError: 'Erreur SSL/TLS. Il peut y avoir un problème de certificat avec le serveur.',
      corsError: 'Erreur CORS. Le serveur peut ne pas autoriser les demandes de cette origine.'
    },
    en: {
      chooseFile: 'Choose a PDF file',
      clickToBrowse: 'Click to browse or drag-and-drop',
      uploadAnalyze: 'Upload & Analyze',
      reset: 'Reset',
      processing: 'Processing your resume...',
      processingTime: 'This may take up to 60 seconds (API response time: ~7 seconds)',
      error: 'Error',
      parsedData: 'Parsed Resume Data',
      requestId: 'Request ID',
      duration: 'Duration',
      fileSize: 'File Size',
      timestamp: 'Timestamp',
      errorType: 'Error Type',
      selectPdfFirst: 'Please select a PDF file first',
      selectValidPdf: 'Please select a valid PDF file',
      requestTimeout: 'Request timed out after 60 seconds. The server may be slow or unavailable.',
      connectionTimeout: 'Connection timed out. Please check your internet connection and try again. The server may be down or unreachable.',
      networkError: 'Network error. Please check your internet connection and try again.',
      sslError: 'SSL/TLS error. There may be a certificate issue with the server.',
      corsError: 'CORS error. The server may not allow requests from this origin.'
    }
  }

  const t = translations[language]

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file)
      setError(null)
      setResponse(null)
      setRequestDetails(null)
      console.log('File selected:', {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: new Date(file.lastModified).toISOString()
      })
    } else {
      setError(t.selectValidPdf)
      setSelectedFile(null)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setError(t.selectPdfFirst)
      return
    }

    setIsLoading(true)
    setError(null)
    setResponse(null)
    setRequestDetails(null)

    const startTime = Date.now()
    const requestId = Math.random().toString(36).substr(2, 9)

    console.log(`[${requestId}] Starting upload request...`)
    console.log(`[${requestId}] File details:`, {
      name: selectedFile.name,
      size: selectedFile.size,
      type: selectedFile.type
    })

    try {
      const formData = new FormData()
      formData.append('resume', selectedFile)

      console.log(`[${requestId}] FormData created with file`)
      console.log(`[${requestId}] FormData entries:`, Array.from(formData.entries()))

      const requestOptions = {
        method: 'POST',
        body: formData,
        signal: AbortSignal.timeout(60000), // 60 second timeout
      }

      const apiUrl = '/api/parse_resume'
      
      console.log(`[${requestId}] Making request to: ${apiUrl}`)
      console.log(`[${requestId}] Request options:`, {
        method: requestOptions.method,
        timeout: '60s',
        hasFormData: true,
        fieldName: 'resume'
      })

      const response = await fetch(apiUrl, requestOptions)

      const endTime = Date.now()
      const duration = endTime - startTime

      console.log(`[${requestId}] Response received after ${duration}ms`)
      console.log(`[${requestId}] Response status:`, response.status)
      console.log(`[${requestId}] Response headers:`, Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`[${requestId}] Response error:`, {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        })
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`)
      }

      const data = await response.json()
      console.log(`[${requestId}] Response data:`, data)

      setResponse(data)
      setRequestDetails({
        requestId,
        duration: `${duration}ms`,
        fileSize: selectedFile.size,
        timestamp: new Date().toISOString()
      })

    } catch (err) {
      const endTime = Date.now()
      const duration = endTime - startTime

      console.error(`[${requestId}] Request failed after ${duration}ms:`, err)
      console.error(`[${requestId}] Error details:`, {
        name: err.name,
        message: err.message,
        stack: err.stack
      })

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
        requestId,
        duration: `${duration}ms`,
        error: err.name,
        timestamp: new Date().toISOString()
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setSelectedFile(null)
    setError(null)
    setResponse(null)
    setRequestDetails(null)
  }

  return (
    <div className="fade-in">
      <div className="upload-area" onClick={() => document.getElementById('file-input').click()}>
        <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10,9 9,9 8,9"/>
        </svg>
        <div className="upload-text">{selectedFile ? selectedFile.name : t.chooseFile}</div>
        <div className="upload-subtext">{t.clickToBrowse}</div>
      </div>
      
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="file-input"
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
        <div className="loading">
          <div className="spinner"></div>
          <p>{t.processing}</p>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{t.processingTime}</p>
        </div>
      )}

      {error && (
        <div className="error">
          <h3>{t.error}</h3>
          <p>{error}</p>
          {requestDetails && (
            <div style={{ marginTop: '12px', padding: '12px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '12px' }}>
              <p><strong>{t.requestId}:</strong> {requestDetails.requestId}</p>
              <p><strong>{t.duration}:</strong> {requestDetails.duration}</p>
              <p><strong>{t.timestamp}:</strong> {requestDetails.timestamp}</p>
              {requestDetails.error && (
                <p><strong>{t.errorType}:</strong> {requestDetails.error}</p>
              )}
            </div>
          )}
        </div>
      )}

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