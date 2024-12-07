import { useMutation } from '@tanstack/react-query';

import { TrainerSetAvailabilityPostV1Payload } from '../models';
import { trainerService } from '../trainer.service';

export const useTrainerSetAvailabilityMutation = (trainerId: string) => {
  return useMutation({
    mutationFn: (payload: TrainerSetAvailabilityPostV1Payload) =>
      trainerService.postTrainerSetAvailability(trainerId, payload),
  });
};
