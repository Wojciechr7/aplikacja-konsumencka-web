import {Injectable} from '@angular/core';
import {GLOBAL} from '../config';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user/user';
import {Observable} from 'rxjs';
import {Advertisement} from '../models/advertisement/advertisement';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(private httpClient: HttpClient) {
    }

    public getUsers(): Observable<Array<User>> {
        return this.httpClient.get<Array<User>>(`${GLOBAL.URL}/admin/users`);
    }

    public blockUser(id: string) {
        return this.httpClient.put(`${GLOBAL.URL}/admin/users/${id}`, {});
    }

    public getAdvertisements(): Observable<Array<Advertisement>> {
        return this.httpClient.get<Array<Advertisement>>(`${GLOBAL.URL}/admin/advertisements`);
    }

    public removeAdvertisement(id): Observable<Advertisement> {
        return this.httpClient.delete<Advertisement>(`${GLOBAL.URL}/admin/advertisements/${id}`);
    }

    public validateAdvertisement(id): Observable<Advertisement> {
        return this.httpClient.put<Advertisement>(`${GLOBAL.URL}/admin/advertisements/${id}`, {});
    }
}
