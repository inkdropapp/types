/**
 * A log function created by the `debug` library.
 * Call it like a regular function to log messages at the given level.
 *
 * @example
 * ```typescript
 * import { logger } from 'inkdrop'
 * logger.debug('Processing note:', noteId)
 * logger.error('Failed to save:', error)
 * ```
 */
export interface LogFunction {
  (...args: any[]): void
  /** Whether color output is enabled for this log function. */
  useColors: boolean
}

/**
 * A logger instance with leveled log functions.
 *
 * The default logger is available as `logger` from the `'inkdrop'` module.
 * Each method logs at a different severity level using the `debug` library.
 */
export interface Logger {
  /** Log a debug-level message. */
  debug: LogFunction
  /** Log an info-level message. */
  info: LogFunction
  /** Log a warning-level message. */
  warn: LogFunction
  /** Log an error-level message. */
  error: LogFunction
}

/**
 * Create a new logger instance with the given namespace.
 *
 * @param name - The namespace for the logger (e.g., `'my-plugin'`).
 * @param colorEnabled - Whether to enable colored output. Defaults to `true`.
 * @returns A new {@link Logger} instance.
 *
 * @example
 * ```typescript
 * import { createLogger } from 'inkdrop'
 * const logger = createLogger('my-plugin')
 * logger.info('Plugin loaded')
 * ```
 */
export declare function createLogger(
  name: string,
  colorEnabled?: boolean
): Logger
