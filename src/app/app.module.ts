import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatTooltipModule,
    MatChipsModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatSlideToggleModule
} from '@angular/material';
import {NavigationComponent} from './components/navigation/navigation.component';
import {LayoutModule} from '@angular/cdk/layout';
import {SignInComponent} from './components/user/sign-in/sign-in.component';
import {SignUpComponent} from './components/user/sign-up/sign-up.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {ErrorInterceptor} from './helpers/error.interceptor';
import {HomeComponent} from './components/home/home.component';
import {AddAdComponent} from './components/add-ad/add-ad.component';
import {MatFileUploadModule} from 'angular-material-fileupload';
import {ToastrModule} from 'ngx-toastr';
import {InfoDialogComponent} from './dialogs/info/info.dialog';
import {UserAdvertisementsComponent} from './components/user/advertisements/advertisements.component';
import {AdvertisementComponent} from './components/home/advertisement/advertisement.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {AdComponent} from './components/home/home-advertisements/ad/ad.component';
import {SearchComponent} from './components/home/home-advertisements/search/search.component';
import {SortComponent} from './components/home/home-advertisements/sort/sort.component';
import {EditAdComponent} from './components/user/edit-ad/edit-ad.component';
import {HomeAdvertisementsComponent} from './components/home/home-advertisements/home-advertisements.component';
import {UserComponent} from './components/user/user.component';
import {UserProfileComponent} from './components/user/user-profile/user-profile.component';
import {EditProfileDialogComponent} from './dialogs/edit-profile/edit-profile.dialog';
import {SendMessageComponent} from './components/home/advertisement/send-message/send-message.component';
import {MessagesComponent} from './components/user/messages/messages.component';
import { MessageComponent } from './components/user/messages/message/message.component';
import {ConfirmDialogComponent} from './dialogs/confirm/confirm.dialog';
import {MessageDialogComponent} from './dialogs/message/message.dialog';
import { AdminComponent } from './components/admin/admin.component';
import { UsersComponent } from './components/admin/users/users.component';
import { AdvertisementsComponent } from './components/admin/advertisements/advertisements.component';
import { AgmCoreModule } from '@agm/core';
import {apiKey} from './api-key';
import { MapComponent } from './components/map/map.component';

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        SignInComponent,
        SignUpComponent,
        HomeComponent,
        AddAdComponent,
        InfoDialogComponent,
        UserAdvertisementsComponent,
        AdvertisementComponent,
        AdComponent,
        SearchComponent,
        SortComponent,
        EditAdComponent,
        HomeAdvertisementsComponent,
        UserComponent,
        UserProfileComponent,
        EditProfileDialogComponent,
        SendMessageComponent,
        MessagesComponent,
        MessageComponent,
        ConfirmDialogComponent,
        MessageDialogComponent,
        AdminComponent,
        UsersComponent,
        AdvertisementsComponent,
        MapComponent
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
        MatGridListModule,
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatFileUploadModule,
        ToastrModule.forRoot(),
        MDBBootstrapModule.forRoot(),
        InfiniteScrollModule,
        MatMenuModule,
        MatTooltipModule,
        MatChipsModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatSlideToggleModule,
        AgmCoreModule.forRoot({
            apiKey: apiKey,
            libraries: ['places']
        })
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        InfoDialogComponent,
        EditProfileDialogComponent,
        ConfirmDialogComponent,
        MessageDialogComponent
    ]
})
export class AppModule {
}
