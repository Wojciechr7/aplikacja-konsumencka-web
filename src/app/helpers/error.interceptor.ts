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
                this.authenticationService.logout();
                this.toastr.error('You Are Not Authorized For That Action', 'Error!');
                this.router.navigate(['/sign-in']);
            }
            if (err.status === 400) {
                this.authenticationService.logout();
                this.toastr.error('Email Or Password Is Not Correct', 'Login Error!');
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }

}
