/*eslint-disable  indent*/

const TIMEOUT = 10000;

const keepElementsByClassFromArr = function (array, elements) {
  elements.forEach((element) => {
    if (
      !array.some((className) => element.className.includes(`${className}`))
    ) {
      element.remove();
    }
  });
};

const breakAfterTime = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(
          `Запрос выполняется слишком долго! Прервано после ${s} секунд`,
        ),
      );
    }, s);
  });
};

const exchangeData = async function (url, uploadData = undefined) {
  const fetchPro = uploadData
    ? fetch(url, {
        method: 'POST',
        body: uploadData,
      })
    : fetch(url);

  const res = await Promise.race([fetchPro, breakAfterTime(TIMEOUT)]);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`${data.message} (${res.status})`);
  }
  return data;
};

export { keepElementsByClassFromArr, exchangeData as AJAX };
