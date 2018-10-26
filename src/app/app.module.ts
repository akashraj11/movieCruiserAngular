import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { MovieDetailComponent }  from './movie-detail/movie-detail.component';
import { MoviesComponent }      from './movies/movies.component';
import { MovieSearchComponent }  from './movie-search/movie-search.component';
import { MessagesComponent }    from './messages/messages.component';
import { MaterialModule } from './material';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,

  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    MoviesComponent,
    MovieDetailComponent,
    MessagesComponent,
    MovieSearchComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


