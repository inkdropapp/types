import { Disposable } from 'event-kit'

/** Describes a single menu item in the application menu. */
export interface MenuItem {
  /** The menu label string. */
  label?: string
  /** An optional array of sub menu items. */
  submenu?: MenuItem[]
  /** An optional command string to trigger when clicked. */
  command?: string
  /** Whether the item should be clickable. */
  enabled?: boolean
  /** Whether the item should appear. */
  visible?: boolean
  /** The type of the menu item (e.g., `'separator'`). */
  type?: string
  /** The keyboard accelerator string. */
  accelerator?: string
  /** Additional data to pass with the command event. */
  commandDetail?: unknown
  /** Item IDs that this item should appear before. */
  before?: string[]
  /** Item IDs that this item should appear after. */
  after?: string[]
  /** Group-containing item IDs that this item should appear before. */
  beforeGroupContaining?: string[]
  /** Group-containing item IDs that this item should appear after. */
  afterGroupContaining?: string[]
}

/**
 * Provides a registry for menu items that you'd like to appear in the
 * application menu.
 *
 * An instance of this class is always available as the `inkdrop.menu` global.
 */
export declare class MenuManager {
  /**
   * Adds the given items to the application menu.
   *
   * @param items - An array of menu item objects.
   * @returns A {@link Disposable} on which `.dispose()` can be called to remove the
   *   added menu items.
   */
  add(items: MenuItem[]): Disposable
  /** Refreshes the currently visible menu. */
  update(): void
}
