import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TrainerBookTrainingPostV1Payload } from '../models';
import { trainerService } from '../trainer.service';

export const useTrainerBookTrainingMutation = (trainerId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TrainerBookTrainingPostV1Payload) =>
      trainerService.postTrainerBookTraining(trainerId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0].includes('availabilities'),
      });
    },
  });
};
