import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Ad} from '../../../models/ad';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import {AdService} from '../../../services/ad.service';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-advertisement',
    templateUrl: './advertisement.component.html',
    styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit {

    public adData: Observable<Ad>;
    public adId: string;

    constructor(private route: ActivatedRoute, private router: Router, public adService: AdService) {
    }

    public noImage(i: string): boolean {

        return i.indexOf('base64') > 0;
    }

    ngOnInit() {

        this.adData = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                this.adId = params.get('id');
                return this.adService.getAd(this.adId);
            }));

    }

}
