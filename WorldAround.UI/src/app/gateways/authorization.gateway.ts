import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginModel } from 'src/app/models/login';
import { RegistrationModel } from 'src/app/models/registration';
import { AuthenticationResultModel } from 'src/app/models/authenticationResult';
import { Observable } from 'rxjs';
import { UriHelper } from 'src/app/helpers/uri-helper';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGateway {

  baseUrl = UriHelper.createUri(environment.apiBaseUrl, 'Authentication');

  constructor(private readonly http: HttpClient) { }

  authorize(login: LoginModel): Observable<AuthenticationResultModel> {

    const path = 'Authorize';

    return this.http.post<AuthenticationResultModel>(UriHelper.createUri(this.baseUrl, path), login)
  }

  createUser(user: RegistrationModel) {

    const path = 'Create';

    return this.http.post(UriHelper.createUri(this.baseUrl, path), user);
  }
}
