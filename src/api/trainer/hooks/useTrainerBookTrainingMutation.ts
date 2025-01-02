import { useToast } from 'react-native-toast-notifications';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from 'src/api/utils';

import { TrainerBookTrainingPostV1Payload } from '../models';
import { trainerService } from '../trainer.service';

export const useTrainerBookTrainingMutation = (trainerId: string, onSuccessEffect?: () => void) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (payload: TrainerBookTrainingPostV1Payload) =>
      trainerService.postTrainerBookTraining(trainerId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0].includes('availabilities'),
      });
      queryClient.invalidateQueries({ queryKey: [queryKeys.getBookings()] });
      onSuccessEffect?.();
      toast.show('Pomyślnie zarezerwowano trening', { type: 'success' });
    },
    onError: () => {
      toast.show('Wystąpił błąd podczas zarezerwowania treningu', { type: 'error' });
    },
  });
};
