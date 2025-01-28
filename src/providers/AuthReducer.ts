import { AuthContextType } from './AuthContext';

type AuthAction =
  | { type: 'RESTORE_TOKEN'; session: string | null }
  | { type: 'SIGN_IN'; session: string }
  | { type: 'SIGN_OUT' };

export const authReducer = (prevState: AuthContextType, action: AuthAction): AuthContextType => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        session: action.session,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        session: action.session,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        session: null,
      };
    default:
      return prevState;
  }
};

export const initialState: AuthContextType = {
  signIn: async (_payload) => void 0,
  signOut: () => void 0,
  signUp: async (_payload: string) => void 0,
  session: null,
  isLoading: true,
};
