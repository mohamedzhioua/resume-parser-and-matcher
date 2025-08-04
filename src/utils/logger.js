// Centralized logging utility
import { config } from '../config'

class Logger {
  constructor() {
    this.enabled = config.shouldLog()
  }

  log(...args) {
    if (this.enabled) {
      console.log(...args)
    }
  }

  error(...args) {
    if (this.enabled) {
      console.error(...args)
    }
  }

  warn(...args) {
    if (this.enabled) {
      console.warn(...args)
    }
  }

  info(...args) {
    if (this.enabled) {
      console.info(...args)
    }
  }

  debug(...args) {
    if (this.enabled) {
      console.debug(...args)
    }
  }
}

export const logger = new Logger() 