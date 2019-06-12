import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Advertisement} from '../../../models/advertisement/advertisement';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AdvertisementService} from '../../../services/advertisement.service';
import {switchMap} from 'rxjs/operators';
import {MapService} from '../../../services/map.service';

@Component({
    selector: 'app-advertisement',
    templateUrl: './advertisement.component.html',
    styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit, OnDestroy {

    public adData: Observable<Advertisement>;
    public adId: string;
    public fullView: boolean;

    constructor(private route: ActivatedRoute,
                public adService: AdvertisementService,
                private mapService: MapService) {
        this.fullView = false;
    }

    public noImage(i: string): boolean {

        return i.indexOf('base64') > 0;
    }

    public changeView(): void {
        this.fullView = !this.fullView;
    }

    ngOnInit() {
        this.mapService.initAdComponent = true;
        this.adData = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                this.adId = params.get('id');
                this.adService.getAdvertisement(this.adId).subscribe((advertisement: Advertisement) => {
                   const location = `${advertisement.city}, ${advertisement.street}`;
                   this.mapService.getAddress(advertisement.id, location);
                });
                return this.adService.getAdvertisement(this.adId);
            }));
        this.mapService.buttonEnabled = true;
    }

    ngOnDestroy(): void {
        this.mapService.buttonEnabled = false;
        if (this.mapService.mapDisabled) {
            this.mapService.setAllMarkers();
        }

    }

}
