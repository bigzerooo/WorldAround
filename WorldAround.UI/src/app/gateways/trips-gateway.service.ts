import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripsGateway {

  private baseUrl = 'https://localhost:44324/api/Trips';
  

  constructor(private http: HttpClient) { }

  public createTrip(createTripModel: any): Observable<any> {
    return this.http.post(this.baseUrl, createTripModel);
  }

  public getTrips(userId: number): Observable<any>{
    return this.http.get(`${this.baseUrl}?userId=${userId}`);
  }
}
