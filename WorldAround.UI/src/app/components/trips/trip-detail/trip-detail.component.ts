import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { ToastrService } from 'ngx-toastr';
import { TripsGateway } from 'src/app/gateways/trips-gateway.service';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit, OnDestroy, AfterViewInit {

  private map: any;
  private route: any;
  public trip: any;

  public commentText: any;

  sub: any;
  tripId: number;

  constructor(private activateRoute: ActivatedRoute,
    private tripsGateway: TripsGateway,
    private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.sub = this.activateRoute.params.subscribe(params => {
      this.tripId = params['id'];
      this.tripsGateway.getTrip(this.tripId).subscribe(data => {
        this.trip = data;
        var waypoints = data.pins.map(x => L.latLng(x.latitude, x.longitude));
        this.route.setWaypoints(waypoints);
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map2', {
      center: [48.2852, 25.9287],
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    const planOptions = { addWaypoints: false, draggableWaypoints: false };
    const plan = L.Routing.plan([], planOptions);

    this.route = L.Routing.control({
      plan,
      lineOptions: {
        addWaypoints: false,
        missingRouteTolerance: 10,
        extendToWaypoints: false
      }
    }).addTo(this.map);
  }

  public addComment() {
    const model = {
      userId: 1,
      tripId: this.tripId,
      text: this.commentText
    }

    this.tripsGateway.addTripComment(model).subscribe(data => {
      this.trip.comments.push(data);
      this.commentText = '';
      this.toastr.success('Comment successfully added.', 'Success');
    });
  }
}
