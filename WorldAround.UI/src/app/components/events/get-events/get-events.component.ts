import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { EventsGateway } from 'src/app/gateways/events.gateway';
import { GetEventsPageModel } from 'src/app/models/events/get-events-page';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-get-events',
  templateUrl: './get-events.component.html',
  styleUrls: ['./get-events.component.scss']
})
export class GetEventsComponent implements OnInit {
  isOwner: boolean = true;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  model: GetEventsPageModel = new GetEventsPageModel();

  constructor(
    private readonly router: Router,
    private readonly authService: AuthorizationService,
    private readonly gateway: EventsGateway) { }

  ngOnInit(): void {
    this.getEvents(0, 5, this.isOwner);
  }

  onCheckBoxClick() {

    this.getEvents(0, 5, this.isOwner);
  }

  onPaginationOptionsChange(event: PageEvent) {
    this.getEvents(event.pageIndex, event.pageSize, this.isOwner);
  }

  getEvents(pageIndex: number, pageSize: number, isOwner): void {
    this.gateway.getUserEvents(this.authService.getUserId(), isOwner, pageIndex, pageSize)
    .subscribe(result => {
      this.model = result;
    });
  }

  onCardClick(id: number) {
    this.router.navigate([`events/details/${id}`]);
  }
}
