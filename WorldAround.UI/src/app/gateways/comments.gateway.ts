import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddCommentModel } from '../models/comments/addCommentModel';
import { CommentModel } from '../models/comments/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsGateway {

  private baseUrl = `${environment.apiBaseUrl}Comments`;

  constructor(private http: HttpClient) { }

  addComment(addTripCommentModel: AddCommentModel): Observable<CommentModel> {
    return this.http.post<CommentModel>(`${this.baseUrl}`, addTripCommentModel);
  }
}
