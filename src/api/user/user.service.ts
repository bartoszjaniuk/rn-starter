import { queryKeys } from 'src/api/utils';
import { API_URL } from 'src/providers';

import { ProfileCompletion, UserInfoResponse } from './models';

import { ApiService } from '../baseApi';

export class UserService extends ApiService {
  constructor() {
    super(API_URL);
  }

  getUserInfo = async () => {
    return this.responseHandler(await this.httpClient.get<Promise<UserInfoResponse>>(queryKeys.getUserInfo()));
  };

  profileCompletion = (id: string) => async (payload: ProfileCompletion) =>
    await this.httpClient.post<void>(queryKeys.profileCompletion(id), payload);
}

export const userService = new UserService();
