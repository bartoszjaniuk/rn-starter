import { useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import { queryKeys } from '../../../api/utils/queryKeys';
import { UserInfoResponse } from '../models';
import { userService } from '../user.service';

export const useGetUserInfoQuery = (isEnabled?: boolean) => {
  return useQuery<UserInfoResponse, AxiosError, UserInfoResponse, string[]>({
    queryKey: [queryKeys.getUserInfo()],
    queryFn: userService.getUserInfo,
    enabled: isEnabled,
    retry: 3,
  });
};
