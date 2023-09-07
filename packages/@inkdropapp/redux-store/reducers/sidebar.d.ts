import type { SidebarActionType } from '../actions/sidebar';
import type { BookStats } from '@inkdropapp/pouchdb-store';
export type WorkspaceState = BookStats & {
    bookId: string | undefined;
    visible: boolean;
    loading: boolean;
};
export type SidebarState = {
    workspace: WorkspaceState;
};
export declare const initialSidebarState: SidebarState;
export default function sidebar(state: SidebarState | undefined, action: SidebarActionType): SidebarState;
