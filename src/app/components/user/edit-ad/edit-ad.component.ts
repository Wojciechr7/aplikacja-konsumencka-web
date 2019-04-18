import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Ad} from '../../../models/ad';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AdService} from '../../../services/ad.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.component.html',
  styleUrls: ['./edit-ad.component.scss']
})
export class EditAdComponent implements OnInit {

  public adData: Observable<Ad>;
  public adId: string;

  constructor(private route: ActivatedRoute, private router: Router, public adService: AdService) { }

  ngOnInit() {
    this.adData = this.route.paramMap.pipe(
        switchMap((params: ParamMap) => {
          this.adId = params.get('id');
          this.adService.adEditingId = this.adId;
          return this.adService.getAd(this.adId);
        }));


  }

}
