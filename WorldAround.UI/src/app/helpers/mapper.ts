import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { CardModel } from "../models/cards/card";
import { GetEventModel } from "../models/events/get-event";

@Injectable({
  providedIn: 'root'
})
export class MapperHelper {

  constructor(private readonly datepipe: DatePipe) { }

  map (source: object, destination: object) {

    Object.keys(destination).forEach(key => {
      destination[key] = source[key] ?? null;
    });

    return destination;
  }

  mapGetEventToCard(event: GetEventModel): CardModel {

    let card = <CardModel>this.map(event, new CardModel());
    card.subtitle = this.datepipe.transform(event.startDate, 'dd/MM/yyyy');
    // card.avatarPath = event.avatarPath;

    return card;
  }
}
