import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AttractionsGateway } from 'src/app/gateways/attractions.gateway';
import { CommentsGateway } from 'src/app/gateways/comments.gateway';
import { GetAttractionModel } from 'src/app/models/attractions/getAttractionModel';
import { AddCommentModel } from 'src/app/models/comments/addCommentModel';
import { TargetType } from 'src/app/models/comments/targetType';
import { PointModel } from 'src/app/models/map/point';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { environment } from 'src/environments/environment';
import { MapComponent } from '../../shared/map/map.component';

@Component({
  selector: 'app-attraction-details',
  templateUrl: './attraction-details.component.html',
  styleUrls: ['./attraction-details.component.scss']
})
export class AttractionDetailsComponent implements OnInit, OnDestroy {

  @ViewChild(MapComponent) map: MapComponent;

  sub: any;
  commentText: any;
  attraction: GetAttractionModel;
  backgroundImage: string;
  userId: number;

  interval: any;

  constructor(
    private readonly attractionsGateway: AttractionsGateway,
    private readonly commentsGateway: CommentsGateway,
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthorizationService,
    private readonly toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    this.sub = this.activatedRoute.params.subscribe(params => {
      const attractionId = params['id'];
      this.attractionsGateway.getAttraction(attractionId).subscribe(data => {
        this.attraction = data;
        this.backgroundImage = `url("${environment.cloudStorageUrl + this.attraction.imagePath}")`;
        this.interval = setInterval(() => {
          this.setWaypoints();
        }, 1000);
      })
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  addComment(): void {
    const model = new AddCommentModel(this.commentText, this.userId, this.attraction.id, TargetType.Attraction);

    this.commentsGateway.addComment(model).subscribe(data => {
      this.attraction.comments.push(data);
      this.commentText = '';
      this.toastr.success('Comment successfully added.', 'Success');
    });
  }

  setWaypoints(): void {
    console.log(this.map, this.attraction);
    if(this.map && this.attraction) {
      const waypoints = [new PointModel(this.attraction.latitude, this.attraction.longitude)];
      this.map.setWaypoints(waypoints);
      clearInterval(this.interval);
    }
  }
}
