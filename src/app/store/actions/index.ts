import { createAction, props } from '@ngrx/store';
import { Job } from 'src/app/models';

export const fetchJobs = createAction('[Jobs] Fetch Jobs');
export const fetchJobsSuccess = createAction('[Jobs] Fetch Jobs Success', props<{payload: { jobs: Job[] }}>());
export const fetchJobsFailure = createAction('[Jobs] Fetch Jobs Failure', props<{payload: { error: Error }}>());
