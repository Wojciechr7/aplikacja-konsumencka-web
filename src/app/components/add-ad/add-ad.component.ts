import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.component.html',
  styleUrls: ['./add-ad.component.scss']
})
export class AddAdComponent implements OnInit {
  AdForm: FormGroup;
  caregories = ['Apartment', 'Room', 'House', 'Office'];
  types = ['rent', 'sale'];

  constructor() { }

  ngOnInit() {
    this.AdForm = new FormGroup ({
      TittleFormControl:  new FormControl('', [Validators.required, Validators.minLength(5)]),
      CaregorieFormControl:  new FormControl('', [Validators.required]),
      CityFormControl:  new FormControl('', [Validators.required]),
      NeighborFormControl:  new FormControl(''),
      StreetFormContorl:  new FormControl(''),
      PhoneNumberFormContorl:  new FormControl('', [Validators.required]),
      SizeFormControl:  new FormControl(''),
      FloorFormControl:  new FormControl(''),
      PriceFomrControl:  new FormControl('', [Validators.required]),
      TypeFormControl:  new FormControl('', [Validators.required]),
      DiscriptionFormControl:  new FormControl('', [Validators.required]),
    });
  }
  get FormCon(): any { return this.AdForm.get('TittleFormControl'); }

}
