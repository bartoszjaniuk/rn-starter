import * as React from 'react';

import * as SecureStore from 'expo-secure-store';

import { AxiosError } from 'axios';

import { authService } from 'src/api/auth/auth.service';

import { User, authReducer, initialState } from './AuthReducer';

import { UserCredentials } from '../api/auth/models/auth.models';
import { ACCESS_TOKEN } from '../shared/constants/accessToken';

export type AuthContextType = {
  signIn: (payload: UserCredentials) => Promise<void>;
  resetExpiredToken: () => Promise<void>;
  signOut: () => void;
  session?: string | null;
  error: string;
  isLoading: boolean;
  user?: User | undefined;
};

const AuthContext = React.createContext<AuthContextType>(initialState);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = React.useReducer(authReducer, initialState);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync(ACCESS_TOKEN);
      } catch (error) {
        console.error('Error retrieving JWT token:', error);
      }
      dispatch({ type: 'RESTORE_TOKEN', session: userToken ?? null });
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
          dispatch({ type: 'SIGN_IN', session: loginResponse.token });
        } catch (error) {
          if (error instanceof AxiosError) {
            dispatch({ type: 'AUTH_ERROR', error: error.response?.data });
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
