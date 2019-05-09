import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Advertisement} from '../../../models/advertisement/advertisement';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AdvertisementService} from '../../../services/advertisement.service';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-advertisement',
    templateUrl: './advertisement.component.html',
    styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit {

    public adData: Observable<Advertisement>;
    public adId: string;
    public fullView: boolean;

    constructor(private route: ActivatedRoute,
                public adService: AdvertisementService) {
        this.fullView = false;
    }

    public noImage(i: string): boolean {

        return i.indexOf('base64') > 0;
    }

    public changeView(): void {
        this.fullView = !this.fullView;
    }

    ngOnInit() {
        this.adData = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                this.adId = params.get('id');
                return this.adService.getAdvertisement(this.adId);
            }));
    }

}
