import { type ComponentType } from 'react'
import { Disposable } from 'event-kit'

/**
 * Manages React component classes that can be referenced by name
 * throughout the application.
 *
 * An instance of this class is always available as the `inkdrop.components` global.
 */
export declare class ComponentManager {
  /** A map of component class names to their React component types. */
  classes: Record<string, ComponentType>

  /**
   * Register a React component class.
   * @param klass - The React component to register.
   * @param klassName - An optional name override. Defaults to `klass.name`.
   */
  registerClass(klass: ComponentType, klassName?: string | null): void
  /**
   * Unregister a React component class.
   * @param klass - The React component to unregister.
   * @param klassName - An optional name override. Defaults to `klass.name`.
   */
  deleteClass(klass: ComponentType, klassName?: string | null): void
  /**
   * Get a registered component class by name.
   * @param className - The name of the component class.
   * @returns The component class, or `undefined` if not registered.
   */
  getComponentClass(className: string): ComponentType | undefined
  /**
   * Invoke the given callback when a component class with the given name is registered.
   * @param klassName - The component class name to watch.
   * @param callback - Called with the component class when registered.
   * @returns A {@link Disposable} to unsubscribe.
   */
  onClassRegistered<T extends ComponentType>(
    klassName: string,
    callback: (klass: T) => void
  ): Disposable
  /**
   * Invoke the given callback when a component class with the given name is unregistered.
   * @param klassName - The component class name to watch.
   * @param callback - Called when the component class is unregistered.
   * @returns A {@link Disposable} to unsubscribe.
   */
  onClassDeleted(klassName: string, callback: () => void): Disposable
}
