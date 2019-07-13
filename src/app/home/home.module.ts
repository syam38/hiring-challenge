import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MatToolbarModule, MatButtonModule, MatTableModule } from '@angular/material';
import { JobsComponent } from './jobs/jobs.component';
import { ConfigurationComponent } from './configuration/configuration.component';

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
    MatTableModule
  ]
})
export class HomeModule { }
