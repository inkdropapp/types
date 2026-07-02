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
   * Read a theme package's `palette.json` — a map of CSS variable name to color
   * value (e.g. `{ "--page-background": "hsl(192deg 100% 5%)" }`).
   *
   * Stateless: it re-reads the file on each call, so callers that need it
   * repeatedly (e.g. a preview grid) should memoize the result.
   *
   * @param name - The theme package name.
   * @returns The parsed palette, or null if the theme can't be resolved or its
   *   palette is missing/unreadable.
   */
  getThemePalette(name: string): Record<string, string> | null
  /**
   * Get the enabled theme name from the config.
   *
   * @returns The theme name to activate.
   */
  getEnabledThemeName(): string
}
