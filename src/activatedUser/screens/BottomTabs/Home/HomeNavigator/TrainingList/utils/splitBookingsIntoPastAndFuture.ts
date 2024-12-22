import { Booking } from '../models/booking.model';

export const splitBookingsIntoPastAndFuture = (bookings: Booking[]) => {
  const currentDate = new Date().toISOString().split('T')[0];
  const pastBookings = currentDate ? bookings.filter((booking) => booking.date < currentDate) : [];
  const futureBookings = currentDate ? bookings.filter((booking) => booking.date >= currentDate) : [];
  return { pastBookings, futureBookings };
};
