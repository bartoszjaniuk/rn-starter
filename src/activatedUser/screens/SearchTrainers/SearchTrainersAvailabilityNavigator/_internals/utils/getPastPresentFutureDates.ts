export const getPastPresentFutureDates = (days = 7, baseDate?: string) => {
  const date = baseDate ? new Date(baseDate) : new Date();
  return {
    today: date.toISOString().slice(0, 10),
    past: new Date(date.getTime() - days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    future: new Date(date.getTime() + days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    lastDay: new Date(date.getFullYear(), date.getMonth() + 1, 0).toLocaleDateString('en-CA'),
  };
};
