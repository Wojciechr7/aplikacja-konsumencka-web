import {Component, DoCheck, KeyValueDiffers, OnInit} from '@angular/core';
import {AdService} from '../../../services/ad.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-advertisements',
  templateUrl: './home-advertisements.component.html',
  styleUrls: ['./home-advertisements.component.scss']
})
export class HomeAdvertisementsComponent implements OnInit, DoCheck {

  public loading: boolean;
  private differ: any;

  constructor(public adService: AdService, private router: Router, private differs: KeyValueDiffers) {
    this.loading = false;
  }

  ngOnInit() {
    this.adService.sorting = {
      by: 'date',
      type: 'desc'
    };
    this.adService.Filtering = '';
    this.differ = this.differs.find(this.adService.sorting).create();
  }

  ngDoCheck() {
    const change = this.differ.diff(this.adService.sorting);
    this.adService.PagesToEnd = 1;
    if (change) {
      this.adService.advertisements = [];
      this.adService.Page = 0;
      this.adService.lazyLoad();
    }

  }

}
