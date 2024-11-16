import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { queryKeys } from 'src/api';
import { userService } from 'src/api/user';

export const useProfileCompletionMutation = (id: string, options: UseMutationOptions) => {
  return useMutation({
    mutationKey: [queryKeys.profileCompletion(id)],
    mutationFn: userService.profileCompletion(id),
    ...options,
  });
};
