import { Component, OnInit } from '@angular/core';
import { EventsGateway } from 'src/app/gateways/events.gateway';
import { EventDetailsModel } from 'src/app/models/events/get-event-details';
import { ActivatedRoute, Router, } from '@angular/router';
import { ParticipantRole } from 'src/app/enums/participant-role';
import { ParticipantModel } from 'src/app/models/users/participant';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  private id: number;

  pending: boolean = true;
  userIsParticipant: boolean = false;
  fullName: string;
  owner: ParticipantModel;
  model: EventDetailsModel;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly gateway: EventsGateway,
    private readonly authService: AuthorizationService,
    private readonly imageService: ImageService) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.gateway.getById(this.id)
      .subscribe(result => {
        this.model = result;
        this.model.createDate = new Date(Date.parse(this.model.createDate.toString()));
        this.model.startDate = new Date(Date.parse(this.model.startDate?.toString()));
        this.model.endDate = new Date(Date.parse(this.model.endDate?.toString()));

        for (let i = 0; i < this.model.participants.length; i++) {
          if (this.model.participants[i].participantRoleId === ParticipantRole.Owner) {
            this.owner = this.model.participants[i];
          }
        }

        let userName = this.authService.getUserName();

        for (let i = 0; i < this.model.participants.length; i++) {
          if (userName == this.model.participants[i].userName) {
            this.userIsParticipant = true;
            break;
          }
        }

        if (this.owner) {
          this.setAuthor();
        }

        if (this.model.endDate <= this.model.startDate) {
          this.model.endDate = null;
        }

        if (this.model.image) {
          this.model.image = this.imageService.getImageUrl(this.model.image);
        }

        this.pending = false;
      });
  }

  onGoToChat(): void {
    // this.router.navigate(['events/', { id: 7 }]);
  }

  onTripClick(id: number) {
    this.router.navigate([])
      .then(() => { window.open(`trip/${id}`), '_blank' });
  }

  private setAuthor(): void {

    if (!this.owner.firstName || !this.owner.lastName) {
      this.model.author = this.owner.userName;

      return;
    }

    this.model.author = this.owner.firstName + ' ' + this.owner.lastName;
  }
}
