import { Injectable } from "@angular/core";
import { UriHelper } from "../helpers/uri-helper";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  getImageUrl(imageName: string) {
    return UriHelper.createUri(environment.cloudStorageUrl, imageName);
  }
}
