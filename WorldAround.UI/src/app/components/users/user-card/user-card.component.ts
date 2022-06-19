import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/users/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  noImage: string = 'assets/images/userPlaceholder.png';
  @Input() user: UserModel;

  constructor() { }

  ngOnInit(): void {
  }

  get fullName(): string {

    let fullName = this.user.firstName ?? '';
    fullName += ' ' + (this.user.lastName ?? '');
    fullName = fullName.trim();

    return fullName;
  }
}
