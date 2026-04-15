import type React from 'react'
import type { ModalProps } from './modal'

/** Props for the {@link Dialog} component. */
export type DialogProps = ModalProps & {
  className?: string
  children?: React.ReactNode
  large?: boolean
}

/** Props for the {@link Dialog.Title} sub-component. */
export type DialogTitleProps = {
  className?: string
  children?: React.ReactNode
}

/** Props for the {@link Dialog.Content} sub-component. */
export type DialogContentProps = {
  className?: string
  flex?: boolean
  noPadding?: boolean
  children?: React.ReactNode
  overflow?: React.CSSProperties['overflow']
}

/** Props for the {@link Dialog.Actions} sub-component. */
export type DialogActionsProps = {
  className?: string
  children?: React.ReactNode
}

/**
 * A modal dialog component with `Title`, `Content`, and `Actions` sub-components.
 *
 * Available at runtime via `inkdrop.components.classes.Dialog`.
 *
 * @example
 * ```tsx
 * import type { Dialog } from '@inkdropapp/types'
 *
 * const MyDialog = inkdrop.components.classes.Dialog as typeof Dialog
 * ```
 */
export interface Dialog extends React.FC<DialogProps> {
  Title: React.FC<DialogTitleProps>
  Content: React.FC<DialogContentProps>
  Actions: React.FC<DialogActionsProps>
}
