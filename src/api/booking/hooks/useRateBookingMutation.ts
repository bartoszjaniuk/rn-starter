import { useToast } from 'react-native-toast-notifications';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from 'src/api/utils';
import { goBack } from 'src/navigation';

import { bookingService } from '../booking.service';

export const useRateBookingMutation = (id: string) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { bookingRate: number }) => bookingService.rateBooking(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.getBookings()] });

      toast.show('Dziękujemy za ocenę treningu', { type: 'success' });
      goBack();
    },
    onError: () => {
      toast.show('Wystąpił błąd podczas oceniania treningu', { type: 'error' });
    },
  });
};
