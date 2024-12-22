import * as React from 'react';

import * as SecureStore from 'expo-secure-store';

import { UseMutateFunction } from '@tanstack/react-query';

import { useLoginMutation } from '../api/auth/hooks/useLoginMutation';
import { onTemporaryLogout, useLogoutMutation } from '../api/auth/hooks/useLogoutMutation';
import { AuthState, LoginError, LoginResponse, UserCredentials } from '../api/auth/models/auth.models';
import { useGetUserInfoQuery } from '../api/user/hooks/useGetUserInfoQuery';
import { ACCESS_TOKEN } from '../shared/constants/accessToken';

type AuthProps = {
  authState?: AuthState;
  isLoading?: boolean;
  onLogin?: UseMutateFunction<LoginResponse, Error, UserCredentials, unknown>;
  onLogout?: UseMutateFunction<void, Error, void, unknown>;
  loginError?: LoginError | null;
};

const AuthContext = React.createContext<AuthProps>({});

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [authState, setAuthState] = React.useState<AuthState>({
    authenticated: null,
    token: null,
    role: 'role_not_set',
    isLoading: true,
  });

  console.log(authState, 'authState');

  const loginMutation = useLoginMutation({
    onSuccess: async (data) => {
      setAuthState({ token: data.token, authenticated: true });
      await SecureStore.setItemAsync(ACCESS_TOKEN, data.token);
    },
  });
  console.log(authState.token, 'authState.token');
  const { data: userData, error } = useGetUserInfoQuery(!!authState.token);

  const { mutate: logout } = useLogoutMutation({
    onSuccess: async () => {
      setAuthState({ token: null, authenticated: false });
    },
  });

  const onLogout = React.useCallback(async () => {
    logout();
    setAuthState({ authenticated: false, token: null });
    await SecureStore.deleteItemAsync(ACCESS_TOKEN);
  }, [logout, setAuthState]);

  React.useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(ACCESS_TOKEN);
      if (!token) return setAuthState((prev) => ({ ...prev, isLoading: false }));
      setAuthState((prev) => ({ ...prev, token: token }));
    };
    loadToken();
  }, []);

  React.useEffect(() => {
    if (userData?.role) {
      setAuthState((prev) => ({ ...prev, authenticated: true, role: userData?.role, isLoading: false }));
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [userData?.role]);

  React.useEffect(() => {
    const clearToken = async () => await SecureStore.deleteItemAsync(ACCESS_TOKEN);

    if (error?.status === 409) {
      setAuthState({ authenticated: null, token: null, role: 'role_not_set', isLoading: false });
      clearToken();
    }
  }, [error, setAuthState]);

  const value = React.useMemo(
    () => ({
      onLogin: loginMutation.mutate,
      onLogout,
      authState,
      isLoading: loginMutation.isPending,
      loginError: loginMutation.error,
    }),
    [authState, loginMutation.error, loginMutation.isPending, loginMutation.mutate, onLogout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) throw new Error('useAuth must be wrapped within AuthProvider');

  return context;
};
