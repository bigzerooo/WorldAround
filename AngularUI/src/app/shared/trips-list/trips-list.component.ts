import { Component, Input, OnInit } from '@angular/core';
import { TripInfo } from './trip-info';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.scss']
})
export class TripsListComponent implements OnInit {
  @Input() title: string = '';
  @Input() listName: string = '';
  trips: TripInfo[] = [
    new TripInfo(1, 'My first trip', 'Denys', 0, 0, 0, 30, "Some description"),
    new TripInfo(2, 'Best trip', 'Sasha', 0, 0, 0, 120, "Some description"),
    new TripInfo(3, 'Test trip', 'Denys', 0, 0, 0, 30, "A lot of description description description description description description description description description description description description description "),
    new TripInfo(4, 'Test trip', 'Denys', 0, 0, 0, 30, "Some description"),
    new TripInfo(5, 'Test trip', 'Denys', 0, 0, 0, 30, "Some description"),
    new TripInfo(6, 'Test trip', 'Denys', 0, 0, 0, 30, "Some description"),
    new TripInfo(7, 'Test trip', 'Denys', 0, 0, 0, 30, "Some description"),
    new TripInfo(8, 'Test trip', 'Denys', 0, 0, 0, 30, "Some description"),
    new TripInfo(9, 'Test trip', 'Denys', 0, 0, 0, 30, "Some description"),
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
