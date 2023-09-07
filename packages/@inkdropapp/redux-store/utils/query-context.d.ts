import type { QueryContextState } from '../reducers/query-context';
import type { State } from '../types';
import type { NoteQueryUsingFTS, InkdropDatabase } from '@inkdropapp/pouchdb-store';
export declare const defaultFilter = "-status:completed -status:dropped ";
export declare const defaultFilterConfitions: NoteQueryUsingFTS['conditions'];
export declare function shouldHideClosedNotes(qc: QueryContextState, hasKeywordCons: boolean): boolean;
export declare function getFTSQueryForContext(queryContext: QueryContextState, data: {
    db: InkdropDatabase;
    state: State;
}): Promise<NoteQueryUsingFTS>;
export declare function getQueryContextPath(qc: QueryContextState): string;
