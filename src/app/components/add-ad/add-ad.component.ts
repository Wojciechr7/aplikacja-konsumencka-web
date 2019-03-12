import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {AdService} from '../../services/ad.service';
import {Router} from '@angular/router';
import {Ad} from '../../models/ad';
import {first} from 'rxjs/operators';


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

  constructor(private formBuilder: FormBuilder, public adService: AdService, private router: Router) {
    this.hide = true;
  }
  get f(): any { return this.AdForm.controls; }

  public onSubmit(): void {

    if (!this.AdForm.invalid) {
      // this.authenticationService.loading = true;
      this.adService.addAd(this.AdForm.value as Ad).pipe(first())
          .subscribe((response) => {
            // console.log(response);
            // this.authenticationService.loading = false;
            this.router.navigate(['/home']);
          });
    } else {
      alert('Error');
    }
  }

  ngOnInit() {
    this.AdForm = this.formBuilder.group({
      TitleFormControl:  new FormControl('', [Validators.required, Validators.minLength(5)]),
      CategoryFormControl:  new FormControl('', [Validators.required]),
      CityFormControl:  new FormControl('', [Validators.required]),
      NeighbourFormControl:  new FormControl(''),
      StreetFormControl:  new FormControl(''),
      PhoneNumberFormControl:  new FormControl('', [Validators.required]),
      SizeFormControl:  new FormControl(''),
      FloorFormControl:  new FormControl(''),
      PriceFormControl:  new FormControl('', [Validators.required]),
      TypeFormControl:  new FormControl('', [Validators.required]),
      DescriptionFormControl:  new FormControl('', [Validators.required]),
    });
  }
  get FormCon(): any { return this.AdForm.get('TitleFormControl'); }

}
