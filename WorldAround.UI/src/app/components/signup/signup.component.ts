import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationModel } from 'src/models/registration';
import { AuthorizationService } from 'src/services/authorization.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  model: RegistrationModel = new RegistrationModel();

  constructor(
    private router :Router,
    private authService: AuthorizationService,
    private toastr: ToastrService)
  {
    this.toastr.toastrConfig.positionClass = 'toast-bottom-right';
  }

  ngOnInit(): void {
  }

  onSubmit()
  {
    this.authService.SignUp(this.model)
    .subscribe({
      next: () => {
        this.toastr.success('Successful!');
        this.router.navigate(['authentication/login']);
      },
      error: (response) => {
        response.error.forEach((e: { code: string; }) => {
          this.toastr.error(e.code);
        });
      }
    });
  }
}
