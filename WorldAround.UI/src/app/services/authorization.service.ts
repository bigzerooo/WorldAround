import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';
import { LoginModel } from 'src/app/models/login';
import { RegistrationModel, RegistrationModelValidationErrors } from 'src/app/models/registration';
import { AuthenticationResultModel } from 'src/app/models/authenticationResult';
import { throwError } from 'rxjs';
import { UriHelper } from 'src/app/helpers/uri-helper';

const TOKEN = 'TOKEN';
const BAD_REQUEST_STATUS = 400;
const httpOptions = {
 headers: new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  baseController = 'Authentication/';

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private jwtHelper: JwtHelperService) { }

  public authorize(login: LoginModel) {
    const path = 'Authorize';

    var result = this.http.post<AuthenticationResultModel>(this.createUrl(path), login)
      .pipe(
        map((response) => {

          let details = response.details;

          if (details.succeeded) {
            this.setToken(response.token);
          }

          return details;
        })
      );

    return result;
  }

  public getUserId() {
    let token = this.cookie.get(TOKEN)

    return this.jwtHelper.decodeToken(token).id;
  }

  public signUp(user: RegistrationModel) {
    const path = 'Create';

    return this.http.post(this.createUrl(path), user)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {

    if (errorResponse.status === BAD_REQUEST_STATUS) {
      let errors = errorResponse.error.errors;

      let validationErrors: RegistrationModelValidationErrors = errors;

      console.log("Validation Errors", validationErrors);
    }

    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  public logout() {
    this.cookie.remove(TOKEN);
  }

  public isAuthorized(): boolean {
    const token = this.cookie.get(TOKEN);

    if (token == null) {
      return false;
    }

    return !this.jwtHelper.isTokenExpired(token);
  }

  private setToken(token: string): void {
    this.cookie.put(TOKEN, token);
  }

  private getToken(): string {
    return this.cookie.get(TOKEN);
  }

  private setAuthorizationHeader(): HttpHeaders {
    return httpOptions.headers.set('Authorization', 'Bearer' + this.getToken());
  }

  private createUrl(path: string): string {
    return UriHelper.createUri(environment.apiBaseUrl, this.baseController, path);
  }
}
