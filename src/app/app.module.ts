import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationFieldComponent } from './shared/location-field/location-field.component';
import { MainNavbarComponent } from './shared/main-navbar/main-navbar.component';
import { FilterFieldComponent } from './shared/filter-field/filter-field.component';
import { ManagementToolHeaderComponent } from './management-tool-header/management-tool-header.component';
import { TagListPageComponent } from './pages/tag-list-page/tag-list-page.component';
import {TileListPageComponent} from "./pages/tiles-list-page/tiles-list-page.component";
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';



@NgModule({
  declarations: [
    AppComponent,
    LocationFieldComponent,
    MainNavbarComponent,
    FilterFieldComponent,
    ManagementToolHeaderComponent,
    TagListPageComponent,
    TileListPageComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
