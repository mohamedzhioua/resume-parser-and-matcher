// Validation utilities
import { APP_CONSTANTS } from '../constants'

export const validationUtils = {
  /**
   * Validates if a file is a valid PDF
   * @param {File} file - File to validate
   * @returns {boolean} - True if valid PDF
   */
  isValidPdfFile(file) {
    return file && file.type === APP_CONSTANTS.FILE_TYPES.PDF
  },

  /**
   * Validates file size
   * @param {File} file - File to validate
   * @returns {boolean} - True if file size is acceptable
   */
  isValidFileSize(file) {
    return file && file.size <= APP_CONSTANTS.MAX_FILE_SIZE
  },

  /**
   * Validates compatibility score
   * @param {number} score - Score to validate
   * @returns {boolean} - True if score is valid
   */
  isValidScore(score) {
    return typeof score === 'number' && !isNaN(score) && score >= 0 && score <= 100
  },

  /**
   * Validates job description
   * @param {string} description - Description to validate
   * @returns {boolean} - True if description is valid
   */
  isValidJobDescription(description) {
    return typeof description === 'string' && description.trim().length > 0
  },

  /**
   * Generates a unique request ID
   * @returns {string} - Unique request identifier
   */
  generateRequestId() {
    return Math.random().toString(36).substr(2, 9)
  },

  /**
   * Formats file size for display
   * @param {number} bytes - Size in bytes
   * @returns {string} - Formatted size string
   */
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
} 