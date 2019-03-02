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

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        SignInComponent,
        SignUpComponent
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
        HttpClientModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
