import { useQuery } from '@tanstack/react-query';

import { queryKeys } from 'src/api';

import { trainerService } from '../trainer.service';

export const useTrainersQuery = (params?: string) => {
  return useQuery({
    queryKey: [queryKeys.getTrainers(params)],
    queryFn: () => trainerService.getTrainers(params),
  });
};
