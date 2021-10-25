import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsListItemComponent } from './trips-list-item.component';

describe('TripsListItemComponent', () => {
  let component: TripsListItemComponent;
  let fixture: ComponentFixture<TripsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripsListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
