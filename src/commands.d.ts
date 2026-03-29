import type { LanguageDescription } from '@codemirror/language'
import type { Extension } from '@codemirror/state'
import type { NoteStatus } from 'inkdrop-model'

/** Editor view mode. */
export type EditorViewMode = 'preview' | 'sideBySide' | 'edit'

/** Commands dispatched on the {@link Environment} (global scope). */
export type EnvironmentCommands = {
  'core:update-available': any
  'core:update-download-progress': any
  'core:update-downloaded': any
  'core:update-error': string
  'core:popup-app-menu': undefined
  'core:new-note': undefined
  'core:new-note-in-separate-window': undefined
  'core:close-note': undefined
  'core:open-note': {
    noteId: string
    revision?: string
    selectInNoteListBar?: boolean
    pushState?: boolean
    newWindow?: boolean
    viewMode?: EditorViewMode
  }
  'core:navigate': {
    direction: 'back' | 'forward'
  }
  'core:navigate-back': undefined
  'core:navigate-forward': undefined
  'core:copy-image': undefined
  'core:save-image': undefined
  'core:open-note-in-separate-window': {
    noteId?: string | string[]
    revision?: string
    viewMode?: EditorViewMode
  }
  'core:copy-note-link': {
    noteId?: string | string[]
  }
  'core:copy-note-uri': {
    noteId?: string | string[]
  }
  'core:duplicate-note': {
    noteId?: string | string[]
  }
  'core:delete-note': {
    noteId?: string | string[]
  }
  'core:pin-note-to-top': {
    noteId?: string | string[]
    pinned?: boolean
  }
  'core:activate-package': {
    name: string
  }
  'core:deactivate-package': {
    name: string
  }
  'core:unload-package': {
    name: string
  }
  'core:reload-package': {
    name: string
  }
  'core:activate-themes': undefined
  'core:reload-package-updates': undefined
}

/** Commands dispatched on the window scope. */
export type WindowCommands = {
  'window:reload': undefined
  'window:toggle-dev-tools': undefined
  'window:close': undefined
  'window:toggle-full-screen': undefined
  'window:increase-font-size': undefined
  'window:decrease-font-size': undefined
  'window:context-menu': {
    menuTemplate: any[]
    options?: any
  }
  'window:new-inkdrop-window': undefined
}

/** Commands dispatched on the application scope. */
export type ApplicationCommands = {
  'application:quit': undefined
  'application:logout': undefined
  'application:open-website': undefined
  'application:open-website-signup': undefined
  'application:view-help': undefined
  'application:view-api-doc': undefined
  'application:report-issue': undefined
  'application:show-credits': undefined
  'application:open-preferences': undefined
  'application:inspect': undefined
  'application:bring-all-windows-to-front': undefined
  'application:hide': undefined
  'application:hide-other-applications': undefined
  'application:minimize': undefined
  'application:cycle-through-windows': undefined
  'application:unhide-all-applications': undefined
  'application:zoom': undefined
  'application:about': undefined
  'application:quick-note': undefined
  'application:display-access-key': undefined
}

/** Commands dispatched on the Markdown editor (global). */
export type MDECommands = {
  'editor:focus-mde': undefined
  'editor:refresh': undefined
  'editor:set-doc': {
    body: string
  }
  'editor:scroll-editor-to-line': {
    line: number
  }
  'editor:sync-editor-scroll': undefined
  'editor:save-editor-scroll': undefined
  'editor:toggle-line-numbers': undefined
  'editor:toggle-line-wrapping': undefined
  'editor:toggle-readable-line-length': undefined
  'editor:add-code-language': {
    lang: LanguageDescription
  }
  'editor:remove-code-language': {
    name: string
  }
  'editor:add-extension': {
    extension: Extension
  }
  'editor:remove-extension': {
    extension: Extension
  }
  'editor:add-markdown-extension': {
    extension: any
  }
  'editor:remove-markdown-extension': {
    extension: any
  }
  'editor:add-slash-commands': {
    commands: any
  }
  'editor:remove-slash-commands': {
    commands: any
  }
}

