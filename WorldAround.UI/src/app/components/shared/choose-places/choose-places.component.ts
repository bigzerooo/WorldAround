import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-places',
  templateUrl: './choose-places.component.html',
  styleUrls: ['./choose-places.component.scss']
})
export class ChoosePlacesComponent implements OnInit {

  inputValue: any;
  selectedValue: any;
  trips: any[];

  constructor() { }

  search(): void {
    console.log(this.inputValue);
  }

  ngOnInit(): void {
    this.trips = [
      {
        test: 'test'
      }
    ]
  }

}
