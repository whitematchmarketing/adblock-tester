export const safeEval = (code: string) => {
  try {
    return Boolean(eval(code));
  } catch {
    return false;
  }
};
