import type { StatsActionType } from '../actions/stats';
import type { RootStats } from '@inkdropapp/pouchdb-store';
export type StatsState = RootStats;
export declare const initialStatsState: StatsState;
export default function sidebar(state: RootStats | undefined, action: StatsActionType): StatsState;
