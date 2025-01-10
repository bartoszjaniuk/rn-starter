export const bookingQueryKeys = {
  getBookings: () => 'bookings',
  postCancelBooking: (id: string) => `booking/${id}/cancel`,
  postRateBooking: (id: string) => `booking/${id}/rate`,
};
