import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import * as L from 'leaflet';
import'leaflet-routing-machine';
import { PointModel } from 'src/models/map/point';

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
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @Input() width: string = '100%'
  @Input() height: string = '600px';
  @Input() mapId: string = 'mapId';
  @Input() clickable: boolean = false;

  @Output() mapClick: EventEmitter<PointModel> = new EventEmitter<PointModel>();

  private map:any;
  private route: any;
  private activeMarker: any;
  private markerPoints: PointModel[] = [];

  ngAfterViewInit(): void {
    this.initMap();
  }  

  ngOnDestroy(): void {
    this.map?.off();
    this.map?.remove();
  }

  setWaypoints(points : PointModel[]): void {
    const waypoints = points.map(point=> L.latLng(point.x, point.y))
    this.route.setWaypoints(waypoints);
  }

  saveActiveMarker(): void {
    if(!this.activeMarker){
      return;
    }

    const point = new PointModel(this.activeMarker?._latlng?.lat, this.activeMarker?._latlng?.lng);

    this.markerPoints.push(point);

    this.setWaypoints(this.markerPoints);

    this.map.removeLayer(this.activeMarker);
  }

  private initMap(): void {
    this.map = L.map(this.mapId, {
      center: [ 48.2852, 25.9287 ],
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    if(this.clickable) {
      this.map.on("click",  e => this.onClick(e));
    }

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

  private onClick(event: any) : void {
    if(this.activeMarker){
      this.map.removeLayer(this.activeMarker);
    }

    this.activeMarker = L.marker([event.latlng.lat, event.latlng.lng]);
    this.map.addLayer(this.activeMarker);

    this.mapClick.emit(new PointModel(event.latlng.lat, event.latlng.lng));
  }
}
