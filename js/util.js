const TIMEOUT_SEC = 10;

const keepElementsByClassFromArr = function (array, elements) {
  elements.forEach((element) => {
    if (
      !array.some((className) => element.className.includes(`${className}`))
    ) {
      element.remove();
    }
  });
};

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(
          `Запрос выполняется слишком долго! Прервано после ${s} секунд`,
        ),
      );
    }, s * 1000);
  });
};

const AJAX = async function (url, uploadData = undefined) {
  const fetchPro = uploadData
    ? fetch(url, {
        method: 'POST',
        body: uploadData,
      })
    : fetch(url);

  const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`${data.message} (${res.status})`);
  }
  return data;
};

export { keepElementsByClassFromArr, AJAX };
