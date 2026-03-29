export {
  Notification,
  NotificationManager,
  NotificationType,
  NotificationButton,
  NotificationOptions
} from './notification-manager'

export {
  Config,
  ConfigSchema,
  SchemaEnforcer
} from './config'

export {
  StyleManager,
  StyleElement
} from './style-manager'

export {
  CommandRegistry,
  CommandDescriptor,
  CommandCallback,
  CommandListener,
  CommandParamListBase,
  CommandMap
} from './command-registry'

export { ComponentManager } from './component-manager'

export {
  KeymapManager,
  KeyBinding
} from './keymap-manager'

export {
  MenuManager,
  MenuItem
} from './menu-manager'

export {
  ContextMenuManager,
  ContextMenuItem
} from './context-menu-manager'

export { LayoutManager } from './layout-manager'

export {
  PackageManager,
  Package,
  PackageMetadata
} from './package-manager'

export { ThemeManager } from './theme-manager'

export {
  TelescopeManager,
  TelescopeSource,
  TelescopeSourceItem,
  TelescopeResult,
  TelescopeContext,
  TelescopeAction,
  TelescopeModifierKey
} from './telescope-manager'

export {
  MarkdownRenderer,
  MarkdownRenderResult
} from './markdown-renderer'

export {
  IPCLocalDatabase,
  IDBNote,
  IDBBook,
  IDBTag,
  IDBFile,
  IDBUtils,
  PouchDBPutResult,
  NoteQueryOptions,
  NoteQueryResult
} from './ipc/db'

export { IPCWindow } from './ipc/window'
export { IPCDialog } from './ipc/dialog'
export { IPCClipboard } from './ipc/clipboard'

export { ApplicationDelegate } from './application-delegate'

export { Environment } from './environment'

export {
  EditorViewMode,
  EnvironmentCommands,
  WindowCommands,
  ApplicationCommands,
  MDECommands,
  MDELocalCommands,
  FindInNoteGlobalCommands,
  FindInNoteOnEditorLocalCommands,
  FindInNoteOnPreviewLocalCommands,
  MDEPreviewCommands,
  MDEPreviewLocalCommands,
  EditorCommands,
  NoteListBarLayoutCommands,
  SidebarNavigationCommands,
  SidebarMenuCommands,
  SidebarMenuLocalCommands,
  SideBarMenuItemCommands,
  SidebarWorkspaceMenuCommands,
  SidebarWorkspaceMenuLocalCommands,
  NoteListSearchBarCommands,
  EditorDrawerCommands,
  MDESearchBarLocalCommands,
  PreviewFindBarLocalCommands,
  MainLayoutCommands,
  NoteListBarCommands
} from './commands'

export {
  Logger,
  LogFunction,
  createLogger
} from './inkdrop-module/logger'

export {
  useModal,
  UseModalResult,
  ModalState
} from './inkdrop-module/use-modal'

export {
  ModelNote,
  ModelBook,
  ModelTag,
  ModelFile,
  Models,
  PutResult
} from './inkdrop-module/models'

export {
  NoteExporter,
  NoteExportHelper,
  RenderOptions
} from './inkdrop-module/export-utils'

export {
  NoteImporter,
  NoteImportHelper
} from './inkdrop-module/import-utils'

/// <reference path="./inkdrop-module/index.d.ts" />

import type { Environment } from './environment'

declare global {
  var inkdrop: Environment
}
