import { differenceInDays } from 'date-fns';

export function remainDays(date, includeToday) {
  return differenceInDays(new Date(date), new Date()) + includeToday ? 1 : 0
}

export default remainDays
