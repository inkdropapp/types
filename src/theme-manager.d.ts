import { Disposable } from 'event-kit'
import type { Package } from './package-manager'

/**
 * Handles loading and activating available themes.
 *
 * An instance of this class is always available as the `inkdrop.themes` global.
 */
export declare class ThemeManager {
  /**
   * Invoke `callback` when style sheet changes associated with
   * updating the list of active themes have completed.
   * @param callback - Called when active theme changes complete.
   * @returns A {@link Disposable} on which `.dispose()` can be called to unsubscribe.
   */
  onDidChangeActiveThemes(callback: () => void): Disposable
  /** Get all the available theme names. */
  getAvailableNames(): string[]
  /** Get all the loaded theme names. */
  getLoadedThemeNames(): string[]
  /** Get all the loaded themes. */
  getLoadedThemes(): Package[]
  /** Get all the active theme names. */
  getActiveThemeNames(): string[]
  /** Get all the active themes. */
  getActiveThemes(): Package[]
  /**
   * Get the enabled theme names from the config.
   * @returns An array of theme names in the order that they should be activated.
   */
  getEnabledThemeNames(): string[]
}
