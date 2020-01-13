export const fetchMediaFileSize = (url: string) =>
  fetch(url)
    .then(req => req.text())
    .then(text => text.length)
    .then(fileSize => {
      if (fileSize > 0) return fileSize;
      throw Error("unknown file size");
    });
