import { environment } from "src/environments/environment";
import { UriHelper } from "./uri-helper";

export class ImageHelper {

  static readonly noUserImage: string = 'assets/images/userPlaceholder.png';

  constructor() {}

  static convertImagePathToUrl(imagePath: string) {

    if(!imagePath || imagePath.length === 0) {
      return null;
    }

    let encodedPath = encodeURI(imagePath);

    return UriHelper.createUri(environment.cloudStorageUrl,'images', encodedPath);
  }
}
