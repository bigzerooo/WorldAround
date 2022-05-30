import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripsGateway } from 'src/app/gateways/trips-gateway.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  trips: any = [];
  users: any = [];
  attractions: any = [];
  events: any = [];

  sub: any;
  type: any;

  constructor(private tripsGateway: TripsGateway, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.activateRoute.params.subscribe(params => {
      this.type = params['type'];
      const value = params['value'];

      if(this.type == '0'){
        this.tripsGateway.searchTrips(value).subscribe(data => {
          this.trips = data;
        });
      }

    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getTitle(): string {
    let result = 'Found ';

    if(this.type == '0'){
      result+= this.trips.length;
      result+= ' Trip';
      if(this.trips.length !== 1) {
        result+= 's';
      }
    }

    if(this.type == '1'){
      result+= this.attractions.length;
      result+= ' Attraction';
      if(this.attractions.length !== 1) {
        result+= 's';
      }
    }

    if(this.type == '2'){
      result+= this.events.length;
      result+= ' Event';
      if(this.events.length !== 1) {
        result+= 's';
      }
    }

    if(this.type == '3'){
      result+= this.users.length;
      result+= ' User';
      if(this.users.length !== 1) {
        result+= 's';
      }
    }
    return result;
  }
}
