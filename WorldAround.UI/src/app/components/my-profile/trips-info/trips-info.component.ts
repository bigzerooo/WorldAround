import { Component, OnInit, ViewChild } from '@angular/core';
import { TripsGateway } from 'src/app/gateways/trips-gateway.service';
import { PointModel } from 'src/models/map/point';
import { AuthorizationService } from 'src/services/authorization.service';
import { MapComponent } from '../../shared/map/map.component';

@Component({
  selector: 'app-trips-info',
  templateUrl: './trips-info.component.html',
  styleUrls: ['./trips-info.component.scss']
})
export class TripsInfoComponent implements OnInit {

  @ViewChild(MapComponent) map: MapComponent;

  trips: any = [];

  constructor(private readonly tripsGateway: TripsGateway,
    private readonly authService: AuthorizationService) { }

  ngOnInit(): void {
    this.trips = this.tripsGateway.getTrips(this.authService.getUserId())
      .subscribe(data => {
        this.trips = data;
      });
  }

  showTrip(pins) {
    const waypoints = pins.map(x => new PointModel(x.latitude, x.longitude));
    this.map.setWaypoints(waypoints);
  }
}
