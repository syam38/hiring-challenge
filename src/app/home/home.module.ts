import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MatToolbarModule, MatButtonModule, MatTableModule, MatFormFieldModule, MatInputModule, } from '@angular/material';
import { JobsComponent } from './jobs/jobs.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    JobsComponent,
    ConfigurationComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class HomeModule { }
