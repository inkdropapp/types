import type { ConfigActionType } from '../actions/config';
import type { Config } from '@inkdropapp/model-private';
export type ConfigState = Config;
export declare const initialConfigState: ConfigState;
export default function notes(state: Config | undefined, action: ConfigActionType): ConfigState;
