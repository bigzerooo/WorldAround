export class AuthenticationResultModel {

  public details: AuthenticationResultDetails;
  public token: string;
}

export class AuthenticationResultDetails {
  public succeeded: boolean;
  public isLockedOut: boolean;
  public isNotAllowed: boolean;
  public requiresTwoFactor: boolean;
}
