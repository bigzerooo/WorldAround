import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationModel } from 'src/models/registration';
import { AuthorizationService } from 'src/services/authorization.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  model: RegistrationModel = new RegistrationModel();

  constructor(private router :Router,
    private authService: AuthorizationService) { }

  ngOnInit(): void {
  }

  onSubmit()
  {
    this.authService.SignUp(this.model)
    .subscribe(result => {
      if(result.succeeded) {
        this.router.navigate(['authentication/login']);
      }
      else {
        console.log(result.errors);
      }
    });
  }
}
