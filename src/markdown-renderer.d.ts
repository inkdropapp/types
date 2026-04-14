/** Props passed to an embedded component, same as an anchor element's props. */
export type EmbeddedComponentProps = JSX.IntrinsicElements['a']

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
 * An instance of this class is always available as the `inkdrop.markdownRenderer` global.
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
   * Renders a Markdown string into a React element tree.
   * @param markdown - The raw Markdown source to render.
   * @returns An object containing the rendered `result`, the parsed `mdast`,
   *   the transformed `hast`, and a flag `isKatexRequired` indicating whether
   *   the output needs the KaTeX stylesheet.
   */
  render(markdown: string): Promise<MarkdownRenderResult>
}
