import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from '../interface/user';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

const API_USERS = '/api/users/';
const API_CONTACT = '/api/contact/';
const API_AUTH = '/api/auth/';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private token: string = null;
  private userId: string = null;
  private username: string = null;

  constructor(private http: HttpClient,
              private  router: Router) {}


  public getToken(): string {
    return this.token;
  }

  public setToken(token: string, id?: string, username?:string): void {
    this.token = token;
    this.userId = id;
    this.username = username;
  }

  public setLogin(user: User): Observable<{token: string, id: string, username: string}> {
    return this.http.post<{token: string, id: string, username: string}>(API_AUTH, user)
      .pipe(
        tap(res => {
          localStorage.setItem('auth-token', res.token);
          localStorage.setItem('user-id', res.id);
          localStorage.setItem('username', res.username);
          this.setToken(res.token, res.id, res.username);
        })
      )
  }

  public setRegister(body): Observable<User> {
    return this.http.post<User>(API_USERS, body);
  }

  public setRegisterContact(body): Observable<User> {
    return this.http.post<User>(API_CONTACT, {
      user: body
    });
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
