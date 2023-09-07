import type { TrashBookId } from '@inkdropapp/model-private';
import type { QueryContextActionType } from '../actions/query-context';
import type { NoteStatus } from '@inkdropapp/model-private';
import type { FTSSortType } from '@inkdropapp/fts-store';
export type QueryContextState = {
    mode: 'all';
} | {
    mode: 'pinned';
    filterKeyword: string;
    filterSort?: Record<string, FTSSortType>;
} | {
    mode: 'book';
    bookId: string;
    filterKeyword: string;
    filterSort?: Record<string, FTSSortType>;
    tagId?: string;
    status?: NoteStatus;
    includeChildren: boolean;
} | {
    mode: 'tag';
    tagId: string;
    filterKeyword: string;
    filterSort?: Record<string, FTSSortType>;
} | {
    mode: 'status';
    status: NoteStatus;
    filterKeyword: string;
    filterSort?: Record<string, FTSSortType>;
} | {
    mode: 'trash';
    bookId: TrashBookId;
} | {
    mode: 'search';
    searchKeyword: string;
    searchSort?: Record<string, FTSSortType>;
};
export declare const initialQueryContextState: QueryContextState;
export default function queryContext(state: QueryContextState | undefined, action: QueryContextActionType): QueryContextState;
