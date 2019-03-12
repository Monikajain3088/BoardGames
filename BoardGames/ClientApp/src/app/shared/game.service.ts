import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class GameService {
  public game: Game[];

  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {

  }
 public getGameList() {
     return this.http.get<Game[]>('https://localhost:44341/' + 'api/Visitor/GetGamesRatings');
  }
  public saveUserGameRating(VistorRatingUpdate) : Observable<any> {
    return this.http.post<any>('https://localhost:44341/' + 'api/Visitor/saveUserGameRating',VistorRatingUpdate,httpOptions)
    .pipe(map(res => res),
    catchError( this.handleError<any>('visitor'))
    );
  }

  private handleError<T> (operation = 'visitor', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      console.log(`${operation} failed: ${error.message}`);
      return throwError(error);
    };
  }
}

export interface Game {
  GameName: string;
  AvgRating: string;
  UserInPutRating: number;
  GameId: number;
}
