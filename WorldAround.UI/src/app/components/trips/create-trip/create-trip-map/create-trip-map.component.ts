import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import'leaflet-routing-machine';
import { TripsGateway } from 'src/app/gateways/trips-gateway.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-create-trip-map',
  templateUrl: './create-trip-map.component.html',
  styleUrls: ['./create-trip-map.component.scss']
})
export class CreateTripMapComponent implements OnInit, AfterViewInit {
  
  private map:any;
  public currentMarker:any;
  public pins = [];
  public markers = [];
  public currentPin:any = {
    seqNo: this.getSeqNo()
  };
  private route: any;
  public name: any;
  public description: any;

  constructor(private tripsGateway: TripsGateway){    
  }

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

    this.map.on("click", e => {
      if(this.currentMarker){
        this.map.removeLayer(this.currentMarker);
      }
      
      this.currentMarker = L.marker([e.latlng.lat, e.latlng.lng]);
      this.map.addLayer(this.currentMarker);
      this.currentPin.latitude = this.currentMarker?._latlng?.lat;
      this.currentPin.longitude = this.currentMarker?._latlng?.lng;
    })

    const planOptions = {addWaypoints: false, draggableWaypoints: false};
    const plan = L.Routing.plan([], planOptions);  

    this.route = L.Routing.control({
      plan,
      lineOptions : {
        addWaypoints: false,
        missingRouteTolerance: 10,
        extendToWaypoints: false
    }
    }).addTo(this.map);
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  savePin(): void {
    this.pins.push(Object.assign({}, this.currentPin));

    this.currentPin.seqNo = this.getSeqNo();
    this.currentPin.name = '';
    this.currentPin.description = '';
    this.currentPin.latitude = undefined;
    this.currentPin.longitude = undefined;

    this.markers.push(Object.assign({},this.currentMarker));
    this.currentMarker = {};

    var wayPoints = this.markers.map(v => v._latlng);

    this.route.setWaypoints(wayPoints);
  }

  getSeqNo(): number {
    if(this.pins.length < 1) {
      return 1;
    }
    return  Math.max(...this.pins.map(o => o.seqNo)) + 1;
  }

  saveTrip():void {

    this.tripsGateway.createTrip({
      name: this.name,
      description: this.description,
      pins: this.pins
    }).subscribe(x=> console.log('help'));
  }
}
