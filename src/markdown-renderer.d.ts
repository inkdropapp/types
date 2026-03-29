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

  /**
   * Renders a Markdown string into a React element tree.
   * @param markdown - The raw Markdown source to render.
   * @returns An object containing the rendered `result`, the parsed `mdast`,
   *   the transformed `hast`, and a flag `isKatexRequired` indicating whether
   *   the output needs the KaTeX stylesheet.
   */
  render(markdown: string): Promise<MarkdownRenderResult>
}
