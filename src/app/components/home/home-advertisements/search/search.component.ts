import { Component, OnInit } from '@angular/core';
import {AdvertisementService} from '../../../../services/advertisement.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private adService: AdvertisementService) { }

  public filterAdvertisements(val: string): void {
    this.adService.AdFilter = val;
    this.adService.advertisements = [];
    this.adService.Page = 0;
    this.adService.lazyLoad();
  }

  ngOnInit() {
  }

}
