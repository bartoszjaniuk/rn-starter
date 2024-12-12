import { useMutation, useQueryClient } from '@tanstack/react-query';

import { goBack } from 'src/navigation';

import { TrainerSetAvailabilityPostV1Payload } from '../models';
import { trainerService } from '../trainer.service';

export const useTrainerSetAvailabilityMutation = (trainerId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TrainerSetAvailabilityPostV1Payload) =>
      trainerService.postTrainerSetAvailability(trainerId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0].includes('availabilities'),
      });
      goBack();
    },
  });
};
