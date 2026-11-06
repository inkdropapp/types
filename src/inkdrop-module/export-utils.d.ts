import type { Note, NoteMetadata } from 'inkdrop-model'

/**
 * Options for rendering note content.
 */
export type RenderOptions = {
  /** Whether to render in print mode. */
  printMode?: boolean
}

/**
 * A page size name, or a custom size in inches.
 */
export type PrintPageSize =
  | 'A0'
  | 'A1'
  | 'A2'
  | 'A3'
  | 'A4'
  | 'A5'
  | 'A6'
  | 'Legal'
  | 'Letter'
  | 'Tabloid'
  | { width: number; height: number }

/**
 * Options for {@link NoteExportHelper.exportNoteAsPDF}, a subset of Electron's `PrintToPDFOptions`.
 */
export type ExportPDFOptions = {
  /** Paper orientation. Defaults to portrait. */
  landscape?: boolean
  /** Whether to print background graphics. Defaults to `false`. */
  printBackground?: boolean
  /** Scale of the page rendering. Defaults to `1`. */
  scale?: number
  /** Page size. Defaults to `'Letter'`. */
  pageSize?: PrintPageSize
  /** Page ranges to print, e.g. `'1-5, 8'`. Defaults to all pages. */
  pageRanges?: string
}

/**
 * Options for {@link NoteExportHelper.printNote}, a subset of Electron's `WebContentsPrintOptions`.
 */
export type PrintNoteOptions = {
  /** Print without showing the print dialog. Defaults to `false`. */
  silent?: boolean
  /** Whether to print background graphics. Defaults to `false`. */
  printBackground?: boolean
  /** The system name of the printer to use. */
  deviceName?: string
  /** Paper orientation. Defaults to portrait. */
  landscape?: boolean
  /** Page size. */
  pageSize?: PrintPageSize
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
  createHTMLWithTemplate(title: string, options?: { templateHtml?: string }): Promise<string>

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
   * Make arbitrary text — a note title, a notebook name — safe to use as a
   * single file or folder name.
   *
   * Titles and notebook names are free-form and routinely contain characters
   * the filesystem rejects (`:` on Windows, `/` anywhere) or names Windows
   * reserves (`CON`, `PRN`, …). Writing one of those straight to disk throws,
   * so anything derived from user text has to come through here rather than
   * being interpolated into a path directly. Sanitizing can consume the name
   * entirely (e.g. `???`), hence the fallback.
   *
   * Pass `extension` rather than appending one yourself: the result is capped
   * at the filesystem's 255-byte limit, and only this method can reserve room
   * so the extension survives truncation of a long title.
   *
   * @param name - The raw note title or notebook name.
   * @param options.replacement - Substituted for each rejected character. Rejected characters are removed by default.
   * @param options.fallback - Used when sanitizing leaves nothing behind. Defaults to `'Untitled'`.
   * @param options.extension - Extension to append, e.g. `.md`. Room is reserved for it before truncating.
   * @returns A name safe to use as one path segment — never empty.
   *
   * @example
   * ```typescript
   * import { exportUtils } from 'inkdrop'
   * const fileName = exportUtils.sanitizeFileName(note.title, { extension: '.md' })
   * const dirName = exportUtils.sanitizeFileName(book.name, { replacement: '-' })
   * ```
   */
  sanitizeFileName(
    name: string,
    options?: { replacement?: string; fallback?: string; extension?: string }
  ): string

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
  exportNoteAsHtml(note: Note, pathToSave: string, fileName?: string): Promise<void>

  /**
   * Export a note as a Markdown file.
   * Images are exported alongside the Markdown file and URLs are updated to relative paths.
   * @param note - The note to export.
   * @param pathToSave - The directory to save the Markdown file in.
   * @param fileName - An optional file name. If omitted, one is generated from the note title and date.
   */
  exportNoteAsMarkdown(note: Note, pathToSave: string, fileName?: string): Promise<void>

  /**
   * Render a note in an off-screen window and save it as a PDF file.
   * @param note - The note to export.
   * @param pdfFilePath - The path of the PDF file to write.
   * @param options - PDF options.
   * @throws If rendering or writing the PDF fails.
   */
  exportNoteAsPDF(note: Note, pdfFilePath: string, options?: ExportPDFOptions): Promise<void>

  /**
   * Render a note in an off-screen window and open the system print dialog.
   * @param note - The note to print.
   * @param options - Print options.
   * @returns Whether it printed. `failureReason` is set when it didn't,
   *   including when the user canceled the dialog ("Print job canceled").
   */
  printNote(
    note: Note,
    options?: PrintNoteOptions
  ): Promise<{ success: boolean; failureReason?: string }>

  /**
   * Create a webview element with the rendered note content. Used for printing.
   * @deprecated Use {@link exportNoteAsPDF} or {@link printNote}.
   * @param note - The note to render.
   * @returns The webview HTML element.
   */
  createWebView(note: Note): Promise<HTMLElement>

  /**
   * Remove a webview element created by {@link createWebView}.
   * @deprecated Use {@link exportNoteAsPDF} or {@link printNote}.
   * @param webView - The webview element to remove.
   * @param delay - Delay in milliseconds before removal. Defaults to 30 minutes.
   */
  removeWebView(webView: HTMLElement, delay?: number): void
}
