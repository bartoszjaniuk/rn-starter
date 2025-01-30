import * as React from 'react';

import * as SecureStore from 'expo-secure-store';

import { AxiosError } from 'axios';

import { authService } from 'src/api/auth/auth.service';
import { useGetUserInfoQuery } from 'src/api/user/hooks';
import { UserInfoResponse } from 'src/api/user/models';

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
  const userInfoQuery = useGetUserInfoQuery(false);

  React.useEffect(() => {
    if (userInfoQuery.isSuccess) {
      dispatch({ type: 'SET_AUTHENTICATED', user: userInfoQuery.data });
    }
  }, [userInfoQuery.data, userInfoQuery.isSuccess]);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync(ACCESS_TOKEN);

        if (!userToken) return dispatch({ type: 'SET_UNAUTHENTICATED' });
      } catch (error) {
        console.error('Error retrieving JWT token:', error);
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken ?? null });
      userInfoQuery.refetch();
    };

    bootstrapAsync();
  }, []);

  const value: AuthContextType = React.useMemo(
    () => ({
      ...state,
      signIn: async (payload: UserCredentials) => {
        try {
          const loginResponse = await authService.login(payload);
          await SecureStore.setItemAsync(ACCESS_TOKEN, loginResponse.token);
          dispatch({ type: 'SIGN_IN', token: loginResponse.token });
          userInfoQuery.refetch();
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
    [state, userInfoQuery],
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
