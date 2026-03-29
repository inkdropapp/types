import { Disposable } from 'event-kit'

/**
 * Provides access to the Electron BrowserWindow via IPC.
 *
 * An instance of this class is always available as the `inkdrop.window` global.
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
  stopFindInPage(
    action: 'clearSelection' | 'keepSelection' | 'activateSelection'
  ): Promise<void>
}
