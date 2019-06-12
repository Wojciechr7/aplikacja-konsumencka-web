import {Injectable, NgZone} from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {AdvertisementService} from './advertisement.service';
import {Advertisement} from '../models/advertisement/advertisement';
import {AdvertisementHome} from '../models/advertisement/advertisement-home';
import {HttpClient} from '@angular/common/http';
import {GLOBAL} from '../config';

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
  public buttonEnabled: boolean;
  public markers;
  public initAdComponent: boolean;

  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private http: HttpClient) {
    this.mapDisabled = true;
    this.buttonEnabled = false;
    this.markers = [];
    this.initAdComponent = false;
  }

  public setAllMarkers() {
    this.http.get<AdvertisementHome>(
        `${GLOBAL.URL}/advertisements/date/desc:1/`
    ).subscribe((advertisements: AdvertisementHome) => {
      this.geoCoder = new google.maps.Geocoder;
      this.markers = [];
      advertisements.advertisement.forEach((advertisement: Advertisement) => {
        this.geoCoder.geocode( { 'address': `${advertisement.city}, ${advertisement.street}`}, (results, status) => {
          if (status === 'OK') {
            this.ngZone.run(() => {
              const latitude = results[0].geometry.location.lat();
              const longitude = results[0].geometry.location.lng();
              this.markers.push({id: advertisement.id, latitude: latitude, longitude: longitude});
              this.setCurrentLocation();
            });
          }
        });
      });
    });
  }

  public getAddress(id: number, address: string) {
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

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.geoCoder.geocode({ 'location': { lat: this.latitude, lng: this.longitude } }, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              this.address = results[0].formatted_address;
              this.zoom = 10;
            }
          }
        });
      });
    }
  }

}
