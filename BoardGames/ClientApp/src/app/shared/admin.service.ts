import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private _rowData:any;
  get rowData():any {
    return this._rowData;
}
set rowData(theBar:any) {
    this._rowData = theBar;
}

 // public adminview: AdminView[];
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) { }

  public GetVisitorGamesRatingDetails() {
    return this.http.get<VisitorGameCollection[]>('https://localhost:44341/' + 'api/Admin/GamesVisitorRatings');
 }

 // Add Game on click og "+Add Game"
 public AddGame(GameName: string) {
  const headers = new HttpHeaders().set('content-type', 'application/json');
  var body = {
    GameName: GameName,
    CreatedBy: "Admin"
  }
  return this.http.post<any>('https://localhost:44341/' + 'api/Admin/AddGame', body, {
    headers});
}
 
 public DeleteGame(GameId: number) {
  return this.http.delete<any>('https://localhost:44341/' + 'api/Admin/DeleteGame?gameId='+GameId);
}
}

export interface VisitorGameCollection
{
  GameName: string;
  GameId: number;
  VisitorCount:number;
  Visitors:visitorDetails[]

}
export interface visitorDetails
{
  VisitorName :string,
  VisitorRating : number;

}