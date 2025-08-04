// Type definitions for better code organization

/**
 * @typedef {Object} FileUpload
 * @property {string} name - File name
 * @property {number} size - File size in bytes
 * @property {string} type - MIME type
 * @property {number} lastModified - Timestamp of last modification
 */

/**
 * @typedef {Object} ApiResponse
 * @property {any} data - Response data
 * @property {string} requestId - Unique request identifier
 * @property {string} duration - Request duration in milliseconds
 * @property {string} timestamp - ISO timestamp
 */

/**
 * @typedef {Object} ErrorDetails
 * @property {string} message - Error message
 * @property {string} type - Error type
 * @property {string} requestId - Request identifier
 * @property {string} timestamp - Error timestamp
 */

/**
 * @typedef {Object} CompatibilityScore
 * @property {number} score - Score value (0-100)
 * @property {Object} details - Additional score details
 * @property {string} requestId - Request identifier
 * @property {string} duration - Request duration
 * @property {string} timestamp - Score timestamp
 */

/**
 * @typedef {Object} JobDescription
 * @property {string} description - Job description text
 * @property {string} requirements - Job requirements text
 * @property {string} benefits - Job benefits text
 */

/**
 * @typedef {'fr' | 'en'} Language
 * @typedef {'light' | 'dark'} Theme
 * @typedef {'resume' | 'compatibility'} ActiveTab
 */

export const TYPES = {
  // This file serves as documentation for the expected data structures
  // In a real TypeScript project, these would be actual TypeScript interfaces
} 