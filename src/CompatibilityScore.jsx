import { useState } from 'react'
import { config, logger } from './config'

const CompatibilityScore = ({ language = 'fr' }) => {
  const [resumeFile, setResumeFile] = useState(null)
  const [jobDescription, setJobDescription] = useState('')
  const [requirements, setRequirements] = useState('')
  const [benefits, setBenefits] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const translations = {
    fr: {
      uploadResume: 'Télécharger CV',
      chooseFile: 'Choisir un fichier PDF',
      clickToBrowse: 'Cliquez pour parcourir ou glisser-déposer',
      jobDescription: 'Description du Poste',
      jobDescriptionPlaceholder: 'Entrez la description détaillée du poste...',
      requirements: 'Exigences',
      requirementsPlaceholder: 'Entrez les exigences du poste...',
      benefits: 'Avantages',
      benefitsPlaceholder: 'Entrez les avantages du poste...',
      calculateScore: 'Calculer le Score',
      reset: 'Réinitialiser',
      processing: 'Calcul du score de compatibilité...',
      processingTime: `Cela peut prendre jusqu'à ${config.getRequestTimeoutSeconds()} secondes`,
      error: 'Erreur',
      compatibilityScore: 'Score de Compatibilité',
      score: 'Score',
      excellent: 'Excellent',
      good: 'Bon',
      fair: 'Moyen',
      poor: 'Faible',
      excellentDesc: 'Votre profil correspond parfaitement aux exigences du poste.',
      goodDesc: 'Votre profil correspond bien aux exigences du poste.',
      fairDesc: 'Votre profil correspond partiellement aux exigences du poste.',
      poorDesc: 'Votre profil ne correspond pas bien aux exigences du poste.',
      selectResumeFirst: 'Veuillez sélectionner un CV d\'abord',
      selectValidPdf: 'Veuillez sélectionner un fichier PDF valide',
      fileTooLarge: `Le fichier est trop volumineux. Taille maximale: ${config.getMaxFileSizeMB()} MB`,
      fillJobDescription: 'Veuillez remplir au moins la description du poste',
      requestTimeout: `La demande a expiré après ${config.getRequestTimeoutSeconds()} secondes. Le serveur peut être lent ou indisponible.`,
      connectionTimeout: 'Connexion expirée. Veuillez vérifier votre connexion internet et réessayer.',
      networkError: 'Erreur réseau. Veuillez vérifier votre connexion internet et réessayer.',
      sslError: 'Erreur SSL/TLS. Il peut y avoir un problème de certificat avec le serveur.',
      corsError: 'Erreur CORS. Le serveur peut ne pas autoriser les demandes de cette origine.',
      requestId: 'ID de Demande',
      duration: 'Durée',
      timestamp: 'Horodatage',
      errorType: 'Type d\'Erreur'
    },
    en: {
      uploadResume: 'Upload Resume',
      chooseFile: 'Choose a PDF file',
      clickToBrowse: 'Click to browse or drag-and-drop',
      jobDescription: 'Job Description',
      jobDescriptionPlaceholder: 'Enter detailed job description...',
      requirements: 'Requirements',
      requirementsPlaceholder: 'Enter job requirements...',
      benefits: 'Benefits',
      benefitsPlaceholder: 'Enter job benefits...',
      calculateScore: 'Calculate Score',
      reset: 'Reset',
      processing: 'Calculating compatibility score...',
      processingTime: `This may take up to ${config.getRequestTimeoutSeconds()} seconds`,
      error: 'Error',
      compatibilityScore: 'Compatibility Score',
      score: 'Score',
      excellent: 'Excellent',
      good: 'Good',
      fair: 'Fair',
      poor: 'Poor',
      excellentDesc: 'Your profile perfectly matches the job requirements.',
      goodDesc: 'Your profile matches well with the job requirements.',
      fairDesc: 'Your profile partially matches the job requirements.',
      poorDesc: 'Your profile does not match well with the job requirements.',
      selectResumeFirst: 'Please select a resume first',
      selectValidPdf: 'Please select a valid PDF file',
      fileTooLarge: `File is too large. Maximum size: ${config.getMaxFileSizeMB()} MB`,
      fillJobDescription: 'Please fill in at least the job description',
      requestTimeout: `Request timed out after ${config.getRequestTimeoutSeconds()} seconds. The server may be slow or unavailable.`,
      connectionTimeout: 'Connection timed out. Please check your internet connection and try again.',
      networkError: 'Network error. Please check your internet connection and try again.',
      sslError: 'SSL/TLS error. There may be a certificate issue with the server.',
      corsError: 'CORS error. The server may not allow requests from this origin.',
      requestId: 'Request ID',
      duration: 'Duration',
      timestamp: 'Timestamp',
      errorType: 'Error Type'
    }
  }

  const t = translations[language]

  const handleResumeChange = (event) => {
    const file = event.target.files[0]
    if (file && file.type === 'application/pdf') {
      if (file.size > config.MAX_FILE_SIZE) {
        setError(t.fileTooLarge)
        setResumeFile(null)
        return
      }
      setResumeFile(file)
      setError(null)
      setResult(null)
    } else {
      setError(t.selectValidPdf)
      setResumeFile(null)
    }
  }

  const getScoreClass = (score) => {
    if (score >= 80) return 'score-excellent'
    if (score >= 60) return 'score-good'
    if (score >= 40) return 'score-fair'
    return 'score-poor'
  }

  const getScoreLabel = (score) => {
    if (score >= 80) return t.excellent
    if (score >= 60) return t.good
    if (score >= 40) return t.fair
    return t.poor
  }

  const getScoreDescription = (score) => {
    if (score >= 80) return t.excellentDesc
    if (score >= 60) return t.goodDesc
    if (score >= 40) return t.fairDesc
    return t.poorDesc
  }

  const handleCalculateScore = async () => {
    if (!resumeFile) {
      setError(t.selectResumeFirst)
      return
    }

    if (!jobDescription.trim()) {
      setError(t.fillJobDescription)
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    const startTime = Date.now()
    const requestId = Math.random().toString(36).substr(2, 9)

    try {
      const formData = new FormData()
      formData.append('resume', resumeFile)
      
      const jobData = {
        description: jobDescription,
        requirements: requirements,
        benefits: benefits
      }
      
      formData.append('job_description', JSON.stringify(jobData))

      const requestOptions = {
        method: 'POST',
        body: formData,
        signal: AbortSignal.timeout(config.REQUEST_TIMEOUT),
      }

      const apiUrl = config.COMPATIBILITY_SCORE_ENDPOINT
      
      logger.log(`[${requestId}] Making compatibility score request to: ${apiUrl} (will be proxied in dev)`)

      const response = await fetch(apiUrl, requestOptions)

      const endTime = Date.now()
      const duration = endTime - startTime

      logger.log(`[${requestId}] Response received after ${duration}ms`)
      logger.log(`[${requestId}] Response status:`, response.status)

      if (!response.ok) {
        const errorText = await response.text()
        logger.error(`[${requestId}] Response error:`, {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        })
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`)
      }

      const data = await response.json()
      logger.log(`[${requestId}] Response data:`, data)

      // Handle different response formats
      let score = null
      if (typeof data === 'number') {
        // If the API returns just a number
        score = data
      } else if (data && typeof data === 'object') {
        // If the API returns an object with a score property
        score = data.score || data.compatibility_score || data.value
      }

      // Validate the score
      if (score === null || score === undefined || isNaN(score)) {
        throw new Error('Invalid score received from API')
      }

      // Ensure score is a number and within valid range
      score = Math.round(parseFloat(score))
      if (score < 0 || score > 100) {
        throw new Error('Score out of valid range (0-100)')
      }

      setResult({
        score: score,
        details: data,
        requestId,
        duration: `${duration}ms`,
        timestamp: new Date().toISOString()
      })

    } catch (err) {
      const endTime = Date.now()
      const duration = endTime - startTime

      logger.error(`[${requestId}] Request failed after ${duration}ms:`, err)

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
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setResumeFile(null)
    setJobDescription('')
    setRequirements('')
    setBenefits('')
    setError(null)
    setResult(null)
  }

  return (
    <div className="fade-in">
      <div className="form-group">
        <label className="form-label">{t.uploadResume}</label>
        <div className="upload-area" onClick={() => document.getElementById('resume-input').click()}>
          <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10,9 9,9 8,9"/>
          </svg>
          <div className="upload-text">{resumeFile ? resumeFile.name : t.chooseFile}</div>
          <div className="upload-subtext">{t.clickToBrowse}</div>
        </div>
        <input
          type="file"
          accept=".pdf"
          onChange={handleResumeChange}
          style={{ display: 'none' }}
          id="resume-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">{t.jobDescription}</label>
        <textarea
          className="form-textarea"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder={t.jobDescriptionPlaceholder}
        />
      </div>

      <div className="form-group">
        <label className="form-label">{t.requirements}</label>
        <textarea
          className="form-textarea"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          placeholder={t.requirementsPlaceholder}
        />
      </div>

      <div className="form-group">
        <label className="form-label">{t.benefits}</label>
        <textarea
          className="form-textarea"
          value={benefits}
          onChange={(e) => setBenefits(e.target.value)}
          placeholder={t.benefitsPlaceholder}
        />
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
        <button
          onClick={handleCalculateScore}
          disabled={!resumeFile || !jobDescription.trim() || isLoading}
          className="btn btn-primary"
        >
          {isLoading ? '...' : t.calculateScore}
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
        </div>
      )}

      {result && result.score !== undefined && (
        <div className="results slide-in">
          <h3>{t.compatibilityScore}</h3>
          
          <div className="score-display">
            <div className={`score-circle ${getScoreClass(result.score)}`}>
              {result.score}%
            </div>
            <div className="score-label">{getScoreLabel(result.score)}</div>
            <div className="score-description">{getScoreDescription(result.score)}</div>
          </div>

          {result.details && (
            <div style={{ marginTop: '20px' }}>
              <h4>Détails de l'analyse</h4>
              <pre style={{ backgroundColor: 'var(--bg-primary)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'auto', maxHeight: '300px', fontSize: '14px', lineHeight: '1.5', color: 'var(--text-primary)' }}>
                {JSON.stringify(result.details, null, 2)}
              </pre>
            </div>
          )}

          <div style={{ marginTop: '16px', padding: '12px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '12px' }}>
            <p><strong>{t.requestId}:</strong> {result.requestId}</p>
            <p><strong>{t.duration}:</strong> {result.duration}</p>
            <p><strong>{t.timestamp}:</strong> {result.timestamp}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default CompatibilityScore 