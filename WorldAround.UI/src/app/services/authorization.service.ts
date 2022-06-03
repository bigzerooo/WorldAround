import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';
import { LoginModel } from 'src/app/models/login';
import { RegistrationModel } from 'src/app/models/registration';
import { AuthenticationResultModel } from 'src/app/models/authenticationResult';

const TOKEN = 'TOKEN';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  baseController = 'Authentication/';

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private jwtHelper: JwtHelperService) {}

  public Authorize(login: LoginModel) {
    const path = 'Authorize';

    var result = this.http.post<AuthenticationResultModel>(this.CreateUrl(path), login)
    .pipe(
      map((response) => {
        if(response.details.succeeded) {
          this.SaveToken(response.token);
        }

        return response;
      })
    );

    return result;
  }

  public getUserId() {
    let token = this.cookie.get(TOKEN)

    return this.jwtHelper.decodeToken(token).id;
  }

  public SignUp(user: RegistrationModel) {
    const path = 'Create';

    return this.http.post<{succeeded: boolean, errors: string[]}>(this.CreateUrl(path), user)
  }

  public Logout() {
    this.cookie.remove(TOKEN);
  }

  public IsAuthorized(): boolean {
    const token = this.cookie.get(TOKEN);

    if (token == null) {
      return false;
    }

    return !this.jwtHelper.isTokenExpired(token);
  }

  private SaveToken(token: string) {
    this.cookie.put(TOKEN, token);
  }

  private CreateUrl(path: string) {
    return environment.apiBaseUrl + this.baseController + path;
  }
}
