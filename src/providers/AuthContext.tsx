import * as React from 'react';

import * as SecureStore from 'expo-secure-store';

import { UseMutateFunction } from '@tanstack/react-query';

import { useLoginMutation } from '../api/auth/hooks/useLoginMutation';
import { useLogoutMutation } from '../api/auth/hooks/useLogoutMutation';
import { useRegisterMutation } from '../api/auth/hooks/useRegisterMutation';
import { AuthState, LoginResponse, UserCredentials } from '../api/auth/models/auth.models';
import { useGetUserInfoQuery } from '../api/user/hooks/useGetUserInfoQuery';
import { ACCESS_TOKEN } from '../shared/constants/accessToken';

type AuthProps = {
  authState?: AuthState;
  isLoading?: boolean;
  onLogin?: UseMutateFunction<LoginResponse, Error, UserCredentials, unknown>;
  onRegister?: UseMutateFunction<void, Error, string, unknown>;
  onLogout?: UseMutateFunction<void, Error, void, unknown>;
};

const AuthContext = React.createContext<AuthProps>({});

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [authState, setAuthState] = React.useState<AuthState>({
    authenticated: null,
    token: null,
    role: 'role_not_set',
  });

  const loginMutation = useLoginMutation({
    onSuccess: async (data) => {
      setAuthState({ token: data.token, authenticated: true });
      await SecureStore.setItemAsync(ACCESS_TOKEN, data.token);
    },
  });

  const { data: userData } = useGetUserInfoQuery(!!authState.token);

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

  const { mutate: onRegister } = useRegisterMutation();

  React.useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(ACCESS_TOKEN);
      if (!token) return;
      setAuthState((prev) => ({ ...prev, token: token }));
    };
    loadToken();
  }, []);

  React.useEffect(() => {
    if (userData?.role) {
      setAuthState((prev) => ({ ...prev, authenticated: true, role: userData?.role }));
    }
  }, [userData?.role]);

  const value = React.useMemo(
    () => ({
      onLogin: loginMutation.mutate,
      onLogout,
      onRegister,
      authState,
      isLoading: loginMutation.isPending,
    }),
    [authState, loginMutation.isPending, loginMutation.mutate, onLogout, onRegister],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) throw new Error('useAuth must be wrapped within AuthProvider');

  return context;
};
