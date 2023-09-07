import type { ThunkAction } from '../types';
import type { NoteStatus } from '@inkdropapp/model-private';
import type { QueryContextState } from '../reducers/query-context';
import type { FTSSortType } from '@inkdropapp/fts-store';
export declare const QUERY_CONTEXT_RESTORE = "QUERY_CONTEXT_RESTORE";
export declare const QUERY_CONTEXT_SHOW_ALL = "QUERY_CONTEXT_SHOW_ALL";
export declare const QUERY_CONTEXT_SHOW_PINNED = "QUERY_CONTEXT_SHOW_PINNED";
export declare const QUERY_CONTEXT_SHOW_IN_BOOK = "QUERY_CONTEXT_SHOW_IN_BOOK";
export declare const QUERY_CONTEXT_SHOW_WITH_TAG = "QUERY_CONTEXT_SHOW_WITH_TAG";
export declare const QUERY_CONTEXT_SHOW_WITH_STATUS = "QUERY_CONTEXT_SHOW_WITH_STATUS";
export declare const QUERY_CONTEXT_SHOW_IN_TRASH = "QUERY_CONTEXT_SHOW_IN_TRASH";
export declare const QUERY_CONTEXT_SHOW_WITH_KEYWORD = "QUERY_CONTEXT_SHOW_WITH_KEYWORD";
export type QueryContextActionType = {
    type: 'QUERY_CONTEXT_RESTORE';
    payload: QueryContextState;
} | {
    type: 'QUERY_CONTEXT_SHOW_ALL';
} | {
    type: 'QUERY_CONTEXT_SHOW_PINNED';
    payload: {
        filterKeyword: string;
        filterSort?: Record<string, FTSSortType>;
    };
} | {
    type: 'QUERY_CONTEXT_SHOW_IN_BOOK';
    payload: {
        bookId: string;
        filterKeyword: string;
        filterSort?: Record<string, FTSSortType>;
        tagId?: string;
        status?: NoteStatus;
        includeChildren: boolean;
    };
} | {
    type: 'QUERY_CONTEXT_SHOW_WITH_TAG';
    payload: {
        tagId: string;
        filterKeyword: string;
        filterSort?: Record<string, FTSSortType>;
    };
} | {
    type: 'QUERY_CONTEXT_SHOW_WITH_STATUS';
    payload: {
        status: NoteStatus;
        filterKeyword: string;
        filterSort?: Record<string, FTSSortType>;
    };
} | {
    type: 'QUERY_CONTEXT_SHOW_IN_TRASH';
} | {
    type: 'QUERY_CONTEXT_SHOW_WITH_KEYWORD';
    payload: {
        searchKeyword: string;
        searchSort?: Record<string, FTSSortType>;
    };
};
export declare function restore(state: QueryContextState): QueryContextActionType;
export declare function showAll(): QueryContextActionType;
export declare function showPinned(filterKeyword?: string, filterSort?: Record<string, FTSSortType>): ThunkAction<Promise<void>>;
export declare function showInBook(bookId: string, queryOptions?: {
    tagId?: string;
    status?: NoteStatus;
    filterKeyword?: string;
    filterSort?: Record<string, FTSSortType>;
    includeChildren?: boolean;
}): ThunkAction<Promise<void>>;
export declare function showWithTag(tagId: string, filterKeyword?: string, filterSort?: Record<string, FTSSortType>): ThunkAction<Promise<void>>;
export declare function showWithStatus(status: NoteStatus, filterKeyword?: string, filterSort?: Record<string, FTSSortType>): QueryContextActionType;
export declare function showInTrash(): QueryContextActionType;
export declare function showWithKeyword(searchKeyword: string, searchSort?: Record<string, FTSSortType>): QueryContextActionType;
export declare function setFilterKeyword(filterKeyword: string, filterSort?: Record<string, FTSSortType>): ThunkAction<Promise<any>>;
