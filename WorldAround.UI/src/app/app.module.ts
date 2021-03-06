import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieModule } from 'ngx-cookie';
import { JwtModule, JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { TripsComponent } from './components/trips/trips.component';
import { AttractionsComponent } from './components/attractions/attractions.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { UserInfoComponent } from './components/my-profile/user-info/user-info.component';
import { TripsInfoComponent } from './components/my-profile/trips-info/trips-info.component';
import { CreateTripComponent } from './components/trips/create-trip/create-trip.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { TripDetailComponent } from './components/trips/trip-detail/trip-detail.component';
import { SearchComponent } from './components/search/search.component';
import { MapComponent } from './components/shared/map/map.component';
import { IconComponent } from './components/shared/icon/icon.component';
import { DeleteTripPopupComponent } from './components/trips/trip-detail/delete-trip-popup/delete-trip-popup.component';
import { UsersGateway } from './gateways/users.gateway';
import { AuthGuard } from 'src/app/guards/auth-guard';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { UniqueLoginValidator } from './validation/authentication-control-validation';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { TripsGridComponent } from './components/shared/trips-grid/trips-grid.component';
import { CreateEventComponent } from './components/events/create-event/create-event.component';
import { ChoosePlacesComponent } from './components/shared/choose-places/choose-places.component';
import { ChoosePeopleComponent } from './components/shared/choose-people/choose-people.component';
import { EventsGateway } from './gateways/events.gateway';
import { EventsService } from './services/events.service';
import { SidenavContentComponent } from './components/sidenav-content/sidenav-content.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { AttractionCardComponent } from './components/attractions/attraction-card/attraction-card.component';
import { AttractionDetailsComponent } from './components/attractions/attraction-details/attraction-details.component';
import { MyAttractionsComponent } from './components/attractions/my-attractions/my-attractions.component';
import { AttractionsGridComponent } from './components/shared/attractions-grid/attractions-grid.component';
import { CreateAttractionComponent } from './components/attractions/create-attraction/create-attraction.component';
import { EventDetailsComponent } from './components/events/event-details/event-details.component';
import { CardComponent } from './components/shared/card/card.component';
import { GetEventsComponent } from './components/events/get-events/get-events.component';
import { UsersGridComponent } from './components/shared/users-grid/users-grid.component';
import { UserCardComponent } from './components/users/user-card/user-card.component';
import { AddImageComponent } from './components/shared/add-image/add-image.component';
import { CommentSectionComponent } from './components/shared/comment-section/comment-section.component';
import { DeleteCommentPopupComponent } from './components/shared/comment-section/delete-comment-popup/delete-comment-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    TripsComponent,
    AttractionsComponent,
    MyProfileComponent,
    UserInfoComponent,
    TripsInfoComponent,
    CreateTripComponent,
    TripDetailComponent,
    SearchComponent,
    LoginComponent,
    SignupComponent,
    MapComponent,
    IconComponent,
    DeleteTripPopupComponent,
    TripsGridComponent,
    CreateEventComponent,
    ChoosePlacesComponent,
    ChoosePeopleComponent,
    SidenavContentComponent,
    UserSettingsComponent,
    AttractionCardComponent,
    AttractionDetailsComponent,
    MyAttractionsComponent,
    AttractionsGridComponent,
    CreateAttractionComponent,
    EventDetailsComponent,
    CardComponent,
    GetEventsComponent,
    UsersGridComponent,
    UserCardComponent,
    AddImageComponent,
    CommentSectionComponent,
    DeleteCommentPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CookieModule.withOptions(),
    JwtModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatInputModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatChipsModule,
    MatRadioModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    UsersGateway,
    EventsGateway,
    JwtHelperService,
    AuthorizationService,
    UniqueLoginValidator,
    EventsService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
