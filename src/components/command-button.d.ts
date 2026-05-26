import type React from 'react'
import type { ButtonProps } from './button'
import type { CommandParamListBase } from '../command-registry'

/** Props for the {@link CommandButton} component. */
export type CommandButtonProps<
  CommandParamList extends CommandParamListBase = CommandParamListBase,
  CommandName extends keyof CommandParamList = keyof CommandParamList
> = ButtonProps & {
  /** The command to dispatch when the button is clicked. */
  command?: CommandName
  /** The DOM element to dispatch the command on. Defaults to `document.body`. */
  commandTarget?: HTMLElement
  /** The detail payload passed with the dispatched command. */
  commandDetail?: CommandParamList[CommandName]
}

/**
 * A {@link Button} that dispatches an Inkdrop command when clicked and shows
 * the command's keybinding in its tooltip.
 *
 * Available at runtime via `inkdrop.components.classes.CommandButton`.
 *
 * @example
 * ```tsx
 * import type { CommandButton } from '@inkdropapp/types'
 *
 * const CommandButton = inkdrop.components.classes.CommandButton as typeof CommandButton
 * ```
 */
export type CommandButton = <
  CommandParamList extends CommandParamListBase = CommandParamListBase,
  CommandName extends keyof CommandParamList = keyof CommandParamList
>(
  props: CommandButtonProps<CommandParamList, CommandName>
) => React.ReactElement
