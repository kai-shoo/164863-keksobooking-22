const TIMEOUT_SEC = 5000;

const calcLengthOfFraction = function (number) {
  return number.toString().includes('.')
    ? number.toString().split('.').pop().length
    : 0;
};

const randomizeInRange = function (bottom, top, precision = 0) {
  [bottom, top] = [Math.min(bottom, top), Math.max(bottom, top)];

  if (
    bottom < 0 ||
    precision < 0 ||
    Number.isInteger(precision) === false ||
    (top - bottom < 1 / 10 ** precision &&
      top.toString().slice(0, -precision) ===
        bottom.toString().slice(0, -precision))
  ) {
    return null;
  }

  const bottomFractionLength = calcLengthOfFraction(bottom);
  const topFractionLength = calcLengthOfFraction(top);
  let rangePrecisionMax = Math.max(
    bottomFractionLength,
    topFractionLength,
    precision,
  );

  if (rangePrecisionMax >= precision) {
    top = Math.floor(top * 10 ** precision);
    bottom = Math.ceil(bottom * 10 ** precision);
    rangePrecisionMax = 0;
  } else {
    top *= 10 ** (precision + rangePrecisionMax);
    bottom *= 10 ** (precision + rangePrecisionMax);
  }

  const randomInRange = Math.floor(bottom + Math.random() * (top + 1 - bottom));

  return +(randomInRange / 10 ** rangePrecisionMax / 10 ** precision).toFixed(
    precision,
  );
};

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
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const AJAX = async function (url, uploadData = undefined) {
  const fetchPro = uploadData
    ? fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      })
    : fetch(url);

  const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`${data.message} (${res.status})`);
  }
  return data;
};

export { randomizeInRange, keepElementsByClassFromArr, AJAX };
