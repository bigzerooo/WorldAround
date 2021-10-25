import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { TripsListComponent } from './shared/trips-list/trips-list.component';
import { TripsListItemComponent } from './shared/trips-list/trips-list-item/trips-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TripsListComponent,
    TripsListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
