import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public adminview: AdminView[];
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) { }

  public GetVisitorGamesRatingDetails() {
    return this.http.get<AdminView[]>('https://localhost:44341/' + 'api/Admin/GamesVisitorRatings');
 }

 public AddGame() {
  return this.http.get<AdminView[]>('https://localhost:44341/' + 'api/Admin/AddGame');
}

 public DeleteGame() {
  return this.http.get<AdminView[]>('https://localhost:44341/' + 'api/Admin/DeleteGame');
}
}

export interface AdminView {
  GameName: string;
  VisitorName: string;
  Rating: number;
  GameId: number;
}
