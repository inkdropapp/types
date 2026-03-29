import { Disposable } from 'event-kit'

export interface ConfigSchema {
  type: string
  properties?: Record<string, any>
  additionalProperties?: boolean | Record<string, any>
  default?: any
  scopes?: Record<string, any>
  items?: any
  minimum?: number
  maximum?: number
  maximumLength?: number
  enum?: any[]
  [key: string]: any
}

export type SchemaEnforcer = (
  keyPath: string | null,
  value: any,
  schema: ConfigSchema
) => any

/**
 * Used to access all of Inkdrop's configuration details.
 *
 * An instance of this class is always available as the `inkdrop.config` global.
 *
 * ## Getting and setting config settings
 *
 * ```js
 * // Note that with no value set, get returns the setting's default value.
 * inkdrop.config.get('my-package.myKey') // -> 'defaultValue'
 *
 * inkdrop.config.set('my-package.myKey', 'value')
 * inkdrop.config.get('my-package.myKey') // -> 'value'
 * ```
 *
 * You may want to watch for changes. Use `observe` to catch changes to the setting.
 *
 * ```js
 * inkdrop.config.set('my-package.myKey', 'value')
 * inkdrop.config.observe('my-package.myKey', (newValue) => {
 *   // `observe` calls immediately and every time the value is changed
 *   console.log('My configuration changed:', newValue)
 * })
 * ```
 *
 * If you want a notification only when the value changes, use `onDidChange`.
 *
 * ```js
 * inkdrop.config.onDidChange('my-package.myKey', ({newValue, oldValue}) => {
 *   console.log('My configuration changed:', newValue, oldValue)
 * })
 * ```
 */
export declare class Config {
  /**
   * Registers a single schema enforcer function for a specific type.
   * @param typeName - The schema type name (e.g., 'integer', 'string').
   * @param enforcerFunction - The function that attempts to coerce/validate a value.
   * @returns The total number of enforcers now registered for that type.
   */
  static addSchemaEnforcer(
    typeName: string,
    enforcerFunction: SchemaEnforcer
  ): number
  /**
   * Registers multiple schema enforcer functions in one call.
   * @param filters - An object whose keys are type names and whose values
   *   are objects of named enforcer functions.
   */
  static addSchemaEnforcers(
    filters: Record<string, Record<string, SchemaEnforcer>>
  ): void
  /**
   * Executes all schema enforcers for a given keyPath and schema.
   * @param keyPath - The configuration key path.
   * @param value - The value to be coerced/validated.
   * @param schema - A schema object containing type info.
   * @returns The coerced value if successful.
   */
  static executeSchemaEnforcers(
    keyPath: string | null,
    value: any,
    schema: ConfigSchema
  ): any

  settings: Record<string, any> | null

  /**
   * Add a listener for changes to a given key path. This is different
   * than `onDidChange` in that it will immediately call your callback with the
   * current value of the config entry.
   *
   * @param keyPath - Name of the key to observe.
   * @param callback - Called immediately with the current value and again on changes.
   * @returns A {@link Disposable} to unsubscribe.
   */
  observe(
    keyPath: string,
    callback: (value: any) => void
  ): Disposable
  /**
   * Add a listener for changes to a given key path with scope options.
   *
   * @param keyPath - Name of the key to observe.
   * @param options - May include `scope` (a ScopeDescriptor).
   * @param callback - Called immediately with the current value and again on changes.
   * @returns A {@link Disposable} to unsubscribe.
   */
  observe(
    keyPath: string,
    options: { scope?: any },
    callback: (value: any) => void
  ): Disposable
  /**
   * Add a listener for changes to any key.
   *
   * @param callback - Called with an event object describing old/new values.
   * @returns A {@link Disposable} to unsubscribe.
   */
  onDidChange(
    callback: (event: { newValue: any; oldValue: any }) => void
  ): Disposable
  /**
   * Add a listener for changes to a given key path.
   *
   * @param keyPath - Name of the key to observe.
   * @param callback - Called with an event object describing old/new values.
   * @returns A {@link Disposable} to unsubscribe.
   */
  onDidChange(
    keyPath: string,
    callback: (event: { newValue: any; oldValue: any }) => void
  ): Disposable
  /**
   * Add a listener for changes to a given key path with scope options.
   *
   * @param keyPath - Name of the key to observe. Must be specified if `scope` is given.
   * @param options - May include `scope` (a ScopeDescriptor).
   * @param callback - Called with an event object describing old/new values.
   * @returns A {@link Disposable} to unsubscribe.
   */
  onDidChange(
    keyPath: string,
    options: { scope?: any },
    callback: (event: { newValue: any; oldValue: any }) => void
  ): Disposable
  /**
   * Retrieves the setting for the given key.
   *
   * @example
   * ```js
   * inkdrop.config.get('core.themes')
   * ```
   *
   * @param keyPath - The name of the key to retrieve.
   * @param options - May include `sources`, `excludeSources`, or `scope`.
   * @returns The value from the default settings or the user's configuration file.
   */
  get(keyPath?: string, options?: any): any
  /**
   * Get all of the values for the given key-path, along with their
   * associated scope selector.
   *
   * @param keyPath - The name of the key to retrieve.
   * @param options - The same options accepted by `get`.
   * @returns An array of `{ scopeSelector, value }` objects.
   */
  getAll(
    keyPath: string,
    options?: any
  ): Array<{ scopeSelector: string; value: any }>
  /**
   * Sets the value for a configuration setting.
   *
   * This value is stored in Inkdrop's internal configuration file.
   *
   * @example
   * ```js
   * inkdrop.config.set('core.themes', ['default-dark-ui', 'default-dark-syntax'])
   * ```
   *
   * @param keyPath - The name of the key.
   * @param value - The value of the setting. Passing `undefined` will revert to the default.
   * @param options - May include `scopeSelector` and `source`.
   * @returns `true` if the value was set, `false` if it could not be coerced to the schema type.
   */
  set(keyPath: string, value: any, options?: any): boolean
  /**
   * Restore the setting at `keyPath` to its default value.
   *
   * @param keyPath - The name of the key to unset.
   * @param options - May include `scopeSelector` and `source`.
   */
  unset(keyPath?: string | null, options?: any): void
  /**
   * Get an array of all the `source` strings with which settings
   * have been added via `set`.
   * @returns An array of source file names.
   */
  getSources(): string[]
  /**
   * Retrieve the schema for a specific key path. The schema will tell
   * you what type the keyPath expects, and other metadata about the config option.
   *
   * @param keyPath - The name of the key.
   * @returns The schema object, or `null` when the keyPath has no schema specified.
   */
  getSchema(keyPath: string | null): ConfigSchema | null
  /**
   * Get the path to the config file being used.
   * @returns The path to the user's config file.
   */
  getUserConfigPath(): string | undefined
  /**
   * Suppress calls to handler functions registered with `onDidChange`
   * and `observe` for the duration of `callback`. After `callback` executes,
   * handlers will be called once if the value for their key-path has changed.
   *
   * @param callback - Function to execute while suppressing calls to handlers.
   */
  transact(callback: () => any): any
  pushAtKeyPath(keyPath: string, value: any): number
  unshiftAtKeyPath(keyPath: string, value: any): number
  removeAtKeyPath(keyPath: string, value: any): any[]
  /**
   * Define a schema for a configuration key path.
   * @param keyPath - The key path to set the schema for.
   * @param schema - The schema definition.
   */
  setSchema(keyPath: string | null, schema: ConfigSchema): void
  load(): void
  setDefaults(keyPath: string | null, defaults: any): void
}
