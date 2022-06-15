import { GetTripsModel } from "../trips/getTripsModel";
import { ParticipantModel } from "../users/participant";

export class EventDetailsModel {
  id: number;
  title: string;
  description: string;
  author: string;
  image: string;
  createDate: Date;
  startDate: Date;
  endDate?: Date;

  trips: GetTripsModel;
  participants: ParticipantModel[];
}
