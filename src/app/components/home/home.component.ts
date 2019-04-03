import { Component, OnInit, KeyValueDiffers, DoCheck } from '@angular/core';
import {AdService} from '../../services/ad.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, DoCheck {


  public loading: boolean;
  public sortByOptions: Array<string>;
  public sortTypeOptions: Array<string>;
  private differ: any;

  constructor(public adService: AdService, private router: Router, private differs: KeyValueDiffers) {
    this.loading = false;
    this.sortByOptions = ['price', 'city', 'size', 'category', 'date'];
    this.sortTypeOptions = ['asc', 'desc'];

  }
  public redirect(loc: string) {
    this.router.navigate([loc]);

  }

  public noImage(i: string): boolean {

    return i.indexOf('base64') > 0;
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
