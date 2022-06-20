import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/users/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  private readonly noImage: string = 'assets/images/userPlaceholder.png';
  imageUrl: string;
  @Input() user: UserModel;

  constructor() { }

  ngOnInit(): void {
    this.imageUrl = `url(${this.user.imagePath ?? this.noImage})`;
  }

  get fullName(): string {

    let fullName = this.user.firstName ?? '';
    fullName += ' ' + (this.user.lastName ?? '');
    fullName = fullName.trim();

    return fullName;
  }
}
