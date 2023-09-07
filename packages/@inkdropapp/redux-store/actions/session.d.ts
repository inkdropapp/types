import type { SessionStatus } from 'inkdrop-consts';
import type { AccountProfile } from '@inkdropapp/model-private';
import type { SessionProfile, SessionState } from '../reducers/session';
export declare const SESSION_UPDATE = "SESSION_UPDATE";
export declare const SESSION_UPDATE_OLD = "SESSION_UPDATE_OLD";
export type SessionActionType = {
    type: 'SESSION_UPDATE_OLD';
    payload: {
        status: SessionStatus;
        userId: string | null;
        profile: SessionProfile | null;
        hasPaymentIssue: boolean;
        remoteSessionChecked: boolean;
    };
} | {
    type: 'SESSION_UPDATE';
    payload: SessionState;
};
/**
 * @deprecated Use `updateState` instaed
 */
export declare function update(status: SessionStatus, account: AccountProfile | null, remoteSessionChecked: boolean): SessionActionType;
export declare function updateState(state: SessionState): SessionActionType;
