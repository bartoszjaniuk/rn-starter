import { API_URL } from 'src/providers';

import { ApiService } from '../baseApi';
import { queryKeys } from '../utils';

export class UploadService extends ApiService {
  constructor() {
    super(API_URL);
  }

  postUploadImages = async () => {
    return this.responseHandler(await this.httpClient.post<Promise<any>>(queryKeys.postUploadImages()));
  };
}

export const uploadService = new UploadService();
