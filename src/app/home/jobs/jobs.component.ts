import { Component, OnInit } from '@angular/core';
import { Store, State, select } from '@ngrx/store';
import { JobsState, selectJobs } from 'src/app/store/reducers';
import { fetchJobs } from 'src/app/store/actions';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  constructor(private store$: Store<JobsState>) { }

  ngOnInit() {
    this.store$.dispatch(fetchJobs());
    this.store$.pipe(select(selectJobs)).subscribe((jobs) => {
      console.log('data', jobs);
    });
  }

}
