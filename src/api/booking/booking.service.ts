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
      await this.httpClient.patch<Promise<BookingsGetV1Response>>(queryKeys.postCancelBooking(bookingId)),
    );
  };

  rateBooking = async (
    bookingId: string,
    payload: {
      bookingRate: number;
    },
  ) => {
    return this.responseHandler(
      await this.httpClient.post<Promise<void>>(queryKeys.postRateBooking(bookingId), payload),
    );
  };

  sendNote = async (
    bookingId: string,
    payload: {
      bookingNote: string;
    },
  ) => {
    return this.responseHandler(await this.httpClient.post<Promise<void>>(queryKeys.postSendNote(bookingId), payload));
  };
}

export const bookingService = new BookingService();
