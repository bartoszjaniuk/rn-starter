import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { AxiosResponse } from 'axios';

import { queryKeys } from 'src/api';
import { userService } from 'src/api/user';

import { ProfileCompletion } from '../models';

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
