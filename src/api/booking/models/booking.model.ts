type Trainee = {
  id: string;
  name: string;
  city: string;
};

type Trainer = {
  id: string;
  name: string;
  city: string;
};

type AvailabilitySlot = {
  id: string;
  start: string; // e.g., "10:45"
  end: string; // e.g., "11:00"
};

type Booking = {
  status: string; // e.g., "approved"
  type: string;
  trainee: Trainee;
  trainer: Trainer;
  note: string | null;
  rating: number | null;
  availabilitySlots: AvailabilitySlot[];
  place: string | null;
};

type BookingsByDate = {
  [bookingId: string]: Booking;
};

type Data = {
  [date: string]: BookingsByDate; // e.g., "2024-12-20"
};

type Meta = {
  total: number;
};

export type BookingsGetV1Response = {
  data: Data;
  meta: Meta;
};
