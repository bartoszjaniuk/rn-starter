export const bookingQueryKeys = {
  getBookings: () => 'bookings',
  postCancelBooking: (id: string) => `booking/${id}/cancel`,
};
