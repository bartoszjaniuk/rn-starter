export const getPastPresentFutureDates = (days: number, baseDate?: string) => {
  const date = baseDate ? new Date(baseDate) : new Date();

  return {
    today: date.toISOString().slice(0, 10),
    past: new Date(date.getTime() - days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    future: new Date(date.getTime() + days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
  };
};
