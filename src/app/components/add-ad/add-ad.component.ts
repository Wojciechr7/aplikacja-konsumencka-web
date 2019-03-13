import {Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {AdService} from '../../services/ad.service';
import {Router} from '@angular/router';
import {Ad} from '../../models/ad';
import {first} from 'rxjs/operators';
import {ImageAd} from '../../models/image';

export interface FileUp {
    Name: string;
    Image: string;
    Description: string;
}

@Component({
    selector: 'app-add-ad',
    templateUrl: './add-ad.component.html',
    styleUrls: ['./add-ad.component.scss']
})
export class AddAdComponent implements OnInit {
    public hide: boolean;
    AdForm: FormGroup;
    category = ['Apartment', 'Room', 'House', 'Office'];
    types = ['rent', 'sale'];
    public files: Array<FileUp>;

    constructor(private formBuilder: FormBuilder, public adService: AdService, private router: Router) {
        this.hide = true;
        this.files = [];
    }

    get f(): any {
        return this.AdForm.controls;
    }

    public onSubmit(): void {
        /*if (!this.AdForm.invalid) {*/

        const ad = {
            Title: this.AdForm.value.TitleFormControl,
            Images: [
                {
                    Image: 'string img',
                    Description: 'opis img'
                }
            ],
            Description: this.AdForm.value.DescriptionFormControl,
            PhoneNumber: this.AdForm.value.PhoneNumberFormControl,
            Price: parseInt(this.AdForm.value.PriceFormControl, 10),
            City: this.AdForm.value.CityFormControl,
            Street: this.AdForm.value.StreetFormControl,
            Size: parseInt(this.AdForm.value.SizeFormControl, 10),
            Category: this.AdForm.value.CategoryFormControl,
            Floor: parseInt(this.AdForm.value.FloorFormControl, 10)
        };

        console.log(ad as Ad);


        // this.authenticationService.loading = true;
        // this.adService.addAd(ad as Ad).subscribe((response) => {
        // console.log(response);
        // this.authenticationService.loading = false;
        // this.router.navigate(['/home']);
        // });
        /*} else {
          alert('Error');
        }*/
    }

    ngOnInit() {
        this.AdForm = this.formBuilder.group({
            TitleFormControl: new FormControl('', [Validators.required, Validators.minLength(5)]),
            CategoryFormControl: new FormControl('', [Validators.required]),
            CityFormControl: new FormControl('', [Validators.required]),
            NeighbourFormControl: new FormControl(''),
            StreetFormControl: new FormControl(''),
            PhoneNumberFormControl: new FormControl('', [Validators.required]),
            SizeFormControl: new FormControl(''),
            FloorFormControl: new FormControl(''),
            PriceFormControl: new FormControl('', [Validators.required]),
            TypeFormControl: new FormControl('', [Validators.required]),
            DescriptionFormControl: new FormControl('', [Validators.required]),
        });

    }

    get FormCon(): any {
        return this.AdForm.get('TitleFormControl');
    }

    public getFile() {
        function getBase64(filek) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(filek);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        }

        const file = (document.getElementById('files') as HTMLInputElement).files[0];
        getBase64(file).then(
            data =>  {
                console.log(data);
                const f = {
                  Name: 'nazwa pliku',
                  Image: data,
                  Description: 'opis'
                };
                this.files.push(f as FileUp);
            }

        );

    }

}
