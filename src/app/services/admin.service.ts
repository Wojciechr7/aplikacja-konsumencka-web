import { Injectable } from '@angular/core';
import {GLOBAL} from '../config';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }
  public getUsers(): Observable<User> {
    return this.httpClient.get<User>(`${GLOBAL.URL}/admin/users`);
  }
}
