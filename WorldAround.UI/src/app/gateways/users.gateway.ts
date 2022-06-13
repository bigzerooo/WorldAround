import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UriHelper } from '../helpers/uri-helper';
import { UpdateUserModel } from '../models/users/update-user';
import { UserDetailsModel } from '../models/users/user-details';

@Injectable({
  providedIn: 'root'
})
export class UsersGateway {

  private basePath = environment.apiBaseUrl + 'Users';

  constructor(private http: HttpClient) { }

  update(user: UpdateUserModel): Observable<UserDetailsModel> {
    return this.http.put<UserDetailsModel>(this.basePath, user);
  }

  get(userName: string) {

    let query = '?UserName=' + userName;

    return this.http.get(UriHelper.createUri(this.basePath, query));
  }

  checkPassword(userId: number, password: string): Observable<boolean> {
    return this.http.get<boolean>(UriHelper.createUri(this.basePath, 'CheckPassword'), {
      params: {
        userId: userId,
        password: password
      }
    });
  }

  updatePassword(userId: number, currentPassword: string, newPassword: string) {
    return this.http.put(UriHelper.createUri(this.basePath, 'UpdatePassword'), {
      userId: userId,
      currentPassword: currentPassword,
      newPassword: newPassword
    });
  }

  getUserById(id: number): Observable<UserDetailsModel> {
    return this.http.get<UserDetailsModel>(UriHelper.createUri(this.basePath, id.toString()));
  }

  exists(login: string) {

    let query = '/Exists?login=' + login;

    return this.http.get(UriHelper.createUri(this.basePath, query));
  }
}
