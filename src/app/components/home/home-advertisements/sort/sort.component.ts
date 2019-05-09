import { Component, OnInit } from '@angular/core';
import {AdvertisementService} from '../../../../services/advertisement.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {

  public sortByOptions: Array<string>;
  public sortTypeOptions: Array<string>;

  constructor(public adService: AdvertisementService) {
    this.sortByOptions = ['price', 'city', 'size', 'category', 'date'];
    this.sortTypeOptions = ['asc', 'desc'];
  }

  ngOnInit() {
  }

}
