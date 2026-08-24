/**
 * The `'inkdrop'` module provides access to core APIs, utilities, and libraries
 * that are available to Inkdrop plugins at runtime.
 *
 * Plugins can import from this module without bundling the dependencies — Inkdrop
 * provides them at runtime.
 *
 * @example
 * ```typescript
 * import { models, logger, useModal } from 'inkdrop'
 *
 * const note = await models.Note.loadWithId('note:abc123')
 * logger.debug('Loaded note:', note.title)
 * ```
 */
declare module 'inkdrop' {
  export * from '@inkdropapp/types/src/inkdrop-module/index.js'
}
