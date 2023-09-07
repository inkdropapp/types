import { AssistiveError } from 'inkdrop-consts';
import type { ThunkAction } from '../types';
import type { QueryContextState } from '../reducers/query-context';
import type { Note, NoteStatus } from '@inkdropapp/model-private';
import type { NoteQueryResultIncludingDocs, NoteQueryOptions } from '@inkdropapp/pouchdb-store';
import type { FTSQueryOptions, FTSSortType } from '@inkdropapp/fts-store';
export declare const NOTES_LOADING = "NOTES_LOADING";
export declare const NOTES_UPDATE = "NOTES_UPDATE";
export declare const NOTES_LOAD_MORE = "NOTES_LOAD_MORE";
export declare const NOTES_RELOAD = "NOTES_RELOAD";
export declare const NOTES_UNLOAD = "NOTES_UNLOAD";
export declare const NOTES_UPDATE_ITEM = "NOTES_UPDATE_ITEM";
export declare const NOTES_SET_ERROR = "NOTES_SET_ERROR";
export type NotesActionType = {
    type: 'NOTES_LOADING';
} | {
    type: 'NOTES_UPDATE' | 'NOTES_LOAD_MORE' | 'NOTES_RELOAD';
    payload: {
        data: NoteQueryResultIncludingDocs;
    };
} | {
    type: 'NOTES_UNLOAD';
} | {
    type: 'NOTES_UPDATE_ITEM';
    payload: Note;
} | {
    type: 'NOTES_SET_ERROR';
    payload: AssistiveError;
};
export declare function loading(): NotesActionType;
export declare function update(queryResult: NoteQueryResultIncludingDocs): ThunkAction<Promise<void>>;
export declare function updateItem(note: Note): NotesActionType;
export declare function loadMore(limit?: number): ThunkAction<Promise<void>>;
export declare function reload(): ThunkAction<Promise<void>>;
export declare function loadWithQueryContext(queryContext: QueryContextState, queryOptions: NoteQueryOptions): ThunkAction<Promise<void>>;
export declare function reloadWithQueryContext(queryOptions: NoteQueryOptions): ThunkAction<void>;
export declare function unload(): NotesActionType;
export declare function loadAll(queryOptions: NoteQueryOptions): ThunkAction<Promise<void>>;
export declare function loadPinned(queryOptions: NoteQueryOptions, filterKeyword?: string, filterSort?: Record<string, FTSSortType>): ThunkAction<Promise<void>>;
export declare function loadInBook(bookId: string, queryOptions: NoteQueryOptions, tagId?: string, status?: NoteStatus, filterKeyword?: string, includeChildren?: boolean): ThunkAction<Promise<void>>;
export declare function loadWithTag(tagId: string, queryOptions: NoteQueryOptions, filterKeyword?: string, filterSort?: Record<string, FTSSortType>): ThunkAction<Promise<void>>;
export declare function loadWithStatus(status: NoteStatus, queryOptions: NoteQueryOptions, filterKeyword?: string, filterSort?: Record<string, FTSSortType>): ThunkAction<Promise<void>>;
export declare function loadWithKeyword(searchKeyword: string, queryOptions: FTSQueryOptions): ThunkAction<Promise<void>>;
export declare function filterWithKeyword(queryContext: QueryContextState, queryOptions: NoteQueryOptions, queryContextPath: string): ThunkAction<Promise<void>>;
export declare function loadInTrash(queryOptions: NoteQueryOptions): ThunkAction<Promise<void>>;
export declare function moveToTrash(noteId: string): ThunkAction<Promise<void>>;
export declare function deleteNote(noteId: string): ThunkAction<Promise<void>>;
export declare function setError(error: AssistiveError): NotesActionType;
