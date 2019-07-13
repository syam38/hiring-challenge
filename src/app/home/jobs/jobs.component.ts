import { Component, OnInit } from '@angular/core';
import { Store, State, select } from '@ngrx/store';
import { JobsState, selectJobs } from 'src/app/store/reducers';
import { fetchJobs } from 'src/app/store/actions';
import { Job } from 'src/app/models';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  jobs: Job[];
  displayedColumns: string[] = [ 'Application Name', 'Scheduled Start Time', 'Scheduled End Time', 'Actual Start Time', 'Actual End Time'];
  dataSource: MatTableDataSource<Job>;
  constructor(private store$: Store<JobsState>) { }

  ngOnInit() {
    this.store$.dispatch(fetchJobs());
    this.store$.pipe(select(selectJobs)).subscribe((jobs) => {
      if (jobs.length > 0) {
        this.dataSource = new MatTableDataSource(jobs);
      }
    });
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
