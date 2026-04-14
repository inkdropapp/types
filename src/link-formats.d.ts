/**
 * A single link format option shown in the paste-link completion menu.
 */
export interface LinkFormatItem {
  /**
   * Display position in the completion menu (lower = closer to top).
   * Use multiples of 100 so plugins can slot in between.
   * Built-in values: bare=0, emptyText=300, brackets=400.
   */
  order?: number
  /** Markdown content to insert. */
  content: string
  /** Hint shown alongside the label in the menu. */
  detail?: string
  /** Error message if async fetch failed. */
  error?: string | null
  /** Display name shown in the menu. */
  label: string
  /** Whether this item is still loading async data. */
  loading?: boolean
  /** Cursor placement after insertion (offsets relative to inserted text start). */
  selection?: { anchor: number; head?: number }
  /** Unique identifier, e.g. 'bare', 'withTitle', 'emptyText', 'brackets'. */
  type: string
}

/**
 * Configuration for a link format provider, supplied via the
 * `linkFormatsConfig` facet available from `import { editor } from 'inkdrop'`.
 */
export type LinkFormatsConfig = {
  /** Return the initial set of formats for a given URL (sync). */
  getInitialFormats?: (url: string) => LinkFormatItem[]
  /**
   * Called when the paste-link menu activates.
   * Start async work here (page title fetch, GitHub snippet, etc.)
   * and call `update` with the full updated format list whenever new data arrives.
   * Return a cleanup function to abort pending work.
   */
  onActivate?: (
    url: string,
    update: (formats: LinkFormatItem[]) => void
  ) => () => void
}
