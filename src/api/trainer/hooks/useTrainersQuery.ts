import { useQuery } from '@tanstack/react-query';

import { queryKeys } from 'src/api';

import { trainerService } from '../trainer.service';

export const useTrainersQuery = () => {
  return useQuery({
    queryKey: [queryKeys.getTrainers()],
    queryFn: trainerService.getTrainers,
  });
};
