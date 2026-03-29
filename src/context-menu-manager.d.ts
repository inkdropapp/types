import { Disposable } from 'event-kit'

/** Describes a single item in a context menu. */
export interface ContextMenuItem {
  /** The menu label string. */
  label?: string
  /** An optional command string to trigger on right-click target. */
  command?: string
  /** Additional data to pass with the command event. */
  commandDetail?: unknown
  /** Whether the item should be clickable. Defaults to `true`. */
  enabled?: boolean
  /** Whether the item should appear. Defaults to `true`. */
  visible?: boolean
  /** Use `'separator'` to create a separator. */
  type?: string
  /** An optional array of additional items. */
  submenu?: ContextMenuItem[]
  /** Whether this item only appears in dev mode. */
  devMode?: boolean
  /** A function called each time the context menu is created. */
  created?: (event: Event) => void
  /** A function to determine whether to display this item. */
  shouldDisplay?: (event: Event) => boolean
  /** The keyboard accelerator string. */
  accelerator?: string | null
}

/**
 * Provides a registry for commands that you'd like to appear in the
 * context menu.
 *
 * An instance of this class is always available as the `inkdrop.contextMenu` global.
 */
export declare class ContextMenuManager {
  /**
   * Add context menu items scoped by CSS selectors.
   *
   * @param itemsBySelector - An object whose keys are CSS selectors and whose
   *   values are arrays of menu item objects.
   * @returns A {@link Disposable} on which `.dispose()` can be called to remove the
   *   added menu items.
   */
  add(itemsBySelector: Record<string, ContextMenuItem[]>): Disposable
  /**
   * Generate a context menu template for the given DOM element.
   * @param target - The DOM element to generate the template for.
   */
  templateForElement(target: Element): ContextMenuItem[]
  /**
   * Generate a context menu template for the given event.
   * @param event - The event to generate the template for.
   */
  templateForEvent(event: Event): ContextMenuItem[]
}
