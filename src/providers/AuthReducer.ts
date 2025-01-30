import { AuthContextType } from './AuthContext';

export type User = {
  role: string;
};

type AuthAction =
  | { type: 'SIGN_IN'; session: string }
  | { type: 'SET_LOADING' }
  | { type: 'RESTORE_TOKEN'; session: string | null }
  | { type: 'GET_USER_INFO'; user: User | undefined }
  | { type: 'AUTH_ERROR'; error: string }
  | { type: 'CLEAR_EXPIRED_TOKEN' }
  | { type: 'SIGN_OUT' };

export const authReducer = (prevState: AuthContextType, action: AuthAction): AuthContextType => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        session: action.session,
        isLoading: false,
        error: '',
      };
    case 'SET_LOADING':
      return {
        ...prevState,
        isLoading: !prevState.isLoading,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        error: '',
        isLoading: false,
        session: action.session,
      };
    case 'GET_USER_INFO':
      return {
        ...prevState,
        user: action.user,
      };
    case 'AUTH_ERROR':
      return {
        ...prevState,
        error: action.error,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        session: null,
      };
    case 'CLEAR_EXPIRED_TOKEN':
      return {
        ...prevState,
        isLoading: false,
        session: null,
        error: '',
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
  session: null,
  isLoading: true,
  error: '',
};
