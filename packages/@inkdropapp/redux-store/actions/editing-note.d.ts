import type { Note } from '@inkdropapp/model-private';
export declare const EDITING_NOTE_OPEN = "EDITING_NOTE_OPEN";
export declare const EDITING_NOTE_UPDATE = "EDITING_NOTE_UPDATE";
export declare const EDITING_NOTE_CLOSE = "EDITING_NOTE_CLOSE";
export declare const EDITING_NOTE_MARK_CONFLICTS_AS_RESOLVED = "EDITING_NOTE_MARK_CONFLICTS_AS_RESOLVED";
type EditingNoteUpdateData = Partial<Note>;
export type EditingNoteActionType = {
    type: 'EDITING_NOTE_OPEN';
    payload: Note;
} | {
    type: 'EDITING_NOTE_UPDATE';
    payload: EditingNoteUpdateData;
} | {
    type: 'EDITING_NOTE_CLOSE';
} | {
    type: 'EDITING_NOTE_MARK_CONFLICTS_AS_RESOLVED';
};
export declare function open(note: Note): EditingNoteActionType;
export declare function update(note: EditingNoteUpdateData): EditingNoteActionType;
export declare function markConflictsAsResolved(): EditingNoteActionType;
export declare function close(): EditingNoteActionType;
export {};
