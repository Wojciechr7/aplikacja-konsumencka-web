import {Injectable, NgZone} from '@angular/core';
import {MapsAPILoader} from '@agm/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  public latitude: number;
  public longitude: number;
  public zoom: number;
  private address: string;
  private geoCoder;
  public mapDisabled: boolean;

  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
    this.mapDisabled = true;
  }

  public getAddress(address: string) {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      this.geoCoder.geocode( { 'address': address}, (results, status) => {
        if (status === 'OK') {
          this.ngZone.run(() => {
            this.latitude = results[0].geometry.location.lat();
            this.longitude = results[0].geometry.location.lng();
            this.zoom = 17;
          });
        }
      });
    });
  }

  public getAddressByCoordinates() {
    this.geoCoder.geocode({ 'location': { lat: this.latitude, lng: this.longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        }
      }
    });
  }
}
