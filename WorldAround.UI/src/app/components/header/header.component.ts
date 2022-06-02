import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from 'src/services/authorization.service';
import { LoginComponent } from '../authentication/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  selectedValue: any = 0;
  inputValue: any = '';

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthorizationService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  search() {
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
