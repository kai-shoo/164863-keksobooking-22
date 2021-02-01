'use strict'

const calcLengthOfFraction = function (number) {
  return number.toString().includes('.')
    ? number.toString().split('.').pop().length
    : 0
}

const randomizeInRange = function (bottom, top, precision = 0) {
  [bottom, top] = [Math.min(bottom, top), Math.max(bottom, top)]

  if (
    bottom < 0 ||
    precision < 0 ||
    Number.isInteger(precision) === false ||
    (top - bottom < 1 / 10 ** precision &&
      top.toString().slice(0, -precision) ===
        bottom.toString().slice(0, -precision))
  ) {
    return null
  }

  const bottomFractionLength = calcLengthOfFraction(bottom)
  const topFractionLength = calcLengthOfFraction(top)
  let rangePrecisionMax = Math.max(
    bottomFractionLength,
    topFractionLength,
    precision,
  )

  if (rangePrecisionMax >= precision) {
    top = Math.floor(top * 10 ** precision)
    bottom = Math.ceil(bottom * 10 ** precision)
    rangePrecisionMax = 0
  } else {
    top *= 10 ** (precision + rangePrecisionMax)
    bottom *= 10 ** (precision + rangePrecisionMax)
  }

  let randomInRange = Math.floor(bottom + Math.random() * (top + 1 - bottom))

  return +(randomInRange / 10 ** rangePrecisionMax / 10 ** precision).toFixed(
    precision,
  )
}

randomizeInRange(0.2, 100.99999999, 20)
