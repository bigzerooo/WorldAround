import { Component, Input, OnInit } from '@angular/core';
import { TripInfo } from '../trip-info';

@Component({
  selector: 'app-trips-list-item',
  templateUrl: './trips-list-item.component.html',
  styleUrls: ['./trips-list-item.component.scss']
})
export class TripsListItemComponent implements OnInit {

  @Input() trip: TripInfo = new TripInfo();

  withDetails: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onTripClick = () => {
    this.withDetails = !this.withDetails;
  }
}
