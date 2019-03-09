import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.component.html',
  styleUrls: ['./add-ad.component.scss']
})
export class AddAdComponent implements OnInit {

  caregories = ['Apartment', 'Room', 'House', 'Office'];
  types = ['rent', 'sale'];

  city: string;

  disable = true;

  TittleFormControl = new FormControl('', [
    Validators.required,
  ]);

  cityCheck() {
    if (this.city.length > 1) {
      this.disable = false;
    } else {
      this.disable = true;
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
