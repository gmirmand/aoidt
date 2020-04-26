import {differenceInDays, isToday, isYesterday, isTomorrow} from 'date-fns';

export function remainDays(date) {
  let difference = differenceInDays(new Date(date), new Date())
  const theDate = new Date(date);

  if (isToday(theDate)) {
    difference = 0;
  } else if (isYesterday(theDate)) {
    difference = -1
  } else if (isTomorrow(theDate)) {
    difference = 1
  } else if (difference > 0) {
    difference += 1
  }

  return difference
}

export default remainDays
