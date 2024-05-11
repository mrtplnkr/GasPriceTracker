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

export function getMonths(nMonths: number) {
  const arr: string[] = [];
  for (let index = 0; index < nMonths; index++) {
    arr.push(dateMinusMonths(index));
  }
  return arr;
}
