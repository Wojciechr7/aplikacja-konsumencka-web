import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Ad} from '../models/ad';
import {GLOBAL} from '../config';
import {ImageAd} from '../models/image';
import {ToastrService} from 'ngx-toastr';


@Injectable({providedIn: 'root'})
export class AdService {
    public files: Array<ImageAd>;

    constructor(private http: HttpClient, private toastr: ToastrService) {
        this.files = [];
    }


    public addAd(data: Ad): Observable<Ad> {
        return this.http.post<Ad>(`${GLOBAL.URL}/Advertisements`, data);
    }

    public getAd(id: string): Observable<Ad> {
        return this.http.get<Ad>(`${GLOBAL.URL}/Advertisements/${id}`);
    }

    public getAdvertisements(): Observable<Array<Ad>> {
        return this.http.get<Array<Ad>>(`${GLOBAL.URL}/Advertisements`);
    }


    public getFile() {
        function getBase64(f) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(f);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        }

        const file = (document.getElementById('files') as HTMLInputElement).files[0];

        if (file.type.match(/image.*/)) {
            getBase64(file).then(
                data => {
                    const f = {
                        name: file.name,
                        image: data,
                        description: ''
                    };
                    this.files.push(f as ImageAd);
                }
            );
        } else {
            this.toastr.error('Wrong Image Format', 'Error!');
        }

    }
}
