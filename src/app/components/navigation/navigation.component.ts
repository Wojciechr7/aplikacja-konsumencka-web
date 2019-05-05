import {Component} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {Router, RouterEvent} from '@angular/router';
import {AdService} from '../../services/ad.service';
import {SignalRService} from '../../services/signal-r.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  public username;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              public authenticationService: AuthService,
              private router: Router,
              private adService: AdService,
              private signalR: SignalRService) {
  }

  get loggedInUser(): any {
      this.username = JSON.parse(localStorage.getItem('currentUser'));
      return this.username.firstName;
  }

  public lazyLoader() {
    if (this.router.url === '/home') {
      this.adService.lazyLoad();
    }
  }

  public logout(): void {
    this.authenticationService.logout();
    this.signalR.stopConnection();
    this.router.navigate(['/user/sign-in']);
  }
}
