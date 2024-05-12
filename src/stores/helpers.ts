const now = new Date();
const shortMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

export function dateMinusDays(nDays: number) {
  return new Date(now.getTime() - nDays * 24 * 60 * 60 * 1000);
}

export function dateMinusMonths(nMonth: number) {
  const monthIndex = new Date().setMonth(now.getMonth() - nMonth);
  return shortMonths[new Date(monthIndex).getMonth()];
}

export function formatDates(dates: string[]) {
  const months: string[] = [];
  dates.forEach((d: string) => {
    const date: Date = new Date(d);
    months.push(`${shortMonths[date.getMonth()]} ${date.getDate()}`);
  });
  return months;
}
