import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-create-trip-map',
  templateUrl: './create-trip-map.component.html',
  styleUrls: ['./create-trip-map.component.scss']
})
export class CreateTripMapComponent implements OnInit, AfterViewInit {
  
  private map:any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 48.2852, 25.9287 ],
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
}
