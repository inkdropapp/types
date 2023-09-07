import type { ThunkAction } from '../types';
import type { BookStats } from '@inkdropapp/pouchdb-store';
export declare const SIDEBAR_WORKSPACE_SHOW = "SIDEBAR_WORKSPACE_SHOW";
export declare const SIDEBAR_WORKSPACE_UPDATE = "SIDEBAR_WORKSPACE_UPDATE";
export declare const SIDEBAR_WORKSPACE_HIDE = "SIDEBAR_WORKSPACE_HIDE";
export declare const SIDEBAR_WORKSPACE_UNLOAD = "SIDEBAR_WORKSPACE_UNLOAD";
export type SidebarActionType = {
    type: 'SIDEBAR_WORKSPACE_SHOW';
    payload: string;
} | {
    type: 'SIDEBAR_WORKSPACE_UPDATE';
    payload: {
        bookId: string;
        stats: BookStats;
    };
} | {
    type: 'SIDEBAR_WORKSPACE_HIDE';
} | {
    type: 'SIDEBAR_WORKSPACE_UNLOAD';
};
export declare function showWorkspace(bookId: string): SidebarActionType;
export declare function updateWorkspace(bookId: string | undefined): ThunkAction<Promise<void>>;
export declare function hideWorkspace(): SidebarActionType;
export declare function unloadWorkspace(): SidebarActionType;
