import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TripsGateway } from 'src/app/gateways/trips-gateway.service';
import { AddCommentModel } from 'src/models/comments/addComment';
import { PointModel } from 'src/models/map/point';
import { AuthorizationService } from 'src/services/authorization.service';
import { MapComponent } from '../../shared/map/map.component';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit, OnDestroy {

  @ViewChild(MapComponent) map: MapComponent;

  trip: any;
  commentText: any;

  sub: any;
  tripId: number;

  constructor(private readonly activateRoute: ActivatedRoute,
    private readonly tripsGateway: TripsGateway,
    private readonly toastr: ToastrService,
    private readonly authService: AuthorizationService) {

  }

  ngOnInit(): void {
    this.sub = this.activateRoute.params.subscribe(params => {
      this.tripId = params['id'];
      this.tripsGateway.getTrip(this.tripId).subscribe(data => {
        this.trip = data;

        this.setWaypoints();
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private setWaypoints(): void {
    const waypoints = this.trip.pins.map(x => new PointModel(x.latitude, x.longitude));
    this.map.setWaypoints(waypoints);
  }

  public addComment(): void {
    const model = new AddCommentModel(this.commentText, this.authService.getUserId(), this.tripId);

    this.tripsGateway.addTripComment(model).subscribe(data => {
      this.trip.comments.push(data);
      this.commentText = '';
      this.toastr.success('Comment successfully added.', 'Success');
    });
  }
}
