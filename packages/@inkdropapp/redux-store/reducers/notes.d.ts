import { AssistiveError } from 'inkdrop-consts';
import type { NotesActionType } from '../actions/notes';
import type { Note } from '@inkdropapp/model-private';
import type { NoteQuery, NoteQueryCursor } from '@inkdropapp/pouchdb-store';
export type NotesState = {
    items: Note[];
    hashedItems: Record<string, Note>;
    lastQuery?: NoteQuery;
    cursor?: NoteQueryCursor | null;
    totalRows: number;
    timestamp: number;
    loading: boolean;
    lastError?: AssistiveError;
};
export declare const initialNotesState: NotesState;
export default function notes(state: NotesState | undefined, action: NotesActionType): NotesState;
