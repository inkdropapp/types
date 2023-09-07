import type { ThunkAction } from '../types';
import type { RootStats } from '@inkdropapp/pouchdb-store';
export declare const STATS_UPDATE = "STATS_UPDATE";
export type StatsActionType = {
    type: 'STATS_UPDATE';
    payload: RootStats;
};
export declare function update(): ThunkAction<Promise<void>>;
