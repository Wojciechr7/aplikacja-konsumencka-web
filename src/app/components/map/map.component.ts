import {Component, NgZone, OnInit} from '@angular/core';
import {MapsAPILoader, MouseEvent} from '@agm/core';
import {MapService} from '../../services/map.service';
import {ActivatedRoute, NavigationEnd, ParamMap, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';


@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

    constructor(
        public mapService: MapService,
        public route: ActivatedRoute,
        public router: Router) {
    }

    public showMap() {
        this.mapService.mapDisabled = false;
        this.mapService.zoom += 1;
    }

    public showAdvertisement(id: number) {
        this.router.navigate(['/home/advertisements/' + id]);
        this.hideMap();
    }

    public hideMap() {
        this.mapService.mapDisabled = true;
        this.mapService.zoom -= 1;
    }

    ngOnInit() {
        if (!this.mapService.initAdComponent) {
            this.mapService.setAllMarkers();
        }
    }

}
