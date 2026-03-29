import { Disposable } from 'event-kit'

export type NotificationType =
  | 'fatal'
  | 'error'
  | 'warning'
  | 'info'
  | 'success'

export interface NotificationButton {
  /** A class name to add to the button's default class name. */
  className?: string
  /** Callback to call when the button has been clicked. */
  onDidClick?: () => any
  /** Inner text for the button. */
  text: string
}

export interface NotificationOptions {
  /** An array of button definitions. */
  buttons?: NotificationButton[]
  /** A Markdown string containing a longer description about the notification. */
  description?: string
  /** A plain-text string containing additional details about the notification. */
  detail?: string
  /** Whether this notification can be dismissed by the user. Defaults to `false`. */
  dismissable?: boolean
  /** Name of an icon to display in the notification header. */
  icon?: string
  /** A preformatted string with stack trace information describing the location of the error. */
  stack?: string
}

/**
 * A notification to the user containing a message and type.
 */
export declare class Notification {
  type: NotificationType
  message: string
  options: NotificationOptions
  timestamp: Date
  dismissed: boolean
  displayed: boolean

  constructor(
    type: NotificationType,
    message: string,
    options?: NotificationOptions
  )

  /**
   * Invoke the given callback when the notification is dismissed.
   * @returns A {@link Disposable} on which `.dispose()` can be called to unsubscribe.
   */
  onDidDismiss(callback: () => any): Disposable
  /**
   * Invoke the given callback when the notification is clicked.
   * @returns A {@link Disposable} on which `.dispose()` can be called to unsubscribe.
   */
  onDidClick(callback: () => any): Disposable
  /**
   * Invoke the given callback when the notification is displayed.
   * @returns A {@link Disposable} on which `.dispose()` can be called to unsubscribe.
   */
  onDidDisplay(callback: () => any): Disposable
  getOptions(): NotificationOptions
  /** Returns the type. */
  getType(): NotificationType
  /** Returns the message. */
  getMessage(): string
  getTimestamp(): Date
  getDetail(): string | undefined
  isEqual(other: Notification): boolean
  /**
   * Dismisses the notification, removing it from the UI. Calling this
   * programmatically will call all callbacks added via `onDidDismiss`.
   */
  dismiss(): void
  isDismissed(): boolean
  isDismissable(): boolean
  click(): void
  wasDisplayed(): boolean
  setDisplayed(displayed: boolean): void
  getIcon(): string | undefined
}

/**
 * A notification manager used to create {@link Notification}s to be shown
 * to the user.
 *
 * An instance of this class is always available as the `inkdrop.notifications` global.
 */
export declare class NotificationManager {
  notifications: Notification[]

  /**
   * Invoke the given callback after a notification has been added.
   * @param callback - Called after the notification is added.
   * @returns A {@link Disposable} on which `.dispose()` can be called to unsubscribe.
   */
  onDidAddNotification(
    callback: (notification: Notification) => any
  ): Disposable
  /**
   * Invoke the given callback after the notifications have been cleared.
   * @returns A {@link Disposable} on which `.dispose()` can be called to unsubscribe.
   */
  onDidClearNotifications(callback: () => any): Disposable
  /**
   * Add a success notification.
   * @param message - A string message.
   * @param options - Notification options.
   * @returns The {@link Notification} that was added.
   */
  addSuccess(message: string, options?: NotificationOptions): Notification
  /**
   * Add an informational notification.
   * @param message - A string message.
   * @param options - Notification options.
   * @returns The {@link Notification} that was added.
   */
  addInfo(message: string, options?: NotificationOptions): Notification
  /**
   * Add a warning notification.
   * @param message - A string message.
   * @param options - Notification options.
   * @returns The {@link Notification} that was added.
   */
  addWarning(message: string, options?: NotificationOptions): Notification
  /**
   * Add an error notification.
   * @param message - A string message.
   * @param options - Notification options.
   * @returns The {@link Notification} that was added.
   */
  addError(message: string, options?: NotificationOptions): Notification
  /**
   * Add a fatal error notification.
   * @param message - A string message.
   * @param options - Notification options.
   * @returns The {@link Notification} that was added.
   */
  addFatalError(message: string, options?: NotificationOptions): Notification
  /**
   * Add a notification with the given type.
   * @param type - The notification type.
   * @param message - A string message.
   * @param options - Notification options.
   * @returns The {@link Notification} that was added.
   */
  add(
    type: NotificationType,
    message: string,
    options?: NotificationOptions
  ): Notification
  addNotification(notification: Notification): Notification
  /**
   * Get all the notifications.
   * @returns An array of {@link Notification}s.
   */
  getNotifications(): Notification[]
  /** Clear all the notifications. */
  clear(): void
}
