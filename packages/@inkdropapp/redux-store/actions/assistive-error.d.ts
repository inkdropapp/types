import { AssistiveError } from 'inkdrop-consts';
export declare const ASSISTIVE_ERROR_SET = "ASSISTIVE_ERROR_SET";
export declare const ASSISTIVE_ERROR_CLEAR = "ASSISTIVE_ERROR_CLEAR";
export type AssistiveErrorActionType = {
    type: 'ASSISTIVE_ERROR_SET';
    payload: AssistiveError;
} | {
    type: 'ASSISTIVE_ERROR_CLEAR';
};
export declare function setError(error: AssistiveError): AssistiveErrorActionType;
export declare function clear(): AssistiveErrorActionType;
