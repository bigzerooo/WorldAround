import { Injectable } from "@angular/core";
import { EventsGateway } from "../gateways/events.gateway";
import { CreateEventModel } from "../models/events/create-event";
import { AuthorizationService } from "./authorization.service";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(
    private eventsGateway: EventsGateway,
    private authService: AuthorizationService) {
  }

  createEvent(model: CreateEventModel) {
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
        console.log("result", result);

        if (formData.has(formDataName)) {
          this.eventsGateway.updateEventImage(result.id, formData).subscribe();
          model.image = image;
        }
      });
  }
}
