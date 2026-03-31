import type { Logger, createLogger } from './logger'
import type { UseModalResult } from './use-modal'
import type { Models } from './models'
import type { MarkdownRenderer } from '../markdown-renderer'
import type { NoteExportHelper } from './export-utils'
import type { NoteImportHelper } from './import-utils'
import type { EditorUtils } from './editor-utils'

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
  /**
   * Redux action creators for dispatching state changes.
   *
   * Contains action modules for notes, books, tags, and other app state.
   * The shape is intentionally typed as `any` because the action API is internal
   * and subject to change.
   */
  export const actions: any

  /**
   * The default application logger.
   *
   * Provides `debug`, `info`, `warn`, and `error` log functions
   * powered by the `debug` library.
   *
   * @example
   * ```typescript
   * import { logger } from 'inkdrop'
   * logger.debug('Processing:', data)
   * logger.error('Something went wrong:', error)
   * ```
   */
  export const logger: Logger

  /**
   * ORM model classes for Inkdrop document types.
   *
   * Each model wraps a PouchDB document with validation, persistence,
   * and helper methods.
   *
   * @example
   * ```typescript
   * import { models } from 'inkdrop'
   * const note = await models.Note.loadWithId('note:abc123')
   * note.title = 'Updated Title'
   * await note.save()
   * ```
   */
  export const models: Models

  /**
   * An error class with additional `detail` and `debugInfo` properties.
   *
   * Used throughout Inkdrop for user-facing error messages with debug context.
   *
   * @example
   * ```typescript
   * import { AssistiveError } from 'inkdrop'
   * throw new AssistiveError({
   *   message: 'Failed to save note',
   *   detail: 'The notebook does not exist',
   *   debugInfo: { noteId, bookId }
   * })
   * ```
   */
  export class AssistiveError extends Error {
    /** A human-readable detail message. */
    detail: string
    /** Debug information for troubleshooting. */
    debugInfo: Record<string, any>
    constructor(opts: {
      message: string
      detail: string
      debugInfo: Record<string, any>
    })
  }

  /**
   * A React hook for managing modal visibility state.
   *
   * @param initialState - Whether the modal is initially visible. Defaults to `false`.
   * @returns An object with `show`, `close`, and `state` properties.
   *
   * @example
   * ```typescript
   * import { useModal } from 'inkdrop'
   *
   * function MyDialog() {
   *   const modal = useModal()
   *   return (
   *     <>
   *       <button onClick={modal.show}>Open</button>
   *       {modal.state.visible && <Dialog onClose={modal.close} />}
   *     </>
   *   )
   * }
   * ```
   */
  export function useModal(initialState?: boolean): UseModalResult

  /**
   * Convert an HTML string to Markdown.
   *
   * @param html - The HTML content to convert.
   * @param options - Conversion options.
   * @returns The converted Markdown string.
   *
   * @example
   * ```typescript
   * import { html2markdown } from 'inkdrop'
   * const md = await html2markdown('<h1>Hello</h1><p>World</p>')
   * ```
   */
  export function html2markdown(html: string, options?: any): Promise<string>

  /**
   * The application's Markdown renderer.
   *
   * Provides access to remark/rehype plugins and the `render` method
   * for converting Markdown to React elements.
   */
  export const markdownRenderer: MarkdownRenderer

  /**
   * Utility for exporting notes as HTML or Markdown files.
   *
   * @example
   * ```typescript
   * import { exportUtils } from 'inkdrop'
   * const note = /* ... *\/
   * await exportUtils.exportNoteAsHtml(note, '/path/to/output')
   * ```
   */
  export const exportUtils: NoteExportHelper

  /**
   * Utility for importing Markdown or HTML files as Inkdrop notes.
   *
   * @example
   * ```typescript
   * import { importUtils } from 'inkdrop'
   * await importUtils.importMarkdownFile('/path/to/note.md', 'book:abc123')
   * ```
   */
  export const importUtils: NoteImportHelper

  /**
   * Utility functions for interacting with the editor and preview pane.
   *
   * @example
   * ```typescript
   * import { editorUtils } from 'inkdrop'
   * const container = editorUtils.getPreviewContainer()
   * const lineNum = editorUtils.getLinePosOnPreview(container)
   * ```
   */
  export const editorUtils: EditorUtils

  /**
   * Create a new logger instance with a custom namespace.
   *
   * @param name - The namespace for the logger (e.g., `'my-plugin'`).
   * @param colorEnabled - Whether to enable colored output. Defaults to `true`.
   * @returns A new Logger instance.
   *
   * @example
   * ```typescript
   * import { createLogger } from 'inkdrop'
   * const logger = createLogger('my-plugin')
   * logger.info('Plugin initialized')
   * ```
   */
  export { createLogger }
}
