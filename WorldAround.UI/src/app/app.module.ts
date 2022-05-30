import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TripsGridComponent } from './components/trips-grid/trips-grid.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { TripsComponent } from './components/trips/trips.component';
import { AttractionsComponent } from './components/attractions/attractions.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { UserInfoComponent } from './components/my-profile/user-info/user-info.component';
import { TripInfoComponent } from './components/my-profile/trip-info/trip-info.component';
import { CreateTripComponent } from './components/trips/create-trip/create-trip.component';
import { CreateTripMapComponent } from './components/trips/create-trip/create-trip-map/create-trip-map.component';

@NgModule({
  declarations: [
    AppComponent,
    TripsGridComponent,
    HeaderComponent,
    HomeComponent,
    TripsComponent,
    AttractionsComponent,
    MyProfileComponent,
    UserInfoComponent,
    TripInfoComponent,
    CreateTripComponent,
    CreateTripMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
