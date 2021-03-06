import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {AdvertisementService} from '../../services/advertisement.service';
import {Router} from '@angular/router';
import {Advertisement} from '../../models/advertisement/advertisement';
import {City} from '../../models/advertisement/city';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {ImageService} from '../../services/image.service';
import {ImageAd} from '../../models/advertisement/image';
import {Voivodeship} from '../../models/advertisement/voivodeship';
import {MatDialog} from '@angular/material';
import {DialogData} from '../../dialogs/edit-profile/edit-profile.dialog';
import {ConfirmDialogComponent} from '../../dialogs/confirm/confirm.dialog';

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
    public Voivodeships: Array<Voivodeship>;
    public filtretOptionsV: Observable<Voivodeship[]>;
    public filteredOptions: Observable<City[]>;
    public loading: boolean;
    @Input() adEditData: Observable<Advertisement>;
    @Input() edit: boolean;


    constructor(private formBuilder: FormBuilder, public adService: AdvertisementService, private router: Router,
                private toastr: ToastrService, private imageService: ImageService, private dialog: MatDialog) {
        this.hide = true;
        this.category = ['Apartment', 'Room', 'House', 'Office'];
        this.types = ['rent', 'sale'];
        this.loading = true;
        this.cities = [];
        this.adService.getVoivodeships().subscribe((voivodeships: Array<Voivodeship>) => {
            this.Voivodeships = voivodeships;
        });
    }

    get f(): any {
        return this.AdForm.controls;
    }

    public onSubmit(): void {
        if (!this.AdForm.invalid) {
            const VoivodeshipId = this.Voivodeships.filter(voivodeship =>
                voivodeship.name === this.AdForm.value.VoivodeshipFormControl.toLowerCase());

            this.adService.getCitiesV(VoivodeshipId[0].id).subscribe((cts: Array<City>) => {
                this.cities = cts;

                const cityId = this.cities.find((cty: City) => this.AdForm.value.CityFormControl === cty.name).id;

                const ad = {
                    title: this.AdForm.value.TitleFormControl,
                    images: [...this.adService.files],
                    description: this.AdForm.value.DescriptionFormControl,
                    price: parseInt(this.AdForm.value.PriceFormControl, 10),
                    city: cityId,
                    street: this.AdForm.value.StreetFormControl,
                    size: parseInt(this.AdForm.value.SizeFormControl, 10),
                    category: this.AdForm.value.CategoryFormControl,
                    floor: parseInt(this.AdForm.value.FloorFormControl, 10)
                };
                if (!this.edit) {
                    this.adService.addAdvertisement(ad as Advertisement).subscribe(() => {
                        this.toastr.success('Advertisement Has Been Added Successfully', 'Success!');
                        this.router.navigate(['/home']);
                    });
                } else {
                    this.adService.updateAdvertisement(ad as Advertisement, this.adService.adEditingId).subscribe(() => {
                        this.toastr.success('Advertisement Has Been Updated Successfully', 'Success!');
                        this.router.navigate(['/home']);
                    });
                }
            });
        } else {
            this.toastr.error('Validation Error! Check All Form Fields!', 'Error!');
        }
    }

    ngOnInit() {
        this.AdForm = this.formBuilder.group({
            TitleFormControl: new FormControl('', [Validators.required, Validators.minLength(5)]),
            CategoryFormControl: new FormControl('', [Validators.required]),
            CityFormControl: new FormControl({value: '', disabled: true}, [Validators.required]),
            StreetFormControl: new FormControl(''),
            SizeFormControl: new FormControl('', [Validators.max(99999),
                Validators.pattern('^[1-9]\\d+$')]),
            FloorFormControl: new FormControl(''),
            PriceFormControl: new FormControl('', [Validators.required, Validators.max(9999999),
                Validators.pattern('^[1-9]\\d+$')]),
            DescriptionFormControl: new FormControl('', [Validators.required, Validators.maxLength(9999), Validators.minLength(30)]),
            VoivodeshipFormControl: new FormControl('', [Validators.required])
        });
        this.loading = false;

        if (this.edit) {
            this.adEditData.subscribe((ad: Advertisement) => {
                this.AdForm.get('TitleFormControl').setValue(ad.title);
                this.AdForm.get('CategoryFormControl').setValue(ad.category);
                this.AdForm.get('CityFormControl').setValue(ad.city);
                this.AdForm.get('StreetFormControl').setValue(ad.street);
                this.AdForm.get('SizeFormControl').setValue(ad.size);
                this.AdForm.get('FloorFormControl').setValue(ad.floor);
                this.AdForm.get('PriceFormControl').setValue(ad.price);
                this.AdForm.get('DescriptionFormControl').setValue(ad.description);
                this.AdForm.get('VoivodeshipFormControl').setValue(ad.voivodeship);
                this.AdForm.controls.CityFormControl.enable();

                ad.images.forEach((img: ImageAd) => {
                    this.adService.files.push(img);
                });
            });
        }
    }

    private _filter(value: string): Voivodeship[] {
        const filterValue = value.toLowerCase();
        return this.Voivodeships.filter(voivodeship => voivodeship.name.toLowerCase().indexOf(filterValue) === 0);
    }

    ngOnDestroy(): void {
        this.adService.files = [];
    }

    public showVoivodeships() {
        const VoivodeshipsOption = this.AdForm.controls.VoivodeshipFormControl;
        this.filtretOptionsV = VoivodeshipsOption.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
    }

    public getVoivodeship(event: any) {
        const value = event.target.value.toLowerCase();
        if (this.Voivodeships.map(name => name.name).indexOf(value) === -1) {
            this.AdForm.controls.VoivodeshipFormControl.patchValue('');
            this.AdForm.controls.CityFormControl.disable();
        } else {
            const VoivodeshipId = this.Voivodeships.filter(voivodeship =>
                voivodeship.name === this.AdForm.value.VoivodeshipFormControl.toLowerCase());
            this.adService.getCitiesV(VoivodeshipId[0].id).subscribe((city: Array<City>) => {
                this.cities = city;
                this.AdForm.controls.CityFormControl.enable();
            });
        }
    }

    public showCities(): void {
        this.AdForm.controls.CityFormControl.patchValue('');
        const CitiesOption = this.AdForm.controls.CityFormControl;
        this.filteredOptions = CitiesOption.valueChanges.pipe(
            startWith(''),
            map(valueC => this._filterC(valueC))
        );
        this.AdForm.controls.VoivodeshipFormControl.clearValidators();
    }

    private _filterC(value: string): City[] {
        const filterValue = value.toLowerCase();
        return this.cities.filter(city => city.name.toLowerCase().indexOf(filterValue) === 0);
    }

    public removeImage(index: number) {
        this.adService.files.splice(index, 1);
    }

    public addImage(): any {
        this.imageService.getFile().then((img: ImageAd) => {
            this.adService.files.push(img);
        });
    }

    public checkCity(): any {
        const city = this.AdForm.controls.CityFormControl.value.toLowerCase();
        if (this.cities.map(cityName => cityName.name.toLowerCase()).indexOf(city) === -1) {
            this.AdForm.controls.CityFormControl.patchValue('');
        }
    }

    public removeAd() {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: `350px`,
            data: {message: 'Confirm Deletion Of The Advertisement', adTitle: this.AdForm.get('TitleFormControl').value}
        });

        dialogRef.afterClosed().subscribe((result: DialogData) => {
            if (result) {
                this.adService.removeAdvertisement().subscribe(() => {
                    this.toastr.success('Advertisement Has Been Deleted', 'Success!');
                    this.router.navigate(['/home']);
                });
            }
        });
    }
    cancelEdit() {
      this.router.navigate(['/user/advertisements']);
    }
}
