export class AuthenticationResultModel {

  public details: Details;
  public token: string;
}

class Details {
  public succeeded: boolean;
  public isLockedOut: boolean;
  public isNotAllowed: boolean;
  public requiresTwoFactor: boolean;
}
