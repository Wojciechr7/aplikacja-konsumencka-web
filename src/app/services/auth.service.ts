import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {User} from '../models/user';
import {GLOBAL} from '../config';
import {LoginData} from '../models/login';
import {RegisterData} from '../models/register';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public loading: boolean;


    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.loading = false;
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public login(data: LoginData): Observable<User> {
        return this.http.post<User>(`${GLOBAL.URL}/Login`, data)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    this.loading = false;
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    public register(data: RegisterData): Observable<User> {
        return this.http.post<User>(`${GLOBAL.URL}/Registration`, data);
    }

    public logout(): void {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/sign-in']);
    }
}
