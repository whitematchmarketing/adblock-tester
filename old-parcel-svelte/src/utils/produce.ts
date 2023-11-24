import cloneDeep from "lodash/cloneDeep";

// small immer
export const produce = <T>(state: T, fn: (draftState: T) => void): T => {
  const newState = cloneDeep(state);
  fn(newState);
  return newState;
};
