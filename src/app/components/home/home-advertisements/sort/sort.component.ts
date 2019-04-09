import { Component, OnInit } from '@angular/core';
import {AdService} from '../../../../services/ad.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {

  public sortByOptions: Array<string>;
  public sortTypeOptions: Array<string>;

  constructor(public adService: AdService) {
    this.sortByOptions = ['price', 'city', 'size', 'category', 'date'];
    this.sortTypeOptions = ['asc', 'desc'];
  }

  ngOnInit() {
  }

}
