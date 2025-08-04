// API service layer
import { config } from '../config'
import { API_ENDPOINTS } from '../constants'
import { logger } from '../utils/logger'
import { validationUtils } from '../utils/validation'

class ApiService {
  constructor() {
    this.baseUrl = config.API_BASE_URL
    this.timeout = config.REQUEST_TIMEOUT
  }

  /**
   * Makes an API request with proper error handling
   * @param {string} url - Request URL
   * @param {Object} options - Fetch options
   * @returns {Promise<Object>} - API response
   */
  async makeRequest(url, options = {}) {
    const requestId = validationUtils.generateRequestId()
    const startTime = Date.now()

    logger.log(`[${requestId}] Making request to: ${url}`)
    logger.log(`[${requestId}] Request options:`, options)

    try {
      const response = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(this.timeout)
      })

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

      return {
        data,
        requestId,
        duration: `${duration}ms`,
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      const endTime = Date.now()
      const duration = endTime - startTime

      logger.error(`[${requestId}] Request failed after ${duration}ms:`, error)
      throw error
    }
  }

  /**
   * Parses a resume file
   * @param {File} resumeFile - Resume file to parse
   * @returns {Promise<Object>} - Parsed resume data
   */
  async parseResume(resumeFile) {
    const formData = new FormData()
    formData.append('resume', resumeFile)

    return this.makeRequest(API_ENDPOINTS.PARSE_RESUME, {
      method: 'POST',
      body: formData
    })
  }

  /**
   * Calculates compatibility score
   * @param {File} resumeFile - Resume file
   * @param {Object} jobData - Job description data
   * @returns {Promise<Object>} - Compatibility score
   */
  async calculateCompatibilityScore(resumeFile, jobData) {
    const formData = new FormData()
    formData.append('resume', resumeFile)
    formData.append('job_description', JSON.stringify(jobData))

    return this.makeRequest(API_ENDPOINTS.COMPATIBILITY_SCORE, {
      method: 'POST',
      body: formData
    })
  }
}

export const apiService = new ApiService() 