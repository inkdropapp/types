import type { SearchBarActionType } from '../actions/search-bar';
import type { QueryContextActionType } from '../actions/query-context';
export type SearchScope = 'context' | 'global';
export declare const SEARCH_SCOPE_CONTEXT = "context";
export declare const SEARCH_SCOPE_GLOBAL = "global";
export type SearchBarState = {
    query: string;
    scope: SearchScope;
    changed: boolean;
    navigationHistoryCheckpoint: number | null | undefined;
};
export declare const initialSearchBarState: SearchBarState;
export default function SearchBar(state: SearchBarState | undefined, action: SearchBarActionType | QueryContextActionType): SearchBarState;
