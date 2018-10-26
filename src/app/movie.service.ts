import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Movie } from './movie';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class MovieService {
 //private tmdbUrl: string = "https://api.themoviedb.org/3/search/movie";
  //private api_Key: string = "?api_key=51874c54cb8f34d994bf535a1a87fa98";
  // private jackReacherUrl: string = "https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher";
 //private searchUrl: string = "https://api.themoviedb.org/3/search/movie?api_key=51874c54cb8f34d994bf535a1a87fa98&query=";
  private moviesUrl = 'http://localhost:8080/api/v1/movie';  // URL to web api
  private imgPath: string = "https://image.tmdb.org/t/p/w185/"    
  private omdbUrl: string = "http://www.omdbapi.com/?s=";
  private typeMovieUrl: string ="&type=movie";
  private apiKey: string = "&apikey=20a4877f";


  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getMovieTmdb(title:string){
    console.log("get in service");
    console.log(title);
    let preomdburl= "http://www.omdbapi.com/?s=";
    let postomdburl= "&type=movie&apikey=2cc7c887"
    const geturl=`${preomdburl}${title}${postomdburl}`;
      this.http.get(geturl).subscribe(
        data => {
            console.log("get Request is successful ", data);
        },
        error => {
            console.log("Error", error);
        });  
  }



  getMovieOmdb(title: string) {
      let url = `${this.omdbUrl}${title}${this.typeMovieUrl}${this.apiKey}`;
      return this.http.get(url);
  }
  
  /* GET movies whose movieTitle contains search term */
  searchMovies(term: string): Observable<Movie[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Movie[]>(`${this.moviesUrl}/?movieTitle=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Movie[]>('searchMovies', []))
    );
  }

  /** GET movies from the server */
  getMovies (): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesUrl)
      .pipe(
        catchError(this.handleError('getMovies', []))
      );
  }
  

  /** GET movie by imdbId. Will 404 if imdbId not found */
  getMovie(movieTitle: string): Observable<Movie> {
    const url = `${this.moviesUrl}/${movieTitle}`;
    return this.http.get<Movie>(url).pipe(
      catchError(this.handleError<Movie>(`getMovie movieTitle=${movieTitle}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Movie to the server */
  addMovie (movie: Movie): Observable<Movie> {
    console.log("Sdsdsd")
    return this.http.post<Movie>(this.moviesUrl, movie, httpOptions).pipe(
      catchError(this.handleError<Movie>('addMovie'))
    );
  }

  /** DELETE: delete the Movie from the server */
  deleteMovie (movie: Movie | number): Observable<Movie> {
    const imdbId = typeof movie === 'number' ? movie : movie.imdbId;
    const url = `${this.moviesUrl}/${imdbId}`;

    return this.http.delete<Movie>(url, httpOptions).pipe(
      catchError(this.handleError<Movie>('deleteMovie'))
    );
  }

  /** PUT: update the Movie on the server */
  updateMovie (movie: Movie): Observable<any> {
    return this.http.put(this.moviesUrl, movie, httpOptions).pipe(
      catchError(this.handleError<any>('updateMovie'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a MovieService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`MovieService: ${message}`);
  }


}
 


