import { CompositeDisposable, Disposable } from 'event-kit'
import type { EditorView } from '@codemirror/view'
import type { Store } from 'redux'
import type { NotificationManager } from './notification-manager'
import type { Config } from './config'
import type { StyleManager } from './style-manager'
import type { CommandRegistry } from './command-registry'
import type { ComponentManager } from './component-manager'
import type { LayoutManager } from './layout-manager'
import type { KeymapManager } from './keymap-manager'
import type { MenuManager } from './menu-manager'
import type { ContextMenuManager } from './context-menu-manager'
import type { PackageManager } from './package-manager'
import type { ThemeManager } from './theme-manager'
import type { TelescopeManager } from './telescope-manager'
import type { MarkdownRenderer } from './markdown-renderer'
import type { IPCLocalDatabase } from './ipc/db'
import type { IPCWindow } from './ipc/window'
import type { IPCDialog } from './ipc/dialog'
import type { IPCClipboard } from './ipc/clipboard'
import type { ApplicationDelegate } from './application-delegate'

/**
 * The top-level environment object representing the Inkdrop application
 * in the renderer process.
 *
 * An instance of this class is always available as the `inkdrop` global.
 */
export declare class Environment {
  /** The Redux store. Use `store.getState()` and `store.dispatch()` to interact with app state. */
  store: Store<any, any>
  disposables: CompositeDisposable
  /** The application version string. */
  appVersion: string
  /** The IPC window proxy for the current browser window. */
  window: IPCWindow
  /** The type of this window (e.g., `'main'`, `'preferences'`). */
  windowType: string
  /** Query parameters passed to this window. */
  windowParams: Record<string, any>
  /** Whether this is the main application window. */
  isMainWindow: boolean
  /** Whether the environment has finished loading. */
  finishedLoading: boolean
  /** The application delegate for opening URIs and checking for updates. */
  appDelegate: ApplicationDelegate
  /** The notification manager for displaying notifications to the user. */
  notifications: NotificationManager
  /** The configuration manager for getting and setting config values. */
  config: Config
  /** Whether the application is in development mode. */
  devMode: boolean
  /** The path to the application resources. */
  resourcePath: string
  /** The component manager for registering and retrieving React components. */
  components: ComponentManager
  /** The layout manager for managing UI layout regions. */
  layouts: LayoutManager
  /** The style manager for managing stylesheets. */
  styles: StyleManager
  /** The command registry for registering and dispatching commands. */
  commands: CommandRegistry
  /** The keymap manager for managing key bindings. */
  keymaps: KeymapManager
  /** The menu manager for managing the application menu. */
  menu: MenuManager
  /** The context menu manager for managing context menus. */
  contextMenu: ContextMenuManager
  /** The package manager for managing plugins and themes. */
  packages: PackageManager
  /** The theme manager for managing UI and syntax themes. */
  themes: ThemeManager
  /** The telescope fuzzy finder manager. */
  telescope: TelescopeManager
  /** The Markdown renderer for converting Markdown to React elements. */
  markdownRenderer: MarkdownRenderer
  /** The local PouchDB database proxy. */
  localDB: IPCLocalDatabase
  /** The native dialog box proxy. */
  dialog: IPCDialog
  /** The system clipboard proxy. */
  clipboard: IPCClipboard
  /** The path to the user's data directory (e.g., `~/.inkdrop`). */
  userDataPath: string

  /** Whether the editor is currently active and focused. */
  isEditorActive(): boolean
  /**
   * Get the active CodeMirror editor view.
   * @returns The active {@link EditorView}, or `null`/`undefined` if no editor is active.
   */
  getActiveEditor(): EditorView | null | undefined
  /**
   * Get the active CodeMirror editor view, throwing an error if none is active.
   * @throws If no editor is currently active.
   */
  getActiveEditorOrThrowError(): EditorView
  /**
   * Set the active editor.
   * @param editor - The editor view to set as active, or `null` to clear.
   */
  setActiveEditor(editor: EditorView | null): void
  /**
   * Invoke the given callback when the editor is loaded.
   * @param callback - Called with the {@link EditorView} when the editor loads.
   * @returns A {@link Disposable} to unsubscribe.
   */
  onEditorLoad(callback: (editor: EditorView) => any): Disposable
  /**
   * Invoke the given callback when the editor is unloaded.
   * @returns A {@link Disposable} to unsubscribe.
   */
  onEditorUnload(callback: () => any): Disposable
  /**
   * Invoke the given callback when the application is ready.
   * @returns A {@link Disposable} to unsubscribe.
   */
  onAppReady(callback: () => any): Disposable
  /**
   * Invoke the given callback when the application is about to quit.
   * @returns A {@link Disposable} to unsubscribe.
   */
  onAppQuit(callback: () => any): Disposable
  /** Get the exported modules. */
  getExports(): Record<string, any>
}
