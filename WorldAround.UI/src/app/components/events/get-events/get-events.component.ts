import { Component, OnInit } from '@angular/core';
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

  model: GetEventsPageModel = new GetEventsPageModel();

  constructor(
    private readonly router: Router,
    private readonly authService: AuthorizationService,
    private readonly gateway: EventsGateway) { }

  ngOnInit(): void {
    let userId = this.authService.getUserId();

    this.gateway.getUserEvents(userId, true, 1, 5)
      .subscribe(result => {
        this.model = result;
      });
  }

  onCardClick(id: number) {
    this.router.navigate([`events/details/${id}`]);
  }
}
