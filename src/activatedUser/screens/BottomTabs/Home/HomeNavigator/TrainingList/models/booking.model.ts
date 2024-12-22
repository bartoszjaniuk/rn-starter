export type Booking = {
  date: string;
  id: string;
  status: string;
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
  availabilitySlots: {
    id: string;
    start: string;
    end: string;
  }[];
};
