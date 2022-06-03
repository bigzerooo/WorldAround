import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddCommentModel } from 'src/models/comments/addComment';
import { CommentModel } from 'src/models/comments/comment';
import { CreateTripModel } from 'src/models/trips/createTrip';
import { GetTripsModel } from 'src/models/trips/getTrips';
import { UpdateTripModel } from 'src/models/trips/updateTrip';

@Injectable({
  providedIn: 'root'
})
export class TripsGateway {

  private baseUrl = `${environment.apiBaseUrl}Trips`;

  constructor(private http: HttpClient) { }

  getTrip(tripId: number): Observable<GetTripsModel> {
    return this.http.get<GetTripsModel>(`${this.baseUrl}/${tripId}`);
  }

  getTrips(userId: number): Observable<GetTripsModel[]> {
    return this.http.get<GetTripsModel[]>(`${this.baseUrl}?userId=${userId}`);
  }

  searchTrips(value: string): Observable<GetTripsModel[]> {
    return this.http.get<GetTripsModel[]>(`${this.baseUrl}/Search?value=${value}`);
  }

  createTrip(createTripModel: CreateTripModel): Observable<any> {
    return this.http.post(this.baseUrl, createTripModel);
  }

  updateTripName(updateTripModel: UpdateTripModel): Observable<any> {
    return this.http.put(`${this.baseUrl}/Name`, updateTripModel);
  }

  updateTripDescription(updateTripModel: UpdateTripModel): Observable<any> {
    return this.http.put(`${this.baseUrl}/Description`, updateTripModel);
  }

  deleteTrip(tripId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${tripId}`);
  }

  addTripComment(addTripCommentModel: AddCommentModel): Observable<CommentModel> {
    return this.http.post<CommentModel>(`${this.baseUrl}/Comment`, addTripCommentModel);
  }
}
