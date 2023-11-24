export const growingInterval = (
  fn: Function,
  startValue: number = 100,
  multiplier: number = 1.1,
) => {
  fn();
  const time = Math.round(startValue * multiplier);
  setTimeout(() => growingInterval(fn, time, multiplier), time);
};
