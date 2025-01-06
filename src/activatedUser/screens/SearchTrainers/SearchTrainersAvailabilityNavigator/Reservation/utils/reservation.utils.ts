export type TimeSlot = {
  id: string;
  start: string; // e.g., "08:00"
  end: string; // e.g., "08:15"
  place: string;
};

export type MeetingSlot = {
  start: string; // e.g., "08:00"
  end: string; // e.g., "09:00"
  ids: string[]; // Array of combined slot IDs
  place: string;
};

const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
    .toString()
    .padStart(2, '0');
  const mins = (minutes % 60).toString().padStart(2, '0');

  return `${hours}:${mins}`;
};

export const getMeetingSlots = (timeSlots: TimeSlot[] | undefined, durationInMinutes: number) => {
  const meetingSlots: MeetingSlot[] = [];

  if (!timeSlots || timeSlots.length === 0) {
    console.warn('Invalid or empty timeSlots');
    return [];
  }
  timeSlots.forEach((timeSlot, i) => {
    const start = timeToMinutes(timeSlot.start);
    const end = start + durationInMinutes;
    let currentMinutes = start;
    let isValid = true;
    const combinedIds: string[] = [];

    for (let j = i; j < timeSlots.length && currentMinutes < end; j++) {
      const slotStart = timeToMinutes(timeSlots[j]?.start);
      const slotEnd = timeToMinutes(timeSlots[j]?.end);

      if (slotStart !== currentMinutes) {
        isValid = false;
        break;
      }
      if (timeSlots[j]?.id) combinedIds.push(timeSlots[j]?.id ?? '');

      currentMinutes = slotEnd;
    }

    if (isValid && currentMinutes === end) {
      meetingSlots.push({
        start: timeSlot.start,
        end: minutesToTime(end),
        ids: combinedIds,
        place: timeSlot.place,
      });
    }
  });

  return meetingSlots;
};

export const mapToSelect = (meetingIntervals: MeetingSlot[]) => {
  return meetingIntervals.map((m) => ({
    label: `${m.start}-${m.end}`,
    value: m.ids.toString(),
  }));
};
