import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { throwError, Observable } from 'rxjs';





const endpoint = 'https://localhost:44341/api/Auth/GenerateToken';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}
  accessToken: string;
  currentUser: string = null;
  redirectUrl: string;
  get isLoggedIn(): boolean {
    if (localStorage.getItem('userName') == null) {
       return false;
    } else {
       return true;
    }
}
logout(): void {
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires');
  localStorage.removeItem('userName') ;
  this.currentUser = null;
}

private setSession(authResult, userName) {
  const expiresAt = moment().add(authResult.expires, 'second');
  localStorage.setItem('id_token', authResult.token);
  localStorage.setItem('expires', JSON.stringify(expiresAt.valueOf()) );
  localStorage.setItem('userName', userName) ;
return authResult;
}


public LoginIn(userName: string, password: string) {

  const credentials = {
    LoginId: userName,
    Password: password
};
    return this.http.post(endpoint, credentials,httpOptions).subscribe(result => this.setSession(result, userName)
    ), error => ( this.handleError<any>('Login'));
}

private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return throwError(error);
  };
}
}
export interface TokenParams {
  token: string;
  expiration: string;
}

