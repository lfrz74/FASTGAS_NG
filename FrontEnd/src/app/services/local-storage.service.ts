import { Injectable } from '@angular/core';
import { Auth } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  credential: Auth  = { email: '', refreshToken: '', uid: '', origen: ''};
  objeto: string;

  constructor() { }

  getAuth() {
    if (localStorage.getItem('Cred') === null) {
      this.credential.uid = '';
      this.credential.email = '';
      this.credential.refreshToken = '';
      this.credential.origen = '';
    } else {
      this.credential = JSON.parse(localStorage.getItem('Cred'));
    }
    return this.credential;
  }

  addAuth(auth: Auth) {
    if (localStorage.getItem('Cred') === null) {
      localStorage.setItem('Cred', JSON.stringify(auth));
    } else {
      localStorage.removeItem('Cred');
      localStorage.setItem('Cred', JSON.stringify(auth));
    }
  }

  getObject(key: string) {
    if (localStorage.getItem(key) !== null) {
      this.objeto = JSON.parse(localStorage.getItem(key));
    } else {
      this.objeto = '';
    }
    return this.objeto;
  }
  addObject(key: string, value: string) {
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, value);
    } else {
      localStorage.removeItem(key);
      localStorage.setItem(key, value);
    }
  }
}
