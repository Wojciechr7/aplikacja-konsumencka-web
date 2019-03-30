import { Component, OnInit } from '@angular/core';
import {Ad} from '../../models/ad';
import {AdService} from '../../services/ad.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  public loading: boolean;

  constructor(public adService: AdService, private router: Router) {
    // this.advertisements = [];
    this.loading = false;
  }
  public redirect(loc: string) {
    this.router.navigate([loc]);

  }

  ngOnInit() {
    /*this.adService.getAdvertisements().subscribe( (ad: Array<Ad>) => {
      this.advertisements = [...ad];
      this.loading = false;
    });*/
    this.adService.Sorting = {
      by: 'date',
      type: 'asc'
    };
    this.adService.Filtering = '';
    this.adService.Page = 0;
    this.adService.advertisements = [];

    this.adService.lazyLoad();
  }

}
