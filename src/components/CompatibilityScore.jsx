import React, { useState } from 'react'
import { apiService } from '../services/api'
import { validationUtils } from '../utils/validation'
import { logger } from '../utils/logger'
import { APP_CONSTANTS } from '../constants'
import FileUpload from './FileUpload'
import LoadingSpinner from './LoadingSpinner'
import ErrorDisplay from './ErrorDisplay'

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
      jobDescription: 'Description du Poste',
      jobDescriptionPlaceholder: 'Entrez la description détaillée du poste...',
      requirements: 'Exigences',
      requirementsPlaceholder: 'Entrez les exigences du poste...',
      benefits: 'Avantages',
      benefitsPlaceholder: 'Entrez les avantages du poste...',
      calculateScore: 'Calculer le Score',
      reset: 'Réinitialiser',
      processing: 'Calcul du score de compatibilité...',
      processingTime: `Cela peut prendre jusqu'à ${APP_CONSTANTS.REQUEST_TIMEOUT / 1000} secondes`,
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
      fillJobDescription: 'Veuillez remplir au moins la description du poste',
      requestTimeout: `La demande a expiré après ${APP_CONSTANTS.REQUEST_TIMEOUT / 1000} secondes. Le serveur peut être lent ou indisponible.`,
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
      jobDescription: 'Job Description',
      jobDescriptionPlaceholder: 'Enter detailed job description...',
      requirements: 'Requirements',
      requirementsPlaceholder: 'Enter job requirements...',
      benefits: 'Benefits',
      benefitsPlaceholder: 'Enter job benefits...',
      calculateScore: 'Calculate Score',
      reset: 'Reset',
      processing: 'Calculating compatibility score...',
      processingTime: `This may take up to ${APP_CONSTANTS.REQUEST_TIMEOUT / 1000} seconds`,
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
      fillJobDescription: 'Please fill in at least the job description',
      requestTimeout: `Request timed out after ${APP_CONSTANTS.REQUEST_TIMEOUT / 1000} seconds. The server may be slow or unavailable.`,
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

  const handleResumeSelect = (file, error) => {
    setResumeFile(file)
    setError(error)
    setResult(null)
  }

  const getScoreClass = (score) => {
    if (score >= APP_CONSTANTS.SCORE_THRESHOLDS.EXCELLENT) return 'score-excellent'
    if (score >= APP_CONSTANTS.SCORE_THRESHOLDS.GOOD) return 'score-good'
    if (score >= APP_CONSTANTS.SCORE_THRESHOLDS.FAIR) return 'score-fair'
    return 'score-poor'
  }

  const getScoreLabel = (score) => {
    if (score >= APP_CONSTANTS.SCORE_THRESHOLDS.EXCELLENT) return t.excellent
    if (score >= APP_CONSTANTS.SCORE_THRESHOLDS.GOOD) return t.good
    if (score >= APP_CONSTANTS.SCORE_THRESHOLDS.FAIR) return t.fair
    return t.poor
  }

  const getScoreDescription = (score) => {
    if (score >= APP_CONSTANTS.SCORE_THRESHOLDS.EXCELLENT) return t.excellentDesc
    if (score >= APP_CONSTANTS.SCORE_THRESHOLDS.GOOD) return t.goodDesc
    if (score >= APP_CONSTANTS.SCORE_THRESHOLDS.FAIR) return t.fairDesc
    return t.poorDesc
  }

  const handleCalculateScore = async () => {
    if (!resumeFile) {
      setError(t.selectResumeFirst)
      return
    }

    if (!validationUtils.isValidJobDescription(jobDescription)) {
      setError(t.fillJobDescription)
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const jobData = {
        description: jobDescription,
        requirements: requirements,
        benefits: benefits
      }

      const result = await apiService.calculateCompatibilityScore(resumeFile, jobData)

      // Handle different response formats
      let score = null
      if (typeof result.data === 'number') {
        score = result.data
      } else if (result.data && typeof result.data === 'object') {
        score = result.data.score || result.data.compatibility_score || result.data.value
      }

      // Validate the score
      if (!validationUtils.isValidScore(score)) {
        throw new Error('Invalid score received from API')
      }

      // Ensure score is a number and within valid range
      score = Math.round(parseFloat(score))
      if (score < 0 || score > 100) {
        throw new Error('Score out of valid range (0-100)')
      }

      setResult({
        score: score,
        details: result.data,
        ...result
      })

    } catch (err) {
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
        <FileUpload
          onFileSelect={handleResumeSelect}
          selectedFile={resumeFile}
          language={language}
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
        <LoadingSpinner 
          message={t.processing}
          language={language}
        />
      )}

      <ErrorDisplay
        error={error}
        language={language}
      />

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