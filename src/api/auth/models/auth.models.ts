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
