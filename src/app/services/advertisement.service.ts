import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {City} from '../models/advertisement/city';
import {Advertisement} from '../models/advertisement/advertisement';
import {GLOBAL} from '../config';
import {ImageAd} from '../models/advertisement/image';
import {Sorting} from '../models/advertisement/sorting';
import {AdvertisementHome} from '../models/advertisement/advertisement-home';
import {Voivodeship} from '../models/advertisement/voivodeship';

@Injectable({providedIn: 'root'})
export class AdvertisementService {
    public files: Array<ImageAd>;
    public sorting: Sorting;
    private filtering: string;
    private page: number;
    public advertisements: Array<Advertisement>;
    private pagesToEnd: number;
    private adFilter: string;
    public adEditingId: string;

    constructor(private http: HttpClient) {
        this.files = [];
        this.adFilter = '';
    }

    set Filtering(val: string) {
        this.filtering = val;
    }

    set Page(val: number) {
        this.page = val;
    }

    set PagesToEnd(val: number) {
        this.pagesToEnd = val;
    }

    set AdFilter(val: string) {
        this.adFilter = val;
    }

    public lazyLoad() {
        this.page++;
        if (this.pagesToEnd) {
            this.getAdvertisements().subscribe((ad: AdvertisementHome) => {
                if (ad) {
                    this.pagesToEnd = ad.pagesToEnd;
                    this.advertisements = [...this.advertisements, ...(ad.advertisement)];
                }
            });
        }
    }

    public addAdvertisement(data: Advertisement): Observable<Advertisement> {
        return this.http.post<Advertisement>(`${GLOBAL.URL}/advertisements`, data);
    }

    public getAdvertisement(id: string): Observable<Advertisement> {
        return this.http.get<Advertisement>(`${GLOBAL.URL}/advertisements/${id}`);
    }

    public updateAdvertisement(data: Advertisement, id: string): Observable<Advertisement> {
        return this.http.put<Advertisement>(`${GLOBAL.URL}/advertisements/${id}`, data);
    }

    public getAdvertisements(): Observable<AdvertisementHome> {
        return this.http.get<AdvertisementHome>(
            `${GLOBAL.URL}/advertisements/${this.sorting.by}/${this.sorting.type}:${this.page}/${this.adFilter}`
        );
    }

    public getUserAdvertisements(id: string): Observable<Array<Advertisement>> {
        return this.http.get<Array<Advertisement>>(`${GLOBAL.URL}/users/advertisements/${id}`);
    }

    public getCitiesV(VoivodeshipId: string): Observable<Array<City>> {
        return this.http.get<Array<City>>(`${GLOBAL.URL}/voivodeships/${VoivodeshipId}/cities`);
    }

    public getVoivodeships(): Observable<Array<Voivodeship>> {
        return this.http.get<Array<Voivodeship>>(`${GLOBAL.URL}/voivodeships`);
    }

    public removeAdvertisement(): Observable<Advertisement> {
        return this.http.delete<Advertisement>(`${GLOBAL.URL}/advertisements/${this.adEditingId}`);
    }

}
