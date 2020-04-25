import { differenceInDays } from 'date-fns';

export function remainDays(date) {
  return differenceInDays(new Date(), new Date(date))
}

export default remainDays
