import { APP_CONSTANTS } from '@/constants'
import type { ValidationUtils } from '@/types'

export const validationUtils: ValidationUtils = {
  /**
   * Validates if a file is a valid PDF
   * @param file - File to validate
   * @returns True if valid PDF
   */
  isValidPdfFile(file: File | null): boolean {
    return file !== null && file.type === APP_CONSTANTS.FILE_TYPES.PDF
  },

  /**
   * Validates file size
   * @param file - File to validate
   * @returns True if file size is acceptable
   */
  isValidFileSize(file: File | null): boolean {
    return file !== null && file.size <= APP_CONSTANTS.MAX_FILE_SIZE
  },

  /**
   * Validates compatibility score
   * @param score - Score to validate
   * @returns True if score is valid
   */
  isValidScore(score: number | null): boolean {
    return score !== null && typeof score === 'number' && !isNaN(score) && score >= 0 && score <= 100
  },

  /**
   * Validates job description
   * @param description - Description to validate
   * @returns True if description is valid
   */
  isValidJobDescription(description: string): boolean {
    return typeof description === 'string' && description.trim().length > 0
  },

  /**
   * Generates a unique request ID
   * @returns Unique request identifier
   */
  generateRequestId(): string {
    return Math.random().toString(36).substr(2, 9)
  },

  /**
   * Formats file size for display
   * @param bytes - Size in bytes
   * @returns Formatted size string
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
} 