import { useQuery } from '@tanstack/react-query';

import { queryKeys } from 'src/api/utils';

import { trainerService } from '../trainer.service';

export const useTrainersQuery = (params?: string, enabled = true) => {
  return useQuery({
    queryKey: [queryKeys.getTrainers(params)],
    queryFn: () => trainerService.getTrainers(params),
    enabled,
  });
};
