import type { ThunkAction } from '../types';
import type { HistoryItem } from '../reducers/navigation';
export declare const NAVIGATION_PUSH_STATE = "NAVIGATION_PUSH_STATE";
export declare const NAVIGATION_BACK = "NAVIGATION_BACK";
export declare const NAVIGATION_FORWARD = "NAVIGATION_FORWARD";
export type NavigationActionType = {
    type: 'NAVIGATION_PUSH_STATE';
    payload: HistoryItem;
} | {
    type: 'NAVIGATION_BACK';
    payload: {
        nextOffset: number;
        nextState: HistoryItem | null | undefined;
    };
} | {
    type: 'NAVIGATION_FORWARD';
    payload: {
        nextOffset: number;
        nextState: HistoryItem | null | undefined;
    };
};
export declare function pushState(editingNoteId: string): ThunkAction<Promise<void>>;
type NavigationCallback = (historyItem: HistoryItem | null | undefined) => any;
export declare function forward(callback?: NavigationCallback): ThunkAction<Promise<HistoryItem | null>>;
export declare function back(callback?: NavigationCallback): ThunkAction<Promise<HistoryItem | null>>;
export {};
