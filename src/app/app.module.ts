import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCardModule, MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule, MatNativeDateModule, MatRadioModule, MatSelectModule,
    MatSidenavModule, MatTableModule, MatTabsModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatProgressSpinnerModule, MatSortModule, MatPaginatorModule
} from '@angular/material';
import {NavigationComponent} from './components/navigation/navigation.component';
import {LayoutModule} from '@angular/cdk/layout';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {ErrorInterceptor} from './helpers/error.interceptor';
import { HomeComponent } from './components/home/home.component';
import { AddAdComponent } from './components/add-ad/add-ad.component';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { ToastrModule } from 'ngx-toastr';
import {InfoDialogComponent} from './dialogs/info/info.dialog';
import { AdvertisementsComponent } from './components/advertisements/advertisements.component';

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        SignInComponent,
        SignUpComponent,
        HomeComponent,
        AddAdComponent,
        InfoDialogComponent,
        AdvertisementsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule, MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatListModule, MatNativeDateModule, MatRadioModule, MatSelectModule,
        MatSidenavModule, MatTableModule, MatTabsModule,
        MatToolbarModule,
        MatButtonToggleModule,
        MatFormFieldModule,
        MatProgressSpinnerModule, MatSortModule, MatPaginatorModule, LayoutModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatFileUploadModule,
        ToastrModule.forRoot()
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
    ],
    bootstrap: [AppComponent],
    entryComponents: [InfoDialogComponent]
})
export class AppModule {
}
