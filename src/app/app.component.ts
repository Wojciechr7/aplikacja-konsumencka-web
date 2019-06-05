import {Component, ElementRef, OnInit, ViewChild, NgZone} from '@angular/core';
import {SignalRService} from './services/signal-r.service';
import {AuthService} from './services/auth.service';
import {MapService} from './services/map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public title: string;

  constructor(private signalR: SignalRService,
              private authenticationService: AuthService,
              public mapService: MapService) {
    this.title = 'aplikacja-konsumencka-web';
  }



  ngOnInit(): void {
    if (this.authenticationService.currentUserValue) {
      this.signalR.startConnection();
    }


  }
}
