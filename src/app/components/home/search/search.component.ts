import { Component, OnInit } from '@angular/core';
import {AdService} from '../../../services/ad.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private adService: AdService) { }

  public filterAdvertisements(val: string): void {
    this.adService.AdFilter = val;
    this.adService.advertisements = [];
    this.adService.Page = 0;
    this.adService.lazyLoad();
  }

  ngOnInit() {
  }

}
