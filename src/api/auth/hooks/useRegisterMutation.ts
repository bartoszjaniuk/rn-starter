import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { queryKeys } from 'src/api/utils';

import { authService } from '../auth.service';
import { RegisterError } from '../models';

export const useRegisterMutation = (options?: UseMutationOptions<void, RegisterError, string, unknown>) => {
  return useMutation({
    ...options,
    mutationKey: [queryKeys.register()],
    mutationFn: authService.register,
  });
};
