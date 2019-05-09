import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GLOBAL} from '../config';
import {RegisterData} from '../models/user/register';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    public getUserInfo(id: string): Observable<RegisterData> {
        return this.http.get<RegisterData>(`${GLOBAL.URL}/users/${id}`);
    }

    public updateUserInfo(id: string, user: RegisterData): Observable<RegisterData> {
        return this.http.put<RegisterData>(`${GLOBAL.URL}/users/${id}`, user);
    }
}
