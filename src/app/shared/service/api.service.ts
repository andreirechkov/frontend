import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from '../interface/user';

const API_USERS = "http://127.0.0.1:8000/users/";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  public httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  public getLogin(): Observable<User> {
    return this.http.get<User>(API_USERS, {
      headers: this.httpHeaders
    });
  }
}
