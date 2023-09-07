import type { EditingNoteActionType } from '../actions/editing-note';
import type { Note } from '@inkdropapp/model-private';
export type EditingNoteState = Note | null | undefined;
export declare const initialEditingNoteState: EditingNoteState;
export default function notes(state: EditingNoteState, action: EditingNoteActionType): EditingNoteState;
