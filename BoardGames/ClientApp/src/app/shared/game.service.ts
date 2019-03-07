import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
export interface Game {
  GameName: string;
  AvgRating: string;
  UserInPutRating: number;
  GameId: number;
}
