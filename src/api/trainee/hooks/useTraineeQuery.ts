import { useQuery } from '@tanstack/react-query';

import { queryKeys } from 'src/api/utils';

import { traineeService } from '../trainee.service';

export const useTraineeQuery = (traineeId: string) => {
  return useQuery({
    queryKey: [queryKeys.getTrainee(traineeId)],
    queryFn: () => traineeService.getTrainee(traineeId),
    enabled: !!traineeId,
  });
};
