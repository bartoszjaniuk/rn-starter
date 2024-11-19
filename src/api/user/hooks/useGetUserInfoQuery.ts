import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../../../api/utils/queryKeys';
import { userService } from '../user.service';

export const useGetUserInfoQuery = (isEnabled?: boolean) => {
  return useQuery({ queryKey: [queryKeys.getUserInfo()], queryFn: userService.getUserInfo, enabled: isEnabled });
};
