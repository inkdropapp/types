import { Disposable } from 'event-kit'

/** Options for {@link IPCWindow.setVisibleOnAllWorkspaces}. */
export interface VisibleOnAllWorkspacesOptions {
  /** Whether the window is visible above fullscreen windows. macOS only. */
  visibleOnFullScreen?: boolean
  /**
   * Skips transforming the process type between `UIElementApplication` and
   * `ForegroundApplication`, which otherwise hides the window and the dock for
   * a short time on every call. Only safe when the app is already a
   * `UIElementApplication`. macOS only.
   */
  skipTransformProcessType?: boolean
}

/**
 * Provides access to the Electron BrowserWindow via IPC.
 *
 * Available as `env.window` in your plugin's `activate(env: Environment)` method.
 */
export declare class IPCWindow {
  /** The browser window ID. */
  id: number

  /**
   * Subscribe to trackpad swipe events.
   * @param callback - Called with the swipe direction.
   * @returns A {@link Disposable} to unsubscribe.
   */
  onSwipe(callback: (direction: string) => void): Disposable
  /**
   * Subscribe to app command events (Windows only).
   * @param callback - Called with the command string.
   * @returns A {@link Disposable} to unsubscribe.
   */
  onAppCommand(callback: (cmd: string) => void): Disposable
  /** Subscribe to window maximize events. */
  onMaximize(callback: () => void): Disposable
  /** Subscribe to window unmaximize events. */
  onUnmaximize(callback: () => void): Disposable
  /** Subscribe to window focus events. */
  onFocus(callback: () => void): Disposable
  /** Subscribe to window blur events. */
  onBlur(callback: () => void): Disposable
  /** Subscribe to window close events. */
  onClose(callback: () => void): Disposable
  /** Close the window. */
  close(): Promise<void>
  /** Get the window size. */
  getSize(): Promise<{ width: number; height: number }>
  /** Get the display scale factor. */
  getDisplayScaleFactor(): Promise<number>
  /** Set the window size. */
  setSize(width: number, height: number): Promise<void>
  /** Get the window position. */
  getPosition(): Promise<{ x: number; y: number }>
  /** Set the window position. */
  setPosition(x: number, y: number): Promise<void>
  /** Center the window on the screen. */
  center(): Promise<void>
  /** Focus the window. */
  focus(): Promise<void>
  /** Show the window. */
  show(): Promise<void>
  /** Hide the window. */
  hide(): Promise<void>
  /** Reload the window. */
  reload(): Promise<void>
  /** Minimize the window. */
  minimize(): Promise<void>
  /** Set the minimum window size. */
  setMinimumSize(width: number, height: number): Promise<void>
  /** Check whether the window is maximized. */
  isMaximized(): Promise<boolean>
  /** Maximize the window. */
  maximize(): Promise<void>
  /** Unmaximize the window. */
  unmaximize(): Promise<void>
  /** Check whether the window is in full-screen mode. */
  isFullScreen(): Promise<boolean>
  /** Set the window full-screen state. */
  setFullScreen(fullScreen: boolean): Promise<void>
  /** Check whether the window is floating on top of other windows. */
  isAlwaysOnTop(): Promise<boolean>
  /** Set whether the window floats on top of other windows. */
  setAlwaysOnTop(alwaysOnTop: boolean): Promise<void>
  /** Check whether the window is visible on all workspaces. */
  isVisibleOnAllWorkspaces(): Promise<boolean>
  /**
   * Set whether the window is visible on all workspaces.
   * @param visible - Whether the window shows on every workspace.
   * @param options - Extra macOS-only behavior.
   */
  setVisibleOnAllWorkspaces(
    visible: boolean,
    options?: VisibleOnAllWorkspacesOptions
  ): Promise<void>
  /** Get the window opacity, between `0.0` and `1.0`. Always `1` on Linux. */
  getOpacity(): Promise<number>
  /**
   * Set the window opacity.
   * @param opacity - Between `0.0` (fully transparent) and `1.0` (fully opaque). Does nothing on Linux.
   */
  setOpacity(opacity: number): Promise<void>
  /** Open the developer tools. */
  openDevTools(): Promise<void>
  /** Close the developer tools. */
  closeDevTools(): Promise<void>
  /** Toggle the developer tools. */
  toggleDevTools(): Promise<void>
  /** Set the menu bar visibility. */
  setMenuBarVisibility(visible: boolean): Promise<void>
  /**
   * Start a find-in-page request.
   * @param text - The text to search for.
   * @param options - Electron FindInPageOptions.
   * @returns The request ID, or `undefined`.
   */
  findInPage(text: string, options?: any): Promise<number | undefined>
  /**
   * Stop a find-in-page request.
   * @param action - What to do with the selection after stopping.
   */
  stopFindInPage(action: 'clearSelection' | 'keepSelection' | 'activateSelection'): Promise<void>
}
