import type React from 'react'

/** Props for the {@link Modal} component. */
export type ModalProps = {
  className?: string
  children: React.ReactNode
  visible: boolean
  onBackdropClick?: () => any
  onEscKeyDown?: () => any
  autofocus?: boolean
  autoRestoreFocus?: boolean
  animate?: boolean
}

/**
 * A modal overlay component that handles backdrop clicks, escape key,
 * focus management, and enter/exit animations.
 *
 * Available at runtime via `inkdrop.components.classes.Modal`.
 *
 * @example
 * ```tsx
 * import type { Modal } from '@inkdropapp/types'
 *
 * const Modal = inkdrop.components.classes.Modal as typeof Modal
 * ```
 */
export type Modal = React.FC<ModalProps>
