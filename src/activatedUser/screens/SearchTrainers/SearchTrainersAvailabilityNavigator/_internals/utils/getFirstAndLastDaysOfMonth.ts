export const getFirstAndLastDaysOfMonth = (dateString?: string) => {
  const date = dateString ? new Date(dateString) : new Date();
  const today = date.toISOString().split('T')[0];
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const firstDayString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`;
  const lastDayString = `${lastDay.getFullYear()}-${String(lastDay.getMonth() + 1).padStart(2, '0')}-${String(lastDay.getDate()).padStart(2, '0')}`;

  return { firstDay: firstDayString, lastDay: lastDayString, today };
};
