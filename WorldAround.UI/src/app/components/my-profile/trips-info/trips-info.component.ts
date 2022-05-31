import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import'leaflet-routing-machine';
import { TripsGateway } from 'src/app/gateways/trips-gateway.service';
import { AuthorizationService } from 'src/services/authorization.service';

@Component({
  selector: 'app-trips-info',
  templateUrl: './trips-info.component.html',
  styleUrls: ['./trips-info.component.scss']
})
export class TripsInfoComponent implements OnInit, AfterViewInit, OnDestroy {

  private map:any;
  private route: any;

  public trips: any = [];

  constructor(private tripsGateway: TripsGateway,
    private authService: AuthorizationService) { }

  ngOnDestroy(): void {
    this.map?.off();
    this.map?.remove();
  }

  ngOnInit(): void {
    this.trips = this.tripsGateway.getTrips(this.authService.getUserId())
    .subscribe(data => {
      this.trips = data;
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map1', {
      center: [ 48.2852, 25.9287 ],
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    const planOptions = {addWaypoints: false, draggableWaypoints: false};
    const plan = L.Routing.plan([], planOptions);  

    this.route = L.Routing.control({
      plan,
      lineOptions : {
        addWaypoints: false,
        missingRouteTolerance: 10,
        extendToWaypoints: false
    }
    }).addTo(this.map);
  }

  public showTrip(pins){
    var waypoints = pins.map(x=> L.latLng(x.latitude, x.longitude));
    this.route.setWaypoints(waypoints);
  }
}
