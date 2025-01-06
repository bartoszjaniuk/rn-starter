export function getAllDatesForCurrentMonth(month: number): string[] {
  const now = new Date();

  const currentMonth = now.getMonth();

  if (currentMonth === month) {
    const year = now.getFullYear();
    const firstDay = new Date(year, month, now.getDate());
    const lastDay = new Date(year, month + 1, 0);

    const dates: string[] = [];

    for (let date = firstDay; date <= lastDay; date.setDate(date.getDate() + 1)) {
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      dates.push(formattedDate);
    }

    return dates;
  }

  const year = now.getFullYear();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const dates: string[] = [];

  for (let date = firstDay; date <= lastDay; date.setDate(date.getDate() + 1)) {
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    dates.push(formattedDate);
  }

  return dates;
}
