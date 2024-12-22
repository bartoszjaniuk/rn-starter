import { Booking } from '../models/booking.model';

export type BookingDay = {
  date: string;
  trainings: Booking[];
};

export const transformDataIntoBookingArrays = (
  data?: Record<string, Record<string, Omit<Booking, 'date' | 'id'>>>,
): BookingDay[] => {
  return data
    ? Object.entries(data).map(([date, bookings]) => ({
        date,
        trainings: Object.entries(bookings).map(([id, content]) => ({
          date,
          id,
          ...content,
        })),
      }))
    : [];
};
