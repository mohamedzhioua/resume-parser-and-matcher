import { config } from '@/config'
import type { Logger } from '@/types'

class LoggerClass implements Logger {
  private enabled: boolean

  constructor() {
    this.enabled = config.shouldLog()
  }

  log(...args: any[]): void {
    if (this.enabled) {
      console.log(...args)
    }
  }

  error(...args: any[]): void {
    if (this.enabled) {
      console.error(...args)
    }
  }

  warn(...args: any[]): void {
    if (this.enabled) {
      console.warn(...args)
    }
  }

  info(...args: any[]): void {
    if (this.enabled) {
      console.info(...args)
    }
  }

  debug(...args: any[]): void {
    if (this.enabled) {
      console.debug(...args)
    }
  }
}

export const logger: Logger = new LoggerClass() 