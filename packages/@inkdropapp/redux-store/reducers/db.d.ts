import type { DBActionType } from '../actions/db';
export type DBSyncState = {
    lastSyncStatus?: string;
    isSyncing?: boolean;
    lastSyncTime: number | null | undefined;
    lastSyncError?: Error | null;
};
export type DBChanges = {
    [prop: string]: any;
    cancel: (...args: Array<any>) => any;
};
export type DBState = DBSyncState & {
    changes?: DBChanges;
};
export declare const initialDBState: DBState;
export default function db(state: DBState | undefined, action: DBActionType): DBState;
