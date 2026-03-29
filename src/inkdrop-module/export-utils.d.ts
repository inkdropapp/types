import type { Note, NoteMetadata } from 'inkdrop-model'

/**
 * Options for rendering note content.
 */
export type RenderOptions = {
  /** Whether to render in print mode. */
  printMode?: boolean
}

/**
 * A processor for exporting note content to HTML or other formats.
 *
 * Extends the Markdown AST (mdast) note processor with export-specific methods
 * such as HTML generation, image export, and attachment handling.
 *
 * @example
 * ```typescript
 * import { exportUtils } from 'inkdrop'
 * const note = /* ... *\/
 * const processor = await exportUtils.getProcessorForNote(note)
 * if (processor) {
 *   await processor.replaceAttachmentImagesWithDataURI()
 *   const html = await processor.createHTMLWithTemplate(note.title)
 * }
 * ```
 */
export declare class NoteExporter {
  /** The note metadata associated with this processor. */
  metadata: NoteMetadata

  /**
   * Parse a Markdown string into an AST.
   * @param markdown - The Markdown content to parse.
   * @returns The parsed Markdown AST root node.
   */
  parse(markdown: string): any

  /**
   * Get the parsed Markdown AST.
   * @throws If no Markdown has been parsed yet.
   */
  getMdast(): any

  /**
   * Get all image nodes from the parsed AST.
   * @returns An array of mdast Image nodes.
   */
  getImageNodes(): any[]

  /**
   * Get document IDs of all attachment images in the note.
   * @returns An array of file document IDs (e.g., `'file:abc123'`).
   */
  getAttachmentImageDocIds(): string[]

  /**
   * Insert a heading with the given title at the beginning of the AST.
   * If the document starts with YAML frontmatter, the heading is inserted after it.
   * @param title - The title text to insert.
   * @returns The modified AST root node.
   */
  insertTitleToTheBeginning(title: string): any

  /**
   * Create a complete HTML document with styles and template.
   * @param title - The document title.
   * @param options - Options for the template.
   * @param options.templateHtml - A custom HTML template. Use `{%title%}`, `{%styles%}`, and `{%body%}` as placeholders.
   * @returns The rendered HTML string.
   */
  createHTMLWithTemplate(
    title: string,
    options?: { templateHtml?: string }
  ): Promise<string>

  /**
   * Convert the parsed Markdown AST to an HTML string.
   * Uses the application's Markdown renderer and React components for full fidelity.
   * @param options - Render options.
   * @returns The rendered HTML string.
   */
  stringify(options?: RenderOptions): Promise<string>

  /**
   * Convert the parsed Markdown AST to a simple HTML string without custom components.
   * Uses basic remark-rehype conversion without the application's renderer.
   * @returns The rendered HTML string.
   */
  stringifySimple(): Promise<string>

  /**
   * Replace all `inkdrop://` image URLs in the AST with inline data URIs.
   * Useful for creating self-contained HTML exports.
   */
  replaceAttachmentImagesWithDataURI(): Promise<void>

  /**
   * Export all attachment images to a directory on disk.
   * Updates the image URLs in the AST to point to the exported files.
   * @param dirToSave - The directory to save images to.
   * @param basePath - If provided, image URLs are made relative to this path.
   * @param callback - Called for each exported image with the original URI and the AST node.
   * @returns The exported image nodes.
   */
  exportImages(
    dirToSave: string,
    basePath?: string,
    callback?: (srcUri: string, node: any) => void
  ): Promise<any[]>
}

/**
 * A helper class for exporting notes as HTML or Markdown files.
 *
 * An instance of this class is available as `exportUtils` from the `'inkdrop'` module.
 *
 * @example
 * ```typescript
 * import { exportUtils } from 'inkdrop'
 * const note = /* ... *\/
 * await exportUtils.exportNoteAsHtml(note, '/path/to/output')
 * ```
 */
export declare class NoteExportHelper {
  /**
   * Create a {@link NoteExporter} processor for the given note.
   * @param note - The note to process.
   * @returns A processor instance, or `null` if the note has no body.
   */
  getProcessorForNote(note: Note): Promise<NoteExporter | null>

  /**
   * Export a note as an HTML file.
   * Images are exported alongside the HTML file.
   * @param note - The note to export.
   * @param pathToSave - The directory to save the HTML file in.
   * @param fileName - An optional file name. If omitted, one is generated from the note title and date.
   */
  exportNoteAsHtml(
    note: Note,
    pathToSave: string,
    fileName?: string
  ): Promise<void>

  /**
   * Export a note as a Markdown file.
   * Images are exported alongside the Markdown file and URLs are updated to relative paths.
   * @param note - The note to export.
   * @param pathToSave - The directory to save the Markdown file in.
   * @param fileName - An optional file name. If omitted, one is generated from the note title and date.
   */
  exportNoteAsMarkdown(
    note: Note,
    pathToSave: string,
    fileName?: string
  ): Promise<void>

  /**
   * Create a webview element with the rendered note content. Used for printing.
   * @param note - The note to render.
   * @returns The webview HTML element.
   */
  createWebView(note: Note): Promise<HTMLElement>

  /**
   * Remove a webview element created by {@link createWebView}.
   * @param webView - The webview element to remove.
   * @param delay - Delay in milliseconds before removal. Defaults to 30 minutes.
   */
  removeWebView(webView: HTMLElement, delay?: number): void
}
