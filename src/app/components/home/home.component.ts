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

  public advertisements: Array<Ad>;
  public loading: boolean;

  constructor(public adService: AdService, private router: Router) {
    this.advertisements = [];
    this.loading = true;
  }
  public redirect(loc: string) {
    this.router.navigate([loc]);

  }

  ngOnInit() {
    this.adService.getAdvertisements().subscribe( (ad: Array<Ad>) => {
      this.advertisements = [...ad];
      this.loading = false;
    });
  }

}
