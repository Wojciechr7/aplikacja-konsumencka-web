import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SignInComponent} from './components/user/sign-in/sign-in.component';
import {SignUpComponent} from './components/user/sign-up/sign-up.component';
import {HomeComponent} from './components/home/home.component';
import {AuthGuard} from './guards/auth.guard';
import {IsLoggedGuard} from './guards/is-logged.guard';
import {AddAdComponent} from './components/add-ad/add-ad.component';
import {UserAdvertisementsComponent} from './components/user/advertisements/advertisements.component';
import {AdvertisementComponent} from './components/home/advertisement/advertisement.component';
import {HomeAdvertisementsComponent} from './components/home/home-advertisements/home-advertisements.component';
import {EditAdComponent} from './components/user/edit-ad/edit-ad.component';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {
        path: 'home', component: HomeComponent, children: [
            {path: '', redirectTo: 'advertisements', pathMatch: 'full'},
            {path: 'advertisements', component: HomeAdvertisementsComponent},
            {path: 'advertisements/:id', component: AdvertisementComponent}
        ]
    },
    {
        path: 'user', component: HomeComponent, children: [
            {path: 'sign-in', component: SignInComponent, canActivate: [IsLoggedGuard]},
            {path: 'sign-up', component: SignUpComponent, canActivate: [IsLoggedGuard]},
            {path: 'advertisements/:id', component: EditAdComponent, canActivate: [AuthGuard]},
            {path: 'advertisements', component: UserAdvertisementsComponent, canActivate: [AuthGuard]},
        ]
    },
    {path: 'add-ad', component: AddAdComponent, canActivate: [AuthGuard]},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
