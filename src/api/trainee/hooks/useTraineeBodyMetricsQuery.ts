import { useQuery } from '@tanstack/react-query';

import { queryKeys } from 'src/api/utils';

import { traineeService } from '../trainee.service';

export const useTraineeBodyMetricsQuery = (traineeId: string) => {
  return useQuery({
    queryKey: [queryKeys.traineeBodyMetrics(traineeId)],
    queryFn: () => traineeService.getTraineeBodyMetrics(traineeId),
    enabled: !!traineeId,
  });
};
