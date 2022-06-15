import { Injectable } from "@angular/core";
import { UriHelper } from "../helpers/uri-helper";

const storageUrl = 'https://wolrdaroundstorage.blob.core.windows.net/images/'

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  getImageUrl(imageName: string) {
    return UriHelper.createUri(storageUrl, imageName);
  }
}
