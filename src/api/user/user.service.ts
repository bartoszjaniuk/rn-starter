import * as SecureStore from 'expo-secure-store';

import { ProfileCompletion, UserInfoResponse } from './models';

import { ACCESS_TOKEN } from '../../shared/constants/accessToken';
import { API_URL } from '../../shared/constants/apiUrl';
import { ApiService } from '../baseApi';
import { queryKeys } from '../utils/queryKeys';

export class UserService extends ApiService {
  constructor() {
    super(API_URL);
    this.removeExpiredJWT();
  }

  private removeExpiredJWT() {
    this.httpClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 409) {
          await SecureStore.deleteItemAsync(ACCESS_TOKEN);
          console.log('Token was expires');
        }
        return Promise.reject(error);
      },
    );
  }

  getUserInfo = async () => {
    return this.responseHandler(await this.httpClient.get<Promise<UserInfoResponse>>(queryKeys.getUserInfo()));
  };

  profileCompletion = (id: string) => async (payload: ProfileCompletion) =>
    await this.httpClient.post<void>(queryKeys.profileCompletion(id), payload);
}

export const userService = new UserService();
