import type { Environment } from './environment'
import type { ConfigSchema } from './config'

/**
 * The lifecycle contract for an Inkdrop plugin's main module.
 *
 * A plugin's entry module should default-export an object (typically a class
 * instance) implementing this interface. Inkdrop's package manager calls these
 * methods as the plugin is loaded, activated, and deactivated.
 *
 * @example
 * ```tsx
 * import { Environment, InkdropPlugin } from '@inkdropapp/types'
 *
 * class MyPlugin implements InkdropPlugin {
 *   private disposable: { dispose(): void } | null = null
 *
 *   activate(inkdrop: Environment) {
 *     this.disposable = inkdrop.commands.add(document.body, {
 *       'my-plugin:hello': () => console.log('Hello from my plugin')
 *     })
 *   }
 *
 *   deactivate() {
 *     this.disposable?.dispose()
 *     this.disposable = null
 *   }
 * }
 *
 * export default new MyPlugin()
 * ```
 */
export interface IInkdropPlugin {
  /**
   * Configuration schema for this plugin, keyed by config name.
   *
   * When present, it is registered with the {@link Config} manager so the
   * settings UI can render editors for each option. Alternatively, the schema
   * can be declared statically in the plugin's `package.json` via
   * `configSchema`.
   */
  config?: Record<string, ConfigSchema>

  /**
   * Called once before {@link InkdropPlugin.activate}, giving the plugin a
   * chance to run setup before deserializers and view providers run.
   */
  initialize?(): void

  /**
   * Called when this plugin is activated. This is where most setup happens:
   * registering commands, components, telescope sources, layout items, etc.
   *
   * @param app - The Inkdrop {@link Environment} (also available as the global
   *   `inkdrop`).
   */
  activate(app: Environment): void | Promise<void>

  /**
   * Called during activation to register configuration. Use this when config
   * setup needs to run separately from the main {@link InkdropPlugin.activate}
   * flow.
   */
  activateConfig?(): void

  /**
   * Called when this plugin is deactivated. Tear down everything created in
   * {@link InkdropPlugin.activate} — dispose subscriptions, unregister sources
   * and components, and remove layout items.
   */
  deactivate?(): void | Promise<void>

  /**
   * Called when this plugin is deactivated, to tear down anything registered in
   * {@link InkdropPlugin.activateConfig}.
   */
  deactivateConfig?(): void | Promise<void>
}
