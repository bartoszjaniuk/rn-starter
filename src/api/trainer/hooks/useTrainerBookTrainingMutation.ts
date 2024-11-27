import { useMutation } from '@tanstack/react-query';

import { TrainerBookTrainingPostV1Payload } from '../models';
import { trainerService } from '../trainer.service';

export const useTrainerBookTrainingMutation = (trainerId: string) => {
  return useMutation({
    mutationFn: (payload: TrainerBookTrainingPostV1Payload) =>
      trainerService.postTrainerBookTraining(trainerId, payload),
  });
};
