import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { JobsComponent } from './jobs/jobs.component';
import { ConfigurationComponent } from './configuration/configuration.component';

const routes: Routes = [ 
  { path: '', component: HomeComponent, 
  children: [
    {
      path: 'jobs', component: JobsComponent
    },
    {
      path: '', redirectTo: 'jobs'
    },
    {
      path: '', component: ConfigurationComponent
    }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
