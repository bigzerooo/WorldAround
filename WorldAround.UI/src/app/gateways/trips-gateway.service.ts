import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddCommentModel } from 'src/models/comments/addComment';
import { CommentModel } from 'src/models/comments/comment';
import { CreateTripModel } from 'src/models/trips/createTrip';
import { GetTripsModel } from 'src/models/trips/getTrips';

@Injectable({
  providedIn: 'root'
})
export class TripsGateway {

  private baseUrl = 'https://localhost:7073/api/Trips';

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

  deleteTrip(tripId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${tripId}`);
  }

  addTripComment(addTripCommentModel: AddCommentModel): Observable<CommentModel> {
    return this.http.post<CommentModel>(`${this.baseUrl}/Comment`, addTripCommentModel);
  }
}
