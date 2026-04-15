import type React from 'react'

/** Props for the {@link NotebookListBar} component. */
export type NotebookListBarProps = {
  /** Placeholder text for the search input. Defaults to `'Search'`. */
  placeholder?: string
  /** Icon name for the search input. Defaults to `'book-close-2'`. */
  icon?: string
  /** Whether to show a "(Root)" option at the top. */
  showRoot?: boolean
  /** Book IDs to hide from the list. */
  hiddenBooks?: string[]
  /**
   * Called when a notebook is selected.
   * @param bookId - The selected book ID, or `null` if "(Root)" was selected.
   */
  onItemSelect: (bookId: string | null) => any
}

/**
 * A searchable notebook list component for selecting a notebook.
 *
 * Available at runtime via `inkdrop.components.classes.NotebookListBar`.
 *
 * @example
 * ```tsx
 * import type { NotebookListBar } from '@inkdropapp/types'
 *
 * const NotebookListBar = inkdrop.components.classes.NotebookListBar as typeof NotebookListBar
 * ```
 */
export type NotebookListBar = React.FC<NotebookListBarProps>
