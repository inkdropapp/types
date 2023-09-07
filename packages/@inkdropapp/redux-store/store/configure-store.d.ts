import { Action as ReduxAction, Store } from 'redux';
import type { ReducersMapObject, Middleware } from 'redux';
import type { State, Action, ThunkContext } from '../types';
export default function configureStore<AppState extends Record<string, unknown>, AppAction extends ReduxAction, AppThunkContext extends ThunkContext, AppReducers extends ReducersMapObject<AppState, AppAction>>(getContext: () => AppThunkContext, appInitialState: AppState, appMiddlewares: Middleware[], appReducers: AppReducers): Store<State & AppState, Action | AppAction>;
