/**
 * The state of a modal managed by {@link useModal}.
 */
export interface ModalState {
  /** Whether the modal is currently visible. */
  visible: boolean
}

/**
 * The return value of the {@link useModal} hook.
 */
export interface UseModalResult {
  /** Show the modal. */
  show: () => void
  /** Close the modal. */
  close: () => void
  /** The current modal state. */
  state: ModalState
}

/**
 * A React hook for managing modal visibility state.
 *
 * @param initialState - Whether the modal is initially visible. Defaults to `false`.
 * @returns An object with `show`, `close`, and `state` properties.
 *
 * @example
 * ```typescript
 * import { useModal } from 'inkdrop'
 *
 * function MyDialog() {
 *   const modal = useModal()
 *   return (
 *     <>
 *       <button onClick={modal.show}>Open</button>
 *       {modal.state.visible && <Dialog onClose={modal.close} />}
 *     </>
 *   )
 * }
 * ```
 */
export declare function useModal(initialState?: boolean): UseModalResult
