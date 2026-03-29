/**
 * Provides access to native dialog boxes via IPC.
 *
 * An instance of this class is always available as the `inkdrop.dialog` global.
 */
export declare class IPCDialog {
  /**
   * Show a message box dialog.
   * @param options - Dialog options.
   * @returns The button index that was clicked and the checkbox state.
   */
  showMessageBox(options: {
    type?: string
    buttons?: string[]
    title?: string
    message?: string
    detail?: string
    cancelId?: number
    defaultId?: number
    normalizeAccessKeys?: boolean
    noLink?: boolean
    checkboxLabel?: string
    checkboxChecked?: boolean
  }): Promise<{ response: number; checkboxChecked: boolean }>

  /**
   * Show an open file dialog.
   * @param options - Dialog options.
   * @returns Whether the dialog was canceled and the selected file paths.
   */
  showOpenDialog(options: {
    title?: string
    defaultPath?: string
    buttonLabel?: string
    filters?: Array<{ name: string; extensions: string[] }>
    properties?: string[]
    message?: string
  }): Promise<{ canceled: boolean; filePaths: string[] }>

  /**
   * Show a save file dialog.
   * @param options - Dialog options.
   * @returns Whether the dialog was canceled and the selected file path.
   */
  showSaveDialog(options: {
    title?: string
    defaultPath?: string
    buttonLabel?: string
    filters?: Array<{ name: string; extensions: string[] }>
    message?: string
  }): Promise<{ canceled: boolean; filePath?: string }>
}
