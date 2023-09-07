import { AssistiveError } from 'inkdrop-consts';
import type { AssistiveErrorActionType } from '../actions/assistive-error';
export type AssistiveErrorState = AssistiveError | null | undefined;
export declare const initialAssistiveErrorState: AssistiveErrorState;
export default function assistiveError(state: AssistiveErrorState, action: AssistiveErrorActionType): AssistiveErrorState;
