import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { HomeService } from 'src/app/home/home.service';
import { fetchJobs, fetchJobsSuccess, fetchJobsFailure } from '../actions';
import { props } from '@ngrx/store';

@Injectable()
export class JobEffects {

  loadJobs$ = createEffect(() => this.actions$.pipe(
    ofType(fetchJobs),
    mergeMap(() => this.homeService.getJobs()),
    map((res) => (fetchJobsSuccess({
      payload: {
        jobs: res
      }
    }))),
    catchError(() => (fetchJobsFailure))
  ));

  constructor(
    private actions$: Actions,
    private homeService: HomeService
  ) { }
}