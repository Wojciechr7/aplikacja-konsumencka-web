import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {City} from '../models/city';
import {Ad} from '../models/ad';
import {GLOBAL} from '../config';
import {ImageAd} from '../models/image';
import {ToastrService} from 'ngx-toastr';
import {Sorting} from '../models/sorting';
import {AdHome} from '../models/ad-home';


@Injectable({providedIn: 'root'})
export class AdService {
    public files: Array<ImageAd>;
    public sorting: Sorting;
    private filtering: string;
    private page: number;
    public advertisements: Array<Ad>;
    private pagesToEnd: number;
    private adFilter: string;

    constructor(private http: HttpClient, private toastr: ToastrService) {
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
            this.getAdvertisements().subscribe( (ad: AdHome) => {
                if (ad) {
                    this.pagesToEnd = ad.pagesToEnd;
                    this.advertisements = [...this.advertisements, ...(ad.advertisement)];
                }
            });
        }

    }


    public addAd(data: Ad): Observable<Ad> {
        return this.http.post<Ad>(`${GLOBAL.URL}/Advertisements`, data);
    }

    public getAd(id: string): Observable<Ad> {
        return this.http.get<Ad>(`${GLOBAL.URL}/Advertisements/${id}`);
    }

    public getAdvertisements(): Observable<AdHome> {
        return this.http.get<AdHome>(`${GLOBAL.URL}/Advertisements/${this.sorting.by}/${this.sorting.type}:${this.page}/${this.adFilter}`);
    }

    public getUserAdvertisements(id: string): Observable<Array<Ad>> {
        return this.http.get<Array<Ad>>(`${GLOBAL.URL}/Advertisements/users/${id}`);
    }

    public getCitiesV(Voivodeship: string): Observable<Array<City>> {
      return this.http.get<Array<City>>(`${GLOBAL.URL}/cities/${Voivodeship}`);
    }
/*    public getCities(): Observable<Array<City>> {
      return this.http.get<Array<City>>(`${GLOBAL.URL}/cities`);
    }*/
}
