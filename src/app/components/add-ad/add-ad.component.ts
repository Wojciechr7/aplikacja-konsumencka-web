import {Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {AdService} from '../../services/ad.service';
import {Router} from '@angular/router';
import {Ad} from '../../models/ad';
import {ToastrService} from 'ngx-toastr';


@Component({
    selector: 'app-add-ad',
    templateUrl: './add-ad.component.html',
    styleUrls: ['./add-ad.component.scss']
})
export class AddAdComponent implements OnInit {
    public hide: boolean;
    public AdForm: FormGroup;
    public category: Array<string>;
    public types: Array<string>;


    constructor(private formBuilder: FormBuilder, public adService: AdService, private router: Router, private toastr: ToastrService) {
        this.hide = true;
        this.category = ['Apartment', 'Room', 'House', 'Office'];
        this.types = ['rent', 'sale'];
    }

    get f(): any {
        return this.AdForm.controls;
    }

    public onSubmit(): void {
        if (!this.AdForm.invalid) {

        const ad = {
            title: this.AdForm.value.TitleFormControl,
            images: [...this.adService.files],
            description: this.AdForm.value.DescriptionFormControl,
            phoneNumber: this.AdForm.value.PhoneNumberFormControl,
            price: parseInt(this.AdForm.value.PriceFormControl, 10),
            city: this.AdForm.value.CityFormControl,
            street: this.AdForm.value.StreetFormControl,
            size: parseInt(this.AdForm.value.SizeFormControl, 10),
            category: this.AdForm.value.CategoryFormControl,
            floor: parseInt(this.AdForm.value.FloorFormControl, 10)
        };

         this.adService.addAd(ad as Ad).subscribe(() => {
             this.toastr.success('Advertisement Has Been Added Successfully', 'Success!');
             this.router.navigate(['/home']);
         });
        }
    }

    ngOnInit() {
        this.AdForm = this.formBuilder.group({
            TitleFormControl: new FormControl('', [Validators.required, Validators.minLength(5)]),
            CategoryFormControl: new FormControl('', [Validators.required]),
            CityFormControl: new FormControl('', [Validators.required]),
            StreetFormControl: new FormControl(''),
            PhoneNumberFormControl: new FormControl('',
              [Validators.required, Validators.pattern('^(?:\\(?\\+?48)?(?:[-\\.\\(\\)\\s]*(\\d)){9}\\)?$')]),
            SizeFormControl: new FormControl('', [Validators.max(99999),
            Validators.pattern('^[1-9]\\d+$')]),
            FloorFormControl: new FormControl(''),
            PriceFormControl: new FormControl('', [Validators.required, Validators.max(9999999),
              Validators.pattern('^[1-9]\\d+$')]),
            DescriptionFormControl: new FormControl('', [Validators.required, Validators.maxLength(9999), Validators.minLength(30)])
        });



    }
/*
    get FormCon(): any {
        return this.AdForm.get('TitleFormControl');
    }*/


    public removeImage(index: number) {
        this.adService.files.splice(index, 1);
    }


}
