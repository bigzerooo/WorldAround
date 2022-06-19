import { Component, OnInit } from '@angular/core';
import { UsersGateway } from 'src/app/gateways/users.gateway';

@Component({
  selector: 'app-choose-people',
  templateUrl: './choose-people.component.html',
  styleUrls: ['./choose-people.component.scss']
})
export class ChoosePeopleComponent implements OnInit {

  searchValue: string = null;
  data: any[];

  constructor(private readonly usersGateway: UsersGateway) { }

  ngOnInit(): void {
  }

  search(): void {
    this.getData();
  }

  getData() {

  }

  onConfirm(): void {

  }

  onClear(): void {

  }
}
