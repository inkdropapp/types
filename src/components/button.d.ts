import type React from 'react'

/** Props for the {@link Button} component. */
export type ButtonProps = {
  /** The element type to render as. Defaults to `'button'`. */
  as?: React.ElementType
  /** The name of a Streamline icon to render before the children. */
  icon?: string
  /** Render with primary styling. */
  primary?: boolean
  /** Render with negative (destructive) styling. */
  negative?: boolean
  /** Render with basic styling. */
  basic?: boolean
  /** Render without the default `ui button` classes. */
  bare?: boolean
  /** Tooltip content shown while hovering the button. */
  tooltip?: React.ReactNode
  /** Additional class name applied to the tooltip. */
  tooltipClassName?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

/**
 * A styled button component with optional icon and tooltip support.
 *
 * Available at runtime via `inkdrop.components.classes.Button`.
 *
 * @example
 * ```tsx
 * import type { Button } from '@inkdropapp/types'
 *
 * const Button = inkdrop.components.classes.Button as typeof Button
 * ```
 */
export type Button = React.FC<ButtonProps>
