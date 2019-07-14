import { Component, OnInit } from '@angular/core';
import { Store, State, select } from '@ngrx/store';
import { JobsState, selectJobs } from 'src/app/store/reducers';
import { fetchJobs } from 'src/app/store/actions';
import { Job, StatusColor } from 'src/app/models';
import { MatTableDataSource } from '@angular/material';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  providers: [DatePipe]
})
export class JobsComponent implements OnInit {
  jobs: Job[];
  displayedColumns: string[] = ['applicationName', 'scheduledStartTime', 'scheduledEndTime', 'actualStartTime', 'actualEndTime', 'status'];
  dataSource: MatTableDataSource<Job>;
  constructor(private store$: Store<JobsState>, private datepipe: DatePipe) { }
  filteredValues = {
    applicationName: '', scheduledStartTime: '', scheduledEndTime: '',
    actualStartTime: '', actualEndTime: ''
  };
  nameFilter = new FormControl('');
  dateFilter = new FormControl('');
  ngOnInit() {
    this.store$.dispatch(fetchJobs());
    this.store$.pipe(select(selectJobs)).subscribe((jobs: Job[]) => {
      if (jobs.length > 0) {
        console.log(jobs);
        jobs.forEach((j) => {
          j.scheduledStartTime = this.datepipe.transform(j.scheduledStartTime, 'd/M/yyyy')
          j.scheduledEndTime = this.datepipe.transform(j.scheduledEndTime, 'd/M/yyyy')
          j.actualStartTime = this.datepipe.transform(j.actualStartTime, 'd/M/yyyy')
          j.actualEndTime = this.datepipe.transform(j.actualEndTime, 'd/M/yyyy')
          j.color = this.mapStatusColor(j.status)
        });
        this.dataSource = new MatTableDataSource(jobs);
        this.dataSource.filterPredicate = this.tableFilter();

      }
    });
    this.nameFilter.valueChanges
      .subscribe(
        name => {
          this.filteredValues.applicationName = name;
          this.dataSource.filter = JSON.stringify(this.filteredValues);
        }
      )
    this.dateFilter.valueChanges
      .subscribe(
        date => {
          this.filteredValues.scheduledStartTime = this.datepipe.transform(date, 'd/M/yyyy');
          this.dataSource.filter = JSON.stringify(this.filteredValues);
        }
      )

  }

  tableFilter(): (data: any, filter: string) => boolean {
    let filterFunction = (data, filter): boolean => {
      let searchTerms = this.filteredValues;
      if (searchTerms.applicationName.length > 0 && searchTerms.scheduledStartTime.length > 0) {
        return data.applicationName.toLowerCase().includes(searchTerms.applicationName.toLowerCase()) &&
          data.scheduledStartTime === searchTerms.scheduledStartTime;
      } else if (searchTerms.applicationName.length > 0) {
        return data.applicationName.toLowerCase().includes(searchTerms.applicationName.toLowerCase());
      } else if (searchTerms.scheduledStartTime.length > 0) {
        return data.scheduledStartTime === searchTerms.scheduledStartTime;
      }
      return true;
    }
    return filterFunction;
  }

  private mapStatusColor(status: string) {
    let color: string;
    switch (status) {
      case 'Started':
        color = StatusColor.started
        break;
      case 'Not Started':
        color = StatusColor.notStarted
        break;
      case 'Completed':
        color = StatusColor.completed
        break;
      case 'Failed':
        color = StatusColor.failed
        break;
      default:
        break;
    }
    return color
  }


}
