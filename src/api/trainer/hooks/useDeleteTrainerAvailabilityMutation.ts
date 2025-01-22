import { useToast } from 'react-native-toast-notifications';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { goBack } from 'src/navigation';

import { trainerService } from '../trainer.service';

export const useDeleteTrainerAvailabilityMutation = (trainerId: string) => {
  const toast = useToast();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { availabilitySlotsIds: string[] }) =>
      trainerService.deleteTrainerAvailability(trainerId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0].includes('availabilities'),
      });
      goBack();
      toast.show('Pomyślnie usunięto dostępność', { type: 'success' });
    },
    onError: () => {
      toast.show('Wystąpił błąd. Nie udało się usunąć dostępności', { type: 'error' });
    },
  });
};
