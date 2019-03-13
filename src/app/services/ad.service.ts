import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Ad } from '../models/ad';
import {GLOBAL} from '../config';


@Injectable({ providedIn: 'root' })
export class AdService {

    private adSubject: BehaviorSubject<Ad>;
    public ad: Observable<Ad>;

    constructor(private http: HttpClient) {
        this.adSubject = new BehaviorSubject<Ad>(JSON.parse(localStorage.getItem('ad')));
        this.ad = this.adSubject.asObservable();
    }


    public addAd(data: Ad): Observable<Ad> {
        return this.http.post<Ad>(`${GLOBAL.URL}/Advertisements`, data);
    }
}
