import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { queryKeys } from '../../utils/queryKeys';
import { authService } from '../auth.service';
import { ActivateAccountPayload } from '../models';

export const useActivateAccountMutation = (
  options?: UseMutationOptions<void, Error, ActivateAccountPayload, unknown>,
) => {
  return useMutation({
    ...options,
    mutationKey: [queryKeys.activateAccount()],
    mutationFn: authService.activateAccount,
  });
};
