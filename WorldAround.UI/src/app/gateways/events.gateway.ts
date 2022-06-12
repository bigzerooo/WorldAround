import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UriHelper } from '../helpers/uri-helper';
import { CreateEventModel } from '../models/events/create-event';
import { EventDetailsModel } from '../models/events/get-event-details';
import { GetEventsPageModel } from '../models/events/get-events-page';
import { UpdateEventModel } from '../models/events/update-event';

@Injectable({
  providedIn: 'root'
})
export class EventsGateway {

  private basePath = UriHelper.createUri(environment.apiBaseUrl, 'Events');

  constructor(private readonly http: HttpClient) { }

  getById(id: number): Observable<EventDetailsModel> {

    return this.http.get<EventDetailsModel>(UriHelper.createUri(this.basePath, id.toString()));
  }

  getEvents(searchValue: string, pageIndex: number, pageSize: number): Observable<GetEventsPageModel> {
    return this.http.get<GetEventsPageModel>(UriHelper.createUri(this.basePath), {
      params: {
        searchValue: searchValue,
        pageIndex: pageIndex,
        pageSize: pageSize
      }
    });
  }

  createEvent(model: CreateEventModel): Observable<EventDetailsModel> {
    return this.http.post<EventDetailsModel>(this.basePath, model);
  }

  update(model: UpdateEventModel): Observable<EventDetailsModel> {
    return this.http.post<EventDetailsModel>(UriHelper.createUri(this.basePath, model.id.toString()), model);
  }

  updateEventImage(eventId: number, image: FormData): Observable<any> {
    let path = UriHelper.createUri(this.basePath, 'UpdateEventImage', eventId.toString());

    return this.http.put(path, image);
  }

  delete(eventId: number) {
    return this.http.delete(UriHelper.createUri(this.basePath, eventId.toString()));
  }
}
