import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService, private router: Router, private toastr: ToastrService) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // unauthorised
                this.authenticationService.logout();
                this.toastr.error(err.error.message, 'Error!');
                this.router.navigate(['/sign-in']);
            }
            if (err.status === 400) {
                // invalid credentials
                this.authenticationService.logout();
                this.toastr.error(err.error.message, 'Error!');
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }

}
