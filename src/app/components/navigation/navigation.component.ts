import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

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

  constructor(private breakpointObserver: BreakpointObserver, public authenticationService: AuthService, private router: Router) {
  }

  get loggedInUser(): any {
      this.username = JSON.parse(localStorage.getItem('currentUser'));
      return this.username.firstName;
  }

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/sign-in']);
  }
}
