import { useToast } from 'react-native-toast-notifications';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from 'src/api/utils';

import { bookingService } from '../booking.service';

export const useCancelBookingMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (id: string) => bookingService.cancelBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.getBookings()] });
      toast.show('Trening został pomyślnie odwołany', { type: 'success' });
    },
    onError: () => {
      toast.show('Wystąpił błąd podczas odwoływania treningu', { type: 'error' });
    },
  });
};
