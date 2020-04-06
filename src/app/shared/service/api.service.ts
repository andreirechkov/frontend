import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public baseUrl: string = "http://127.0.0.1:8000";
  public httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  public getLogin(search: string): Observable<any> {
    return this.http.get(this.baseUrl + `/test/`, {
      headers: this.httpHeaders
    });
  }
}
