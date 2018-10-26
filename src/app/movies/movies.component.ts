import { Component, OnInit } from '@angular/core';

import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[];
  tempMOvie : Movie;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies()
    .subscribe(movies => this.movies = movies);
  }

  add(movieTitle: string): void {
    console.log("sdsd")
    movieTitle = movieTitle.trim();
    this.tempMOvie =
      {
        imdbId: "tt3423112112",
        movieTitle: movieTitle,
        yearOfRelease: "2018",
        comment: "Thrilling Experience",
        rating: 4.5,
        posterUrl: "https://m.media-amazon.com/images/M/MV5BNTU3ZjEzMTYtYThjMC00ZjljLNzA@._V1_QL50_SY1000__.jpg"
    };
    if (!movieTitle) { return; }
    this.movieService.addMovie(this.tempMOvie)
      .subscribe(movies => {
        this.movies.push(movies);
      });
  }
  

  delete(movie: Movie): void {
    this.movies = this.movies.filter(m => m !== movie);
    this.movieService.deleteMovie(movie).subscribe();
  }

}
 