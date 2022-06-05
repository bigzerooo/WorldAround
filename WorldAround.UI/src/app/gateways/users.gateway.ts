import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';
import { UriHelper } from '../helpers/uri-helper';

@Injectable({
  providedIn: 'root'
})
export class UsersGateway {

  private basePath = environment.apiBaseUrl + 'Users';

  constructor(
    private http: HttpClient,
    private cookie: CookieService) { }

  get(userName: string) {

    let query = '?UserName=' + userName;

    return this.http.get(UriHelper.createUri(this.basePath, query));
  }

  exists(login: string) {

    let query = '/Exists?login=' + login;

    return this.http.get(UriHelper.createUri(this.basePath, query));
  }
}
