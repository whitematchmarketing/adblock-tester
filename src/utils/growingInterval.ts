import { isDev } from "./env";

export const growingInterval = (
  fn: Function,
  startValue: number = 500,
  multiplier: number = 1.25,
) => {
  fn();
  if (isDev) multiplier = 5;
  const time = startValue * multiplier;
  setTimeout(() => growingInterval(fn, time, multiplier), time);
};
