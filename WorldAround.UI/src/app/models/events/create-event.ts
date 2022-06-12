import { Accessibility } from "src/app/enums/event-accessibility";

export class CreateEventModel {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  accessibility: Accessibility = 1;
  createUserId: number;
  image: File;
  Trips: { id: number, name: string }[] | number[];
  Participants: { id: number, userName: string }[] | number[];
}
