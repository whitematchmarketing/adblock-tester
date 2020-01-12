import loadjs from "loadjs";

export const scriptLoader = (url: string) => {
  return new Promise((res, rej) => {
    let timeout = false;
    const timer = setTimeout(() => {
      timeout = true;
      rej(Error("time out"));
    }, 20000);

    loadjs(url, {
      success: () => {
        if (timeout) return;
        fetch(url)
          .then(req => req.text())
          .then(text => {
            if (timeout) return;
            if (text) {
              clearTimeout(timer);
              res(text.length);
            } else {
              rej(Error("fetch failed"));
            }
          })
          .catch(error => {
            if (timeout) return;
            clearTimeout(timer);
            rej(error);
          });
      },
      error: () => {
        if (timeout) return;
        clearTimeout(timer);
        rej(Error("script tag failed"));
      },
    });

    clearTimeout(timer);
  });
};
