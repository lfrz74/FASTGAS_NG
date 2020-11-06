import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap, map } from 'rxjs/operators';
import { BehaviorSubject, from } from 'rxjs';
import { Plugins } from '@capacitor/core';

import { Auth } from '../models/auth';
import { AuthResponseData } from '../models/authResponseData';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy{
  // tslint:disable-next-line: variable-name
  private _user = new BehaviorSubject<Auth>(null);
  // tslint:disable-next-line: variable-name
  private _userIsAuthenticated = false;
  // tslint:disable-next-line: variable-name
  private _userId = null;

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map(us => {
        if (us) {
          return !!us.refreshToken;
        } else {
          return false;
        }
      }));
  }

  get userId() {
    return this._userId;
  }

  constructor(private http: HttpClient) {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  loguear(email: string, pwd: string) {
    return this.http.post<AuthResponseData>(environment.URL_LOGUEAR, { password: pwd, mail1: email});
  }

  verificarToken(token: string, uuid: string, email: string) {
    return this.http.post<AuthResponseData>(environment.URL_VERIF_TOKEN, { tokenf: token, uid: uuid, mail1: email});
  }

  login() {
    this._userIsAuthenticated = true;
  }

  logout() {
    this._userIsAuthenticated = false;
  }
}
