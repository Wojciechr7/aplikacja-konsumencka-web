import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Ad} from '../../models/ad';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import {AdService} from '../../services/ad.service';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-advertisement',
    templateUrl: './advertisement.component.html',
    styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit {

    public adData: Observable<Ad>;
    public adId: number;

    constructor(private route: ActivatedRoute, private router: Router, public adService: AdService) {
    }

    ngOnInit() {

        /*this.adData = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                this.adId = parseInt(params.get('id'), 10);
                return this.adService.getAd(this.adId);
            }));*/


        this.adService.getAdvertisement('d734edc8-eca7-4190-9214-ea71de40e23d').subscribe(el => {
            console.log(el);
        });
    }

}
