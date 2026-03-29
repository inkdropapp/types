import { Disposable } from 'event-kit'

/** Metadata from a package's `package.json`. */
export interface PackageMetadata {
  _id?: string
  name: string
  main?: string
  version?: string
  description?: string
  keywords?: string[]
  theme?: 'syntax' | 'ui' | 'preview'
  themeAppearance?: 'dark' | 'light'
  readme?: string
  repository?: { type?: string; url?: string } | string
  license?: string
  engines?: { inkdrop?: string }
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  homepage?: string
  bugs?: { url?: string }
  keymaps?: string[]
  menus?: string[]
  mainStyleSheet?: string
  styleSheets?: string[]
  configSchema?: Record<string, any>
  [key: string]: unknown
}

/** Represents a loaded Inkdrop package. */
export interface Package {
  /** The package name. */
  name: string
  /** The package metadata from `package.json`. */
  metadata: PackageMetadata
  /** The path on disk to the package directory. */
  path: string

  /** Whether this package is a theme package. */
  isTheme(): boolean
  /** Get the package type (e.g., `'inkdrop'`, `'theme'`). */
  getType(): string
  /** Enable the package. */
  enable(): void
  /** Disable the package. */
  disable(): void
  /** Activate the package. */
  activate(): Promise<void>
  /** Deactivate the package. */
  deactivate(): void
  /** Whether the package is currently active. */
  isActive(): boolean
}

/**
 * Package manager for coordinating the lifecycle of Inkdrop packages.
 *
 * An instance of this class is always available as the `inkdrop.packages` global.
 *
 * Packages can be loaded, activated, and deactivated, and unloaded:
 * - Loading a package reads and parses the package's metadata and resources
 *   such as keymaps, menus, stylesheets, etc.
 * - Activating a package registers the loaded resources and calls `activate()`
 *   on the package's main module.
 * - Deactivating a package unregisters the package's resources and calls
 *   `deactivate()` on the package's main module.
 * - Unloading a package removes it completely from the package manager.
 *
 * Packages can be enabled/disabled via the `core.disabledPackages` config
 * settings and also by calling `enablePackage()/disablePackage()`.
 */
export declare class PackageManager {
  /**
   * Invoke the given callback when all packages have been loaded.
   * @param callback - A function to be invoked when all packages have been loaded.
   * @returns A {@link Disposable} on which `.dispose()` can be called to unsubscribe.
   */
  onDidLoadInitialPackages(callback: () => void): Disposable
  /**
   * Invoke the given callback when all packages have been activated.
   * @param callback - A function to be invoked when all packages have been activated.
   * @returns A {@link Disposable} on which `.dispose()` can be called to unsubscribe.
   */
  onDidActivateInitialPackages(callback: () => void): Disposable
  /**
   * Invoke the given callback when a package is activated.
   * @param callback - Receives the activated {@link Package}.
   * @returns A {@link Disposable} on which `.dispose()` can be called to unsubscribe.
   */
  onDidActivatePackage(callback: (pack: Package) => void): Disposable
  /**
   * Invoke the given callback when a package is deactivated.
   * @param callback - Receives the deactivated {@link Package}.
   * @returns A {@link Disposable} on which `.dispose()` can be called to unsubscribe.
   */
  onDidDeactivatePackage(callback: (pack: Package) => void): Disposable
  /**
   * Invoke the given callback when a package is loaded.
   * @param callback - Receives the loaded {@link Package}.
   * @returns A {@link Disposable} on which `.dispose()` can be called to unsubscribe.
   */
  onDidLoadPackage(callback: (pack: Package) => void): Disposable
  /**
   * Invoke the given callback when a package is unloaded.
   * @param callback - Receives the unloaded {@link Package}.
   * @returns A {@link Disposable} on which `.dispose()` can be called to unsubscribe.
   */
  onDidUnloadPackage(callback: (pack: Package) => void): Disposable

  /**
   * Get the paths being used to look for packages.
   * @returns An array of directory paths.
   */
  getPackageDirPaths(): string[]
  /**
   * Resolve the given package name to a path on disk.
   * @param name - The package name.
   * @returns A folder path or `undefined` if it could not be resolved.
   */
  resolvePackagePath(name: string): string | undefined
  /**
   * Is the package with the given name bundled with Inkdrop?
   * @param name - The package name.
   */
  isBundledPackage(name: string): boolean

  /**
   * Enable the package with the given name.
   * @param name - The package name.
   * @returns The package that was enabled or `null` if it isn't loaded.
   */
  enablePackage(name: string): Package | null
  /**
   * Disable the package with the given name.
   * @param name - The package name.
   * @returns The package that was disabled or `null` if it isn't loaded.
   */
  disablePackage(name: string): Package | null
  /**
   * Is the package with the given name disabled?
   * @param name - The package name.
   */
  isPackageDisabled(name: string): boolean

  /** Get an array of all the active packages. */
  getActivePackages(): Package[]
  /**
   * Get the active package with the given name.
   * @param name - The package name.
   * @returns The active package or `undefined`.
   */
  getActivePackage(name: string): Package | undefined
  /**
   * Is the package with the given name active?
   * @param name - The package name.
   */
  isPackageActive(name: string): boolean

  /** Get an array of all the loaded packages. */
  getLoadedPackages(): Package[]
  /**
   * Get packages for a certain package type.
   * @param types - An array of type strings like `['inkdrop', 'textmate']`.
   */
  getLoadedPackagesForTypes(types: string[]): Package[]
  /**
   * Get the loaded package with the given name.
   * @param name - The package name.
   * @returns The loaded package or `null`.
   */
  getLoadedPackage(name: string): Package | null
  /**
   * Is the package with the given name loaded?
   * @param name - The package name.
   */
  isPackageLoaded(name: string): boolean

  /** Get all the available package paths. */
  getAvailablePackagePaths(): string[]
  /** Get all the available package names. */
  getAvailablePackageNames(): string[]
  /** Get all the available package metadata. */
  getAvailablePackageMetadata(): PackageMetadata[]
}
