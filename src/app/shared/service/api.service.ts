import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from '../interface/user';

const API_USERS = "http://127.0.0.1:8000/users/";
const API_AUTH = "http://127.0.0.1:8000/auth/";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  public signIn(data: User): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);
    return this.http.post(API_AUTH, formData);
  }

  public postNewUser(body): Observable<User> {
    return this.http.post<User>(API_USERS, body);
  }
}
