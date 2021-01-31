'use strict';

const calcLengthOfFraction = function (number) {
  return (number.toString().includes('.')) ? (number.toString().split('.').pop().length) : (0);
}

const randomizeInRange = function (min, max, precision = 0) {
  if (
    min >= max ||
    min < 0 ||
    precision < 0)
    return null;

  const rangePrecision = Math.max(calcLengthOfFraction(min), calcLengthOfFraction(max), precision);

  const step = 1 / (10 ** rangePrecision)
  max *= 10 ** rangePrecision;
  min *= 10 ** rangePrecision;

  const randomInRange = Math.round(min - step / 2 + Math.random() * (max - min + step)) / (10 ** rangePrecision);

  return +randomInRange.toFixed(precision);
};

randomizeInRange(0.2, 100.99999999, 20);


