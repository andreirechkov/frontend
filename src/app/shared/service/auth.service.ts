import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from '../interface/user';
import { tap } from 'rxjs/operators';
import {Router} from '@angular/router';

const API_USERS = "http://127.0.0.1:8000/users/";
const API_AUTH = "http://127.0.0.1:8000/api/auth/";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private token: string = null;

  constructor(private http: HttpClient,
              private  router: Router) { }

  public login(user: User): Observable<{token: string}> {
    return this.http.post<{token: string}>(API_AUTH, user)
      .pipe(
        tap(({token}) => {
          localStorage.setItem('auth-token', token);
          this.setToken(token);
        })
      )
  }

  public register(body): Observable<User> {
    return this.http.post<User>(API_USERS, body);
  }

  public setToken(token: string): void {
    this.token = token;
  }

  public getToken(): string {
    return this.token;
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public logout(): void {
    this.setToken(null);
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
