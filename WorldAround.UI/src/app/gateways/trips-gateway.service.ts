import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripsGateway {

  private baseUrl = 'https://localhost:7073/api/Trips';
  
  constructor(private http: HttpClient) { }

  public getTrip(tripId: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/${tripId}`);
  }

  public getTrips(userId: number): Observable<any>{
    return this.http.get(`${this.baseUrl}?userId=${userId}`);
  }

  public searchTrips(value: string): Observable<any>{
    return this.http.get(`${this.baseUrl}/Search?value=${value}`);
  }
  
  public createTrip(createTripModel: any): Observable<any> {
    return this.http.post(this.baseUrl, createTripModel);
  }

  public addTripComment(addTripCommentModel: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/Comment`, addTripCommentModel);
  }
}
