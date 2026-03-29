import { Disposable } from 'event-kit'

/** An `HTMLStyleElement` with additional non-standard properties. */
export type StyleElement = HTMLStyleElement & {
  /** The path from which the style element was loaded. */
  sourcePath: string | null | undefined
  /** The target context of the style element. */
  context: string | null | undefined
  /** The priority of the style element for ordering. */
  priority: number | null | undefined
  /** The CSS layer name for the style element. */
  layer: string | null | undefined
}

/**
 * A singleton instance of this class available via `inkdrop.styles`,
 * which you can use to globally query and observe the set of active style sheets.
 */
export declare class StyleManager {
  styleElements: StyleElement[]

  /**
   * Invoke `callback` for all current and future style elements.
   *
   * @param callback - Called with each style element. The `.sheet` property
   *   will be null because this element isn't attached to the DOM. If you want
   *   to attach this element to the DOM, be sure to clone it first by calling
   *   `.cloneNode(true)` on it.
   * @returns A {@link Disposable} on which `.dispose()` can be called to cancel the subscription.
   */
  observeStyleElements(
    callback: (styleElement: StyleElement) => void
  ): Disposable
  /**
   * Invoke `callback` when a style element is added.
   * @returns A {@link Disposable} on which `.dispose()` can be called to cancel the subscription.
   */
  onDidAddStyleElement(
    callback: (styleElement: StyleElement) => void
  ): Disposable
  /**
   * Invoke `callback` when a style element is removed.
   * @returns A {@link Disposable} on which `.dispose()` can be called to cancel the subscription.
   */
  onDidRemoveStyleElement(
    callback: (styleElement: StyleElement) => void
  ): Disposable
  /**
   * Invoke `callback` when an existing style element is updated.
   * @returns A {@link Disposable} on which `.dispose()` can be called to cancel the subscription.
   */
  onDidUpdateStyleElement(
    callback: (styleElement: StyleElement) => void
  ): Disposable
  /** Get all loaded style elements. */
  getStyleElements(): StyleElement[]
  /**
   * Add a style sheet.
   *
   * @param source - The CSS source string.
   * @param params - Optional parameters.
   * @param params.sourcePath - The file path from which the style sheet was loaded.
   * @param params.context - The target context (e.g., 'inkdrop-preview').
   * @param params.priority - A number controlling insertion order.
   * @param params.layer - The CSS layer name.
   * @returns A {@link Disposable} on which `.dispose()` can be called to remove the style sheet.
   */
  addStyleSheet(
    source: string,
    params?: {
      sourcePath?: string
      context?: string
      priority?: number
      layer?: string
    }
  ): Disposable
  /**
   * Get the path of the user style sheet in the config directory.
   * @returns The path string.
   */
  getUserStyleSheetPath(): string
}
