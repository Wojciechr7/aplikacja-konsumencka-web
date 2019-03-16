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
                        Name: file.name,
                        Image: data,
                        Description: ''
                    };
                    this.files.push(f as ImageAd);
                }
            );
        } else {
            this.toastr.error('Wrong Image Format', 'Error!');
        }

    }
}
