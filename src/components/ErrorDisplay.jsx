import React from 'react'

const ErrorDisplay = ({ 
  error, 
  requestDetails = null,
  language = 'fr' 
}) => {
  const translations = {
    fr: {
      error: 'Erreur',
      requestId: 'ID de Demande',
      duration: 'Durée',
      timestamp: 'Horodatage',
      errorType: 'Type d\'Erreur'
    },
    en: {
      error: 'Error',
      requestId: 'Request ID',
      duration: 'Duration',
      timestamp: 'Timestamp',
      errorType: 'Error Type'
    }
  }

  const t = translations[language]

  if (!error) return null

  return (
    <div className="error">
      <h3>{t.error}</h3>
      <p>{error}</p>
      {requestDetails && (
        <div style={{ 
          marginTop: '12px', 
          padding: '12px', 
          backgroundColor: 'var(--bg-secondary)', 
          border: '1px solid var(--border-color)', 
          borderRadius: '4px', 
          fontSize: '12px' 
        }}>
          <p><strong>{t.requestId}:</strong> {requestDetails.requestId}</p>
          <p><strong>{t.duration}:</strong> {requestDetails.duration}</p>
          <p><strong>{t.timestamp}:</strong> {requestDetails.timestamp}</p>
          {requestDetails.error && (
            <p><strong>{t.errorType}:</strong> {requestDetails.error}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default ErrorDisplay 