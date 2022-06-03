import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TripsGateway } from 'src/app/gateways/trips-gateway.service';
import { AddCommentModel } from 'src/models/comments/addComment';
import { PointModel } from 'src/models/map/point';
import { GetTripsModel } from 'src/models/trips/getTrips';
import { AuthorizationService } from 'src/services/authorization.service';
import { MapComponent } from '../../shared/map/map.component';
import { DeleteTripPopupComponent } from './delete-trip-popup/delete-trip-popup.component';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit, OnDestroy {

  @ViewChild(MapComponent) map: MapComponent;

  trip: GetTripsModel;
  commentText: any;
  sub: any;
  userId: number;

  constructor(private readonly activateRoute: ActivatedRoute,
    private readonly tripsGateway: TripsGateway,
    private readonly toastr: ToastrService,
    private readonly authService: AuthorizationService,
    private readonly router: Router,
    private readonly dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    this.sub = this.activateRoute.params.subscribe(params => {
      const tripId = params['id'];
      this.tripsGateway.getTrip(tripId).subscribe(data => {
        this.trip = data;

        this.setWaypoints();
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  openDeleteTripPopup(): void {
    const dialogRef = this.dialog.open(DeleteTripPopupComponent, {
      width: '450px',
      data: this.trip.id
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toastr.success('Trip successfully deleted!', 'Success');
        this.router.navigate(['/my-profile']);
      }
    });
  }

  addComment(): void {
    const model = new AddCommentModel(this.commentText, this.userId, this.trip.id);

    this.tripsGateway.addTripComment(model).subscribe(data => {
      this.trip.comments.push(data);
      this.commentText = '';
      this.toastr.success('Comment successfully added.', 'Success');
    });
  }

  private setWaypoints(): void {
    const waypoints = this.trip.pins.map(x => new PointModel(x.latitude, x.longitude));
    this.map.setWaypoints(waypoints);
  }
}
