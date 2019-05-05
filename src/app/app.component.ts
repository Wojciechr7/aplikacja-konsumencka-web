import {Component, OnInit} from '@angular/core';
import {SignalRService} from './services/signal-r.service';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public title: string;

  constructor(private signalR: SignalRService,
              private authenticationService: AuthService) {
    this.title = 'aplikacja-konsumencka-web';
  }

  ngOnInit(): void {
    if (this.authenticationService.currentUserValue) {
      this.signalR.startConnection();
    }

  }
}
