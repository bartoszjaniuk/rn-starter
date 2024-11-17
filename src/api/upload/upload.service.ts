import { API_URL } from 'src/providers';

import { ApiService } from '../baseApi';
import { queryKeys } from '../utils';

export class UploadService extends ApiService {
  constructor() {
    super(API_URL);
  }

  postUploadImages = async (payload: unknown) => {
    return this.responseHandler(
      await this.httpClient.post(queryKeys.postUploadImages(), payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    );
  };

  postDeleteImage = async (id: string) => {
    return this.responseHandler(await this.httpClient.delete<void>(queryKeys.postDeleteImage(id)));
  };
}

export const uploadService = new UploadService();
