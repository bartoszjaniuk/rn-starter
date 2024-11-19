import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { AxiosResponse } from 'axios';

import { queryKeys } from 'src/api/utils';

import { ProfileCompletion } from '../models';
import { userService } from '../user.service';

export const useProfileCompletionMutation = (
  id: string,
  options: UseMutationOptions<AxiosResponse<void>, Error, ProfileCompletion>,
) => {
  return useMutation({
    mutationKey: [queryKeys.profileCompletion(id)],
    mutationFn: userService.profileCompletion(id),
    ...options,
  });
};
