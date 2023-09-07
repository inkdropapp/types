import type { EditorActionType } from '../actions/editor';
import { AssistiveError } from 'inkdrop-consts';
export type EditorViewMode = 'preview' | 'sideBySide' | 'edit';
export declare const EDITOR_VIEW_MODE: {
    readonly [key: string]: EditorViewMode;
};
export type EditorState = {
    changed: boolean;
    needsUpdatingDate: boolean;
    viewMode: EditorViewMode;
    openingNoteId?: string;
    readOnly: boolean;
    savingNoteId?: string;
    revisionLocked?: boolean;
    lastError?: AssistiveError;
};
export declare const initialEditorState: EditorState;
export default function notes(state: EditorState | undefined, action: EditorActionType): EditorState;
