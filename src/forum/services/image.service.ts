import {Injectable} from '@angular/core';
import { ApiServiceAbstract } from './api-service.abstract';

const API_IMAGE_URL = '/api/image';
const DEFAULT_USER_IMAGE_URL = '/assets/images/blank-profile-picture.webp';


@Injectable({
  providedIn: 'root'
})
export class ImageService extends ApiServiceAbstract{

  constructor() {
    super();
  }
  
  getUserImageUrl(imageName: string): string {
    return imageName ? `${API_IMAGE_URL}/${imageName}` : DEFAULT_USER_IMAGE_URL;
  }


}
