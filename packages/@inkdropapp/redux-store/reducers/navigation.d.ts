import type { NavigationActionType } from '../actions/navigation';
import type { QueryContextState } from './query-context';
export type HistoryItem = {
    queryContext: QueryContextState;
    editingNoteId: string;
    sidebar: {
        workspace: {
            visible: boolean;
            bookId: string | undefined;
        };
    };
};
export type NavigationState = {
    offset: number;
    history: HistoryItem[];
};
export declare const initialNavigationState: NavigationState;
export default function navigation(state: NavigationState | undefined, action: NavigationActionType): NavigationState;