/** Commands dispatched locally on the Markdown editor (CodeMirror). */
export type MDELocalCommands = {
  'core:undo': undefined
  'core:redo': undefined
  'core:paste-as-plain-text': undefined
  'core:toggle-bulleted-list': undefined
  'core:toggle-numbered-list': undefined
  'core:toggle-task-list': undefined
  'core:toggle-blockquote': undefined
  'core:toggle-heading-1': undefined
  'core:toggle-heading-2': undefined
  'core:toggle-heading-3': undefined
  'core:toggle-heading-4': undefined
  'core:toggle-heading-smaller': undefined
  'core:toggle-heading-bigger': undefined
  'core:strong': undefined
  'core:emphasize': undefined
  'core:strikethrough': undefined
  'core:toggle-inline-code': {
    selectionOnly: boolean
  }
  'core:toggle-inline-mark-tag': undefined
  'core:insert-horizontal-rule': undefined
  'core:insert-code-block': undefined
  'core:insert-link': undefined
  'core:insert-image': undefined
  'core:indent': undefined
  'core:unindent': undefined
  'core:insert-alert': {
    type: string
  }
  'core:insert-alert-note': undefined
  'core:insert-alert-tip': undefined
  'core:insert-alert-important': undefined
  'core:insert-alert-warning': undefined
  'core:insert-alert-caution': undefined
  'editor:select-lines-upward': undefined
  'editor:select-lines-downward': undefined
  'editor:new-line': undefined
  'editor:indent': undefined
  'editor:unindent': undefined
  'editor:go-char-left': undefined
  'editor:go-char-right': undefined
  'editor:go-syntax-left': undefined
  'editor:go-syntax-right': undefined
  'editor:go-group-left': undefined
  'editor:go-group-right': undefined
  'editor:go-line-up': undefined
  'editor:go-line-down': undefined
  'editor:go-line-start': undefined
  'editor:go-line-end': undefined
  'editor:go-line-left': undefined
  'editor:go-line-right': undefined
  'editor:go-page-up': undefined
  'editor:go-page-down': undefined
  'editor:go-doc-start': undefined
  'editor:go-doc-end': undefined
  'editor:select-char-left': undefined
  'editor:select-char-right': undefined
  'editor:select-syntax-left': undefined
  'editor:select-syntax-right': undefined
  'editor:select-group-left': undefined
  'editor:select-group-right': undefined
  'editor:select-line-up': undefined
  'editor:select-line-down': undefined
  'editor:select-line-end': undefined
  'editor:select-line-start': undefined
  'editor:select-line-left': undefined
  'editor:select-line-right': undefined
  'editor:select-page-up': undefined
  'editor:select-page-down': undefined
  'editor:select-doc-start': undefined
  'editor:select-doc-end': undefined
  'editor:delete-char-after': undefined
  'editor:delete-char-before': undefined
  'editor:select-all': undefined
  'editor:delete-line': undefined
  'editor:delete-group-before': undefined
  'editor:delete-group-after': undefined
  'editor:delete-wrapped-line-left': undefined
  'editor:delete-wrapped-line-right': undefined
  'editor:move-line-up': undefined
  'editor:move-line-down': undefined
  'editor:undo-selection': undefined
  'editor:redo-selection': undefined
  'editor:indent-less': undefined
  'editor:indent-more': undefined
  'editor:delete-word-after': undefined
  'editor:delete-word-before': undefined
  'editor:kill-line': undefined
  'editor:transpose-chars': undefined
  'editor:open-line': undefined
  'editor:toggle-overwrite': undefined
  'editor:single-selection': undefined
  'editor:toggle-task-list': {
    line: number
    checked: boolean
  }
  'editor:jump-to-line': {
    line: number
  }
  'editor:replace-selection': {
    text: string
  }
  'editor:new-table-row-and-continue': undefined
  'editor:move-to-next-table-cell': undefined
  'editor:move-to-previous-table-cell': undefined
  'editor:open-link': undefined
  'editor:copy-link': undefined
  'editor:start-completion': undefined
  'editor:close-completion': undefined
  'editor:accept-completion': undefined
  'editor:move-completion-selection-up': undefined
  'editor:move-completion-selection-down': undefined
  'editor:move-completion-selection-page-up': undefined
  'editor:move-completion-selection-page-down': undefined

  'table-editor:select-cell': undefined
  'table-editor:next-cell': undefined
  'table-editor:previous-cell': undefined
  'table-editor:next-row': undefined
  'table-editor:escape': undefined
  'table-editor:move-left': undefined
  'table-editor:move-right': undefined
  'table-editor:move-up': undefined
  'table-editor:move-down': undefined
  'table-editor:align-left': undefined
  'table-editor:align-right': undefined
  'table-editor:align-center': undefined
  'table-editor:align-none': undefined
  'table-editor:move-row-up': undefined
  'table-editor:move-row-down': undefined
  'table-editor:move-column-left': undefined
  'table-editor:move-column-right': undefined
  'table-editor:delete-column': undefined
  'table-editor:delete-row': undefined
  'table-editor:format': undefined
  'table-editor:format-all': undefined
  'table-editor:insert-column': undefined
  'table-editor:insert-row': undefined
}

