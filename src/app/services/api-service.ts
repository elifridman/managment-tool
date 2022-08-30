import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Tag} from "../interfaces/tag.interface";
import {environment} from "../../environments/environment";
import {User} from "../interfaces/user.interface";
import {Observable} from "rxjs";
import {FormControl, ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {UserData} from "../interfaces/userData.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url: string = '';
  constructor(private httpClient: HttpClient) { }

  setUrlPath(url: string) {
    this.url = url;
  }

  getItems() {
    //`${environment.apiUrl}tags`
    //`${environment.apiUrl}tiles`
    return this.httpClient.get<Tag[]>(this.url);
  }

  getTagById(id: string) {
    return this.httpClient.get<Tag>(`${environment.apiUrl}tags/${id}`);
  }

  createTag(tag: Partial<Tag>) {
    return this.httpClient.post(`${environment.apiUrl}tags`, tag);
  }

  registerUser(user: User): Observable<UserData> {
    return this.httpClient.post<UserData>(`${environment.apiUrl}register`, user);
  }

  loginUser(user: User): Observable<UserData>  {
    return this.httpClient.post<UserData>(`${environment.apiUrl}login`, user);
  }

  getUserById(id: string) {
    return this.httpClient.get(`${environment.apiUrl}users/${id}`)
  }
}
