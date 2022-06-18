import { Component, Input, OnInit } from '@angular/core';
import { GetEventModel } from 'src/app/models/events/get-event';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {

  @Input() event: GetEventModel;

  constructor() { }

  ngOnInit(): void {
    this.event.description = this.cropText(this.event.description, 100);
  }

  private cropText(text: string, maxSymbols: number) {

    if(maxSymbols <= 0)
    {
      maxSymbols = 3;
    }

    if(text.length > maxSymbols) {
      text = text.substring(0, maxSymbols-3) + '...';
    }

    return text;
  }
}
