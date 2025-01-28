import * as React from 'react';

import * as SecureStore from 'expo-secure-store';

import { authService } from 'src/api/auth/auth.service';

import { authReducer, initialState } from './AuthReducer';

import { UserCredentials } from '../api/auth/models/auth.models';
import { ACCESS_TOKEN } from '../shared/constants/accessToken';

export type AuthContextType = {
  signIn: (payload: UserCredentials) => Promise<void>;
  signOut: () => void;
  signUp: (payload: string) => Promise<void>;
  session?: string | null;
  isLoading: boolean;
};

const AuthContext = React.createContext<AuthContextType>(initialState);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = React.useReducer(authReducer, initialState);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync(ACCESS_TOKEN);
      } catch (e) {
        console.log('Restoring token failed', e);
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
          console.log('Sign In Failed', error);
        }
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync(ACCESS_TOKEN);
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (payload: string) => {
        try {
          await authService.register(payload);
        } catch (error) {
          console.log('Sign Up Failed', error);
        }
      },
    }),
    [state],
  );

  // const loginMutation = useLoginMutation({
  //   onSuccess: async (data) => {
  //     setAuthState({ token: data.token, authenticated: true });
  //     await SecureStore.setItemAsync(ACCESS_TOKEN, data.token);
  //   },
  // });
  // const { data: userData, error } = useGetUserInfoQuery(!!authState.token);

  // const { mutate: logout } = useLogoutMutation({
  //   onSuccess: async () => {
  //     setAuthState({ token: null, authenticated: false });
  //   },
  // });

  // const onLogout = React.useCallback(async () => {
  //   logout();
  //   setAuthState({ authenticated: false, token: null });
  //   await SecureStore.deleteItemAsync(ACCESS_TOKEN);
  // }, [logout, setAuthState]);

  // React.useEffect(() => {
  //   const loadToken = async () => {
  //     const token = await SecureStore.getItemAsync(ACCESS_TOKEN);
  //     if (!token) return setAuthState((prev) => ({ ...prev, isLoading: false }));
  //     setAuthState((prev) => ({ ...prev, token: token }));
  //   };
  //   loadToken();
  // }, []);

  // React.useEffect(() => {
  //   if (userData?.role) {
  //     setAuthState((prev) => ({ ...prev, authenticated: true, role: userData?.role, isLoading: false }));
  //   } else {
  //     setAuthState((prev) => ({ ...prev, isLoading: false }));
  //   }
  // }, [userData?.role]);

  // React.useEffect(() => {
  //   const clearToken = async () => await SecureStore.deleteItemAsync(ACCESS_TOKEN);

  //   if (error?.status === 409) {
  //     setAuthState({ authenticated: null, token: null, role: 'role_not_set', isLoading: false });
  //     clearToken();
  //   }
  // }, [error, setAuthState]);

  // const value = React.useMemo(
  //   () => ({
  //     onLogin: loginMutation.mutate,
  //     onLogout,
  //     authState,
  //     isLoading: loginMutation.isPending,
  //     loginError: loginMutation.error,
  //   }),
  //   [authState, loginMutation.error, loginMutation.isPending, loginMutation.mutate, onLogout],
  // );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
