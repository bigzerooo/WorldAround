import { Component, OnInit } from '@angular/core';
import { EventsGateway } from 'src/app/gateways/events.gateway';
import { EventDetailsModel } from 'src/app/models/events/get-event-details';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  model: EventDetailsModel;

  constructor(private readonly gateway: EventsGateway) { }

  ngOnInit(): void {
  }

}
