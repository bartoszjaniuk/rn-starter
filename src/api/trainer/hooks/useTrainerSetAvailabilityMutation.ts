import { useToast } from 'react-native-toast-notifications';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { goBack } from 'src/navigation';

import { TrainerSetAvailabilityPostV1Payload } from '../models';
import { trainerService } from '../trainer.service';

export const useTrainerSetAvailabilityMutation = (trainerId: string) => {
  const toast = useToast();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TrainerSetAvailabilityPostV1Payload) =>
      trainerService.postTrainerSetAvailability(trainerId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0].includes('availabilities'),
      });
      goBack();
      toast.show('Pomyślnie dodano dostępność', { type: 'success' });
    },
    onError: () => {
      toast.show('Wystąpił błąd. Nie udało się dodać dostępności', { type: 'error' });
    },
  });
};
