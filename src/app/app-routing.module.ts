import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {HomeComponent} from './components/home/home.component';
import {AuthGuard} from './guards/auth.guard';
import {IsLoggedGuard} from './guards/is-logged.guard';
import { AddAdComponent } from './components/add-ad/add-ad.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'sign-in', component: SignInComponent, canActivate: [IsLoggedGuard]},
  {path: 'sign-up', component: SignUpComponent, canActivate: [IsLoggedGuard]},
  {path: 'add-ad', component: AddAdComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
