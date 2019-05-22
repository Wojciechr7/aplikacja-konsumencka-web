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
  public getUsers(): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(`${GLOBAL.URL}/admin/users`);
  }
  public blockUser(id: string) {
    return this.httpClient.put(`${GLOBAL.URL}/admin/users/${id}`, {});
  }
}
