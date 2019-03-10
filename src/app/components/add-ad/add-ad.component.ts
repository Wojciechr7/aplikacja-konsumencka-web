import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.component.html',
  styleUrls: ['./add-ad.component.scss']
})
export class AddAdComponent implements OnInit {
  AdForm: FormGroup;
  category = ['Apartment', 'Room', 'House', 'Office'];
  types = ['rent', 'sale'];

  constructor() { }

  ngOnInit() {
    this.AdForm = new FormGroup ({
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