/** Global find-in-note commands. */
export type FindInNoteGlobalCommands = {
  'editor:find': undefined
  'editor:find-next': undefined
  'editor:find-prev': undefined
  'editor:replace': undefined
  'editor:clear-find': {
    focus?: boolean
  }
  'editor:find-text': {
    text: string
    parseAsQuery?: boolean
  }
}

/** Find-in-note commands dispatched locally on the editor. */
export type FindInNoteOnEditorLocalCommands = {
  'editor:find': undefined
  'editor:find-next': undefined
  'editor:find-prev': undefined
  'editor:replace': undefined
  'editor:replace-next': undefined
  'editor:replace-all': undefined
  'editor:clear-find': {
    focus?: boolean
  }
  'editor:find-text': {
    text: string
    parseAsQuery?: boolean
  }
}

/** Find-in-note commands dispatched locally on the preview. */
export type FindInNoteOnPreviewLocalCommands = {
  'editor:find': undefined
  'editor:find-next': undefined
  'editor:find-prev': undefined
  'editor:clear-find': {
    focus?: boolean
  }
  'editor:find-text': {
    text: string
  }
}

/** Commands dispatched on the Markdown preview. */
export type MDEPreviewCommands = {
  'editor:focus-preview': undefined
  'editor:scroll-preview-to-line': {
    line: number
  }
  'editor:sync-preview-scroll': undefined
  'editor:save-preview-scroll': undefined
  'core:preview-render': undefined
  'core:copy-link-address': undefined
  'core:copy-preview-selection': undefined
  'core:new-note-from-link': {
    title: string
    line: number
    newWindow?: boolean
  }
}

/** Commands dispatched locally on the Markdown preview. */
export type MDEPreviewLocalCommands = {
  'window:increase-font-size': undefined
  'window:decrease-font-size': undefined
}

/** Commands dispatched on the editor component. */
export type EditorCommands = {
  'view:show-editor': undefined
  'view:show-preview': undefined
  'view:show-side-by-side': undefined
  'view:toggle-preview': undefined
  'view:toggle-side-by-side': undefined
  'core:save-note': undefined
  'editor:insert-images': {
    pos: number
    files: FileList | File[] | string[]
    dataUrl?: string
  }
  'editor:insert-text': {
    text: string
    selection?: {
      anchor: number
      head?: number
    }
  }
  'editor:focus': undefined
  'editor:show-notes-in-book-of-editing-note': undefined
  'editor:go-to-workspace-of-editing-note': undefined
  'editor:change-note-status-none': undefined
  'editor:change-note-status-active': undefined
  'editor:change-note-status-onhold': undefined
  'editor:change-note-status-completed': undefined
  'editor:change-note-status-dropped': undefined
  'editor:toggle-limit-max-width': undefined
}

