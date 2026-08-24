import type { NoteMetadata } from 'inkdrop-model'

/** Props passed to an embedded component, same as an anchor element's props. */
export type EmbeddedComponentProps = JSX.IntrinsicElements['a']

/**
 * Props passed to a custom code block component registered via
 * {@link MarkdownRenderer.remarkCodeComponents}.
 */
export type CodeComponentProps = {
  /** The language identifier of the fenced code block (e.g. `'js'`). */
  lang: string
  /** Parsed key/value pairs from the code fence's meta string. */
  meta?: Record<string, string>
  /** Whether the block is a fenced code block (```), as opposed to indented. */
  fenced?: boolean
  /** Additional class name applied to the rendered element. */
  className?: string
  /** The raw lines of the code block. */
  children: string[]
}

/** A React component that renders an embedded content view for a given URL. */
export type EmbeddedComponent = React.FC<EmbeddedComponentProps>

/** Describes a provider that can render embedded content for matching URLs. */
export interface EmbeddingProvider {
  /** Unique identifier for this provider. */
  id: string
  /** Returns `true` if this provider can handle the given URL. */
  test: (url: string) => boolean
  /** Returns the React component used to render the embedded content. */
  getComponent: () => EmbeddedComponent
}

/**
 * Registry that manages {@link EmbeddingProvider} instances for rendering
 * rich embedded content (e.g., YouTube videos, tweets, CodePen previews)
 * inline within the Markdown preview.
 *
 * Providers are matched against URLs in registration order.
 */
export declare class EmbeddingProviderRegistry {
  /**
   * Registers an embedding provider.
   * @param provider - The provider to register.
   * @param prepend - If `true`, the provider is added to the front of the list
   *   so it takes priority over existing providers.
   */
  register(provider: EmbeddingProvider, prepend?: boolean): void

  /**
   * Removes a previously registered provider by its ID.
   * @param providerId - The {@link EmbeddingProvider.id} to remove.
   */
  unregister(providerId: string): void

  /**
   * Returns the first provider whose {@link EmbeddingProvider.test} matches
   * the given URL, or `null` if none match.
   * @param url - The URL to test against registered providers.
   */
  getProviderForURL(url: string): EmbeddingProvider | null
}

/** The value provided by {@link MarkdownRenderer.Context}. */
export type MarkdownRendererContextType = {
  /** The renderer instance that produced the surrounding content. */
  renderer: MarkdownRenderer
  /** Whether the content is being rendered for printing/exporting. */
  printMode: boolean
  /** Emitter for renderer lifecycle events. */
  events?: any
  /** Metadata of the note being rendered, if available. */
  metadata?: NoteMetadata | null
  /** The parsed Markdown AST (mdast). */
  mdast?: any
  /** The transformed HTML AST (hast). */
  hast?: any
}

export interface MarkdownRenderResult {
  /** The rendered React element tree. */
  result: JSX.Element
  /** The parsed Markdown AST (mdast). */
  mdast: any
  /** The transformed HTML AST (hast). */
  hast: any
  /** Whether the output needs the KaTeX stylesheet. */
  isKatexRequired: boolean
}

/**
 * Renders Markdown strings into React element trees.
 *
 * Available as `env.markdownRenderer` in your plugin's `activate(env: Environment)` method.
 *
 * You can extend the rendering pipeline by adding remark/rehype plugins or
 * custom React components.
 */
export declare class MarkdownRenderer {
  /** Remark plugins to use during Markdown parsing. */
  remarkPlugins: any[]
  /** Rehype plugins to use during HTML transformation. */
  rehypePlugins: any[]
  /** Custom React components to use when rendering Markdown elements. */
  remarkReactComponents: Record<string, any>
  /** Custom React components to use when rendering code blocks. */
  remarkCodeComponents: Record<string, any>
  /** Registry for embedding providers that render rich content inline in the preview. */
  embeddings: EmbeddingProviderRegistry
  /**
   * React context carrying the renderer instance and the current render state.
   *
   * Use it from a custom React component (registered via
   * {@link MarkdownRenderer.remarkReactComponents} or
   * {@link MarkdownRenderer.remarkCodeComponents}) to access the renderer,
   * print mode, note metadata, and the parsed ASTs.
   *
   * @example
   * ```tsx
   * import { useContext } from 'react'
   * const { renderer, printMode } = useContext(inkdrop.markdownRenderer.Context)
   * ```
   */
  Context: React.Context<MarkdownRendererContextType>

  /**
   * Renders a Markdown string into a React element tree.
   * @param markdown - The raw Markdown source to render.
   * @returns An object containing the rendered `result`, the parsed `mdast`,
   *   the transformed `hast`, and a flag `isKatexRequired` indicating whether
   *   the output needs the KaTeX stylesheet.
   */
  render(markdown: string): Promise<MarkdownRenderResult>
}
