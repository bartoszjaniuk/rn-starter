import { useQuery } from '@tanstack/react-query';

import { queryKeys } from 'src/api';

import { authService } from '../auth.service';

export const useGetUserInfoQuery = (isEnabled?: boolean) => {
  return useQuery({ queryKey: [queryKeys.getUserInfo()], queryFn: authService.getUserInfo, enabled: isEnabled });
};
