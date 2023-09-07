import type { Note, NoteListSortBy, NoteListOrder } from '@inkdropapp/model-private';
import type { Dispatch, GetState, GetThunkContext, ThunkAction } from '../types';
import type { InkdropDatabase, NoteQueryResult } from '@inkdropapp/pouchdb-store';
type LoadNotesCallback = (dispatch: Dispatch, getState: GetState, getContext: GetThunkContext) => Promise<NoteQueryResult | null | undefined>;
export declare function loadNotes(load: LoadNotesCallback): ThunkAction<Promise<void>>;
export declare function getSortOrderForQueryPath(db: InkdropDatabase, queryPath: string): [NoteListSortBy, NoteListOrder];
export declare function getQueryOptions<OptionType>(db: InkdropDatabase, opts: OptionType, queryPath: string): OptionType;
export declare function indexOfNotes(items: Note[], note: Note): number;
export {};
