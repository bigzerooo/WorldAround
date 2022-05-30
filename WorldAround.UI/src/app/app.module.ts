import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieModule } from 'ngx-cookie';

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
import { AuthorizationService } from 'src/services/authorization.service';
import { AuthGuard } from 'src/services/auth-guard.service';
import { JwtModule, JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

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
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CookieModule.withOptions(),
    JwtModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
    AuthorizationService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
