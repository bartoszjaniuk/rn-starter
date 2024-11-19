export type TrainerSpecializations = {
  data: string[];
};

export type Trainer = {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  city: string;
  specializations: string[];
  rating?: number;
  images: string[];
};

export type TrainersGetV1Response = {
  data: Trainer[];
  meta: {
    total: number;
  };
};

export type TrainerAvailabilitiesGetV1Params = {
  trainerId: string;
  date: {
    from: string;
    to: string;
  };
};

type ScheduleEntry = {
  id: string; // Unique identifier for each time slot
  start: string; // Start time in "HH:mm" format
  end: string; // End time in "HH:mm" format
};

type DateSchedule = {
  [date: string]: ScheduleEntry[]; // Keys are dates in "YYYY-MM-DD" format
};

type SchedulesData = {
  [key: string]: DateSchedule; // Dynamic keys, e.g., "c1b8bbc5-5cc3-476c-962b-3b09505eb639"
};

type Meta = {
  totalItems: number; // Total number of items in the response
};

export type TrainerAvailabilitiesGetV1Response = {
  data: SchedulesData;
  meta: Meta;
};
