/**
 * A processor for importing Markdown content into Inkdrop notes.
 *
 * Handles image import (converting local file paths to Inkdrop attachments)
 * and title extraction from the Markdown AST.
 *
 * @example
 * ```typescript
 * import { importUtils } from 'inkdrop'
 * const processor = await importUtils.getProcessorForMarkdown(markdownString)
 * const { title } = await processor.getTitle()
 * await processor.importImages('/path/to/source')
 * ```
 */
export declare class NoteImporter {
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
   * Import local images referenced in the Markdown into Inkdrop as file attachments.
   * Updates the image URLs in the AST to `inkdrop://file:...` URIs.
   * @param basePath - The base directory to resolve relative image paths against.
   * @param callback - Called for each imported image with the original URI and the AST node.
   * @returns The imported image nodes.
   */
  importImages(
    basePath: string,
    callback?: (srcUri: string, node: any) => void
  ): Promise<any[]>

  /**
   * Extract the title from the parsed Markdown.
   * Looks for a title in YAML frontmatter first, then falls back to the first `h1` heading.
   * @returns An object with the extracted `title` and the `headingNode` (if found).
   */
  getTitle(): Promise<{
    /** The extracted title string. */
    title: string
    /** The AST heading node, if the title was extracted from a heading. */
    headingNode: any | undefined
  }>
}

/**
 * A helper class for importing notes from Markdown or HTML files.
 *
 * An instance of this class is available as `importUtils` from the `'inkdrop'` module.
 *
 * @example
 * ```typescript
 * import { importUtils } from 'inkdrop'
 * await importUtils.importMarkdownFile('/path/to/note.md', 'book:abc123')
 * ```
 */
export declare class NoteImportHelper {
  /**
   * Create a {@link NoteImporter} processor for the given Markdown string.
   * @param md - The Markdown content to process.
   * @returns A processor instance with the Markdown already parsed.
   */
  getProcessorForMarkdown(md: string): Promise<NoteImporter>

  /**
   * Import a Markdown file as a new note.
   * Extracts the title from the first heading, imports local images as attachments,
   * and saves the note to the specified notebook.
   * @param fn - The path to the Markdown file.
   * @param destBookId - The notebook ID to save the note in.
   * @throws If `destBookId` is not specified.
   */
  importMarkdownFile(fn: string, destBookId: string): Promise<void>

  /**
   * Import an HTML file as a new note.
   * Converts the HTML to Markdown, imports local images as attachments,
   * and saves the note to the specified notebook.
   * @param fn - The path to the HTML file.
   * @param destBookId - The notebook ID to save the note in.
   * @throws If `destBookId` is not specified.
   */
  importHtmlFile(fn: string, destBookId: string): Promise<void>
}
