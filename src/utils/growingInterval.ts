export const growingInterval = (
  fn: Function,
  startValue: number = 100,
  multiplier: number = 1.25,
) => {
  fn();
  const time = startValue * multiplier;
  setTimeout(() => growingInterval(fn, time, multiplier), time);
};
