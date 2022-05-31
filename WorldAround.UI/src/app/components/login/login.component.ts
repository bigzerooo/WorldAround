import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/models/login';
import { AuthorizationService } from 'src/services/authorization.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginModel: LoginModel = new LoginModel();
  public loginBtnDisabled: boolean = false;

  constructor(private router: Router,
    private authService: AuthorizationService,
    private toastr: ToastrService) {
      this.toastr.toastrConfig.positionClass = 'toast-bottom-right';
    }

  ngOnInit(): void {

  }

  login() {

    this.authService.Authorize(this.loginModel)
    .subscribe({
      next: (n) => {
        this.router.navigate(['/home']);
        this.toastr.success('Authentication passed');
        return n;
      },
      error: () => { this.toastr.error('Wrong credentials!'); }
    });
  }
}