/** Commands dispatched on the note list bar layout. */
export type NoteListBarLayoutCommands = {
  'core:open-first-note': undefined
  'core:note-list-show-all-notes': {
    selectFirstNote?: boolean
  }
  'core:note-list-show-pinned-notes': {
    selectFirstNote?: boolean
  }
  'core:note-list-show-notes-in-book': {
    bookId: string
    tagId?: string
    status?: NoteStatus
    selectFirstNote?: boolean
    includeChildren?: boolean
    callback?: () => void
  }
  'core:note-list-show-notes-in-trash': {
    selectFirstNote?: boolean
    callback?: () => void
  }
  'core:note-list-show-notes-with-tag': {
    tagId: string
    selectFirstNote?: boolean
  }
  'core:note-list-show-notes-with-status': {
    status: string
    selectFirstNote?: boolean
  }
  'core:find-global': {
    focus?: boolean
  }
}

/** Commands dispatched on the sidebar navigation. */
export type SidebarNavigationCommands = {
  'core:sidebar-open-workspace-menu': {
    bookId?: string
    selectFirstNote?: boolean
  }
  'core:sidebar-hide-workspace-menu': undefined
}

/** Commands dispatched on the sidebar menu. */
export type SidebarMenuCommands = {
  'core:sidebar-focus': undefined
  'core:sidebar-select-prev-item': undefined
  'core:sidebar-select-next-item': undefined
}

/** Commands dispatched locally on the sidebar menu. */
export type SidebarMenuLocalCommands = {
  'core:sidebar-disclose-item': undefined
  'core:sidebar-expand-item': undefined
  'core:sidebar-collapse-item': undefined
  'core:sidebar-scroll-to-selection': undefined
}

/** Commands dispatched on a sidebar menu item. */
export type SideBarMenuItemCommands = {
  'core:sidebar-select-item': undefined
  'core:sidebar-disclose-item': undefined
  'core:sidebar-expand-item': undefined
  'core:sidebar-collapse-item': undefined
}

/** Commands dispatched on the sidebar workspace menu. */
export type SidebarWorkspaceMenuCommands = {
  'core:sidebar-focus': undefined
  'core:sidebar-select-prev-item': undefined
  'core:sidebar-select-next-item': undefined
}

/** Commands dispatched locally on the sidebar workspace menu. */
export type SidebarWorkspaceMenuLocalCommands = {
  'core:sidebar-workspace-go-up': undefined
  'core:sidebar-disclose-item': undefined
  'core:sidebar-expand-item': undefined
  'core:sidebar-collapse-item': undefined
  'core:sidebar-scroll-to-selection': undefined
}

/** Commands dispatched on the note list search bar. */
export type NoteListSearchBarCommands = {
  'core:find': undefined
  'core:find-focus': undefined
  'core:find-clear': undefined
  'core:filter-by-tag': {
    tagId?: string
    clearOtherKeywords?: boolean
  }
  'core:search-notes': {
    keyword: string
  }
  'core:filter-notes': {
    keyword: string
  }
}

/** Commands dispatched on the editor drawer. */
export type EditorDrawerCommands = {
  'core:toggle-editor-drawer': undefined
  'core:show-editor-drawer': undefined
  'core:close-editor-drawer': undefined
}

/** Commands dispatched locally on the editor search bar. */
export type MDESearchBarLocalCommands = {
  'editor:toggle-regex': undefined
  'editor:toggle-case-sensitive': undefined
  'editor:clear-find': undefined
}

/** Commands dispatched locally on the preview find bar. */
export type PreviewFindBarLocalCommands = {
  'editor:clear-find': undefined
}

/** Commands dispatched on the main layout. */
export type MainLayoutCommands = {
  'view:toggle-distraction-free': undefined
  'view:toggle-sidebar': undefined
}

/** Commands dispatched on the note list bar. */
export type NoteListBarCommands = {
  'core:focus-note-list-bar': undefined
  'core:open-next-note': undefined
  'core:open-prev-note': undefined
}
