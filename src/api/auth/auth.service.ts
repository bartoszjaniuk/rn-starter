import { queryKeys } from 'src/api/utils';
import { API_URL } from 'src/providers';

import { LoginResponse, UserCredentials, UserInfoResponse } from './models';

import { ApiService } from '../baseApi';

export class AuthService extends ApiService {
  constructor() {
    super(API_URL);
  }

  login = async (payload: UserCredentials) => {
    return this.responseHandler(await this.httpClient.post<LoginResponse>(queryKeys.login(), payload));
  };

  register = async (payload: string) => {
    return this.responseHandler(await this.httpClient.post<Promise<void>>(queryKeys.register(), payload));
  };

  logout = async (payload: string) => {
    return this.responseHandler(await this.httpClient.post<Promise<void>>(queryKeys.logout(), payload));
  };

  getUserInfo = async () => {
    return this.responseHandler(await this.httpClient.get<Promise<UserInfoResponse>>(queryKeys.getUserInfo()));
  };
}

export const authService = new AuthService();
