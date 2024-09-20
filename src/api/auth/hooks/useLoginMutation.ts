import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { queryKeys } from 'src/api';

import { authService } from '../auth.service';
import { LoginResponse, UserCredentials } from '../models';

export const useLoginMutation = (options?: UseMutationOptions<LoginResponse, Error, UserCredentials, unknown>) => {
  return useMutation({ mutationKey: [queryKeys.login()], mutationFn: authService.login, ...options });
};
