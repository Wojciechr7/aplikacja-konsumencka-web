import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {GLOBAL} from '../config';
import {PostMessage} from '../models/message';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    constructor(public http: HttpClient) {
    }

    public postMessage(data: PostMessage, id: string): Observable<PostMessage> {
        return this.http.post<PostMessage>(`${GLOBAL.URL}/messages/${id}`, data);
    }
}
