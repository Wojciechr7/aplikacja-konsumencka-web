import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
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
    MatProgressSpinnerModule, MatSortModule, MatPaginatorModule, LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
