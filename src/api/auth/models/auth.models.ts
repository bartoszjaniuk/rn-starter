import { Role } from 'src/api/user/models';

export type AuthState = {
  token: string | null;
  authenticated: boolean | null;
  role?: Role;
};

export type UserCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};
