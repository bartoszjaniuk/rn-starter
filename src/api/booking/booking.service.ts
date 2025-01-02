import { API_URL } from 'src/shared/constants/apiUrl';

import { BookingsGetV1Response } from './models/booking.model';

import { ApiService } from '../baseApi';
import { queryKeys } from '../utils';

export class BookingService extends ApiService {
  constructor() {
    super(API_URL);
  }

  getBookings = async () => {
    return this.responseHandler(await this.httpClient.get<Promise<BookingsGetV1Response>>(queryKeys.getBookings()));
  };

  cancelBooking = async (bookingId: string) => {
    return this.responseHandler(
      await this.httpClient.post<Promise<BookingsGetV1Response>>(queryKeys.postCancelBooking(bookingId)),
    );
  };
}

export const bookingService = new BookingService();
