import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GLOBAL} from '../config';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  public getUserInfo(id: string): Observable<User> {
    return this.http.get<User>(`${GLOBAL.URL}/users/${id}`);
  }
}
