import { config } from '@/config'
import { API_ENDPOINTS } from '@/constants'
import { logger } from '@/utils/logger'
import { validationUtils } from '@/utils/validation'
import type { ApiService, ApiResponse, ResumeParseResult, CompatibilityScoreResult, JobDescription } from '@/types'

class ApiServiceClass implements ApiService {
  private timeout: number

  constructor() {
    this.timeout = config.REQUEST_TIMEOUT
  }

  /**
   * Makes an API request with proper error handling
   * @param url - Request URL
   * @param options - Fetch options
   * @returns API response
   */
  async makeRequest<T = any>(url: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
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
   * @param resumeFile - Resume file to parse
   * @returns Parsed resume data
   */
  async parseResume(resumeFile: File): Promise<ApiResponse<ResumeParseResult>> {
    const formData = new FormData()
    formData.append('resume', resumeFile)

    const headers: Record<string, string> = {}
    
    // Add authorization header if token is available
    if (config.AUTHORIZATION_TOKEN) {
      headers['Authorization'] = `Bearer ${config.AUTHORIZATION_TOKEN}`
    }

    return this.makeRequest<ResumeParseResult>(API_ENDPOINTS.PARSE_RESUME, {
      method: 'POST',
      headers,
      body: formData
    })
  }

  /**
   * Calculates compatibility score
   * @param resumeFile - Resume file
   * @param jobData - Job description data
   * @returns Compatibility score
   */
  async calculateCompatibilityScore(resumeFile: File, jobData: JobDescription): Promise<ApiResponse<CompatibilityScoreResult>> {
    const formData = new FormData()
    formData.append('resume', resumeFile)
    formData.append('job_description', JSON.stringify(jobData))

    const headers: Record<string, string> = {}
    
    // Add authorization header if token is available
    if (config.AUTHORIZATION_TOKEN) {
      headers['Authorization'] = `Bearer ${config.AUTHORIZATION_TOKEN}`
    }

    return this.makeRequest<CompatibilityScoreResult>(API_ENDPOINTS.COMPATIBILITY_SCORE, {
      method: 'POST',
      headers,
      body: formData
    })
  }

  /**
   * Calculates senior frontend engineer compatibility score
   * @param resumeFile - Resume file
   * @param jobData - Job description data
   * @returns Compatibility score
   */
  async calculateSeniorFrontendScore(resumeFile: File, jobData: JobDescription): Promise<ApiResponse<CompatibilityScoreResult>> {
    const formData = new FormData()
    formData.append('resume', resumeFile)
    formData.append('job_description', JSON.stringify(jobData))

    const headers: Record<string, string> = {}
    
    // Add authorization header if token is available
    if (config.AUTHORIZATION_TOKEN) {
      headers['Authorization'] = `Bearer ${config.AUTHORIZATION_TOKEN}`
    }

    // Use the environment variable endpoint or fallback to the constant
    const endpoint = config.COMPATIBILITY_SCORE_WITH_RESUME_ENDPOINT || API_ENDPOINTS.COMPATIBILITY_SCORE_WITH_RESUME
    
    logger.log('Senior Frontend endpoint:', endpoint)
    logger.log('Config COMPATIBILITY_SCORE_WITH_RESUME_ENDPOINT:', config.COMPATIBILITY_SCORE_WITH_RESUME_ENDPOINT)

    return this.makeRequest<CompatibilityScoreResult>(endpoint, {
      method: 'POST',
      headers,
      body: formData
    })
  }
}

export const apiService: ApiService = new ApiServiceClass() 