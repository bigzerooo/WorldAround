import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { EventsGateway } from "../gateways/events.gateway";
import { CreateEventModel } from "../models/events/create-event";
import { AuthorizationService } from "./authorization.service";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(
    private readonly router: Router,
    private readonly eventsGateway: EventsGateway,
    private readonly authService: AuthorizationService) {
  }

  createEvent(model: CreateEventModel): void {
    model.Participants = model.Participants?.map(participant => participant.id);
    model.Trips = model.Trips?.map(trip => trip.id);
    model.createUserId = this.authService.getUserId();
    let formData = new FormData();
    let formDataName = 'image';
    let image: File;

    if (model.image) {
      formData.append(formDataName, model.image);
      image = model.image;
      model.image = null;
    }

    this.eventsGateway.createEvent(model)
      .subscribe(result => {
        if (formData.has(formDataName)) {
          this.eventsGateway.updateEventImage(result.id, formData).subscribe(() => {
            this.router.navigate([`events/details/${result.id}`]);
          });
          model.image = image;
        }
        else {
          this.router.navigate([`events/details/${result.id}`]);
        }
      });
  }
}
