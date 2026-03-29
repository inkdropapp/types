/**
 * Handles application-level actions such as opening URIs and checking for updates.
 *
 * An instance of this class is always available as the `inkdrop.appDelegate` global.
 */
export declare class ApplicationDelegate {
  /**
   * Open a URI. Supports Inkdrop note URIs (`inkdrop://`), command URIs
   * (`command://`), anchor links, and external URLs.
   *
   * @param uri - The URI to open.
   * @param opts - Options.
   * @param opts.newWindow - Whether to open the note in a new window.
   * @returns Whether the URI was successfully opened.
   */
  openUri(
    uri: string,
    opts?: { newWindow?: boolean }
  ): boolean
  /**
   * Open a URL in the user's default external browser.
   * If the URL scheme is not `https:` and not in the allowed list, a confirmation
   * dialog is shown first.
   *
   * @param url - The URL to open.
   */
  openExternal(url: string): Promise<any>
  /** Check for application updates. */
  checkForUpdate(): void
}
