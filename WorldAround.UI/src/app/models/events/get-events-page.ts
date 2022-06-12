import { PagingModel } from "../paging/paging";
import { GetEventModel } from "./get-event";

export class GetEventsPageModel {
  Events: GetEventModel[];
  PageInfo: PagingModel;
}
