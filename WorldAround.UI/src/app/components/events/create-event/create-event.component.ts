import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Accessibility } from 'src/app/enums/event-accessibility';
import { FormGroupHelper } from 'src/app/helpers/form-group-helper';
import { CreateEventModel } from 'src/app/models/events/create-event';
import { ChoosePlacesComponent } from 'src/app/components/shared/choose-places/choose-places.component';
import { ChoosePeopleComponent } from 'src/app/components/shared/choose-people/choose-people.component';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  submitButtonDisabled: boolean = false;
  imageUrl: string | ArrayBuffer;
  model: CreateEventModel;
  form: FormGroup;
  accessibilityEnum: { key: string, value: number }[];

  constructor(
    private readonly eventsService: EventsService,
    private readonly formBuilder: FormBuilder,
    private readonly dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.model = new CreateEventModel();
    this.form = this.formBuilder.group({
      'title': [null],
      'description': [null],
      'startDate': [null],
      'endDate': [null],
      'accessibility': [this.model.accessibility]
    });
    this.accessibilityEnum = this.enumToKeyValue(Accessibility);
    // this.openPlacesChoosing();
  }

  openPlacesChoosing() {
    this.dialog.open(ChoosePlacesComponent, {
      panelClass: 'search-modal'
    });
  }

  openParticipantsChoosing() {
    this.dialog.open(ChoosePeopleComponent);
  }

  onSubmit(): void {
    // this.submitButtonDisabled = true;
    FormGroupHelper.mapToModel(this.model, this.form);
    this.eventsService.createEvent(this.model);
  }

  onImageSelected(event: any) {

    if (!event.target.files[0] || event.target.files.length === 0) {
      return;
    }

    let image = <File>event.target.files[0];

    if (image.type.match(/image\/*/) === null) {
      return;
    }

    this.model.image = image;

    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
  }

  deleteImage(): void {
    this.model.image = null;
    this.imageUrl = null;
  }

  private enumToKeyValue($enum): { key: string, value: number }[] {
    let keys = Object.keys($enum);
    let values = Object.values($enum);

    keys = keys.slice(keys.length / 2)
    values = values.slice(values.length / 2)

    let pairs = new Array();

    for (let i = 0; i < keys.length; i++) {
      let pair = {
        key: keys[i],
        value: values[i]
      }

      pairs.push(pair);
    }

    return pairs;
  }
}
