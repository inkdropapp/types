export interface TelescopeSourceItem {
  id: string
  /** Displayed at the right side of the item view. */
  type: string
  /**
   * The label to show in the telescope picker. This is what input
   * is matched against to determine whether an item matches (and
   * how well it matches).
   */
  label: string
  /** An optional CSS class to apply to the label element. */
  labelClass?: string
  /**
   * An optional override for the item's visible label. When
   * using this, matched characters will only be highlighted if you
   * provide a `getMatch` function in the result.
   */
  displayLabel?: string
  /** An optional short piece of information to show before the label. */
  prefix?: string
  /** An optional short piece of information to show after the label. */
  detail?: string
  /** The source of the telescope items. */
  source: string
  /**
   * When given, should be a number from -99 to 99 that adjusts how
   * this item is ranked compared to other items. A negative number
   * moves it down the list, a positive number moves it up.
   */
  boost?: number
  /** An optional icon. A string represents an SVG icon. */
  icon?: string | (() => React.ReactNode)
  /** An optional view to display custom information on the right side of the item. */
  accessoryView?: string | (() => React.ReactNode)
  /** Optional actions available for this item. */
  actions?: TelescopeAction[]
}

export interface TelescopeResult {
  /** The list of items to display. */
  options: TelescopeSourceItem[]
  /**
   * By default, the library filters and scores completions. Set
   * `filter` to `false` to disable this, and cause your items
   * to all be included in the order they were given.
   */
  filter?: boolean
  /**
   * When an item has a `displayLabel`,
   * may be provided to compute the ranges on the label that match
   * the input. Should return an array of numbers where each pair of
   * adjacent numbers provide the start and end of a range.
   */
  getMatch?: (
    item: TelescopeSourceItem,
    matched?: readonly number[]
  ) => readonly number[]
}

export interface TelescopeAction {
  type: string
  label: string
  icon?: string
  modifierKeys?: TelescopeModifierKey[]
}

export enum TelescopeModifierKey {
  Alt = 'alt',
  Shift = 'shift',
  Ctrl = 'ctrl',
  Cmd = 'cmd',
  CmdOrCtrl = 'cmd-or-ctrl'
}

export interface TelescopeContext {
  /** The current query text entered by the user. */
  query: string
  /** The DOM element that was focused when the telescope was opened. */
  activeElement: HTMLElement
  /** The scoped workspace ID, if any. */
  workspaceId: string | null
  /** Whether the query has been aborted. */
  readonly aborted: boolean
  /** Register a callback to be called when the query is aborted. */
  addEventListener(type: 'abort', listener: () => void): void
}

/**
 * Base class for implementing a telescope source.
 *
 * Extend this class and register your source with the {@link TelescopeManager}
 * to provide custom items in the telescope fuzzy finder.
 */
export declare abstract class TelescopeSource {
  /** Unique identifier for this source. */
  abstract id: string
  /** Human-readable name for this source. */
  abstract name: string
  /** Description of what this source provides. */
  abstract description: string
  /** Optional alias for prefix matching. */
  defaultAlias?: string

  /** Get the configured or default alias for this source. */
  getAlias(): string | undefined
  /**
   * Search for results.
   * @param context - The current telescope context including query and state.
   */
  abstract getItems(
    context: TelescopeContext
  ): Promise<TelescopeResult> | TelescopeResult
  /**
   * Apply the selected item.
   * @param item - The selected item to apply.
   * @param action - The action type.
   * @returns `true` if the telescope bar should be closed.
   */
  abstract apply(item: TelescopeSourceItem, action: string): boolean
  /** Get the icon for this source. */
  getIcon?(): string | React.ReactNode
  /** Returns `true` if this source is enabled. */
  isEnabled(): boolean
  /** Returns `true` if this source is available in the current context. */
  isAvailable(): boolean
}

/**
 * Telescope is a highly extensible fuzzy finder over a set of various sources,
 * such as commands, notebooks, tags, etc.
 *
 * An instance of this class is always available as the `inkdrop.telescope` global.
 */
export declare class TelescopeManager {
  availableSources: Map<string, TelescopeSource>

  /**
   * Register a new telescope source.
   * @param source - The telescope source to register.
   */
  registerSource(source: TelescopeSource): void
  /**
   * Unregister a telescope source by its ID.
   * @param sourceId - The ID of the source to unregister.
   */
  unregisterSource(sourceId: string): void
  /** Get the built-in index source. */
  getIndexSource(): TelescopeSource
  /**
   * Get a specific source by ID.
   * @param sourceId - The ID of the source.
   */
  getSource(sourceId: string): TelescopeSource | undefined
  /** Get all registered and enabled sources. */
  getAllSources(): TelescopeSource[]
  /** Get all sources that are both enabled and available. */
  getAvailableSources(): TelescopeSource[]
  /**
   * Find the source matching a given prefix (source ID or alias).
   * @param prefix - The prefix to match.
   */
  getActiveSourceForPrefix(prefix: string): TelescopeSource | null
  /**
   * Get items from all sources for the given context.
   * @param context - The telescope context.
   * @returns An array of results from all sources, or `null` on error.
   */
  getSourceItems(
    context: TelescopeContext
  ): Promise<TelescopeResult[] | null>
}
