import { useQuery } from '@tanstack/react-query';

import { queryKeys } from 'src/api';
import { userService } from 'src/api/user';

export const useGetUserInfoQuery = (isEnabled?: boolean) => {
  return useQuery({ queryKey: [queryKeys.getUserInfo()], queryFn: userService.getUserInfo, enabled: isEnabled });
};
