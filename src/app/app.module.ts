import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationFieldComponent } from './shared/location-field/location-field.component';
import { MainNavbarComponent } from './shared/main-navbar/main-navbar.component';
import { FilterFieldComponent } from './shared/filter-field/filter-field.component';
import { ManagementToolHeaderComponent } from './management-tool-header/management-tool-header.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { TagListComponent } from './shared/tag-list/tag-list.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ApiService} from "./services/api-service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TagFormComponent } from './shared/tag-form/tag-form.component';
import { AuthFormComponent } from './shared/auth-form/auth-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from'@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CreateTagFormComponent } from './shared/create-tag-form/create-tag-form.component';
import {ColorPickerModule} from "ngx-color-picker";
import { TilesListComponent } from './shared/tiles-list/tiles-list.component';
import {ManagementToolPageComponent} from "./pages/management-tool-page/management-tool-page.component";



@NgModule({
  declarations: [
    AppComponent,
    LocationFieldComponent,
    MainNavbarComponent,
    FilterFieldComponent,
    ManagementToolHeaderComponent,
    ManagementToolPageComponent,
    NotFoundPageComponent,
    TagListComponent,
    TagFormComponent,
    AuthFormComponent,
    CreateTagFormComponent,
    TilesListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSidenavModule,
    ReactiveFormsModule,
    ColorPickerModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
