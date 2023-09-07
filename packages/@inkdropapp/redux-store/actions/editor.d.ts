import type { ThunkAction } from '../types';
import type { Note } from '@inkdropapp/model-private';
import { AssistiveError } from 'inkdrop-consts';
export declare const EDITOR_OPEN = "EDITOR_OPEN";
export declare const EDITOR_OPEN_SUCCESS = "EDITOR_OPEN_SUCCESS";
export declare const EDITOR_OPEN_FAILURE = "EDITOR_OPEN_FAILURE";
export declare const EDITOR_CHANGE = "EDITOR_CHANGE";
export declare const EDITOR_SAVE = "EDITOR_SAVE";
export declare const EDITOR_SAVE_SUCCESS = "EDITOR_SAVE_SUCCESS";
export declare const EDITOR_SAVE_FAILURE = "EDITOR_SAVE_FAILURE";
export declare const EDITOR_CLOSE = "EDITOR_CLOSE";
export declare const EDITOR_CHANGE_VIEWMODE = "EDITOR_CHANGE_VIEWMODE";
import type { EditorViewMode } from '../reducers/editor';
export type EditorActionType = {
    type: 'EDITOR_OPEN';
    payload: string;
} | {
    type: 'EDITOR_OPEN_SUCCESS';
    payload: {
        readOnly: boolean;
        revisionLocked: boolean;
    };
} | {
    type: 'EDITOR_OPEN_FAILURE';
    payload: AssistiveError;
} | {
    type: 'EDITOR_CHANGE';
    payload: {
        needsUpdatingDate: boolean;
    };
} | {
    type: 'EDITOR_CLOSE';
} | {
    type: 'EDITOR_SAVE';
    payload: string;
} | {
    type: 'EDITOR_SAVE_SUCCESS';
} | {
    type: 'EDITOR_SAVE_FAILURE';
    payload: AssistiveError;
} | {
    type: 'EDITOR_CHANGE_VIEWMODE';
    payload: EditorViewMode;
};
export declare function open(noteId: string, options?: {
    revision: string;
}): ThunkAction<Promise<void>>;
export declare function openWithData(note: Note): ThunkAction<Promise<void>>;
export declare function change(needsUpdatingDate: boolean): EditorActionType;
export declare function save(): ThunkAction<Promise<void>>;
export declare function close(): ThunkAction<Promise<void>>;
export declare function create(): ThunkAction<Promise<void>>;
export declare function changeViewMode(viewMode: EditorViewMode): EditorActionType;
export declare function removeConflicts(): ThunkAction<Promise<void>>;
