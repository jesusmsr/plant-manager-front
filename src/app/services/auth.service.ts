import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = 'http://127.0.0.1:8000';

  constructor(
    private http: HttpClient,
    private token: TokenStorageService
  ) { }

  login(email: string, password: string) {
    return this.http.post(`${this.BASE_URL}/account/login-app/`, {
      email: email,
      password: password
    });
  }

  logout(): void {
    this.token.signOut();
  }

  refreshToken(token: string) {
    return this.http.post(this.BASE_URL + '/api/token/refresh/', {
      refresh: token
    });
  }
}
