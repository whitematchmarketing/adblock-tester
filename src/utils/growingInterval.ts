export const growingInterval = (
  fn: Function,
  startValue: number = 400,
  multiplier: number = 1.1,
) => {
  fn();
  if (process.env.NODE_ENV === "development") multiplier = 5;
  const time = startValue * multiplier;
  setTimeout(() => growingInterval(fn, time, multiplier), time);
};
