import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttractionsComponent } from './components/attractions/attractions.component';
import { HomeComponent } from './components/home/home.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { CreateTripComponent } from './components/trips/create-trip/create-trip.component';
import { TripsComponent } from './components/trips/trips.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'trips', component: TripsComponent},
  {path: 'trips/create', component: CreateTripComponent},
  {path: 'attractions', component: AttractionsComponent},
  {path: 'my-profile', component: MyProfileComponent},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
