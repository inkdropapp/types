import { type ComponentType } from 'react'
import { Disposable } from 'event-kit'

/**
 * Manages the layout of React components in named regions of the UI.
 *
 * An instance of this class is always available as the `inkdrop.layouts` global.
 */
export declare class LayoutManager {
  /**
   * Set the list of component class names for a named layout.
   * @param name - The layout name.
   * @param components - An array of component class names.
   */
  setLayout(name: string, components: string[]): void
  /**
   * Get the list of component class names for a named layout.
   * @param name - The layout name.
   * @returns An array of component class names, or `undefined` if not set.
   */
  getLayout(name: string): string[] | undefined
  /**
   * Get the actual React component classes for a named layout.
   * @param name - The layout name.
   * @returns An array of React component types.
   * @throws If the layout does not exist.
   */
  getLayoutComponents(name: string): ComponentType[]
  /**
   * Get the index of a component in a layout.
   * @param layoutName - The layout name.
   * @param componentClassName - The component class name to find.
   * @returns The index, or `-1` if not found.
   */
  indexOfComponentInLayout(
    layoutName: string,
    componentClassName: string
  ): number
  /**
   * Add a component to the end of a layout.
   * @param layoutName - The layout name.
   * @param componentClassName - The component class name to add.
   */
  addComponentToLayout(
    layoutName: string,
    componentClassName: string
  ): void
  /**
   * Insert a component into a layout before a reference component.
   * @param layoutName - The layout name.
   * @param referenceComponentClassName - The component to insert before.
   * @param componentClassNameToInsert - The component to insert.
   */
  insertComponentToLayoutBefore(
    layoutName: string,
    referenceComponentClassName: string,
    componentClassNameToInsert: string
  ): void
  /**
   * Insert a component into a layout after a reference component.
   * @param layoutName - The layout name.
   * @param referenceComponentClassName - The component to insert after.
   * @param componentClassNameToInsert - The component to insert.
   */
  insertComponentToLayoutAfter(
    layoutName: string,
    referenceComponentClassName: string,
    componentClassNameToInsert: string
  ): void
  /**
   * Remove a component from a layout.
   * @param layoutName - The layout name.
   * @param componentClassName - The component class name to remove.
   */
  removeComponentFromLayout(
    layoutName: string,
    componentClassName: string
  ): void
  /**
   * Invoke the given callback when a layout changes.
   * @param name - The layout name to watch.
   * @param callback - Called with the new component list when the layout changes.
   * @returns A {@link Disposable} to unsubscribe.
   */
  onLayoutChange(
    name: string,
    callback: (components: string[]) => any
  ): Disposable
}
