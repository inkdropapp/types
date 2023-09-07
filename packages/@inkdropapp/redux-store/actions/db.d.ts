import type { ThunkAction, Dispatch, GetState } from '../types';
import type { DBSyncState, DBChanges } from '../reducers/db';
export declare const DB_WATCH = "DB_WATCH";
export declare const DB_UNWATCH = "DB_UNWATCH";
export declare const DB_SYNC = "DB_SYNC";
export type DBActionType = {
    type: 'DB_WATCH';
    payload: DBChanges;
} | {
    type: 'DB_UNWATCH';
} | {
    type: 'DB_SYNC';
    payload: DBSyncState;
};
export declare function watch(): ThunkAction<void>;
export declare function unwatch(): ThunkAction<void>;
export declare function change(dispatch: Dispatch, getState: GetState, change: Record<string, any>): void;
export declare const changeNotes: (change: Record<string, any>, getState: GetState, dispatch: Dispatch) => void;
export declare const changeBooks: (change: Record<string, any>, getState: GetState, dispatch: Dispatch) => void;
export declare const changeTags: (change: Record<string, any>, getState: GetState, dispatch: Dispatch) => void;
export declare function sync(event: string, _status: Record<string, any> | undefined, error: Error | null | undefined, isSyncing: boolean, lastSyncTime: number | null | undefined): DBActionType;
