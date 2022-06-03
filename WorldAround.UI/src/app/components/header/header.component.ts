import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { LoginComponent } from '../authentication/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  selectedValue: any = 0;
  inputValue: any = '';

  constructor(
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly authService: AuthorizationService,
    private readonly dialog: MatDialog) { }

  search(): void {

    if(!this.inputValue){
      this.toastr.error('Search field should not be empty!', 'Error');
      return;
    }

    this.router.navigate([`/search/${this.selectedValue}/${this.inputValue}`]);
  }

  logout(): void {

    this.authService.Logout();
    this.router.navigate(["/home"]);
  }

  authorized(): boolean {

    return this.authService.IsAuthorized();
  }

  openLogin(): void {

    this.dialog.open(LoginComponent, {
      panelClass: 'authentication-modal'
    });
  }
}
