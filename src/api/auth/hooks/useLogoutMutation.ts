import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { queryKeys } from 'src/api';

import { authService } from '../auth.service';

export const useLogoutMutation = (options?: UseMutationOptions<void, Error, string, unknown>) => {
  return useMutation({ mutationKey: [queryKeys.logout()], mutationFn: authService.logout, ...options });
};
