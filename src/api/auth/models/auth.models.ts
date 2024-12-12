import { AxiosError } from 'axios';

import { Role } from 'src/api/user/models';

export type AuthState = {
  token: string | null;
  authenticated: boolean | null;
  role?: Role;
  isLoading?: boolean;
};

export type UserCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type LoginError = AxiosError<{ message: string; code: number }>;
export type RegisterError = AxiosError<{ error: string }>;

export type ActivateAccountPayload = {
  token: string;
  password: string;
};
