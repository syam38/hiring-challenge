import { Component, OnInit } from '@angular/core';
import { Store, State, select } from '@ngrx/store';
import { JobsState, selectJobs } from 'src/app/store/reducers';
import { fetchJobs } from 'src/app/store/actions';
import { Job, StatusColor } from 'src/app/models';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  providers: [DatePipe]
})
export class JobsComponent implements OnInit {
  jobs: Job[];
  displayedColumns: string[] = ['applicationName', 'scheduledStartTime', 'scheduledEndTime', 'actualStartTime', 'actualEndTime', 'status', 'action'];
  dataSource: MatTableDataSource<Job>;
  constructor(private store$: Store<JobsState>, private datepipe: DatePipe, private dialog: MatDialog) { }
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
        jobs.forEach((j) => {
          j.scheduledStartTime = new Date(j.scheduledStartTime)
          j.scheduledEndTime = new Date(j.scheduledEndTime)
          j.actualStartTime = new Date(j.actualStartTime)
          j.actualEndTime = new Date(j.actualEndTime)
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
          this.filteredValues.scheduledStartTime = date;
          this.dataSource.filter = JSON.stringify(this.filteredValues);
        }
      )

  }

  tableFilter(): (data: any, filter: string) => boolean {
    let filterFunction = (data, filter): boolean => {
      let searchTerms = this.filteredValues;
      if (searchTerms.applicationName.length > 0 && searchTerms.scheduledStartTime.toString().length > 0) {
        return data.applicationName.toLowerCase().includes(searchTerms.applicationName.toLowerCase()) &&
          data.scheduledStartTime.toDateString() === new Date(searchTerms.scheduledStartTime).toDateString();
      } else if (searchTerms.applicationName.length > 0) {
        return data.applicationName.toLowerCase().includes(searchTerms.applicationName.toLowerCase());
      } else if (searchTerms.scheduledStartTime.toString().length > 0) {
        return data.scheduledStartTime.toDateString() === new Date(searchTerms.scheduledStartTime).toDateString();
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

  startEdit(id, applicationName, startTime, endTime) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { id: id, applicationName:  applicationName, startTime: startTime, endTime: endTime}
    } );

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
      }
    });
  }


}
