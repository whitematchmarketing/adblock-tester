export const isFileSizeAcceptable = (fileSize: number, approxSize: number) => {
  const delta = 0.1; // 10%
  const min = approxSize - approxSize * delta;
  const max = approxSize + approxSize * delta;
  return fileSize > min && fileSize < max;
};
