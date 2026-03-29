import { Disposable } from 'event-kit'

/** Callback function for handling a dispatched command. */
export type CommandCallback<CommandParams = any | undefined> = (
  event: CustomEvent<CommandParams>
) => void | Promise<void>

/** Object-form command listener with metadata. */
export type CommandListener<CommandParams = any | undefined> = {
  didDispatch: CommandCallback<CommandParams>
  displayName?: string
  hiddenInCommandPalette?: boolean
  description?: string
}

export type CommandParamListBase = Record<string, any | undefined>

/** A mapping of command names to their callbacks or listeners. */
export type CommandMap<CommandParamList extends CommandParamListBase> = {
  [commandName in keyof CommandParamList]?:
    | CommandCallback<CommandParamList[commandName]>
    | CommandListener<CommandParamList[commandName]>
}

/** Describes a registered command, as returned by {@link CommandRegistry.findCommands}. */
export declare class CommandDescriptor {
  /** The name of the command. For example, `user:insert-date`. */
  name: string
  /** The display name of the command. For example, `User: Insert Date`. */
  displayName: string
  hiddenInCommandPalette?: boolean
  /** A string describing the function of the command in more detail. */
  description?: string
}

/**
 * Associates listener functions with commands in a context-sensitive way
 * using DOM elements.
 *
 * An instance of this class is always available as the `inkdrop.commands` global.
 *
 * @example
 * ```typescript
 * // Register multiple commands with a command map
 * inkdrop.commands.add(element, {
 *   'my-plugin:action-a': (e) => console.log('Action A'),
 *   'my-plugin:action-b': {
 *     didDispatch: (e) => console.log('Action B'),
 *     displayName: 'Action B'
 *   }
 * })
 * ```
 */
export declare class CommandRegistry {
  /**
   * Register command handlers for one or more commands on a DOM element.
   *
   * @param target - The DOM element on which to register the command(s).
   * @param commandMap - An object mapping command names to their callbacks or listeners.
   * @returns A {@link Disposable} that can be used to unregister the command(s).
   */
  add<CommandParamList extends CommandParamListBase>(
    target: Element,
    commandMap: CommandMap<CommandParamList>
  ): Disposable
  /**
   * Register a single command handler on a DOM element.
   *
   * @param target - The DOM element on which to register the command.
   * @param commandName - The name of the command to register.
   * @param callback - The callback or listener to invoke when the command is dispatched.
   * @returns A {@link Disposable} that can be used to unregister the command.
   */
  add(
    target: Element,
    commandName: string,
    callback: CommandCallback | CommandListener
  ): Disposable

  /**
   * Get the number of registered listeners for a specific command.
   * @param commandName - The name of the command to check.
   * @returns The number of listeners registered for the command.
   */
  listenerCountForCommand(commandName: string): number
  /**
   * Find all registered commands matching a query.
   *
   * @param params - An object with a `target` DOM node that is the hypothetical target of a given command.
   * @returns An array of {@link CommandDescriptor} objects.
   */
  findCommands(params: { target: Element }): CommandDescriptor[]
  /**
   * Simulate the dispatch of a command on a DOM node.
   *
   * This can be useful for testing when you want to simulate the invocation of a
   * command on a detached DOM node.
   *
   * @param activeElement - The DOM node at which to start bubbling the command event.
   * @param commandName - The name of the command to dispatch.
   * @param detail - Additional data to pass with the command event.
   * @returns Whether the event was successfully dispatched.
   */
  dispatch<
    CommandParamList extends CommandParamListBase = CommandParamListBase,
    CommandName extends keyof CommandParamList = keyof CommandParamList
  >(
    activeElement: Element,
    commandName: CommandName,
    detail?: CommandParamList[CommandName]
  ): boolean
  /**
   * Get a typed dispatch function restricted to a specific command set.
   *
   * @example
   * ```typescript
   * type MyCommands = {
   *   'my-plugin:show': undefined
   *   'my-plugin:search': { query: string }
   * }
   *
   * const dispatch = inkdrop.commands.getDispatch<MyCommands>(document.body)
   * dispatch('my-plugin:show')                     // Valid
   * dispatch('my-plugin:search', { query: 'foo' }) // Valid
   * dispatch('my-plugin:invalid')                  // Type error
   * ```
   *
   * @param activeElement - The DOM node at which to start bubbling the command event.
   * @returns A typed dispatch function.
   */
  getDispatch<CommandParamList extends CommandParamListBase>(
    activeElement: Element
  ): <CommandName extends keyof CommandParamList>(
    commandName: CommandName,
    detail?: CommandParamList[CommandName]
  ) => boolean
  /**
   * Register a callback to be invoked when the set of registered commands changes.
   * @param callback - The function to call when commands are added or removed.
   * @returns A {@link Disposable} that can be used to unsubscribe the callback.
   */
  onRegistedCommandsChanged(callback: () => any): Disposable
}
