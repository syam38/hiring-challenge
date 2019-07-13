import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './db/db.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      'jobs': reducers
    }),
    HttpClientModule,
    environment.production ?
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 100 }) : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
