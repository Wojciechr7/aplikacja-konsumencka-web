import {Component, NgZone, OnInit} from '@angular/core';
import {MapsAPILoader, MouseEvent} from '@agm/core';
import {MapService} from '../../services/map.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(public mapService: MapService) {
  }

  public markerDragEnd($event: MouseEvent) {
    this.mapService.latitude = $event.coords.lat;
    this.mapService.longitude = $event.coords.lng;
    this.mapService.getAddressByCoordinates();
  }

  public toggleMap() {
    this.mapService.mapDisabled = !this.mapService.mapDisabled;
    if (this.mapService.mapDisabled) {
      this.mapService.zoom -= 1;
    } else {
      this.mapService.zoom += 1;
    }

  }

  ngOnInit() {
    this.mapService.getAddress('Olsztyn');
  }

}
