import { SessionStatus } from 'inkdrop-consts';
import type { SessionActionType } from '../actions/session';
import '../actions/session';
export type SessionProfile = {
    firstName: string;
    lastName: string;
};
export type SessionState = {
    status: SessionStatus | null;
    isReadOnly: boolean;
    userId: string | null;
    profile: SessionProfile | null | undefined;
    hasPaymentIssue: boolean;
    remoteSessionChecked: boolean;
};
export declare const initialSessionState: SessionState;
export default function session(state: SessionState | undefined, action: SessionActionType): SessionState;
