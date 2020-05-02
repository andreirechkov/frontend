import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from '../interface/user';
import { tap } from 'rxjs/operators';
import {Router} from '@angular/router';

const API_USERS = '/api/users/';
const API_AUTH = '/api/auth/';
const API_Channel = 'api/chat/?username=';
const API_Channel_ADD = 'api/chat/create';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private token: string = null;
  private userId: string = null;

  constructor(private http: HttpClient,
              private  router: Router) { }

  public getChannel(username: string): Observable<any> {
    return this.http.get<any>(API_Channel + `${username}`);
  }

  public addContactChannel(body): Observable<any> {
    return this.http.post<any>(API_Channel_ADD, body);
  }

  public login(user: User): Observable<{token: string, id: string}> {
    return this.http.post<{token: string, id: string}>(API_AUTH, user)
      .pipe(
        tap(res => {
          localStorage.setItem('auth-token', res.token);
          localStorage.setItem('user-id', res.id);
          this.setToken(res.token, res.id);
        })
      )
  }

  public getUser(): Observable<User> {
    return this.http.get<User>(API_USERS + `${this.getUserId()}`);
  }

  public register(body): Observable<User> {
    return this.http.post<User>(API_USERS, body);
  }

  public setToken(token: string, id?: string): void {
    this.token = token;
    this.userId = id;
  }

  public getToken(): string {
    return this.token;
  }

  public getUserId(): string {
    return localStorage.getItem('user-id');
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
