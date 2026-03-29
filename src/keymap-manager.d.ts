import { Disposable } from 'event-kit'

/** Represents a single key binding entry. */
export interface KeyBinding {
  /** The command to execute when the binding is matched. */
  command: string
  /** The keystroke string (e.g., `'cmd-s'`, `'ctrl-shift-f'`). */
  keystrokes: string
  /** The CSS selector that determines where this binding is active. */
  selector: string
  /** The source that registered the binding. */
  source?: string
  /** The priority of the binding for conflict resolution. */
  priority?: number
}

/**
 * Allows you to associate key bindings with commands.
 *
 * An instance of this class is always available as the `inkdrop.keymaps` global.
 */
export declare class KeymapManager {
  /**
   * Invoke the given callback when a keymap binding is matched.
   * @param callback - Called with the matched binding details.
   * @returns A {@link Disposable} on which `.dispose()` can be called to unsubscribe.
   */
  onDidMatchBinding(
    callback: (event: {
      keystrokes: string
      binding: KeyBinding
      keyboardEventTarget: HTMLElement
    }) => void
  ): Disposable

  /**
   * Invoke the given callback when keystrokes partially match a binding.
   * @param callback - Called with the partially matched bindings.
   * @returns A {@link Disposable} on which `.dispose()` can be called to unsubscribe.
   */
  onDidPartiallyMatchBindings(
    callback: (event: {
      keystrokes: string
      partiallyMatchedBindings: KeyBinding[]
      keyboardEventTarget: HTMLElement
    }) => void
  ): Disposable

  /**
   * Invoke the given callback when keystrokes fail to match any binding.
   * @param callback - Called with the failed keystroke details.
   * @returns A {@link Disposable} on which `.dispose()` can be called to unsubscribe.
   */
  onDidFailToMatchBinding(
    callback: (event: {
      keystrokes: string
      keyboardEventTarget: HTMLElement
    }) => void
  ): Disposable

  /**
   * Add sets of key bindings grouped by CSS selector.
   *
   * @param source - A string identifying the source (e.g., a package name).
   * @param bindings - An object whose keys are CSS selectors and whose values
   *   are objects mapping keystrokes to commands.
   * @param priority - An optional priority for conflict resolution.
   */
  build(
    source: string,
    bindings: Record<string, Record<string, string>>,
    priority?: number
  ): void
  /**
   * Add sets of key bindings grouped by CSS selector.
   *
   * @param source - A string identifying the source (e.g., a package name).
   * @param bindings - An object whose keys are CSS selectors and whose values
   *   are objects mapping keystrokes to commands.
   * @param priority - An optional priority for conflict resolution.
   */
  add(
    source: string,
    bindings: Record<string, Record<string, string>>,
    priority?: number
  ): void
  /**
   * Get all registered key bindings.
   * @returns An array of {@link KeyBinding} objects.
   */
  getKeyBindings(): KeyBinding[]
  /**
   * Find key bindings matching the given query parameters.
   *
   * @param params - Query parameters for filtering key bindings.
   * @param params.keystrokes - A keystroke string to match.
   * @param params.command - A command name to match.
   * @param params.target - A DOM element to match against selectors.
   * @returns An array of matching {@link KeyBinding} objects.
   */
  findKeyBindings(params: {
    keystrokes?: string
    command?: string
    target?: HTMLElement | null
  }): KeyBinding[]
}
