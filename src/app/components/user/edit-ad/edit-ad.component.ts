import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Advertisement} from '../../../models/advertisement/advertisement';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AdvertisementService} from '../../../services/advertisement.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.component.html',
  styleUrls: ['./edit-ad.component.scss']
})
export class EditAdComponent implements OnInit {

  public adData: Observable<Advertisement>;
  public adId: string;

  constructor(private route: ActivatedRoute,
              public adService: AdvertisementService) { }

  ngOnInit() {
    this.adData = this.route.paramMap.pipe(
        switchMap((params: ParamMap) => {
          this.adId = params.get('id');
          this.adService.adEditingId = this.adId;
          return this.adService.getAdvertisement(this.adId);
        }));


  }

}
