import * as SecureStore from 'expo-secure-store';

import { AxiosError } from 'axios';
import { create } from 'zustand';

import { authService } from 'src/api/auth/auth.service';
import { UserCredentials } from 'src/api/auth/models/auth.models';
import { UserInfoResponse } from 'src/api/user/models';
import { userService } from 'src/api/user/user.service';
import { ACCESS_TOKEN } from 'src/shared/constants/accessToken';

interface AuthState {
  token: string | null;
  user: UserInfoResponse | null;
  isLoading: boolean;
  error: string | null;
  signIn: (payload: UserCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  resetExpiredToken: () => Promise<void>;
  restoreToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, _get) => ({
  token: null,
  user: null,
  isLoading: false,
  error: null,

  signIn: async (payload: UserCredentials) => {
    set({ isLoading: true, error: null });
    try {
      const loginResponse = await authService.login(payload);
      await SecureStore.setItemAsync(ACCESS_TOKEN, loginResponse.token);
      const userInfo = await userService.getUserInfo();
      set({ token: loginResponse.token, user: userInfo, isLoading: false });
    } catch (error) {
      if (error instanceof AxiosError) {
        set({ error: error.response?.data.message, isLoading: false });
      }
    }
  },

  signOut: async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN);
    set({ token: null, user: null });
  },

  resetExpiredToken: async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN);
    set({ token: null });
  },

  restoreToken: async () => {
    set({ isLoading: true });
    try {
      const token = await SecureStore.getItemAsync(ACCESS_TOKEN);
      if (token) {
        const userInfo = await userService.getUserInfo();
        set({ token, user: userInfo, isLoading: false });
      } else {
        set({ token: null, isLoading: false });
      }
    } catch (error) {
      console.error('Error restoring token:', error);
      set({ token: null, isLoading: false });
    }
  },
}));
