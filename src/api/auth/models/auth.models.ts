export type AuthState = {
  token: string | null;
  authenticated: boolean | null;
};

export type UserCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

type Role = 'role_not_set';

export type UserInfoResponse = {
  id: string;
  email: string;
  name: string | null;
  role: Role;
  gender: string | null;
};
