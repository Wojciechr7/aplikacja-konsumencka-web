import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {AdService} from '../../services/ad.service';
import {Router} from '@angular/router';
import {Ad} from '../../models/ad';
import {City} from '../../models/city';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
    selector: 'app-add-ad',
    templateUrl: './add-ad.component.html',
    styleUrls: ['./add-ad.component.scss']
})
export class AddAdComponent implements OnInit, OnDestroy {
    public hide: boolean;
    public AdForm: FormGroup;
    public category: Array<string>;
    public types: Array<string>;
    public cities: Array<City>;
    public Voivodeships: Array<string>;
    public  filtretOptionsV: Observable<string[]>;
    public filteredOptions: Observable<City[]>;


    constructor(private formBuilder: FormBuilder, public adService: AdService, private router: Router, private toastr: ToastrService) {
        this.hide = true;
        this.category = ['Apartment', 'Room', 'House', 'Office'];
        this.types = ['rent', 'sale'];
        this.Voivodeships = [ 'dolnośląskie', 'kujawsko-pomorskie', 'lubelskie', 'lubuskie', 'łódzkie', 'małopolskie', 'mazowieckie',
          'opolskie', 'podkarpackie', 'podlaskie', 'pomorskie', 'śląskie', 'świętokrzyskie', 'warmińsko-mazurskie', 'wielkopolskie',
        'zachodniopomosrkie'];
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
            city: 1,
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
        DescriptionFormControl: new FormControl('', [Validators.required, Validators.maxLength(9999), Validators.minLength(30)]),
        VoivodeshipFormControl: new FormControl('')
      });
      const VoivodshipOption = this.AdForm.controls.VoivodeshipFormControl;
      this.filtretOptionsV = VoivodshipOption.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    }
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
      return this.Voivodeships.filter(Voivodeship => Voivodeship.toLowerCase().indexOf(filterValue) === 0);
    }
/*    private _filterC(value: City): City[] {
      const filterValue = value.name.toLowerCase();
      return this.cities.filter( city => city.name.indexOf(filterValue) === 0);
    }*/

    ngOnDestroy(): void {
        this.adService.files = [];
    }

    public getVoivodeship(event: any) {
      const value = event.target.value.toLowerCase();
      if (this.Voivodeships.indexOf(value) === -1) {
        event.target.value = '';
      } else {
        this.adService.getCitiesV(value).subscribe((city: Array<City>) => {
          this.cities = city;
          console.log(this.cities);
        });
/*        const CitiesOption = this.AdForm.controls.CityFormControl;
        this.filteredOptions = CitiesOption.valueChanges.pipe(
          startWith(''),
          map(valueC => this._filterC(valueC))
        );*/
      }
      // console.log(this.cities);
    }

    public removeImage(index: number) {
        this.adService.files.splice(index, 1);
    }


}
