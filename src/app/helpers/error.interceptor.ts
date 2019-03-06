import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService, private router: Router) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                this.authenticationService.logout();
                this.authenticationService.loading = false;
                this.router.navigate(['/sign-in']);
            }
            if (err.status === 400) {
                // TODO make dialog box
                alert('Login error!');
                this.authenticationService.loading = false;
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }

}
