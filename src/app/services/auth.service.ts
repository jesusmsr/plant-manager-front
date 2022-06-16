import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = 'http://127.0.0.1:8000';

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string) {
    return this.http.post(`${this.BASE_URL}/account/login-app/`, {
      email: email,
      password: password
    });
  }
}
