import { environment } from "src/environments/environment";
import { UriHelper } from "./uri-helper";

export class ImageHelper {

  constructor() {}

  static convertImagePathToUrl(imagePath: string) {

    let encodedPath = encodeURI(imagePath);

    return UriHelper.createUri(environment.cloudStorageUrl,'images', encodedPath);
  }
}
