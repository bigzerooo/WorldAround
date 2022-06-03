import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth-guard.service';
import { AttractionsComponent } from './components/attractions/attractions.component';
import { HomeComponent } from './components/home/home.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { SearchComponent } from './components/search/search.component';
import { CreateTripComponent } from './components/trips/create-trip/create-trip.component';
import { TripDetailComponent } from './components/trips/trip-detail/trip-detail.component';
import { TripsComponent } from './components/trips/trips.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'trips', component: TripsComponent},
  {path: 'trips/create', canActivate: [AuthGuard], component: CreateTripComponent},
  {path: 'attractions', component: AttractionsComponent},
  {path: 'my-profile', canActivate: [AuthGuard], component: MyProfileComponent},
  {path: 'trip/:id', canActivate: [AuthGuard], component: TripDetailComponent},
  {path: 'search/:type/:value', component: SearchComponent},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
