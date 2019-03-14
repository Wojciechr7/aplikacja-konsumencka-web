import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Ad } from '../models/ad';
import {GLOBAL} from '../config';


@Injectable({ providedIn: 'root' })
export class AdService {

    constructor(private http: HttpClient) {

    }


    public addAd(data: Ad): Observable<Ad> {
        return this.http.post<Ad>(`${GLOBAL.URL}/Advertisements`, data);
    }
}
