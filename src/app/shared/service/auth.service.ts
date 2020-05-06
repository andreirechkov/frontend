import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from '../interface/user';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {Channel} from '../interface/channel';

const API_USERS = '/api/users/';
const API_CONTACT = '/api/contact/';
const API_NEWS = '/api/news/';
const API_Profile = '/api/profile/';
const API_AUTH = '/api/auth/';
const API_Channel = 'api/chat/?username=';
const API_Channel_ADD = 'api/chat/create/';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private token: string = null;
  private userId: string = null;
  private username: string = null;

  constructor(private http: HttpClient,
              private  router: Router) { }

  public getChannel(username: string): Observable<any> {
    return this.http.get<any>(API_Channel + `${username}`);
  }

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Token 6100526eb846ac97b5190ffb45f3e7401926a0f5'
    })
  };
  public addContactChannel(body): Observable<any> {
    return this.http.post<any>(API_Channel_ADD, body, this.httpOptions);
  }

  public getChannelUsername(username: string): Observable<any> {
    return this.http.get<any>(`api/chat/?username=${username}`);
  }

  public login(user: User): Observable<{token: string, id: string, username: string}> {
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

  public getUserAll(): Observable<Array<User>> {
    return this.http.get<Array<User>>(API_USERS);
  }

  public getNewsAll(): Observable<Array<any>> {
    return this.http.get<Array<any>>(API_NEWS);
  }

  public getUser(userId: any = this.getUserId()): Observable<User> {
    return this.http.get<User>(API_USERS + `${userId}`);
  }

  public register(body): Observable<User> {
    return this.http.post<User>(API_USERS, body);
  }

  public registerContact(body): Observable<User> {
    return this.http.post<User>(API_CONTACT, {
      user: body
    });
  }

  public news(body, image: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('images', image, image.name);
    formData.append('user', body.user);
    formData.append('nameNews', body.nameNews);
    formData.append('content', body.content);
    formData.append('coordinate', body.coordinate);
    formData.append('price', body.price);
    return this.http.post<User>(API_NEWS, formData);
  }

  public profile(body, image: any): Observable<any> {
    const formData: FormData = new FormData();
    if (image) {
      formData.append('image', image);
    }
    formData.append('firstName', body.firstName);
    formData.append('lastName', body.lastName);
    formData.append('email', body.email);
    formData.append('phone', body.phone);
    formData.append('typeUser', body.typeUser);
    formData.append('city', body.city);
    formData.append('area', body.area);
    formData.append('content', body.content);
    return this.http.put<User>(API_Profile + `${this.getUserId()}/`, formData);
  }

  public setToken(token: string, id?: string, username?:string): void {
    this.token = token;
    this.userId = id;
    this.username = username;
  }

  public getToken(): string {
    return this.token;
  }

  public getUserId(): string {
    return localStorage.getItem('user-id');
  }

  public getUserName(): string {
    return localStorage.getItem('username');
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
