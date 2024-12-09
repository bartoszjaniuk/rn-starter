import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { queryKeys } from 'src/api/utils';

import { authService } from '../auth.service';

export const useRegisterMutation = (options?: UseMutationOptions<void, Error, string, unknown>) => {
  return useMutation({
    ...options,
    mutationKey: [queryKeys.register()],
    mutationFn: authService.register,
  });
};
