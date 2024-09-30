import { useQuery } from '@tanstack/react-query';

import { queryKeys } from 'src/api';

import { trainerService } from '../trainer.service';

export const useTrainerSpecializationsQuery = () => {
  return useQuery({
    queryKey: [queryKeys.getTrainerSpecializations()],
    queryFn: trainerService.getTrainerSpecializations,
  });
};
