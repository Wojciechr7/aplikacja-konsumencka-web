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
import {UserProfileComponent} from './components/user/user-profile/user-profile.component';
import {MessagesComponent} from './components/user/messages/messages.component';
import {AdminComponent} from './components/admin/admin.component';
import {UsersComponent} from './components/admin/users/users.component';
import {AdvertisementsComponent} from './components/admin/advertisements/advertisements.component';
import {AdminGuard} from './guards/admin.guard';

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
            {path: '', redirectTo: 'advertisements', pathMatch: 'full'},
            {path: 'sign-in', component: SignInComponent, canActivate: [IsLoggedGuard]},
            {path: 'sign-up', component: SignUpComponent, canActivate: [IsLoggedGuard]},
            {path: 'advertisements/:id', component: EditAdComponent, canActivate: [AuthGuard]},
            {path: 'advertisements', component: UserAdvertisementsComponent, canActivate: [AuthGuard]},
            {path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
            {path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]}
        ]
    },
    {path: 'add-ad', component: AddAdComponent, canActivate: [AuthGuard]},
    {
        path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
            {path: '', redirectTo: 'advertisements', pathMatch: 'full'},
            {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
            {path: 'advertisements', component: AdvertisementsComponent, canActivate: [AuthGuard]}
        ]
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes,
        {
            useHash: false
        })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
