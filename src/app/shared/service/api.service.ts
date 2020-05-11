import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const API_USERS = '/api/users/';
const API_NEWS = '/api/news/';
const API_Profile = '/api/profile/';
const API_Channel = 'api/chat/?username=';
const API_Channel_ADD = 'api/chat/create/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,
              private  router: Router) { }

  public getUserAll(): Observable<Array<User>> {
    return this.http.get<Array<User>>(API_USERS);
  }

  public getUser(userId: any = this.getUserId()): Observable<User> {
    return this.http.get<User>(API_USERS + `${userId}`);
  }

  public getNewsAll(): Observable<Array<any>> {
    return this.http.get<Array<any>>(API_NEWS);
  }

  public getUserId(): string {
    return localStorage.getItem('user-id');
  }


  public getUserName(): string {
    return localStorage.getItem('username');
  }

  public getChannelUsername(username: string): Observable<any> {
    return this.http.get<any>(`api/chat/?username=${username}`);
  }

  public getChannel(username: string): Observable<any> {
    return this.http.get<any>(API_Channel + `${username}`);
  }

  public getVacancy(id: number): Observable<any> {
    return this.http.get<any>(API_NEWS + `${id}/`);
  }

  public setNews(body, image: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('images', image, image.name);
    formData.append('user', body.user);
    formData.append('nameNews', body.nameNews);
    formData.append('content', body.content);
    formData.append('coordinate', body.coordinate);
    formData.append('price', body.price);
    return this.http.post<User>(API_NEWS, formData);
  }

  public setContactChannel(body): Observable<any> {
    return this.http.post<any>(API_Channel_ADD, body);
  }

  public setVacancy(body, images: any): Observable<any> {
    const formData: FormData = new FormData();
    images.forEach((image, index) => {
      formData.append(`image${index + 1}`, image.fileToUpload, image.fileToUpload.name);
    });
    formData.append('user', body.user);
    formData.append('nameNews', body.nameNews);
    formData.append('vacancy', body.vacancy);
    formData.append('workTime', body.workTime);
    formData.append('experience', body.experience);
    formData.append('content', body.content);
    formData.append('price', body.price);
    formData.append('category', body.category);
    formData.append('coordinate', body.coordinate);
    formData.append('email', body.email);
    formData.append('phone', body.phone);
    return this.http.post<User>(API_NEWS, formData);
  }

  public editVacancy(body, vacancyId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('user', body.user);
    formData.append('vacancy', body.vacancy);
    formData.append('workTime', body.workTime);
    formData.append('experience', body.experience);
    formData.append('content', body.content);
    formData.append('price', body.price);
    formData.append('category', body.category);
    formData.append('coordinate', body.coordinate);
    formData.append('email', body.email);
    formData.append('phone', body.phone);
    return this.http.put<any>(API_NEWS + `${vacancyId}/`, formData);
  }

  public editProfile(body, image: any): Observable<any> {
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

  public deleteVacancy(id: number): Observable<any> {
    return this.http.delete<any>(API_NEWS + `${id}/`);
  }
}
