import type { Config } from '@inkdropapp/model-private';
export declare const CONFIG_UPDATE = "CONFIG_UPDATE";
import type { ThunkAction } from '../types';
export type ConfigActionType = {
    type: 'CONFIG_UPDATE';
    payload: Config;
};
export declare function update(config: Config): ConfigActionType;
export declare function setValue(path: string, value: number | string | boolean | Record<string, any> | void): ThunkAction<Promise<void>>;
export declare function bulkSetValue(items: Record<string, number | string | boolean | Record<string, any> | void>): ThunkAction<Promise<void>>;
