import { UserInfoResponse } from 'src/api/user/models';

import { AuthContextType } from './AuthContext';

export type User = {
  role: string;
};

type AuthAction =
  | { type: 'SIGN_IN'; token: string }
  | { type: 'SET_LOADING' }
  | { type: 'RESTORE_TOKEN'; token: string | null }
  | { type: 'SET_UNAUTHENTICATED' }
  | { type: 'SET_AUTHENTICATED'; user: UserInfoResponse | undefined }
  | { type: 'AUTH_ERROR'; error: string }
  | { type: 'CLEAR_EXPIRED_TOKEN' }
  | { type: 'SIGN_OUT' };

export const authReducer = (prevState: AuthContextType, action: AuthAction): AuthContextType => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        token: action.token,
        error: '',
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        error: '',
        isLoading: true,
      };
    case 'AUTH_ERROR':
      return {
        ...prevState,
        isLoading: false,
        error: action.error,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        token: null,
      };
    case 'SET_UNAUTHENTICATED':
      return {
        ...prevState,
        user: undefined,
        isLoading: false,
        token: null,
        error: '',
      };
    case 'SET_AUTHENTICATED':
      return {
        ...prevState,
        user: action.user,
        isLoading: false,
      };
    case 'CLEAR_EXPIRED_TOKEN':
      return {
        ...prevState,
        isLoading: false,
        token: null,
        error: '',
      };
    case 'SET_LOADING':
      return {
        ...prevState,
        isLoading: !prevState.isLoading,
      };
    default:
      return prevState;
  }
};

export const initialState: AuthContextType = {
  signIn: async (_payload) => void 0,
  user: undefined,
  resetExpiredToken: async () => void 0,
  signOut: () => void 0,
  token: null,
  isLoading: true,
  error: '',
};
