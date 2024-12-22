import { useQuery } from '@tanstack/react-query';

import { queryKeys } from 'src/api/utils';

import { bookingService } from '../booking.service';

export const useBookingsQuery = () => {
  return useQuery({
    queryKey: [queryKeys.getBookings()],
    queryFn: () => bookingService.getBookings(),
  });
};
