import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { queryKeys } from '../../utils/queryKeys';
import { authService } from '../auth.service';
import { LoginError, LoginResponse, UserCredentials } from '../models';

export const useLoginMutation = (options?: UseMutationOptions<LoginResponse, LoginError, UserCredentials, unknown>) => {
  return useMutation({ mutationKey: [queryKeys.login()], mutationFn: authService.login, ...options });
};
