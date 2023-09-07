import type { SearchScope } from '../reducers/search-bar';
export declare const SEARCH_BAR_SET_QUERY = "SEARCH_BAR_SET_QUERY";
export declare const SEARCH_BAR_SET_SCOPE = "SEARCH_BAR_SET_SCOPE";
export declare const SEARCH_BAR_SUBMIT = "SEARCH_BAR_SUBMIT";
export declare const SEARCH_BAR_CLEAR_NAVIGATION_CHECKPOINT = "SEARCH_BAR_CLEAR_NAVIGATION_CHECKPOINT";
export type SearchBarActionType = {
    type: 'SEARCH_BAR_SET_QUERY';
    payload: string;
} | {
    type: 'SEARCH_BAR_SET_SCOPE';
    payload: SearchScope;
} | {
    type: 'SEARCH_BAR_SUBMIT';
    payload: {
        navigationHistoryCheckpoint: number | null | undefined;
    };
} | {
    type: 'SEARCH_BAR_CLEAR_NAVIGATION_CHECKPOINT';
} | {
    type: 'SEARCH_BAR_ERROR';
};
export declare function setScope(scope: SearchScope): SearchBarActionType;
export declare function setQuery(query: string): SearchBarActionType;
export declare function submit(navigationHistoryCheckpoint?: number): SearchBarActionType;
export declare function clearNavigationCheckpoint(): SearchBarActionType;
