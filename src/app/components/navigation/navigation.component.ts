import {Component} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {AdvertisementService} from '../../services/advertisement.service';
import {SignalRService} from '../../services/signal-r.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  public username;
  public expandedAdmin: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              public authenticationService: AuthService,
              private router: Router,
              private adService: AdvertisementService,
              private signalR: SignalRService) {
    this.expandedAdmin = false;
  }

  get loggedInUser(): string {
      this.username = JSON.parse(localStorage.getItem('currentUser'));
      return this.username.firstName;
  }

  public lazyLoader(): void {
    if (this.router.url === '/home') {
      this.adService.lazyLoad();
    }
  }

  public logout(): void {
    this.authenticationService.logout();
    this.signalR.stopConnection();
    this.router.navigate(['/user/sign-in']);
  }

  public isAdmin(): boolean {
    return this.authenticationService.currentUserValue.role === 'admin';
  }
}
