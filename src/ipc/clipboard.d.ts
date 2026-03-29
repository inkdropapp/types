/**
 * Provides access to the system clipboard via IPC.
 *
 * An instance of this class is always available as the `inkdrop.clipboard` global.
 */
export declare class IPCClipboard {
  /** Read the clipboard as plain text. */
  readText(): string
  /** Write plain text to the clipboard. */
  writeText(text: string): void
  /** Read the clipboard as HTML. */
  readHTML(): string
  /** Read the clipboard image as a data URL. */
  readImageAsDataURL(): Promise<string | null>
  /** Write an image (as a data URL) to the clipboard. */
  writeImage(dataUrl: string): Promise<void>
  /** Get the available clipboard formats. */
  availableFormats(): string[]
  /** Write data to the clipboard in multiple formats. */
  write(data: { text?: string; html?: string }): void
  /**
   * Save the clipboard image as a file attachment.
   * @param options - Options for sharing the attachment.
   * @returns The file attachment ID, or `null` if no image was on the clipboard.
   */
  saveAsImageAttachment(options: {
    publicIn?: string[]
  }): Promise<string | null>
}
