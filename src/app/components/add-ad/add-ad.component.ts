import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.component.html',
  styleUrls: ['./add-ad.component.scss']
})
export class AddAdComponent implements OnInit {

  caregories = ['Apartment', 'Room', 'House', 'Office'];
  types = ['rent', 'sale'];

  constructor() { }

  ngOnInit() {
  }

}
