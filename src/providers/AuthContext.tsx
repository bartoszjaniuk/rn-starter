import * as React from 'react';

import * as SecureStore from 'expo-secure-store';

import { AxiosError } from 'axios';

import { authService } from 'src/api/auth/auth.service';
import { UserInfoResponse } from 'src/api/user/models';
import { userService } from 'src/api/user/user.service';

import { authReducer, initialState } from './AuthReducer';

import { UserCredentials } from '../api/auth/models/auth.models';
import { ACCESS_TOKEN } from '../shared/constants/accessToken';

export type AuthContextType = {
  signIn: (payload: UserCredentials) => Promise<void>;
  resetExpiredToken: () => Promise<void>;
  signOut: () => void;
  token?: string | null;
  error: string;
  isLoading: boolean;
  user?: UserInfoResponse | undefined;
};

const AuthContext = React.createContext<AuthContextType>(initialState);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = React.useReducer(authReducer, initialState);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync(ACCESS_TOKEN);
        if (!userToken) return dispatch({ type: 'SET_UNAUTHENTICATED' });
        dispatch({ type: 'RESTORE_TOKEN', token: userToken ?? null });
        const userInfo = await userService.getUserInfo();
        if (!!userInfo) {
          dispatch({ type: 'SET_AUTHENTICATED', user: userInfo });
        } else {
          dispatch({ type: 'SET_UNAUTHENTICATED' });
        }
      } catch (error) {
        console.error('Error retrieving JWT token:', error);
      }
    };

    bootstrapAsync();
  }, []);

  const signOut = React.useCallback(async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN);
    dispatch({ type: 'SIGN_OUT' });
  }, [dispatch]);

  const value: AuthContextType = React.useMemo(
    () => ({
      ...state,

      signIn: async (payload: UserCredentials) => {
        dispatch({ type: 'SET_LOADING' });
        try {
          const loginResponse = await authService.login(payload);
          await SecureStore.setItemAsync(ACCESS_TOKEN, loginResponse.token);
          dispatch({ type: 'SIGN_IN', token: loginResponse.token });
          const userInfo = await userService.getUserInfo();
          if (!!userInfo) {
            dispatch({ type: 'SET_AUTHENTICATED', user: userInfo });
          } else {
            dispatch({ type: 'SET_UNAUTHENTICATED' });
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            dispatch({ type: 'AUTH_ERROR', error: error.response?.data.message });
          }
        }
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync(ACCESS_TOKEN);
        dispatch({ type: 'SIGN_OUT' });
      },
      resetExpiredToken: async () => {
        await SecureStore.deleteItemAsync(ACCESS_TOKEN);
        dispatch({ type: 'CLEAR_EXPIRED_TOKEN' });
      },
    }),
    [state],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
