'use strict';

const randomizeInRange = function (min, max, precision = 0) {

  if (min >= max || min < 0 || precision < 0) return null;

  // Меняю макс для компенсации плохого округления у toFixed() и чтобы верхнее значение попадало в диапозон
  max += 1 / Math.pow(10, (max.toString().length + precision));

  return +(Math.random() * (max - min) + min).toFixed(precision);
};

randomizeInRange(0.2, 100.99999999, 20);



