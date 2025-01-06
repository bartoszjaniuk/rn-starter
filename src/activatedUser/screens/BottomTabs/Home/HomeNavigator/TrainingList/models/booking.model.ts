export type Booking = {
  date: string;
  id: string;
  status: string;
  type: string;
  trainee: {
    id: string;
    name: string;
    city: string;
  };
  trainer: {
    id: string;
    name: string;
    city: string;
  };
  note: string | null;
  rating: number | null;
  place: string;
  availabilitySlots: {
    id: string;
    start: string;
    end: string;
  }[];
};
