import remainDays from "./remainDays";

export function IDTCalculate(importance, duration, time) {
  let computedRemainDays = remainDays(time)
  let timeRatio = computedRemainDays;

  if(computedRemainDays === 0) {
    timeRatio = 1
  } else if(computedRemainDays < 0) {
    timeRatio = 1/(Math.abs(computedRemainDays - 1))
  } else {
    timeRatio += 1
  }
  return Math.abs(importance * (duration / timeRatio))
}

export default IDTCalculate
