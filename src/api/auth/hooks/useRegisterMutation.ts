import { useMutation } from '@tanstack/react-query';

import { queryKeys } from 'src/api/utils';

import { authService } from '../auth.service';

export const useRegisterMutation = () => {
  return useMutation({ mutationKey: [queryKeys.register()], mutationFn: authService.register });
};
