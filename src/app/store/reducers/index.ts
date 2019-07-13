import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on,
  Action
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { Job, Error } from 'src/app/models';
import { fetchJobsSuccess, fetchJobsFailure } from '../actions';

export interface State {
  jobs: Job[],
  error: Error
}

const initialState: State = {
  jobs: [],
  error: null
}

export const reducers: ActionReducer<State | undefined, Action> = createReducer(initialState,
  on(fetchJobsSuccess, (state, { payload }) => ({ ...state, jobs: payload.jobs })),
  on(fetchJobsFailure, (state, { payload }) => ({ ...state, err: payload.error, jobs:[] })),
);



export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
