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
}

export const bookingService = new BookingService();
