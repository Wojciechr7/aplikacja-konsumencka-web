import { Injectable } from '@angular/core';
import {ImageAd} from '../models/advertisement/image';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private toastr: ToastrService) { }


  public getFile(): Promise<ImageAd> {
    function getBase64(f) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(f);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }

    const file = (document.getElementById('files') as HTMLInputElement).files[0];

    if (file) {
      if (file.type.match(/image.*/)) {
        return getBase64(file).then(
            data => {
              const f = {
                name: file.name,
                image: data,
                description: ''
              };
              return f as ImageAd;
            }
        );
      } else {
        this.toastr.error('Wrong Image Format', 'Error!');
      }
    } else {
      return new Promise<ImageAd>(null);
    }


  }
}
