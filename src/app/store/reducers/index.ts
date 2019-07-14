import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on,
  Action,
  State
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { Job, Error } from 'src/app/models';
import { fetchJobsSuccess, fetchJobsFailure, modifyJob } from '../actions';

export interface JobsState {
  jobs: Job[],
  error: Error
}

const initialState: JobsState = {
  jobs: [],
  error: null
}
 
export const selectJobsFeature = createFeatureSelector<JobsState>('jobs');

export const selectJobs = createSelector(
  selectJobsFeature,
  (state: JobsState) => state.jobs
);

function modifyJobInfo(job, jobs: Job[]) {
  let jobsCopy = JSON.parse(JSON.stringify(jobs));
  let jobTobeModified: Job = jobsCopy.find((j) => j.id === job.id);
  jobTobeModified.applicationName = job.applicationName;
  jobTobeModified.scheduledStartTime = job.startTime;
  jobTobeModified.scheduledEndTime = job.endTime;
  console.log(jobsCopy);
  return jobsCopy;
}


export const reducers: ActionReducer<JobsState | undefined, Action> = createReducer(initialState,
  on(fetchJobsSuccess, (state, { payload }) => ({ ...state, jobs: payload.jobs })),
  on(fetchJobsFailure, (state, { payload }) => ({ ...state, err: payload.error, jobs:[] })),
  on(modifyJob, (state, { payload }) => ({ ...state, jobs: modifyJobInfo(payload.job, state.jobs) })),
);




export const metaReducers: MetaReducer<JobsState>[] = !environment.production ? [] : [];
