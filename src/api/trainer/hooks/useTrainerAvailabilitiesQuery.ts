import { useQuery } from '@tanstack/react-query';

import { queryKeys } from 'src/api/utils';

import { TrainerAvailabilitiesGetV1Params } from '../models';
import { trainerService } from '../trainer.service';

export const useTrainerAvailabilitiesQuery = (params: TrainerAvailabilitiesGetV1Params) => {
  return useQuery({
    queryKey: [queryKeys.getTrainerAvailabilities(params)],
    queryFn: () => trainerService.getTrainerAvailabilities(params),
    enabled: !!params.trainerId,
  });
};
