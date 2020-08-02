import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface AuthResponseData {
  token: string;
  userId: number;
  expiraEn: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line: variable-name
  private _userIsAuthenticated = false;
  // tslint:disable-next-line: variable-name
  private _userId = null;

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  get userId() {
    return this._userId;
  }

  constructor(private http: HttpClient) {}

  loguear(email: string, pwd: string) {
    return this.http.post<AuthResponseData>(environment.URL_LOGUEAR, { password: pwd, mail1: email});
  }

  login() {
    this._userIsAuthenticated = true;
  }

  logout() {
    this._userIsAuthenticated = false;
  }
}
