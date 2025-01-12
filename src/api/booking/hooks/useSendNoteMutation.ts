import { useToast } from 'react-native-toast-notifications';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from 'src/api/utils';

import { bookingService } from '../booking.service';

export const useSendNoteMutation = (id: string) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { bookingNote: string }) => bookingService.sendNote(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.getBookings()] });

      toast.show('Notatka została wysłana', { type: 'success' });
    },
    onError: () => {
      toast.show('Wystąpił błąd podczas wysyłania notatki', { type: 'error' });
    },
  });
};
