import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { JobsState } from 'src/app/store/reducers';
import { modifyJob } from 'src/app/store/actions';
import { Job } from 'src/app/models';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Job, private store$: Store<JobsState> ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.store$.dispatch(modifyJob({
      payload: {
        job: this.data
      }
    }));
  }
}
