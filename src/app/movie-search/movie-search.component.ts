import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { switchMap, mapTo } from 'rxjs/operators';

import { Movie} from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: [ './movie-search.component.css' ]
})
export class MovieSearchComponent implements OnInit {
  $movies: Observable<Movie[]>;
  private searchTerms = new Subject<string>();

  constructor(private movieService: MovieService) {}

    onSearch(term: string): void {
      this.movieService.getMovieTmdb(term);
    }   
  
    ngOnInit(): void {}

    
   
  
  
  
  
  
  

}

