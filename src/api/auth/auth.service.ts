import { ActivateAccountPayload, LoginResponse, UserCredentials } from './models';

import { API_URL } from '../../shared/constants/apiUrl';
import { ApiService } from '../baseApi';
import { queryKeys } from '../utils';

export class AuthService extends ApiService {
  constructor() {
    super(API_URL);
  }

  login = async (payload: UserCredentials) => {
    return this.responseHandler(await this.httpClient.post<LoginResponse>(queryKeys.login(), payload));
  };

  register = async (payload: string) => {
    return this.responseHandler(await this.httpClient.post<Promise<void>>(queryKeys.register(), { email: payload }));
  };

  logout = async () => {
    return this.responseHandler(await this.httpClient.post<Promise<void>>(queryKeys.logout(), {}));
  };

  activateAccount = async (payload: ActivateAccountPayload) => {
    return this.responseHandler(await this.httpClient.post<Promise<void>>(queryKeys.activateAccount(), payload));
  };
}

export const authService = new AuthService();
