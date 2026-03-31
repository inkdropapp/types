import type { EditorView } from '@codemirror/view'

/**
 * Utility functions for interacting with the editor and preview pane.
 */
export interface EditorUtils {
  /**
   * Get the preview container element.
   *
   * @returns The preview container element, or `null` if not found.
   */
  getPreviewContainer(): HTMLElement | null

  /**
   * Get the line number from the scroll position in the editor.
   *
   * @param cm - The CodeMirror EditorView instance.
   * @returns The line number, or `null` if it cannot be determined.
   */
  getLineNumFromScroll(cm: EditorView): number | null

  /**
   * Get the line number corresponding to the current scroll position in the preview container.
   *
   * @param container - The preview container element. Defaults to the result of `getPreviewContainer()`.
   * @returns The line number, or `null` if it cannot be determined.
   */
  getLinePosOnPreview(container?: HTMLElement | null): number | null
}
