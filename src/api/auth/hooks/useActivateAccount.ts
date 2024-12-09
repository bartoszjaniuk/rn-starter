import { useMutation } from '@tanstack/react-query';

import { queryKeys } from '../../utils/queryKeys';
import { authService } from '../auth.service';

export const useActivateAccountMutation = () => {
  return useMutation({ mutationKey: [queryKeys.activateAccount()], mutationFn: authService.activateAccount });
};
