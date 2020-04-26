import remainDays from "./remainDays";

export function IDTCalculate(importance, duration, time) {
  return importance * (duration / remainDays(time, true))
}

export default IDTCalculate
